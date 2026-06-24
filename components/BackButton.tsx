"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/dashboard")}
      className="mb-6 text-blue-500 hover:text-blue-400 font-medium"
    >
      ← Back to Home
    </button>
  );
}