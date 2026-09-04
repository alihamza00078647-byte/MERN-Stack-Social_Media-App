import axios from "axios";
import { PostCard } from "../components/PostCard";
import { PostContext } from "../Context/PostContext";
import toast from "react-hot-toast";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../API/API";
import { Loading } from "../components/Loading.jsx";


function Home() {
  const { token } = useContext(PostContext);

  const {data: posts, isFetching, isError, error} = useQuery({
    queryKey: ['posts', token], //useState
    queryFn: () => fetchPosts(token), //useEffect
    enabled: !!token, // jab tak token na aaye, request fire hi na ho
  });

  // return loading state
  if (isFetching) return <Loading />;
  
  // return if error state
  if (isError)
    return (
      <p className="text-center text-red-500 mt-5">
        Error: {error.message}
        {toast.error(error.message)}
      </p>
    );


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
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
