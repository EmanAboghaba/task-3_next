import { NextResponse } from "next/server";
import { createUser, getUsers } from "../_lib/db";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getServerSession from "next-auth";
import { userCreateSchema } from "../_lib/types";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await getUsers(); // Fetch users from your database
    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Zod Validation
    const validationResult = userCreateSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validation Error",
          errors: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const newUser = await createUser(validationResult.data); // Save to database

    return NextResponse.json(newUser, { status: 201 }); // 201 Created
  } catch (error: any) {
    // Type 'any' for error for more flexibility in catching
    console.error("Failed to create user:", error);
    // Handle specific DB errors, e.g., unique email constraint (MongoDB error code 11000)
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 409 }
      ); // 409 Conflict
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
