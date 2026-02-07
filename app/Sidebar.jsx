"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCommentDots, faXmark,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { assets } from "../assets/assets"; // ✅ make sure assets.textLogo and assets.logoIcon are valid imports

export default function Header() {
  const [expand, setExpand] = useState(false);

  return (
    <div className={`flex flex-col justify-between bg-[var(--color-sidebar)] pt-7 transition-all z-50 max-md:h-screen ${expand ? "p-4 w-64" : " md:w-20 w-0 max-md:overflow-hidden"}`}>
        <div>
        <div className={`flex ${expand ?"flex-row gap -10":"flex-col items-center gap-8"}`} >
          
      {/* Logo */}
      <Image
         className={expand ? "w-36" : "w-10"} 
        src={expand ? assets.textLogo : assets.logoIcon}
        alt="DeepPink Logo"
        width={60}
        height={60}
        style={{ width: "auto", height: "auto" }}
      />
      <div>
      {/* Mobile toggle (hamburger / close) */}
      <div>
        
        {/* Sidebar toggle (hamburger) */}
      <FontAwesomeIcon
        icon={faBars}
        style={{ color: "deeppink" }}
        className="md:hidden"
        onClick={() => setExpand(!expand)}
      />

      {/* Toggle between Xmark and Bars depending on expand */}
      <div>
      <FontAwesomeIcon
        icon={expand ? faXmark : faRightFromBracket}
        alt="DeepPink Logo"
        className="hidden md:block w-1"
        style={{  color: "deeppink" }}
      />
      </div>
      </div>
      

      </div>

      {/* Desktop comment icon */}
      <div>
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ color: "deeppink" }}
          className="hidden md:block w-7 cursor-pointer"
          onClick={() => setExpand(!expand)}
        />
      </div>
      </div>
      </div>
    </div>
  );
}