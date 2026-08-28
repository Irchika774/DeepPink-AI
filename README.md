# 🌸 PinkSeek AI

A modern AI chatbot built with **React, Next.js, Groq AI, and MongoDB Atlas**.

PinkSeek is a full-stack AI assistant with a cute pink-themed interface, secure authentication, and persistent chat history.

---

## ✨ Features

🤖 **AI-Powered Conversations**
- Chat with an intelligent AI assistant powered by Groq API (Llama 3.3).
- Get fast and helpful AI responses.

🔐 **Secure Authentication**
- User authentication and account management using Clerk.
- Protected user-specific chat data.

💬 **Persistent Chat History**
- Store conversations permanently using MongoDB Atlas.
- Access previous chats anytime.

📝 **Automatic Chat Titles**
- Automatically generates chat titles from the first user message.

🗂️ **Chat Management**
- Create new conversations.
- Rename chats.
- Delete unwanted conversations.

🎀 **Modern Pink-Themed UI**
- Custom-designed interface with a friendly AI assistant experience.
- Responsive design for different screen sizes.

⚡ **Full-Stack Integration**
- Complete integration of frontend, backend APIs, authentication, database, and AI services.

---

# 🛠️ Tech Stack

## Frontend

- ⚛️ React
- ▲ Next.js (App Router)
- 🎨 Tailwind CSS
- JavaScript / JSX

## Backend

- Next.js API Routes
- Node.js
- REST API Architecture

## Database

- 🍃 MongoDB Atlas
- Mongoose ODM

## Authentication

- 🔐 Clerk Authentication

## Artificial Intelligence

- 🤖 Groq API
- Llama 3.3 Model

---

# 📂 Project Structure

```text
DeepPink-AI/
│
├── app/
│   ├── api/
│   │   └── chat/
│   │       ├── ai/
│   │       ├── create/
│   │       ├── delete/
│   │       ├── get/
│   │       ├── messages/
│   │       └── rename/
│   │
│   ├── page.jsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── Message.jsx
│   ├── ChatLabel.jsx
│   └── UI assets
│
├── config/
│   └── db.js
│
├── context/
│   └── AppContext.jsx
│
├── models/
│   ├── Chat.js
│   └── User.js
│
└── package.json
