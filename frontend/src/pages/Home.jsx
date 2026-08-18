import { PostCard } from "../components/PostCard";

function Home() {
  const dummyPosts = [
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
      id: 2,
      author: {
        name: "Alex Chen",
        handle: "alexchen_dev",
        avatar: "AC",
        verified: false,
      },
      content:
        "React hooks have changed my life. No more class components and lifecycle methods. Clean, elegant, and so much more efficient!",
      image: null,
      replies: 87,
      reposts: 342,
      likes: 1245,
      timestamp: "4 hours ago",
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
      id: 4,
      author: {
        name: "Michael Brown",
        handle: "michaelbrown_tech",
        avatar: "MB",
        verified: false,
      },
      content:
        "Who else spends 30 minutes looking for a bug and it turns out to be a typo? 😅 Debugging is an art form!",
      image: null,
      replies: 421,
      reposts: 1850,
      likes: 5203,
      timestamp: "8 hours ago",
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
    {
      id: 6,
      author: {
        name: "David Wilson",
        handle: "davidwilson_startup",
        avatar: "DW",
        verified: false,
      },
      content:
        "Building a startup is 10% idea and 90% execution. Focus on solving real problems, not just cool tech. Let's build something meaningful together!",
      image: null,
      replies: 178,
      reposts: 623,
      likes: 1956,
      timestamp: "12 hours ago",
    },
  ];

  return (
    <div className="flex-1">
      {/* Feed Header */}
      <div className="sticky top-16 md:top-0 z-40 bg-white border-b border-gray-200 backdrop-blur-sm bg-opacity-80">
        <div className="px-4 py-3 md:px-6 md:py-4">
          <h2 className="text-xl font-bold text-gray-900">Home</h2>
          <p className="text-sm text-gray-500">Your personalized feed</p>
        </div>
      </div>

      {/* Compose Tweet Section */}
      <div className="border-b border-gray-200">
        <div className="p-4 md:p-6 flex gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
            You
          </div>
          <div className="flex-1">
            <textarea
              placeholder="What's happening!?"
              className="w-full text-xl placeholder-gray-500 outline-none resize-none bg-transparent"
              rows="3"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                Cancel
              </button>
              <button className="px-8 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:shadow-lg transition-all">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="max-w-2xl">
        {dummyPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
