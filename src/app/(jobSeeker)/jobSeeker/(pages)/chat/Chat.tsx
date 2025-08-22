/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import toast from "react-hot-toast";


interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  jobPostId: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  senderFullName: string;
  senderEmail: string;
  senderProfilePic: string;
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  createdAt: string;
  isOnline: boolean;
  jobPostId: string;
  roomId: string
}

interface TypingIndicator {
  userId: string;
  jobPostId: string;
  timeoutId: NodeJS.Timeout;
}

export default function ChatConversation({receviedId}: { receviedId: any }) {
  const [selectedChat, setSelectedChat] = useState<ChatUser | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<TypingIndicator[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const token = Cookies.get("accessToken");
  // const [searchParams] = useSearchParams();
  // const router = useRouter();
  // const { jobSeekerId, jobPostId } = router.query; 


  console.log("🔄 Component re-rendered", {
    selectedChat,
    newMessage,
    messagesCount: messages.length,
    chatUsersCount: chatUsers.length,
    ws: ws
      ? ws.readyState === WebSocket.OPEN
        ? "OPEN"
        : "CONNECTING/CLOSED"
      : "null",
    userId,
    typingUsersCount: typingUsers.length,
  });

  // 🔍 Extract user ID from JWT on mount
  useEffect(() => {

    console.log("🔐 Access token found:", !!token);

    if (!token) {
      console.error("❌ No access token found. Cannot authenticate.");
      return;
    }

    try {
      const decoded = jwtDecode<{ id: string; role: string }>(token);
      console.log("✅ Token decoded successfully:", decoded);
      setUserId(decoded.id);
    } catch (err) {
      console.error("❌ Failed to decode JWT token:", err);
    }
  }, []);

  // 🔌 Connect to WebSocket when userId is available
  useEffect(() => {
    if (!userId) {
      console.log("⏳ Waiting for userId before connecting WebSocket...");
      return;
    }
    if (!token) {
      console.error("❌ No token found during WebSocket connection");
      return;
    }

    const socketUrl =
      process.env.NEXT_PUBLIC_VITE_WEBSOCKET_URL || "ws://localhost:5000";
    console.log("🔌 Attempting to connect WebSocket to:", socketUrl);

    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log("🟢 WebSocket connected successfully");
      console.log("📨 Sending authentication request...");
      socket.send(
        JSON.stringify({
          type: "authenticate",
          token,
        })
      );
    };

    socket.onmessage = (event) => {
      console.log("📬 Raw WebSocket message received:", event.data);

      let data;
      try {
        data = JSON.parse(event.data);

      } catch (err: any) {
        console.log(err);
        console.error(
          "❌ Failed to parse WebSocket message as JSON:",
          event.data
        );
        return;
      }

      switch (data.type) {

        case "authentication":
          console.log("✅ Authentication successful:", data.message);
          console.log("🚀 Fetching chat list...");
          fetchChatList();
          break;

        case "chat_list": {
          console.log("📋 Received chat list:", data.chatList);

          const users: ChatUser[] = data.chatList?.map((item: any) => {
            // Extract user information
            const participant = item.participants?.find(
              (p: any) => p.userId !== userId // Assuming you want to exclude the current user
            );

            return {
              id: item.id,
              name: participant?.user?.fullName || "Unknown User", // Participant's full name
              avatar: participant?.user?.profilePic || "/api/placeholder/40/40", // Profile picture or placeholder
              lastMessage: item.messages?.[0]?.message || "No messages yet", // Last message from the messages array
              timestamp: new Date(item.messages?.[0]?.createdAt || item.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              jobPostId: item.jobPostId, // jobPostId
              isOnline: item.isActive ?? false,
              roomId: item.roomId
            };
          }) || [];

          console.log("👥 Mapped chat users:", users);
          setChatUsers(users);
          break;
        }


        case "chat_history": {
          console.log("📖 Received chat history:", data.history);
          setMessages(data.history || []);

          // Auto-mark incoming unread messages as read
          const unreadIds = data.history
            ?.filter((msg: Message) => !msg.isRead && msg.senderId !== userId)
            .map((msg: Message) => msg.id);

          if (unreadIds && unreadIds.length > 0) {
            console.log("📬 Marking messages as read:", unreadIds);
            socket.send(
              JSON.stringify({
                type: "message_read",
                messageIds: unreadIds,
              })
            );
          } else {
            console.log("📭 No unread messages to mark as read.");
          }
          break;
        }

        case "message": {
          console.log("💬 Received new message:", data);
          const exists = messages.some((m) => m.id === data.id);
          if (exists) {
            console.log(
              "🔁 Message already exists, skipping duplicate:",
              data.id
            );
          } else {
            console.log("📩 Adding new message to state");
            setMessages((prev) => [...prev, data]);

            // Auto-mark as read if it's not from me
            if (data.senderId !== userId && !data.isRead) {
              console.log("👁️ Sending 'message_read' for message:", data.id);
              socket.send(
                JSON.stringify({
                  type: "message_read",
                  messageIds: [data.id],
                })
              );
            }
          }
          break;
        }

        case "typing":
          console.log(
            "🖊️ User is typing:",
            data.userId,
            "in job:",
            data.jobPostId
          );
          if (data.userId !== userId) {
            setTypingUsers((prev) => {
              const filtered = prev.filter(
                (t) =>
                  !(t.userId === data.userId && t.jobPostId === data.jobPostId)
              );

              const timeoutId = setTimeout(() => {
                console.log("⏱️ Clearing typing indicator for:", data.userId);
                setTypingUsers((innerPrev) =>
                  innerPrev.filter(
                    (t) =>
                      !(
                        t.userId === data.userId &&
                        t.jobPostId === data.jobPostId
                      )
                  )
                );
              }, 3000);

              console.log("🕒 Setting typing indicator with timeout");
              return [
                ...filtered,
                { userId: data.userId, jobPostId: data.jobPostId, timeoutId },
              ];
            });
          }
          break;

        case "stop_typing":
          console.log("🛑 User stopped typing:", data.userId);
          setTypingUsers((prev) =>
            prev.filter(
              (t) =>
                !(t.userId === data.userId && t.jobPostId === data.jobPostId)
            )
          );
          break;

        case "user_online":
          console.log("🟢 User went online:", data.userId);
          setChatUsers((prev) =>
            prev.map((u) =>
              u.id === data.userId ? { ...u, isOnline: true } : u
            )
          );
          break;

        case "user_offline":
          console.log("🔴 User went offline:", data.userId);
          setChatUsers((prev) =>
            prev.map((u) =>
              u.id === data.userId ? { ...u, isOnline: false } : u
            )
          );
          break;

        case "error":
          console.error(`🚨 WebSocket Error [${data.statusCode}]:`, data.error);
          if (data.statusCode === 401) {
            console.warn(
              "🔐 Unauthorized — clearing token and redirecting to login"
            );
            window.location.href = "/login";
          }
          break;

        default:
          console.warn("❓ Unknown message type received:", data.type, data);
      }
    };


    socket.onclose = (event) => {
      console.log("🔌 WebSocket closed", {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean,
      });
      console.log("🔁 Attempting to reconnect in 3 seconds...");
      setTimeout(() => {
        console.log("🔄 Reconnecting WebSocket...");
        // Re-trigger effect by forcing reconnection attempt
        // Note: You can improve this with a reconnect queue later
      }, 3000);
    };

    socket.onerror = (err) => {
      console.error("💥 WebSocket error event:", err);
    };

    setWs(socket);

    return () => {
      console.log("🧹 Cleaning up WebSocket connection...");
      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        socket.close();
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [userId]);

  // 📌 Auto-scroll to bottom of messages
  useEffect(() => {
    console.log("🔽 Scrolling to bottom of message list...");
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  // useEffect(() => {
  //   console.log("In the targer", jobPostId)
  //   if (ws && ws.readyState === WebSocket.OPEN) {
  //     console.log("Under the jpa")
  //     ws.send(
  //       JSON.stringify({
  //         type: "message",
  //         receiverId: jobSeekerId,
  //         jobPostId: jobPostId,
  //         message: newMessage.trim(),
  //       })
  //     )
  //   }
  // }, [jobSeekerId, jobPostId])

  // 🖊️ Handle input change and send typing indicator
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewMessage(value);
    console.log("✏️ Input changed:", value);

    if (selectedChat && ws && ws.readyState === WebSocket.OPEN) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        console.log("🗑️ Cleared previous typing timeout");
      }

      console.log("📤 Sending 'typing' event to backend");
      ws.send(
        JSON.stringify({
          type: "typing",
          receiverId: selectedChat.id,
          jobPostId: selectedChat.jobPostId,
        })
      );

      typingTimeoutRef.current = setTimeout(() => {
        console.log("🔚 Sending 'stop_typing' after 2s of inactivity");
        ws.send(
          JSON.stringify({
            type: "stop_typing",
            receiverId: selectedChat.id,
            jobPostId: selectedChat.jobPostId,
          })
        );
        typingTimeoutRef.current = null;
      }, 2000);
    }
  };

  // 🧹 Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        console.log("🧹 Cleanup: Clearing typing timeout on unmount");
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // 📋 Fetch chat list via WebSocket
  const fetchChatList = () => {
    if (!selectedChat) return;

    const { roomId } = selectedChat;

    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log("📥 Fetching chat history for room:", roomId);
      ws.send(
        JSON.stringify({
          type: "chat_history",
          roomId: roomId,
          page: 1,
          limit: 50,
        })
      );
    }
  };

  // 🧩 Handle chat selection
  const handleChatSelect = (user: ChatUser) => {
    console.log("👉 Chat selected:", user);
    setSelectedChat(user);
    setMessages([]);
    setTypingUsers([]);

    console.log("user form chat histror", user)
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log(
        "📥 Loading chat history for:",
        user.id,
        "Job:",
        user.jobPostId
      );
      ws.send(
        JSON.stringify({
          type: "chat_history",
          roomId: user.id,
          page: 1,
          limit: 50,
        })
      );
    } else {
      console.warn("⚠️ WebSocket not open. Cannot load chat history.");
    }
  };

  // 📤 Send message
  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      console.warn("❌ Cannot send empty message");
      return;
    }
    if (!selectedChat) {
      console.warn("❌ No chat selected");
      return;
    }
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.error("❌ WebSocket is not connected. Cannot send message.");
      toast.error("Not connected to chat server. Please refresh.");
      return;
    }

    const messageData = {
      type: "message",
      receiverId: selectedChat.id,
      jobPostId: selectedChat.jobPostId,
      message: newMessage.trim(),
    };

    console.log("📤 Sending message:", messageData);
    ws.send(JSON.stringify(messageData));

    // Optimistically add to UI
    const localMessage: Message = {
      id: Date.now().toString(),
      senderId: userId!,
      receiverId: selectedChat.id,
      jobPostId: selectedChat.jobPostId,
      message: newMessage.trim(),
      isRead: false,
      createdAt: new Date().toISOString(),
      senderFullName: "You",
      senderEmail: "",
      senderProfilePic: "",
    };

    console.log("💡 Adding message to UI optimistically:", localMessage);
    setMessages((prev) => [...prev, localMessage]);
    setNewMessage("");
  };

  // ⌨️ Handle Enter key to send message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("↩️ Enter pressed — sending message");
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 font-sans">
      {/* Chat List */}
      <div className="lg:w-1/3 w-full h-64 sm:h-80 lg:h-full overflow-y-auto bg-white border-b lg:border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
        </div>
        <div>
          {chatUsers.length === 0 ? (
            <p className="p-4 text-gray-500 text-sm">No chats available</p>
          ) : (
            chatUsers.map((user) => (
              <div
                key={`${user.id}-${user.jobPostId}`}
                onClick={() => handleChatSelect(user)}
                className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${selectedChat?.id === user.id &&
                  selectedChat.jobPostId === user.jobPostId
                  ? "bg-blue-50 border-l-4 border-l-blue-500"
                  : ""
                  }`}
              >
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover bg-teal-700"
                  />
                  {user.isOnline ? (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  ) : (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(user.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {user.lastMessage}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col max-h-screen">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 shadow-sm bg-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-10 h-10 rounded-full object-cover bg-teal-700"
                  />
                  {selectedChat.isOnline ? (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  ) : (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg">
                    {selectedChat.name}
                  </h3>
                </div>
              </div>
              <span className="text-sm text-gray-500 hidden sm:block">
                Job Chat
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-2 py-4 sm:px-6 bg-gray-50 space-y-2">
              {/* Typing Indicator */}
              {typingUsers.some(
                (t) => t.jobPostId === selectedChat.jobPostId
              ) && (
                  <div className="flex justify-start px-4">
                    <div className="bg-white px-4 py-2 rounded-2xl shadow-sm max-w-xs">
                      <span className="text-sm text-gray-600 italic">
                        Typing...
                      </span>
                    </div>
                  </div>
                )}

              {messages.length === 0 ? (
                <p className="text-center text-gray-500 text-sm mt-4">
                  No messages yet. Start the conversation!
                </p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"
                      }`}
                  >
                    <div
                      className={`flex items-end gap-2 max-w-xs sm:max-w-sm md:max-w-md mx-2 sm:mx-3 ${msg.senderId === userId
                        ? "flex-row-reverse"
                        : "flex-row"
                        }`}
                    >
                      {msg.senderId !== userId && (
                        <img
                          src={msg.senderProfilePic || "/api/placeholder/40/40"}
                          alt={msg.senderFullName}
                          className="w-8 h-8 rounded-full object-cover bg-teal-600"
                        />
                      )}
                      <div
                        className={`px-4 py-2 rounded-2xl text-sm ${msg.senderId === userId
                          ? "bg-green-500 text-white"
                          : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                          }`}
                      >
                        <p>{msg.message}</p>
                        <span className="text-xs opacity-80 mt-1 block">
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="w-12 h-12 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
