"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import FeedList from "../../components/FeedList";

export default function FeedPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-4">You need to login to see the feed.</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-xl"
          onClick={() => signIn("github")}
        >
          Login with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
        <button
          className="px-3 py-1 bg-black text-white rounded-xl"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
      <FeedList />
    </div>
  );
}