import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  User,
  MoreHorizontal,
  Plus,
  Settings,
} from "lucide-react";

export function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Explore", path: "/explore", icon: Search },
    { name: "Settings", path: "/settings", icon: Settings},
    // { name: "Notifications", path: "/notifications", icon: Bell, badge: true },
    { name: "Messages", path: "/messages", icon: Mail },
    { name: "Posts", path: "/posts", icon: Bookmark },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <aside className="fixed left-0 top-16 md:top-0 h-[calc(100vh-4rem)] md:h-screen w-20 md:w-64 bg-white border-r border-gray-200 flex flex-col justify-between py-6 px-3 md:px-4 shadow-sm">
      <div>
        {/* Logo */}
        <Link
          to="/"
          className="hidden md:flex items-center justify-start gap-2 px-3 mb-8 hover:opacity-80 transition-opacity"
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Social
          </span>
        </Link>

        {/* Nav Items */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group relative flex items-center justify-center md:justify-start gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                }`}
              >
                <span className="relative flex-shrink-0">
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
                  )}
                </span>
                <span
                  className={`hidden md:block text-base font-medium ${
                    isActive ? "font-semibold" : ""
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Post Button */}
        <button className="mt-8 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl py-3 md:py-4 font-bold hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
          <Plus size={22} className="md:hidden" strokeWidth={2.5} />
          <span className="hidden md:block text-lg">Compose</span>
        </button>
      </div>

      {/* Profile Card */}
      <button className="flex items-center justify-center md:justify-between gap-3 px-3 py-3 rounded-xl hover:bg-gray-100 transition-all duration-200 w-full">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            JD
          </div>
          <div className="hidden md:block text-left leading-tight min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">Jane Doe</p>
            <p className="text-xs text-gray-500 truncate">@janedoe</p>
          </div>
        </div>
        <MoreHorizontal
          size={20}
          className="hidden md:block text-gray-500 flex-shrink-0 hover:text-gray-700"
        />
      </button>
    </aside>
  );
}
