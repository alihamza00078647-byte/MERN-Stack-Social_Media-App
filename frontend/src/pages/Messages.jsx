import { Search, Send } from "lucide-react";
import { useState } from "react";

function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);

  const chats = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "SJ",
      lastMessage: "That sounds great! Let's catch up soon.",
      timestamp: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      name: "Alex Chen",
      avatar: "AC",
      lastMessage: "Did you see the new React update?",
      timestamp: "4 hours ago",
      unread: false,
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "ED",
      lastMessage: "The design looks amazing! Great work.",
      timestamp: "6 hours ago",
      unread: false,
    },
    {
      id: 4,
      name: "Michael Brown",
      avatar: "MB",
      lastMessage: "Let me know when you're available.",
      timestamp: "1 day ago",
      unread: false,
    },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Chat List */}
      <div className="w-full md:w-80 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="sticky top-16 md:top-0 z-40 bg-white border-b border-gray-200 p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Messages</h2>
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search chats..."
              className="bg-transparent ml-2 outline-none w-full text-sm placeholder-gray-500"
            />
          </div>
        </div>

        {/* Chat Items */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`border-b border-gray-100 p-3 cursor-pointer transition-colors ${
                selectedChat === chat.id ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {chat.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p
                      className={`text-sm font-${chat.unread ? "bold" : "semibold"} text-gray-900`}
                    >
                      {chat.name}
                    </p>
                    <span className="text-xs text-gray-500">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="hidden md:flex flex-1 flex-col bg-white">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="border-b border-gray-200 p-4 sticky top-16 md:top-0 z-40 bg-white">
              {(() => {
                const chat = chats.find((c) => c.id === selectedChat);
                return (
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {chat.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{chat.name}</p>
                      <p className="text-xs text-gray-500">Online</p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-2 max-w-xs">
                  <p className="text-sm text-gray-900">
                    Hey! How are you doing?
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-xs">
                  <p className="text-sm">I'm doing great! How about you?</p>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4 sticky bottom-0 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Write a message..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none text-sm placeholder-gray-500 focus:bg-gray-100"
                />
                <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-lg">
                Select a chat to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
