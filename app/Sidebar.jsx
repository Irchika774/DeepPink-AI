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
} from "@fortawesome/free-solid-svg-icons";
import { FaPhone } from "react-icons/fa";
import { assets } from "../assets/assets";
import { QRCodeCanvas } from "qrcode.react";
import { useAppContext } from "../context/AppContext";
import { useClerk, UserButton } from "@clerk/nextjs";
import ChatLabel from "../components/ChatLabel";

export default function Sidebar({ expand, setExpand }) {
  const { openSignIn } = useClerk();
  const { user, chats, chatLoading, createNewChat, selectedChatId, loadChat, renameChat, deleteChat } = useAppContext();
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div
      className={`flex flex-col bg-[var(--color-sidebar)] pt-5 transition-all duration-300 z-50 max-md:fixed max-md:h-full max-md:shadow-2xl ${
        expand ? "p-4 w-64" : "md:w-[72px] w-0 max-md:overflow-hidden"
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center mb-6 ${expand ? "justify-start px-1" : "justify-center"}`}>
        <Image
          className={expand ? "w-28" : "w-10"}
          src={expand ? assets.textLogo : assets.logoIcon}
          alt="PinkSeek Logo"
          width={120}
          height={40}
          style={{ width: "auto", height: "auto" }}
        />
      </div>

      {/* Top Nav */}
      <div className="flex flex-col items-center gap-2 flex-grow">
        {/* Mobile close */}
        <FontAwesomeIcon
          icon={faXmark}
          style={{ color: "deeppink" }}
          className="md:hidden w-6 h-6 cursor-pointer self-end mb-2"
          onClick={() => setExpand(false)}
        />

        {/* Toggle Sidebar */}
        <div
          onClick={() => setExpand(!expand)}
          className="group relative flex items-center justify-center hover:bg-pink-100 transition-all duration-300 h-10 w-10 rounded-xl cursor-pointer"
          title={expand ? "Close Sidebar" : "Open Sidebar"}
        >
          <FontAwesomeIcon
            icon={expand ? faRightToBracket : faRightFromBracket}
            className="hidden md:block w-5 h-5 text-pink-400"
          />
          {/* Mobile bars */}
          <FontAwesomeIcon
            icon={faBars}
            className="md:hidden w-5 h-5 text-pink-400"
          />
          <div className={`absolute w-max ${expand ? "left-12 top-2" : "left-12 top-2"} opacity-0 group-hover:opacity-100 transition bg-pink-500 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-lg pointer-events-none whitespace-nowrap`}>
            {expand ? "Close Sidebar" : "Open Sidebar"}
          </div>
        </div>

        {/* New Chat */}
        <button
          onClick={createNewChat}
          className={`group relative flex items-center justify-center transition-all duration-300 cursor-pointer ${
            expand
              ? "w-full gap-2.5 px-3 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-2xl hover:opacity-90 shadow-md hover:shadow-pink-300"
              : "h-10 w-10 hover:bg-pink-100 rounded-xl"
          }`}
        >
          <FontAwesomeIcon
            icon={expand ? faPlus : faCommentDots}
            className={expand ? "w-4 h-4" : "w-5 h-5 text-pink-500"}
          />
          {expand && <span className="text-sm font-semibold">New chat</span>}
          {!expand && (
            <div className="absolute left-12 top-2 w-max opacity-0 group-hover:opacity-100 transition bg-pink-500 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-lg pointer-events-none">
              New Chat
            </div>
          )}
        </button>

        {/* Recents */}
        <div className={`w-full mt-4 ${expand ? "block" : "hidden"}`}>
          <p className="text-xs text-pink-300 font-semibold uppercase tracking-wider mb-2 px-1">
            Recents
          </p>

          {chatLoading ? (
            // Shimmer placeholder
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-9 rounded-xl bg-pink-100 animate-pulse" />
              ))}
            </div>
          ) : chats.length === 0 ? (
            <p className="text-xs text-pink-300 text-center mt-4">
              No chats yet 🌸<br />Start a conversation!
            </p>
          ) : (
            <div className="flex flex-col gap-1 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
              {chats.map((chat) => (
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
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col gap-1 mt-4 pb-1">
        {/* Get App / QR Code */}
        <div
          className={`group relative flex items-center cursor-pointer transition-all duration-300 ${
            expand
              ? "gap-2 text-pink-600 text-sm p-2.5 border border-pink-200 rounded-xl hover:bg-pink-50"
              : "h-10 w-10 mx-auto justify-center hover:bg-pink-100 rounded-xl"
          }`}
        >
          <FaPhone className="w-4 h-4 text-pink-400 shrink-0" />
          {expand && <span className="text-sm text-pink-600">Get App</span>}

          {/* QR Tooltip */}
          <div className="absolute bottom-14 left-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300">
            <div className="bg-white p-4 rounded-2xl shadow-2xl border border-pink-200 text-center w-52">
              <QRCodeCanvas
                value="http://192.168.1.5:3000/"
                size={130}
                bgColor="#fff0f6"
                fgColor="#ff1493"
                level="H"
              />
              <p className="text-pink-500 font-semibold text-xs mt-2">Scan to open PinkSeek 💕</p>
            </div>
          </div>
        </div>

        {/* User / Sign In */}
        <div
          className={`flex items-center transition-all duration-300 ${
            expand
              ? "gap-2.5 p-2.5 hover:bg-pink-50 rounded-xl cursor-pointer"
              : "justify-center h-10 w-10 mx-auto hover:bg-pink-100 rounded-xl cursor-pointer"
          }`}
        >
          {user ? (
            <>
              <UserButton afterSignOutUrl="/" />
              {expand && (
                <span className="text-sm text-pink-600 font-medium truncate">
                  {user.firstName || "My Profile"}
                </span>
              )}
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faUser}
                onClick={() => openSignIn()}
                className="w-5 h-5 text-pink-400 hover:text-pink-600 transition"
              />
              {expand && (
                <span
                  onClick={() => openSignIn()}
                  className="text-sm text-pink-500 font-medium cursor-pointer hover:text-pink-700 transition"
                >
                  Sign In
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}