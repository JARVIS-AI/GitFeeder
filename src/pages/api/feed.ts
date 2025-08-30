import type { NextApiRequest, NextApiResponse } from "next";

const posts = [
  { id: 1, user: "Alice", text: "Hello World!" },
  { id: 2, user: "Bob", text: "Just joined the feed." },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(posts);
}