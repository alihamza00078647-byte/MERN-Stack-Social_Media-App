import { Heart, MessageCircle, Share, Trash2, MapPin } from "lucide-react";
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { PostContext } from "../Context/PostContext";


// Simple "2h ago" style formatter from an ISO date string
function timeAgo(dateString) {
  const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000);
  const units = [
    { label: "y", secs: 31536000 },
    { label: "mo", secs: 2592000 },
    { label: "d", secs: 86400 },
    { label: "h", secs: 3600 },
    { label: "m", secs: 60 },
  ];
  for (const unit of units) {
    const value = Math.floor(seconds / unit.secs);
    if (value >= 1) return `${value}${unit.label}`;
  }
  return "now";
}

export function PostCard({ post }) {
  const { user, token, BackendURL } = useContext(PostContext);

  // post.userId is either a populated User object ({_id, name, ...})
  // or just a raw ObjectId string if the backend didn't .populate() it
  const author =
    post.userId && typeof post.userId === "object" ? post.userId : null;
  const authorId = author ? author._id : post.userId;
  const authorName = user?.name || "Unknown User";

  const isOwnPost = user && authorId === user.id;

  const [likes, setLikes] = useState(post.likes || []);
  const isLiked = user ? likes.includes(user.id) : false;

  const handleLike = async () => {
    // Optimistic UI update first
    const wasLiked = isLiked;
    setLikes((prev) =>
      wasLiked ? prev.filter((id) => id !== user._id) : [...prev, user._id]
    );

    try {
      const { data } = await axios.post(
        `${BackendURL}/api/data/like-post/${user.id}`,
        { headers: { token } }
      );
      if (data.success) {
        setLikes(data.likes); // sync with actual backend state
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      // rollback on failure
      setLikes((prev) =>
        wasLiked ? [...prev, user._id] : prev.filter((id) => id !== user._id)
      );
      toast.error(error.response?.data?.message || "Couldn't update like");
    }
  };


  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${BackendURL}/api/data/delete-post/${post._id}`,
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Post deleted");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Couldn't delete post");
    }
  };

  return (
    <div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
            {authorName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-gray-900">{authorName}</h3>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500 text-sm">
                {timeAgo(post.createdAt)}
              </span>
              {post.location && (
                <span className="flex items-center gap-1 text-gray-500 text-xs">
                  <MapPin size={12} />
                  {post.location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Delete button - sirf apni post pe dikhega */}
        {isOwnPost && (
          <button
            onClick={handleDelete}
            className="text-gray-500 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Content */}
      {post.content && (
        <div className="mb-3 ml-15">
          <p className="text-gray-900 text-base leading-normal whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      )}

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

      {/* Video */}
      {post.video && (
        <div className="mb-3 ml-15 rounded-2xl overflow-hidden border border-gray-200 bg-black">
          <video src={post.video} controls className="w-full max-h-96" />
        </div>
      )}

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 ml-15">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="flex text-sm text-gray-500 gap-4 mb-3 ml-15 py-2 border-t border-gray-100">
        <span className="hover:text-blue-500 cursor-pointer">
          {post.comments?.length || 0}{" "}
          <span className="hidden sm:inline">Comments</span>
        </span>
        <span className="hover:text-red-500 cursor-pointer">
          {likes.length} <span className="hidden sm:inline">Likes</span>
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-between text-gray-500 ml-15 pt-2 border-t border-gray-100">
        <button className="group flex items-center gap-2 px-3 py-2 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-colors">
          <MessageCircle size={18} />
          <span className="text-xs hidden sm:inline">Comment</span>
        </button>
        <button className="group flex items-center gap-2 px-3 py-2 rounded-full hover:bg-green-50 hover:text-green-500 transition-colors">
          <Share size={18} />
          <span className="text-xs hidden sm:inline">Share</span>
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
          <span className="text-xs hidden sm:inline">{likes.length}</span>
        </button>
      </div>
    </div>
  );
}