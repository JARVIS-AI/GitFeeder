// src/lib/github.ts
export async function getGitHubFeed(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}/events/public`);
  if (!res.ok) throw new Error("Failed to fetch GitHub feed");
  return res.json();
}