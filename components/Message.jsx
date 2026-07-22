"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faPen,
  faRotateRight,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

// Custom pink prism theme
const pinkTheme = {
  'code[class*="language-"]': { color: "#BE185D", background: "none", fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace", fontSize: "0.875em", textAlign: "left", whiteSpace: "pre", wordSpacing: "normal", wordBreak: "normal", wordWrap: "normal", lineHeight: "1.6", tabSize: 4, hyphens: "none" },
  'pre[class*="language-"]': { color: "#BE185D", background: "#FFF0F6", fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace", fontSize: "0.875em", textAlign: "left", whiteSpace: "pre", wordSpacing: "normal", wordBreak: "normal", wordWrap: "normal", lineHeight: "1.6", tabSize: 4, hyphens: "none", padding: "1em", margin: "0.5em 0", overflow: "auto", borderRadius: "1rem" },
  comment: { color: "#F9A8D4" },
  prolog: { color: "#F9A8D4" },
  doctype: { color: "#F9A8D4" },
  cdata: { color: "#F9A8D4" },
  punctuation: { color: "#EC4899" },
  property: { color: "#9D174D" },
  tag: { color: "#BE185D" },
  boolean: { color: "#DB2777" },
  number: { color: "#DB2777" },
  constant: { color: "#9D174D" },
  symbol: { color: "#9D174D" },
  deleted: { color: "#9D174D" },
  selector: { color: "#BE185D" },
  keyword: { color: "#DB2777", fontWeight: "bold" },
  operator: { color: "#EC4899" },
  string: { color: "#9D174D" },
  "attr-value": { color: "#9D174D" },
  builtin: { color: "#BE185D" },
  "class-name": { color: "#9D174D" },
  function: { color: "#BE185D" },
  important: { color: "#EC4899", fontWeight: "bold" },
  variable: { color: "#BE185D" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
};

const Message = ({ role, content }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={`flex w-full mb-4 ${role === "user" ? "justify-end" : "justify-start"}`}>
      {/* AI Avatar */}
      {role === "assistant" && (
        <div className="flex items-end justify-center h-9 w-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 text-white text-sm shadow-md shrink-0 mr-3 mb-1">
          🌸
        </div>
      )}

      <div className={`group relative max-w-[80%] ${role === "user" ? "max-w-[70%]" : "max-w-[85%]"}`}>
        {/* Bubble */}
        <div
          className={`rounded-3xl px-5 py-3.5 shadow-sm text-sm leading-relaxed ${
            role === "user"
              ? "bg-gradient-to-br from-pink-500 to-rose-400 text-white rounded-br-lg"
              : "bg-pink-50 border border-pink-100 text-pink-900 rounded-bl-lg"
          }`}
        >
          {role === "user" ? (
            <p className="whitespace-pre-wrap break-words">{content}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-pink">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <div className="relative my-3">
                        <div className="flex items-center justify-between bg-pink-100 rounded-t-xl px-4 py-1.5">
                          <span className="text-xs text-pink-500 font-mono font-semibold">{match[1]}</span>
                          <button
                            onClick={() => copyToClipboard(String(children).replace(/\n$/, ""))}
                            className="text-xs text-pink-400 hover:text-pink-600 transition flex items-center gap-1"
                          >
                            <FontAwesomeIcon icon={faCopy} className="text-xs" />
                            Copy
                          </button>
                        </div>
                        <SyntaxHighlighter
                          style={pinkTheme}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{ borderRadius: "0 0 1rem 1rem", margin: 0, borderTop: "1px solid #FBCFE8" }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className="bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded-md font-mono text-xs" {...props}>
                        {children}
                      </code>
                    );
                  },
                  h1: ({ children }) => <h1 className="text-lg font-bold text-pink-800 mt-4 mb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-bold text-pink-700 mt-3 mb-1.5">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-bold text-pink-600 mt-2 mb-1">{children}</h3>,
                  p: ({ children }) => <p className="text-pink-900 mb-2 last:mb-0 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2 text-pink-800">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2 text-pink-800">{children}</ol>,
                  li: ({ children }) => <li className="text-pink-800">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-pink-300 pl-4 italic text-pink-600 my-2 bg-pink-50 rounded-r-xl py-2">
                      {children}
                    </blockquote>
                  ),
                  strong: ({ children }) => <strong className="font-bold text-pink-800">{children}</strong>,
                  em: ({ children }) => <em className="italic text-pink-600">{children}</em>,
                  a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-pink-500 underline hover:text-pink-700 transition">
                      {children}
                    </a>
                  ),
                  hr: () => <hr className="border-pink-200 my-3" />,
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-2">
                      <table className="min-w-full border border-pink-200 rounded-xl overflow-hidden text-sm">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => <thead className="bg-pink-100">{children}</thead>,
                  th: ({ children }) => <th className="px-4 py-2 text-left font-semibold text-pink-700 border-b border-pink-200">{children}</th>,
                  td: ({ children }) => <td className="px-4 py-2 text-pink-800 border-b border-pink-100">{children}</td>,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Action buttons on hover */}
        <div
          className={`absolute flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 ${
            role === "user" ? "right-0 -bottom-8" : "left-0 -bottom-8"
          }`}
        >
          <button
            onClick={() => copyToClipboard(content)}
            className="h-7 w-7 flex items-center justify-center rounded-full bg-pink-50 hover:bg-pink-100 text-pink-400 hover:text-pink-600 border border-pink-200 transition text-xs"
            title="Copy"
          >
            <FontAwesomeIcon icon={faCopy} />
          </button>
          {role === "user" ? (
            <button className="h-7 w-7 flex items-center justify-center rounded-full bg-pink-50 hover:bg-pink-100 text-pink-400 hover:text-pink-600 border border-pink-200 transition text-xs" title="Edit">
              <FontAwesomeIcon icon={faPen} />
            </button>
          ) : (
            <>
              <button className="h-7 w-7 flex items-center justify-center rounded-full bg-pink-50 hover:bg-pink-100 text-pink-400 hover:text-pink-600 border border-pink-200 transition text-xs" title="Regenerate">
                <FontAwesomeIcon icon={faRotateRight} />
              </button>
              <button className="h-7 w-7 flex items-center justify-center rounded-full bg-pink-50 hover:bg-pink-100 text-pink-400 hover:text-pink-600 border border-pink-200 transition text-xs" title="Like">
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
              <button className="h-7 w-7 flex items-center justify-center rounded-full bg-pink-50 hover:bg-pink-100 text-pink-400 hover:text-pink-600 border border-pink-200 transition text-xs" title="Dislike">
                <FontAwesomeIcon icon={faThumbsDown} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* User Avatar */}
      {role === "user" && (
        <div className="flex items-end justify-center h-9 w-9 rounded-full bg-gradient-to-br from-pink-200 to-rose-200 text-pink-600 text-sm font-bold shadow-md shrink-0 ml-3 mb-1">
          Me
        </div>
      )}
    </div>
  );
};

export default Message;