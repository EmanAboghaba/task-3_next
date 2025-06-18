import React from "react";
import Image from "next/image";
import { GET } from "../api/users/route";

export default async function Users() {
  const res = await GET();
  const { data } = await res.json();
  console.log(data);
  return (
    <div className="container py-5">
      <h1 className="mb-4 text-primary">Users </h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {data.map((user) => (
          <div className="col" key={user._id}>
            <div className="card h-100 shadow-sm">
              <Image
                src={user.image || "/default-user.png"}
                alt={user.name}
                width={300}
                height={300}
                className="card-img-top rounded"
              />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {user.email}
                  <br />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
