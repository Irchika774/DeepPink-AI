"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import PromptBox from "./PromptBox";
import Message from "../components/Message";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const { messages, isLoading } = useAppContext();

  return (
    <div className="bg-[var(--color-bg-main)] h-screen overflow-hidden">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#FDF2F8",
            color: "#BE185D",
            border: "1px solid #FBCFE8",
            borderRadius: "999px",
            fontWeight: 500,
          },
        }}
      />
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar expand={expand} setExpand={setExpand} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col items-center">
            {messages.length === 0 ? (
              /* Welcome Screen */
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                {/* Floating glow blob */}
                <div className="absolute w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 pointer-events-none" />

                <div className="relative flex flex-col items-center gap-4">
                  {/* Logo with shimmer ring */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 blur-md opacity-40 animate-pulse" />
                    <Image
                      src={assets.logoIcon}
                      alt="PinkSeek Logo"
                      width={80}
                      height={80}
                      className="relative rounded-full object-contain drop-shadow-xl"
                    />
                  </div>

                  <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 bg-clip-text text-transparent">
                    Hey bestie! ✨
                  </h1>
                  <p className="text-lg text-pink-600 font-medium">
                    I'm <span className="font-bold text-pink-500">PinkSeek</span>, your AI companion 🌸
                  </p>
                  <p className="text-sm text-pink-400 max-w-sm">
                    Ask me anything — code, advice, ideas, or just vibe. Let's chat! 💕
                  </p>

                  {/* Suggestion pills */}
                  <div className="flex flex-wrap justify-center gap-2 mt-2 max-w-lg">
                    {[
                      "✨ Write me a poem",
                      "💻 Help me with code",
                      "🌸 Plan my day",
                      "💡 Explain something",
                    ].map((s) => (
                      <button
                        key={s}
                        className="text-xs px-4 py-2 rounded-full border border-pink-300 bg-pink-50 text-pink-600 hover:bg-pink-100 hover:border-pink-400 transition-all duration-200 hover:scale-105"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prompt Box at bottom of welcome screen */}
                <div className="absolute bottom-6 w-full max-w-3xl px-4">
                  <PromptBox />
                  <p className="text-xs text-center mt-2 text-pink-300">
                    AI-generated, for reference only 💕
                  </p>
                </div>
              </div>
            ) : (
              /* Chat Messages */
              <div className="w-full max-w-3xl flex flex-col gap-2 pb-40">
                {messages.map((msg, i) => (
                  <Message key={i} role={msg.role} content={msg.content} />
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 text-white text-sm shadow-md shrink-0">
                      🌸
                    </div>
                    <div className="bg-pink-50 border border-pink-200 rounded-3xl px-5 py-4 flex gap-1.5 items-center">
                      <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sticky Prompt Box (when messages exist) */}
          {messages.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-2 bg-gradient-to-t from-white via-white/90 to-transparent">
              <div className="max-w-3xl mx-auto">
                <PromptBox />
                <p className="text-xs text-center mt-1 text-pink-300">
                  AI-generated, for reference only 💕
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
