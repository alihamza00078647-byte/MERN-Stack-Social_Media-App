import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PostContext = createContext();


export function PostContextProvider({ children }) {
  
  const navigate = useNavigate();
  const BackendURL = "http://localhost:3000"
  

  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);


  
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("authToken");

    if (token) {
      setIsAuthenticated(true);
      setToken(token);
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, [token]);


  const value = {
    token, isAuthenticated, loading, setLoading,
    BackendURL, navigate
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}