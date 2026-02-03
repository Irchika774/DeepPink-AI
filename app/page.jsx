"use client";
import { useState } from "react";
import Image from "next/image";
import { assets } from "../assets/assets";

export default function Home() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="flex items-center justify-center h-screen bg-pink-100 text-center">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center">
          {/* Logo */}
          <Image
            src={assets.logoIcon}
            alt="DeepPink Logo"
            className="h-15 w-15 mb-4"
          />

          {/* Greeting */}
          <h1 className="text-2xl font-bold text-pink-600">
            Hey bestie! ✨
          </h1>

          <p className="mt-1 text-lg text-pink-700">
            I'm DeepPink, your AI companion.
          </p>

          <p className="mt-1 text-md text-pink-500">
            Ask me anything and let's have a lovely chat together! 🌸
          </p>
        </div>
      ) : (
        <div className="text-gray-600"> {/* Chat UI goes here later */}</div>
      )}
    </div>
  );
}