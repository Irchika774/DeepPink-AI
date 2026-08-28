"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCommentDots,
  faXmark,
  faRightFromBracket,
  faRightToBracket,
  faUser,
  faPlus,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";
import { assets } from "../assets/assets";
import { QRCodeCanvas } from "qrcode.react";
import { useAppContext } from "../context/AppContext";
import { useClerk, UserButton } from "@clerk/nextjs";
import ChatLabel from "../components/ChatLabel";

export default function Sidebar({ expand, setExpand }) {
  const { openSignIn } = useClerk();
  const {
    user,
    chats,
    chatLoading,
    createNewChat,
    selectedChatId,
    loadChat,
    renameChat,
    deleteChat,
  } = useAppContext();
  const [openMenu, setOpenMenu] = useState(null);
  const [showQR, setShowQR] = useState(false);

  return (
    <div
      className={`flex flex-col bg-[var(--color-sidebar)] transition-all duration-300 z-50 max-md:fixed max-md:h-full max-md:shadow-2xl ${
        expand ? "w-64" : "md:w-[72px] w-0 max-md:overflow-hidden"
      }`}
    >
      {/* ── Header ── */}
      <div
        className={`flex items-center gap-2 px-4 py-4 border-b border-pink-100 ${
          expand ? "justify-between" : "justify-center"
        }`}
      >
        {/* Logo */}
        {expand && (
          <Image
            src={assets.textLogo}
            alt="PinkSeek Logo"
            width={110}
            height={36}
            style={{ width: "auto", height: "auto" }}
            priority
          />
        )}
        {!expand && (
          <Image
            src={assets.logoIcon}
            alt="PinkSeek"
            width={32}
            height={32}
            style={{ width: "auto", height: "auto" }}
          />
        )}

        {/* Toggle button */}
        <button
          onClick={() => setExpand(!expand)}
          title={expand ? "Collapse" : "Expand"}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-pink-100 transition text-pink-400 hover:text-pink-600 shrink-0"
        >
          <FontAwesomeIcon
            icon={expand ? faRightToBracket : faRightFromBracket}
            className="w-4 h-4"
          />
        </button>

        {/* Mobile close */}
        <button
          onClick={() => setExpand(false)}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-pink-100 transition text-pink-400"
        >
          <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
        </button>
      </div>

      {/* ── New Chat Button ── */}
      <div className={`px-3 py-3 ${expand ? "" : "flex justify-center"}`}>
        <button
          onClick={createNewChat}
          className={`flex items-center justify-center gap-2.5 transition-all duration-200 font-semibold text-sm ${
            expand
              ? "w-full px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-xl hover:opacity-90 shadow-sm hover:shadow-pink-200 hover:shadow-md"
              : "w-10 h-10 bg-pink-50 hover:bg-pink-100 text-pink-500 rounded-xl"
          }`}
          title="New Chat"
        >
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
          {expand && <span>New Chat</span>}
        </button>
      </div>

      {/* ── Chat List ── */}
      <div className={`flex-1 overflow-hidden flex flex-col min-h-0 ${expand ? "px-3" : "hidden"}`}>
        <p className="text-[10px] font-bold uppercase tracking-widest text-pink-300 mb-2 px-1">
          Recent Chats
        </p>

        <div className="flex-1 overflow-y-auto flex flex-col gap-0.5 pr-0.5 scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent">
          {chatLoading ? (
            // Shimmer skeletons
            <div className="flex flex-col gap-2 mt-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-9 rounded-xl bg-pink-100 animate-pulse"
                  style={{ opacity: 1 - i * 0.15 }}
                />
              ))}
            </div>
          ) : chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
              <span className="text-3xl">🌸</span>
              <p className="text-xs text-pink-300 font-medium leading-relaxed">
                No chats yet.<br />Start a conversation!
              </p>
            </div>
          ) : (
            chats.map((chat) => (
              <ChatLabel
                key={chat._id}
                chat={chat}
                isSelected={selectedChatId === chat._id}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                onSelect={() => loadChat(chat._id)}
                onRename={renameChat}
                onDelete={deleteChat}
              />
            ))
          )}
        </div>
      </div>

      {/* ── Bottom Section ── */}
      <div className={`mt-auto border-t border-pink-100 px-3 py-3 flex flex-col gap-1`}>

        {/* Get App / QR */}
        <div className="relative">
          <button
            onClick={() => setShowQR(!showQR)}
            className={`flex items-center gap-2.5 w-full transition-all duration-200 rounded-xl text-pink-500 hover:bg-pink-50 ${
              expand ? "px-3 py-2.5" : "justify-center w-10 h-10 mx-auto"
            }`}
            title="Get App"
          >
            <FontAwesomeIcon icon={faMobileScreenButton} className="w-4 h-4 text-pink-400 shrink-0" />
            {expand && <span className="text-sm font-medium text-pink-600">Get App</span>}
          </button>

          {/* QR Popover */}
          {showQR && (
            <div className="absolute bottom-14 left-0 z-50 animate-fade-in">
              <div className="bg-white p-4 rounded-2xl shadow-2xl border border-pink-100 text-center w-52">
                <QRCodeCanvas
                  value="http://192.168.1.5:3000/"
                  size={130}
                  bgColor="#fff0f6"
                  fgColor="#ff1493"
                  level="H"
                />
                <p className="text-pink-500 font-semibold text-xs mt-2">
                  Scan to open PinkSeek 💕
                </p>
                <button
                  onClick={() => setShowQR(false)}
                  className="mt-2 text-[10px] text-pink-300 hover:text-pink-500 transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User / Sign In */}
        <div
          className={`flex items-center gap-2.5 transition-all duration-200 rounded-xl ${
            expand
              ? "px-3 py-2.5 hover:bg-pink-50 cursor-pointer"
              : "justify-center w-10 h-10 mx-auto hover:bg-pink-100 cursor-pointer"
          }`}
        >
          {user ? (
            <>
              <UserButton afterSignOutUrl="/" />
              {expand && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-pink-700 truncate leading-tight">
                    {user.firstName || "My Profile"}
                  </span>
                  <span className="text-[10px] text-pink-300 truncate leading-tight">
                    {user.primaryEmailAddress?.emailAddress || ""}
                  </span>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => openSignIn()}
              className={`flex items-center gap-2.5 w-full ${expand ? "" : "justify-center"}`}
            >
              <FontAwesomeIcon
                icon={faUser}
                className="w-5 h-5 text-pink-400 hover:text-pink-600 transition shrink-0"
              />
              {expand && (
                <span className="text-sm text-pink-500 font-medium hover:text-pink-700 transition">
                  Sign In
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}