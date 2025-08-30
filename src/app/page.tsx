"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  // Redirect to /feed if logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/feed");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
  <h1 className="text-5xl font-bold tracking-tight mb-4">My Feed App</h1>
  <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
    Stay updated with your latest GitHub activity
  </p>
  <button
    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
    onClick={() => signIn("github")}
  >
    Login with GitHub
  </button>
</div>
  );
}