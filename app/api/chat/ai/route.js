import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";
import connectDB from "@/config/db";
import Chat from "@/models/Chat";

export async function POST(req) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error("❌ GROQ_API_KEY is not set in environment variables.");
    return NextResponse.json(
      {
        error:
          "Groq API Key is missing. Please add GROQ_API_KEY to your .env file.",
      },
      { status: 500 }
    );
  }

  const client = new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });

  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { chatId, prompt } = await req.json();

    if (!chatId || !prompt) {
      return NextResponse.json(
        { error: "Missing chatId or prompt" },
        { status: 400 }
      );
    }

    await connectDB();

    const chat = await Chat.findOne({
      _id: chatId,
      userId,
    });

    if (!chat) {
      return NextResponse.json(
        { error: "Chat not found" },
        { status: 404 }
      );
    }

    // Save user message
    chat.messages.push({
      role: "user",
      content: prompt,
    });

    // Generate chat title from first message
    if (chat.messages.length === 1) {
      chat.name =
        prompt.slice(0, 40) + (prompt.length > 40 ? "..." : "");
    }

    // Conversation history
    const history = chat.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Ask Groq
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are PinkSeek, a friendly, warm, cute, and helpful AI assistant with a sweet personality. Respond using markdown when appropriate.",
        },
        ...history,
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const assistantReply =
      completion.choices[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    // Save AI response
    chat.messages.push({
      role: "assistant",
      content: assistantReply,
    });

    await chat.save();

    return NextResponse.json({
      success: true,
      reply: assistantReply,
      chatName: chat.name,
    });
  } catch (error) {
    console.error("Groq AI Error:", error);

    return NextResponse.json(
      {
        error: error?.message || "Something went wrong.",
      },
      { status: 500 }
    );
  }
}