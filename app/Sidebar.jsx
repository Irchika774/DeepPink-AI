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
} from "@fortawesome/free-solid-svg-icons";
import { FaPhone } from "react-icons/fa";
import { assets } from "../assets/assets";
import { QRCodeCanvas } from "qrcode.react";

export default function Header() {
  const [expand, setExpand] = useState(false);

  return (
    <div
      className={`flex flex-col bg-[var(--color-sidebar)] pt-6 transition-all z-50 max-md:h-screen ${
        expand ? "p-4 w-64" : "md:w-20 w-0 max-md:overflow-hidden"
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-8">
        <Image
          className={expand ? "w-32" : "w-12"}
          src={expand ? assets.textLogo : assets.logoIcon}
          alt="DeepPink Logo"
          width={60}
          height={60}
          style={{ width: "auto", height: "auto" }}
        />
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col items-center gap-6 flex-grow">
        {/* Mobile Toggle */}
        <FontAwesomeIcon
          icon={expand ? faXmark : faBars}
          style={{ color: "deeppink" }}
          className="md:hidden w-6 h-6 cursor-pointer"
          onClick={() => setExpand(!expand)}
        />

        {/* Expand/Collapse Sidebar (Desktop) */}
        <div
          onClick={() => setExpand(!expand)}
          className="group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 rounded-lg cursor-pointer"
        >
          <FontAwesomeIcon
            icon={expand ? faRightToBracket : faRightFromBracket}
            className="hidden md:block w-6 h-6"
            style={{ color: "#FF1493" }}
          />
          <div
            className={`absolute w-max ${
              expand ? "left-1/2 -translate-x-1/2 top-12" : "-top-12 left-0"
            } opacity-0 group-hover:opacity-100 transition bg-pink-500 text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}
          >
            {expand ? "Close Sidebar" : "Open Sidebar"}
            <div
              className={`w-3 h-3 absolute bg-pink-500 rotate-45 ${
                expand
                  ? "left-1/2 -translate-x-1/2 top-1.5"
                  : "left-4 -bottom-1.5"
              }`}
            ></div>
          </div>
        </div>

        {/* New Chat Button */}
        <button
          className={`flex items-center justify-center cursor-pointer ${
            expand
              ? "bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max"
              : "group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg"
          }`}
        >
          <FontAwesomeIcon
            icon={faCommentDots}
            className={`${
              expand ? "w-7 h-7 text-pink-300" : "w-6 h-6 text-pink-600"
            }`}
          />
          <div
            className="absolute w-max -top-12 -right-12 opacity-0
                       group-hover:opacity-100 transition bg-pink-500 text-white text-sm px-3 py-2 
                       rounded-lg shadow-lg pointer-events-none"
          >
            New Chat
            <div className="w-3 h-3 absolute bg-pink-500 rotate-45 left-4 -bottom-1.5"></div>
          </div>
          {expand && <p className="text-white text-sm">New chat</p>}
        </button>

        <div className={`mt-8 text-white/25 text-sm ${expand ? "block" : "hidden"}`}>
            <p className='my-1'>Recents</p>
        </div>
      </div>
      <div>
          <div
             className={`flex items-center cursor-pointer group relative ${
                expand
                   ? "gap-1 text-white/80 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10 cursor-pointer"
                    : "h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg"
                  }`}
>
            {/* Phone icon */}
             <FaPhone
               className={`transition-all duration-300 ${
               expand
              ? "w-5 h-5 text-pink-300"
               : "w-6 h-6 mx-auto text-pink-400 group-hover:text-pink-500 group-hover:scale-110"
                }`}
              />
                

    {/* QR Tooltip (Only visible on hover when collapsed) */}
    {expand && (
      <div
          className={`absolute -top-60 pb-8 ${
            !expand ? "-right-40" : ""
         } opacity-0 group-hover:opacity-100 hidden group-hover:block transition`}
      >
          <div className="relative bg-pink-50 p-5 rounded-2xl shadow-xl border border-pink-200 text-center">

            <p className="text-pink-500 font-semibold mt-3 transition">
                Get App 💕
            </p>

          
          <QRCodeCanvas
            value="http://192.168.1.5:3000/"
            size={140}
            bgColor="#fff0f6"
            fgColor="#ff1493"
            level="H"
          />

          <p className="text-pink-600 font-semibold mt-3 text-sm">
            Scan to get PinkSeek App 💕
          </p>

          {/* Arrow */}
          <div className="w-3 h-3 absolute bg-pink-50 rotate-45 right-[-6px] bottom-4 border-r border-b border-pink-200"></div>
        </div>
      </div>
    )}

           </div>
      </div>
      <div
        className={`flex items-center ${
        expand ? "hover:bg-white/10 rounded-lg" : "justify-center w-full"
        } gap-3 text-white/70 text-sm p-2 mt-2 cursor-pointer transition-all duration-300 group`}
      >
          <FontAwesomeIcon
           icon={faUser}
            className={`transition-all duration-300 ${
              expand
              ? "w-5 h-5 text-pink-300"
              : "w-6 h-6 text-pink-400 group-hover:text-pink-500 group-hover:scale-110"
          }`}
          />

          {expand && (
            <span className="text-pink-300 group-hover:text-pink-200 transition">
              My Profile
             </span>
             )}
        </div>
        </div>
     );
}