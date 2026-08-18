import { PostCard } from "../components/PostCard";

function Bookmarks() {
  const bookmarkedPosts = [
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        handle: "sarahjohnson",
        avatar: "SJ",
        verified: true,
      },
      content:
        "Just launched my new project! Really excited to share what I've been working on for the past few months. The journey has been incredible. 🚀",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
      replies: 234,
      reposts: 1203,
      likes: 4521,
      timestamp: "2 hours ago",
    },
    {
      id: 3,
      author: {
        name: "Emma Davis",
        handle: "emmadavis_design",
        avatar: "ED",
        verified: true,
      },
      content:
        "Design tip: Always test your designs on multiple devices. Responsive design isn't just a buzzword, it's essential. Here's what I learned this week:",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
      replies: 156,
      reposts: 892,
      likes: 3456,
      timestamp: "6 hours ago",
    },
    {
      id: 5,
      author: {
        name: "Lisa Anderson",
        handle: "lisaanderson_ai",
        avatar: "LA",
        verified: true,
      },
      content:
        "Exploring the latest AI models and their applications in web development. The future is here, and it's amazing! 🤖",
      image:
        "https://images.unsplash.com/photo-1677442d019cecf3da4870fc46f6dcb8d595146e?w=500&h=300&fit=crop",
      replies: 234,
      reposts: 756,
      likes: 2876,
      timestamp: "10 hours ago",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="sticky top-16 md:top-0 z-40 bg-white border-b border-gray-200 backdrop-blur-sm bg-opacity-80">
        <div className="px-4 py-3 md:px-6 md:py-4">
          <h2 className="text-xl font-bold text-gray-900">Bookmarks</h2>
          <p className="text-sm text-gray-500">Your saved posts</p>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="max-w-2xl">
        {bookmarkedPosts.length > 0 ? (
          bookmarkedPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <p className="text-gray-500 text-lg">No bookmarks yet</p>
              <p className="text-gray-400 text-sm">
                Bookmark posts to save them for later
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookmarks;
