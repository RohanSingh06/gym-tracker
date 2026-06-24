"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  full_name: string;
  phone_number: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md rounded-[36px] border border-zinc-800 bg-zinc-900 shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-white">
          Welcome back,
        </h1>

        <h2 className="mt-2 text-3xl font-bold text-blue-500">
          {user?.full_name ?? "Athlete"} 👋
        </h2>

        <div className="mt-8 rounded-2xl bg-zinc-800 border border-zinc-700 p-5">
          <p className="text-zinc-400 text-sm">
            Ready to Train?
          </p>

          <h3 className="mt-1 text-2xl font-bold text-white">
            Choose your workout and get stronger.
          </h3>
        </div>

        <div className="mt-8 space-y-4">

          {/* Start Workout */}

          <button
            onClick={() => router.push("/start-workout")}
            className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 transition py-4 text-lg font-semibold text-white"
          >
            💪 Start Workout
          </button>

          {/* Progress */}

          <button
            className="w-full rounded-2xl border border-zinc-700 hover:bg-zinc-800 transition py-4 text-lg font-medium text-white"
          >
            📊 View Progress
          </button>

          {/* Workout History */}

          <button
            onClick={() => router.push("/workout-history")}
            className="w-full rounded-2xl border border-zinc-700 hover:bg-zinc-800 transition py-4 text-lg font-medium text-white"
          >
            📅 Workout History
          </button>

          {/* Profile */}

          <button
            className="w-full rounded-2xl border border-zinc-700 hover:bg-zinc-800 transition py-4 text-lg font-medium text-white"
          >
            ⚙ Profile
          </button>

          {/* Logout */}

          <button
            onClick={() => {
              localStorage.removeItem("user");
              router.replace("/login");
            }}
            className="w-full rounded-2xl border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition py-4 text-lg font-semibold"
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </main>
  );
}