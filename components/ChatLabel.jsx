"use client";

import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPen,
  faTrash,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const ChatLabel = ({ chat, isSelected, openMenu, setOpenMenu, onSelect, onRename, onDelete }) => {
  const isOpen = openMenu === chat._id;
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(chat.name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  const handleRenameSubmit = async () => {
    if (renameValue.trim() && renameValue.trim() !== chat.name) {
      await onRename(chat._id, renameValue.trim());
    }
    setIsRenaming(false);
    setOpenMenu(null);
  };

  const handleRenameKeyDown = (e) => {
    if (e.key === "Enter") handleRenameSubmit();
    if (e.key === "Escape") {
      setRenameValue(chat.name);
      setIsRenaming(false);
    }
  };

  return (
    <div
      onClick={() => !isRenaming && onSelect()}
      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
        isSelected
          ? "bg-pink-100 text-pink-700"
          : "text-pink-500 hover:bg-pink-50"
      }`}
    >
      {isRenaming ? (
        <div className="flex items-center gap-1 flex-1" onClick={(e) => e.stopPropagation()}>
          <input
            ref={inputRef}
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={handleRenameKeyDown}
            className="flex-1 text-sm bg-white border border-pink-300 rounded-lg px-2 py-0.5 outline-none focus:border-pink-500 text-pink-800"
          />
          <button
            onClick={handleRenameSubmit}
            className="h-6 w-6 flex items-center justify-center rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition"
          >
            <FontAwesomeIcon icon={faCheck} className="text-xs" />
          </button>
          <button
            onClick={() => { setRenameValue(chat.name); setIsRenaming(false); }}
            className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition"
          >
            <FontAwesomeIcon icon={faXmark} className="text-xs" />
          </button>
        </div>
      ) : (
        <>
          <p className="truncate text-sm font-medium flex-1 mr-1">{chat.name}</p>

          <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpenMenu(isOpen ? null : chat._id)}
              className={`h-7 w-7 flex items-center justify-center rounded-full hover:bg-pink-200 transition ${
                isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} className="text-pink-400 text-xs" />
            </button>

            {isOpen && (
              <div className="absolute right-0 top-9 w-36 bg-white border border-pink-100 rounded-2xl shadow-xl p-1.5 z-50">
                <button
                  onClick={() => {
                    setIsRenaming(true);
                    setOpenMenu(null);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-pink-50 text-pink-600 text-sm transition"
                >
                  <FontAwesomeIcon icon={faPen} className="text-xs" />
                  <span>Rename</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(chat._id);
                    setOpenMenu(null);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-red-50 text-red-400 text-sm transition"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-xs" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatLabel;