"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const { user } = useUser();

  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  // Fetch all chats when user logs in
  const fetchChats = useCallback(async () => {
    if (!user) return;
    try {
      setChatLoading(true);
      const { data } = await axios.get("/api/chat/get");
      if (data.success) {
        setChats(data.chats);
        // Auto-select first chat
        if (data.chats.length > 0 && !selectedChatId) {
          setSelectedChatId(data.chats[0]._id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    } finally {
      setChatLoading(false);
    }
  }, [user, selectedChatId]);

  // Create a brand new chat
  const createNewChat = async () => {
    if (!user) {
      toast.error("Please sign in first 💕");
      return;
    }
    try {
      const { data } = await axios.post("/api/chat/create");
      if (data.success) {
        const newChat = { _id: data.chatId, name: "New Chat 💕" };
        setChats((prev) => [newChat, ...prev]);
        setSelectedChatId(data.chatId);
        setMessages([]);
        toast.success("New chat created! 🌸");
      }
    } catch {
      toast.error("Couldn't create chat 😢");
    }
  };

  // Load messages when selectedChatId changes
  const loadChat = async (chatId) => {
    setSelectedChatId(chatId);
    setMessages([]);
    try {
      const { data } = await axios.get(`/api/chat/messages?chatId=${chatId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch {
      // Messages are returned from the AI route; initial load could be empty
    }
  };

  // Send a message to AI
  const sendMessage = async (prompt) => {
    if (!user) {
      toast.error("Please sign in to chat 💕");
      return;
    }
    if (!prompt.trim()) return;

    let activeChatId = selectedChatId;

    // Auto-create chat if none selected
    if (!activeChatId) {
      try {
        const { data } = await axios.post("/api/chat/create");
        if (data.success) {
          activeChatId = data.chatId;
          const newChat = { _id: data.chatId, name: "New Chat 💕" };
          setChats((prev) => [newChat, ...prev]);
          setSelectedChatId(data.chatId);
        }
      } catch {
        toast.error("Couldn't start a chat 😢");
        return;
      }
    }

    // Optimistically add user message
    const userMsg = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const { data } = await axios.post("/api/chat/ai", {
        chatId: activeChatId,
        prompt,
      });

      if (data.success) {
        const aiMsg = { role: "assistant", content: data.reply };
        setMessages((prev) => [...prev, aiMsg]);

        // Update chat name in sidebar if it changed
        if (data.chatName) {
          setChats((prev) =>
            prev.map((c) =>
              c._id === activeChatId ? { ...c, name: data.chatName } : c
            )
          );
        }
      }
    } catch {
      toast.error("AI is taking a break 😅 Try again!");
      // Remove the optimistic user message on error
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  // Rename a chat
  const renameChat = async (chatId, name) => {
    try {
      const { data } = await axios.put("/api/chat/rename", { chatId, name });
      if (data.success) {
        setChats((prev) =>
          prev.map((c) => (c._id === chatId ? { ...c, name: data.name } : c))
        );
        toast.success("Chat renamed 🌸");
      }
    } catch {
      toast.error("Rename failed 😢");
    }
  };

  // Delete a chat
  const deleteChat = async (chatId) => {
    try {
      const { data } = await axios.delete(`/api/chat/delete?chatId=${chatId}`);
      if (data.success) {
        setChats((prev) => prev.filter((c) => c._id !== chatId));
        if (selectedChatId === chatId) {
          setSelectedChatId(null);
          setMessages([]);
        }
        toast.success("Chat deleted 🗑️");
      }
    } catch {
      toast.error("Delete failed 😢");
    }
  };

  useEffect(() => {
    if (user) {
      fetchChats();
    } else {
      setChats([]);
      setSelectedChatId(null);
      setMessages([]);
    }
  }, [user, fetchChats]);

  const value = {
    user,
    chats,
    selectedChatId,
    messages,
    isLoading,
    chatLoading,
    setSelectedChatId,
    fetchChats,
    createNewChat,
    loadChat,
    sendMessage,
    renameChat,
    deleteChat,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
