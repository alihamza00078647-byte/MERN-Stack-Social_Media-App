import axios from "axios";
import { useContext } from "react";
import { PostContext } from "../Context/PostContext";

// api
export const api = axios.create({
  baseURL: "http://localhost:3000",
});

// fetch-post function ( axios auto. use tanstack query )
export const fetchPosts = async (token) => {
  const { data } = await api.get("/api/data/posts", {
    headers: { token },
  });

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch posts");
  }
  return data.posts;
};


//POST the post details
 
