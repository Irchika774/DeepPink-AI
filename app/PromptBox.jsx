"use client";

import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faSearch,
  faArrowUp,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../context/AppContext";
import { useClerk } from "@clerk/nextjs";

const PromptBox = () => {
  const [prompt, setPrompt] = React.useState("");
  const textareaRef = useRef(null);
  const { sendMessage, isLoading, user } = useAppContext();
  const { openSignIn } = useClerk();

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 180) + "px";
  }, [prompt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    if (!user) {
      openSignIn();
      return;
    }

    const text = prompt;
    setPrompt("");
    await sendMessage(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white border border-pink-200 shadow-lg shadow-pink-100 rounded-3xl px-5 pt-4 pb-3 transition-all duration-300 hover:border-pink-300 hover:shadow-pink-200"
    >
      <textarea
        ref={textareaRef}
        className="outline-none w-full resize-none bg-transparent text-pink-900 placeholder-pink-300 text-sm leading-relaxed min-h-[24px] max-h-[180px] overflow-y-auto"
        placeholder="Message PinkSeek... 🌸"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        disabled={isLoading}
      />

      <div className="flex items-center justify-between mt-3">
        {/* Left actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs border border-pink-200 px-3 py-1.5 rounded-full cursor-pointer hover:bg-pink-50 transition text-pink-600 font-medium"
          >
            <FontAwesomeIcon icon={faBrain} className="text-pink-400 text-xs" />
            DeepThink
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs border border-pink-200 px-3 py-1.5 rounded-full cursor-pointer hover:bg-pink-50 transition text-pink-600 font-medium"
          >
            <FontAwesomeIcon icon={faSearch} className="text-pink-400 text-xs" />
            Search
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-pink-50 text-pink-300 hover:text-pink-400 transition"
          >
            <FontAwesomeIcon icon={faPaperclip} className="text-sm" />
          </button>

          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className={`h-9 w-9 flex items-center justify-center rounded-full transition-all duration-200 ${
              prompt.trim() && !isLoading
                ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md hover:scale-105 hover:shadow-pink-300"
                : "bg-pink-100 text-pink-300 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-pink-300 border-t-white rounded-full animate-spin" />
            ) : (
              <FontAwesomeIcon icon={faArrowUp} className="text-sm" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PromptBox;
