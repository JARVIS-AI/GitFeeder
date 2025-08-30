type FeedItemProps = {
  user: string;
  text: string;
};

export default function FeedItem({ user, text }: FeedItemProps) {
  return (
    <div className="p-4 border-b border-gray-200">
      <strong>{user}:</strong> {text}
    </div>
  );
}