"use client";

import { useState } from "react";
import { createUser } from "@/lib/userService";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSignup() {
    if (
      !fullName ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const user = await createUser({
      full_name: fullName,
      phone_number: phoneNumber,
      password,
    });

    if (!user) {
      alert("Failed to create account.");
      return;
    }

    alert("Account created successfully!");

    setFullName("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md rounded-[36px] border border-zinc-800 bg-zinc-900 shadow-2xl px-8 py-10">

        <div className="text-center">

          <div className="text-5xl">
            🏋️
          </div>

          <h1 className="mt-4 text-4xl font-bold text-white">
            Simplified Fitness
          </h1>

          <p className="text-blue-500 mt-2 text-lg">
            Create Account
          </p>

        </div>

        <div className="mt-8 space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-2xl bg-zinc-800 border border-zinc-700 px-5 py-4 text-white outline-none focus:border-blue-500"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full rounded-2xl bg-zinc-800 border border-zinc-700 px-5 py-4 text-white outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl bg-zinc-800 border border-zinc-700 px-5 py-4 text-white outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-2xl bg-zinc-800 border border-zinc-700 px-5 py-4 text-white outline-none focus:border-blue-500"
          />

          <button
            onClick={handleSignup}
            className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 py-4 text-white font-semibold text-lg transition"
          >
            Create Account
          </button>

        </div>

      </div>

    </main>
  );
}