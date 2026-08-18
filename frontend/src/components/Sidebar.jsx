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
} from "lucide-react";

export function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Explore", path: "/explore", icon: Search },
    { name: "Notifications", path: "/notifications", icon: Bell, badge: true },
    { name: "Messages", path: "/messages", icon: Mail },
    { name: "Bookmarks", path: "/bookmarks", icon: Bookmark },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-white border-r border-black/10 flex flex-col justify-between py-6 px-3 md:px-4">
      <div>
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center md:justify-start gap-2 px-2 mb-8"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 29 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585"
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="hidden md:block text-lg font-semibold tracking-tight text-black">
            SocialSphere
          </span>
        </Link>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group relative flex items-center justify-center md:justify-start gap-4 px-3 py-3 rounded-full transition-colors duration-200 ${
                  isActive
                    ? "bg-black text-white"
                    : "text-black hover:bg-black/5"
                }`}
              >
                <span className="relative">
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.4 : 2}
                    className="shrink-0"
                  />
                  {item.badge && (
                    <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-black ring-2 ring-white group-hover:ring-white" />
                  )}
                </span>
                <span
                  className={`hidden md:block text-base ${isActive ? "font-semibold" : "font-normal"}`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Post Button */}
        <button className="mt-6 w-full flex items-center justify-center gap-2 bg-black text-white rounded-full py-3 md:py-3.5 font-semibold hover:bg-black/85 transition-colors duration-200">
          <Plus size={20} className="md:hidden" strokeWidth={2.5} />
          <span className="hidden md:block">Post</span>
        </button>
      </div>

      {/* Profile Card */}
      <button className="flex items-center justify-center md:justify-between gap-3 px-2 py-2 rounded-full hover:bg-black/5 transition-colors duration-200">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-black flex items-center justify-center text-white text-sm font-semibold shrink-0">
            JD
          </div>
          <div className="hidden md:block text-left leading-tight">
            <p className="text-sm font-semibold text-black">Jane Doe</p>
            <p className="text-xs text-black/50">@janedoe</p>
          </div>
        </div>
        <MoreHorizontal size={18} className="hidden md:block text-black/50" />
      </button>
    </aside>
  );
}