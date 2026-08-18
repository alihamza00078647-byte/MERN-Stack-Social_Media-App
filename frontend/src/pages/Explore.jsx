import { Search } from "lucide-react";
import { PostCard } from "../components/PostCard";

function Explore() {
  const explorePosts = [
    {
      id: 1,
      author: {
        name: "Tech Daily",
        handle: "techdaily",
        avatar: "TD",
        verified: true,
      },
      content:
        "New AI breakthrough in natural language processing. This could revolutionize how we interact with technology.",
      image:
        "https://images.unsplash.com/photo-1677442d019cecf3da4870fc46f6dcb8d595146e?w=500&h=300&fit=crop",
      replies: 456,
      reposts: 2103,
      likes: 8941,
      timestamp: "3 hours ago",
    },
    {
      id: 2,
      author: {
        name: "Design Weekly",
        handle: "designweekly",
        avatar: "DW",
        verified: true,
      },
      content:
        "The latest trends in UI/UX design for 2026. Minimalism, dark mode, and micro-interactions are leading the way.",
      image: null,
      replies: 234,
      reposts: 1203,
      likes: 4521,
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      author: {
        name: "Web Dev Tips",
        handle: "webdevtips",
        avatar: "WD",
        verified: false,
      },
      content:
        "Performance optimization: Why your website loads slowly and how to fix it. Full guide available in our blog.",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
      replies: 187,
      reposts: 892,
      likes: 3124,
      timestamp: "6 hours ago",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="sticky top-16 md:top-0 z-40 bg-white border-b border-gray-200 backdrop-blur-sm bg-opacity-80">
        <div className="px-4 py-3 md:px-6 md:py-4">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Explore</h2>
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search posts, people, topics..."
              className="bg-transparent ml-2 outline-none w-full text-sm placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Trending Topics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "#ReactJS",
            "#WebDevelopment",
            "#AI",
            "#Design",
            "#StartUp",
            "#Cloud",
          ].map((topic, i) => (
            <div
              key={i}
              className="bg-white p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200"
            >
              <p className="text-sm font-bold text-blue-600">{topic}</p>
              <p className="text-xs text-gray-500">87.5K Posts</p>
            </div>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="max-w-2xl">
        {explorePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Explore;
