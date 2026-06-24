"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/userService";

export default function LoginPage() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!phoneNumber || !password) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    const user = await loginUser(phoneNumber, password);

    if (!user) {
      alert("Invalid phone number or password.");
      setLoading(false);
      return;
    }

    // Save logged in user
    localStorage.setItem("user", JSON.stringify(user));

    // Go to dashboard
    router.replace("/dashboard");
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-[36px] border border-zinc-800 bg-zinc-900 shadow-2xl px-8 py-10">

        <div className="text-center">
          <div className="text-5xl">🏋️</div>

          <h1 className="mt-4 text-4xl font-bold text-white">
            Simplified Fitness
          </h1>

          <p className="text-blue-500 mt-2 text-lg">
            Welcome Back
          </p>
        </div>

        <div className="mt-8 space-y-5">

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

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 py-4 text-white font-semibold text-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

      </div>
    </main>
  );
}