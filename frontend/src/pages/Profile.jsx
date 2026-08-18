import { Link } from "react-router-dom";
import { MapPin, Link as LinkIcon, Calendar } from "lucide-react";
import { PostCard } from "../components/PostCard";

function Profile() {
  const userPosts = [
    {
      id: 1,
      author: {
        name: "Jane Doe",
        handle: "janedoe",
        avatar: "JD",
        verified: true,
      },
      content: "Excited to share my latest project with everyone! 🚀",
      image: null,
      replies: 45,
      reposts: 123,
      likes: 512,
      timestamp: "2 days ago",
    },
    {
      id: 2,
      author: {
        name: "Jane Doe",
        handle: "janedoe",
        avatar: "JD",
        verified: true,
      },
      content: "Web development is an art form. Every pixel matters.",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
      replies: 89,
      reposts: 234,
      likes: 876,
      timestamp: "5 days ago",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        <button className="absolute top-4 right-4 px-4 py-2 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-500 transition-all">
          Edit Profile
        </button>
      </div>

      {/* Profile Info */}
      <div className="border-b border-gray-200 pb-4 px-4 md:px-6">
        {/* Avatar and Header */}
        <div className="flex justify-between items-start -mt-16 mb-4">
          <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white">
            JD
          </div>
        </div>

        {/* User Info */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Jane Doe</h1>
          <p className="text-gray-500">@janedoe</p>
          {
            <p className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full w-fit mt-2">
              ✓ Verified
            </p>
          }
        </div>

        {/* Bio */}
        <p className="text-gray-700 mb-4">
          Full-stack developer | React enthusiast | Coffee addict ☕ | Building
          cool stuff on the web
        </p>

        {/* Location, Link, Join Date */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>San Francisco, CA</span>
          </div>
          <div className="flex items-center gap-1">
            <LinkIcon size={16} />
            <a
              href="https://janedoe.dev"
              className="text-blue-500 hover:underline"
            >
              janedoe.dev
            </a>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>Joined March 2023</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 text-sm">
          <div className="hover:cursor-pointer">
            <span className="font-bold text-gray-900">1,234</span>
            <span className="text-gray-500 ml-1">Following</span>
          </div>
          <div className="hover:cursor-pointer">
            <span className="font-bold text-gray-900">45.2K</span>
            <span className="text-gray-500 ml-1">Followers</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 md:top-0 z-40 bg-white border-b border-gray-200 flex">
        <button className="flex-1 px-4 py-3 text-center font-semibold text-gray-900 border-b-2 border-blue-500 hover:bg-gray-50 transition-colors">
          Posts
        </button>
        <button className="flex-1 px-4 py-3 text-center font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
          Replies
        </button>
        <button className="flex-1 px-4 py-3 text-center font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
          Media
        </button>
        <button className="flex-1 px-4 py-3 text-center font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
          Likes
        </button>
      </div>

      {/* User Posts */}
      <div className="max-w-2xl">
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
