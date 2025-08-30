"use client";

import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function FeedList() {
  const { data: session } = useSession();
  const username = session?.username;

  const githubFeedUrl = username
    ? `https://api.github.com/users/${username}/events/public`
    : null;

  const { data: events, error, isLoading } = useSWR(githubFeedUrl, fetcher);

  if (error) return <div>❌ Failed to load GitHub feed</div>;
  if (isLoading || !events) return <div>⏳ Loading GitHub activity...</div>;

  const visibleEvents = events.filter((event: any) =>
    ["CreateEvent", "PushEvent", "PullRequestEvent", "WatchEvent", "ForkEvent"].includes(event.type)
  );

  return (
    <div className="space-y-4">
      <button
        onClick={() => mutate(githubFeedUrl)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        🔄 Refresh Feed
      </button>

      {visibleEvents.length === 0 && (
        <div className="text-gray-500 mt-4">No recent activity found. Try refreshing or come back later.</div>
      )}

      {visibleEvents.map((event: any) => {
        const repoUrl = `https://github.com/${event.repo.name}`;
        const timestamp = new Date(event.created_at).toLocaleString();

        switch (event.type) {
          case "CreateEvent":
            return (
              <div key={event.id} className="p-4 border rounded shadow-sm">
                🆕 <strong>Created repo:</strong>{" "}
                <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {event.repo.name}
                </a>
                <div className="text-sm text-gray-600">{timestamp}</div>
              </div>
            );
          case "PushEvent":
            return (
              <div key={event.id} className="p-4 border rounded shadow-sm">
                📤 <strong>Pushed to:</strong>{" "}
                <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {event.repo.name}
                </a>
                <ul className="text-sm mt-2 list-disc list-inside">
                  {event.payload.commits?.map((commit: any) => (
                    <li key={commit.sha}>{commit.message}</li>
                  ))}
                </ul>
                <div className="text-sm text-gray-600">{timestamp}</div>
              </div>
            );
          case "PullRequestEvent":
            return (
              <div key={event.id} className="p-4 border rounded shadow-sm">
                🔀 <strong>{event.payload.action} pull request:</strong>{" "}
                <a
                  href={event.payload.pull_request.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {event.payload.pull_request.title}
                </a>
                <div className="text-sm text-gray-600">{timestamp}</div>
              </div>
            );
          case "WatchEvent":
            return (
              <div key={event.id} className="p-4 border rounded shadow-sm">
                ⭐ <strong>Starred:</strong>{" "}
                <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {event.repo.name}
                </a>
                <div className="text-sm text-gray-600">{timestamp}</div>
              </div>
            );
          case "ForkEvent":
            return (
              <div key={event.id} className="p-4 border rounded shadow-sm">
                🍴 <strong>Forked:</strong>{" "}
                <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {event.repo.name}
                </a>
                <div className="text-sm text-gray-600">{timestamp}</div>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}