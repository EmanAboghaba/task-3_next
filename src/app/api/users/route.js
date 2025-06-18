import { dbConnection } from "@/app/_lib/db";

import User from "@/app/_lib/models/User";

import path from "path";
import { writeFile } from "fs/promises";
await dbConnection();
export async function GET() {
  try {
    const users = await User.find();
    return new Response(
      JSON.stringify({ data: users, message: "Users endpoint working" }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const file = formData.get("image");

  if (!file || !file.name) {
    return new Response(JSON.stringify({ message: "No image uploaded" }), {
      status: 400,
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(uploadDir, filename);

  await writeFile(filepath, buffer);
  const imageUrl = `/uploads/${filename}`;

  try {
    const user = await User.create({ name, email, image: imageUrl });
    return new Response(JSON.stringify({ message: "User created", user }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error inserting user:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
