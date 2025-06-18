import React from "react";
import { signIn } from "next-auth/react"; // Import the signIn function
import Image from "next/image";

export default function Login() {
  const handleGoogleSignIn = async () => {
    "use server";
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{ background: "#f8f9fa" }}
    >
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "8px" }}
      >
        <h1 className="mb-4 text-center text-primary">Login to HomeCares</h1>{" "}
        <p className="text-center text-muted mb-4">
          Access your dashboard and manage your meals.
        </p>
        <div className="d-grid gap-2">
          {" "}
          {/* Bootstrap d-grid and gap for button spacing */}
          <button
            type="button" // Use type="button" to prevent form submission
            onClick={handleGoogleSignIn}
            className="btn btn-outline-dark d-flex align-items-center justify-content-center py-2" // Dark outline for Google
            style={{
              borderColor: "#ced4da",
              color: "#343a40",
              fontWeight: "500",
              fontSize: "1.1rem",
            }}
          >
            {/* Google Icon (using next/image for better optimization) */}
            <Image
              src="/google-icon.svg" // You need to place a google-icon.svg in your public folder
              alt="Google logo"
              width={20}
              height={20}
              className="me-2" // Margin right
            />
            Sign in with Google
          </button>
        </div>
        {/* Optional: Add "OR" separator */}
        <div className="d-flex align-items-center my-4">
          <hr className="flex-grow-1" />
          <span className="mx-3 text-muted">OR</span>
          <hr className="flex-grow-1" />
        </div>
        {/* Existing Email/Password Form - Keep for future implementation */}
        <form /* onSubmit={handleEmailPasswordSubmit} */>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              disabled // Disable for now as you're focusing on Google Auth
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              disabled // Disable for now
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled>
            Login
          </button>
        </form>
        <p className="text-center mt-3 text-muted">
          Don't have an account? No worries, one will be created for you upon{" "}
          <br />
          signing in with Google!
        </p>
        <p className="text-center mt-3 text-muted small">
          By signing in, you agree to our{" "}
          <a href="/terms" className="text-decoration-none">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-decoration-none">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
