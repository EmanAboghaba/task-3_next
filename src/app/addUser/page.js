"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", file);

    const res = await fetch("/api/users", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("User creation failed:", errorText);
      return alert("User creation failed");
    }

    alert("User created successfully!");
    router.push("/users");
  }

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-md mx-auto space-y-4 d-flex flex-column w-50 mt-5 border py-3 px-4 rounded-3"
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 my-3 border rounded-3"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 my-3 border rounded-3"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full my-3"
        required
      />
      <button type="submit" className=" mx-auto px-4 py-2 rounded w-50">
        Add
      </button>
    </form>
  );
}
