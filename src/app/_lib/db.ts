// lib/db.ts
import dbConnect from "./dbConnect";
import UserModel, { IUser } from "./models/User";
import { User } from "./types";

import { UserCreateInput, UserUpdateInput } from "./types";
const toPlainObject = (doc: IUser): User => {
  return JSON.parse(JSON.stringify(doc.toObject()));
};

export const getUsers = async (): Promise<User[]> => {
  await dbConnect();
  const users = await UserModel.find({});
  return users.map((user) => toPlainObject(user)); // <--- Ensure this
};

export const getUserById = async (id: string): Promise<User | null> => {
  await dbConnect();
  const user = await UserModel.findById(id);
  return user ? toPlainObject(user) : null; // <--- Ensure this
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  await dbConnect();
  const user = await UserModel.findOne({ email });
  return user ? toPlainObject(user) : null; // <--- Ensure this
};

export const createUser = async (userData: UserCreateInput): Promise<User> => {
  await dbConnect();
  const newUser = await UserModel.create(userData);
  return toPlainObject(newUser);
};

export const updateUser = async (
  id: string,
  updates: UserUpdateInput
): Promise<User | null> => {
  await dbConnect();

  const updatedUser = await UserModel.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  return updatedUser ? toPlainObject(updatedUser) : null;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  await dbConnect();
  const result = await UserModel.findByIdAndDelete(id);

  return !!result;
};
