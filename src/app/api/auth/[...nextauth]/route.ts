import { _ZodBigInt } from "./../../../../../node_modules/zod/dist/types/v4/classic/schemas.d";
import { User, UserCreateInput } from "@/app/_lib/types";
import { createUser, getUserByEmail } from "@/app/_lib/db";

import UserModel, { IUser } from "@/app/_lib/models/User";
import mongoose from "mongoose";
const UserMongooseModel = UserModel as mongoose.Model<IUser>;
export const authOptions = {
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        try {
          let existingUser: User | null = await getUserByEmail(user.email!);

          if (!existingUser) {
            const newUserData: UserCreateInput = {
              _id: new mongoose.Types.ObjectId().toString(),
              name: user.name || profile?.name || "New User",
              email: user.email!,
            };
            existingUser = await createUser(newUserData);
            console.log("New user created in DB:", existingUser.email);
          }
          if (existingUser) {
            (user as any).id = existingUser._id; // _id is a string/ObjectId on plain object
          }

          return true;
        } catch (error) {
          console.error("Error during signIn callback (DB save):", error);

          return "/auth/error?error=DBSaveError"; // Redirect to custom error page
        }
      }

      return true; // Default: allow sign in for other providers or if no specific handling
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};
