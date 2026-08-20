import { ChevronRight, Moon, Bell, Lock, Eye } from "lucide-react";
import { useContext, useState } from "react";
import { PostContext } from "../Context/PostContext";
import toast from "react-hot-toast";

function Settings() {

  const {token, setToken, navigate} = useContext(PostContext);


  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const logout = async () => {
    if (token) {
      setToken('');
      localStorage.removeItem('token');
      navigate('/login');
      toast.success("Logout Successfully");
    } else {
      console.log("Token Error", token);
    }
  }

  
  const settingsGroups = [
    {
      title: "Appearance",
      items: [
        {
          icon: <Moon size={20} />,
          label: "Dark Mode",
          description: "Use dark theme for the app",
          toggle: true,
          state: darkMode,
          setState: setDarkMode,
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          icon: <Bell size={20} />,
          label: "Enable Notifications",
          description: "Receive notifications from followed accounts",
          toggle: true,
          state: notifications,
          setState: setNotifications,
        },
      ],
    },
    {
      title: "Privacy & Security",
      items: [
        {
          icon: <Lock size={20} />,
          label: "Account Privacy",
          description: "Make account private to approve followers",
          clickable: true,
        },
        {
          icon: <Eye size={20} />,
          label: "Blocked Users",
          description: "Manage blocked users",
          clickable: true,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col max-w-2xl">
      {/* Header */}
      <div className="sticky top-16 md:top-0 z-40 bg-white border-b border-gray-200">
        <div className="px-4 py-3 md:px-6 md:py-4">
          <h2 className="text-xl font-bold text-gray-900">Settings</h2>
          <p className="text-sm text-gray-500">
            Manage your account and preferences
          </p>
        </div>
      </div>

      {/* Settings Content */}
      <div className="bg-white">
        {settingsGroups.map((group, idx) => (
          <div key={idx} className="border-b border-gray-200 last:border-b-0">
            {/* Group Title */}
            <div className="px-4 py-4 md:px-6 bg-gray-50 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">{group.title}</h3>
            </div>

            {/* Group Items */}
            <div>
              {group.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className={`flex items-center justify-between px-4 py-4 md:px-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${
                    item.clickable ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-gray-500">{item.icon}</div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {item.toggle && (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.state}
                        onChange={(e) => item.setState(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500" />
                    </label>
                  )}

                  {item.clickable && (
                    <ChevronRight size={20} className="text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Account Section */}
        <div className="border-t border-gray-200">
          <div className="px-4 py-4 md:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="font-bold text-gray-900">Account</h3>
          </div>
          <div className="p-4 md:p-6">
            <button onClick={logout} className="w-full px-4 py-2 rounded-full border-2 border-red-500 text-red-600 font-semibold hover:bg-red-50 transition-colors">
              Logout
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              You'll be logged out of all devices
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="px-4 py-6 md:px-6 text-center text-sm text-gray-500">
          <p>SocialHub v1.0</p>
          <p className="mt-2">Made with ❤️</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
