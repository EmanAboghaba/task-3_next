// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import { getUserById, deleteUser, updateUser } from "../../_lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getServerSession from "next-auth";
import { userUpdateSchema } from "../../_lib/types";
interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error(`Failed to fetch user with ID ${id}:`, error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  try {
    const body = await request.json();

    // 1. Zod Validation
    const validationResult = userUpdateSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validation Error",
          errors: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const updatedUser = await updateUser(id, validationResult.data);
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(`Failed to update user with ID ${id}:`, error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete a single user
export async function DELETE(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Crucial: Only admins (or the user themselves) should be able to delete.
  // If you deleted the role, this check won't work.
  // You might want to put role back for this critical operation.
  // if (session.user && (session.user as any).role !== 'admin') {
  //   return NextResponse.json({ message: 'Forbidden: Only admins can delete users' }, { status: 403 });
  // }
  // Optional: if a user can delete their own account:
  // if (session.user && (session.user as any).id !== params.id && (session.user as any).role !== 'admin') {
  //   return NextResponse.json({ message: 'Forbidden: Cannot delete other users' }, { status: 403 });
  // }

  const { id } = params;
  try {
    const success = await deleteUser(id);
    if (!success) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // A 204 No Content response is typically returned for successful DELETE
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(`Failed to delete user with ID ${id}:`, error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
