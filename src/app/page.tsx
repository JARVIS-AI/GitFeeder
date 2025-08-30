"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to /feed if logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/feed");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">My Feed App</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => signIn("github")}
      >
        Login with GitHub
      </button>
    </div>
  );
}