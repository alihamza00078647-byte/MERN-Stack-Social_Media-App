import { useContext, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Settings from "./pages/Settings";
import Explore from "./pages/Explore";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PostContext } from "./Context/PostContext";
import { Loadings } from "./components/Loading";

function App() {
  const {token, isAuthenticated, loading} = useContext(PostContext);


  if (loading) {
    return (
      <Loadings />
    );
  }

  
  // Show login/register pages for unauthenticated users
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 md:ml-64 border-l border-gray-200">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/notifications" element={<Home />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Right Sidebar (Optional - for trends/recommendations) */}
        <aside className="hidden xl:block w-80 border-l border-gray-200 bg-gray-50 p-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-20">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Trending Now
            </h3>
            <div className="space-y-4">
              {["#ReactJS", "#WebDevelopment", "#JavaScript", "#FrontEnd"].map(
                (trend, i) => (
                  <div
                    key={i}
                    className="py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <p className="text-sm text-gray-500">{trend}</p>
                    <p className="text-base font-bold text-gray-900">
                      {trend
                        .replace("#", "")
                        .split(/(?=[A-Z])/)
                        .join(" ")}
                    </p>
                    <p className="text-sm text-gray-500">124.5K Posts</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default App;
