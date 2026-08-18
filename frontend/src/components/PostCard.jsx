import { Heart, MessageCircle, Share, Trash2 } from "lucide-react";
import { useState } from "react";

export function PostCard({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    if (!isLiked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
            {post.author.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900">{post.author.name}</h3>
              <span className="text-gray-500">@{post.author.handle}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500 text-sm">{post.timestamp}</span>
            </div>
            {post.author.verified && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full ml-0">
                ✓ Verified
              </span>
            )}
          </div>
        </div>
        <button className="text-gray-500 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
          <Trash2 size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="mb-3 ml-15">
        <p className="text-gray-900 text-base leading-normal">{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="mb-3 ml-15 rounded-2xl overflow-hidden border border-gray-200">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
          />
        </div>
      )}

      {/* Stats */}
      <div className="flex text-sm text-gray-500 gap-4 mb-3 ml-15 py-2 border-t border-gray-100">
        <span className="hover:text-blue-500 cursor-pointer">
          {post.replies} <span className="hidden sm:inline">Replies</span>
        </span>
        <span className="hover:text-blue-500 cursor-pointer">
          {post.reposts} <span className="hidden sm:inline">Reposts</span>
        </span>
        <span className="hover:text-blue-500 cursor-pointer">
          {likes} <span className="hidden sm:inline">Likes</span>
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-between text-gray-500 ml-15 pt-2 border-t border-gray-100">
        <button className="group flex items-center gap-2 px-3 py-2 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-colors">
          <MessageCircle size={18} />
          <span className="text-xs hidden sm:inline">Reply</span>
        </button>
        <button className="group flex items-center gap-2 px-3 py-2 rounded-full hover:bg-green-50 hover:text-green-500 transition-colors">
          <Share size={18} />
          <span className="text-xs hidden sm:inline">Repost</span>
        </button>
        <button
          onClick={handleLike}
          className={`group flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${
            isLiked
              ? "text-red-500 bg-red-50"
              : "hover:bg-red-50 hover:text-red-500"
          }`}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          <span className="text-xs hidden sm:inline">{likes}</span>
        </button>
        <button className="group flex items-center gap-2 px-3 py-2 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-colors">
          <Share size={18} />
        </button>
      </div>
    </div>
  );
}
