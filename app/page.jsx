"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { assets } from "../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCommentDots } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);

  return (
    <div className="bg-[var(--color-bg-main)] h-screen">
      <div className="flex h-full">
        
        {/* ================= Sidebar ================= */}
        <Sidebar expand={expand} setExpand={setExpand} />

        {/* ================= Main Content ================= */}
        <div className="flex-1 bg-pink-100 flex items-center justify-center p-6 text-center">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center">
              {/* Logo */}
              <Image
                src={assets.logoIcon}
                alt="DeepPink Logo"
                width={60}   // ✅ smaller size
                height={60}
                className="mb-4 object-contain"
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
            <div className="text-gray-600">
              {/* Chat UI goes here later */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}