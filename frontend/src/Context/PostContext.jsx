import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PostContext = createContext();


export function PostContextProvider({ children }) {
  
  const navigate = useNavigate();
  const BackendURL = "http://localhost:3000"
  

  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);


  const getReelsList = async () => {
    
  }

  

  
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    
    if (token) {
      let userJsonObj = localStorage.getItem('user');
      let User = JSON.parse(userJsonObj);
      setUser(User);
      setIsAuthenticated(true);
      setToken(token);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, [token]);




  const value = {
    token, isAuthenticated, loading, setLoading,
    BackendURL, navigate, setToken, user, setUser
  };



  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}