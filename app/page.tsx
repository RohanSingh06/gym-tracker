import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md rounded-[36px] border border-zinc-800 bg-zinc-900 shadow-2xl px-8 py-12">

        {/* Logo */}

        <div className="flex flex-col items-center">

          <div className="text-6xl">
            🏋️
          </div>

          <h1 className="mt-5 text-5xl font-bold text-white text-center">
            Simplified Fitness
          </h1>

          <p className="mt-3 text-2xl font-medium tracking-wide text-blue-500">
            Workout Tracker
          </p>

          <div className="mt-8 text-center text-zinc-400 text-xl leading-9">
            <p>Track every workout.</p>
            <p>Beat every workout.</p>
          </div>

        </div>

        {/* Buttons */}

        <div className="mt-12 space-y-6">

          <Link
            href="/login"
            className="block w-full rounded-2xl bg-blue-600 py-4 text-center text-xl font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </Link>

          <div className="flex items-center gap-4">

            <div className="h-px flex-1 bg-zinc-700" />

            <span className="text-zinc-500">
              OR
            </span>

            <div className="h-px flex-1 bg-zinc-700" />

          </div>

          <Link
            href="/signup"
            className="block w-full rounded-2xl border border-zinc-700 py-4 text-center text-xl font-semibold text-white transition hover:bg-zinc-800"
          >
            Create Account
          </Link>

        </div>

        {/* Footer */}

        <p className="mt-12 text-center text-zinc-600">
          Version 1.0
        </p>

      </div>

    </main>
  );
}