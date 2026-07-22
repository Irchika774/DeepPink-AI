import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";
import connectDB from "@/config/db";
import Chat from "@/models/Chat";

export async function POST(req) {
  // Instantiate inside handler so env vars are available at runtime
  const client = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: process.env.DEEPSEEK_API_KEY,
  });
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { chatId, prompt } = await req.json();
    if (!chatId || !prompt) {
      return NextResponse.json({ error: "Missing chatId or prompt" }, { status: 400 });
    }

    await connectDB();

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    // Push user message
    chat.messages.push({ role: "user", content: prompt });

    // If this is the first message, generate a title
    if (chat.messages.length === 1) {
      chat.name = prompt.slice(0, 40) + (prompt.length > 40 ? "..." : "");
    }

    // Build messages history for DeepSeek
    const history = chat.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "You are PinkSeek, a friendly, warm, and helpful AI assistant with a sweet personality. You are knowledgeable about everything and respond with clarity. Use markdown formatting (headers, bullet points, code blocks) when helpful.",
        },
        ...history,
      ],
      max_tokens: 2048,
    });

    const assistantReply = completion.choices[0].message.content;

    // Push AI message
    chat.messages.push({ role: "assistant", content: assistantReply });
    await chat.save();

    return NextResponse.json({
      success: true,
      reply: assistantReply,
      chatName: chat.name,
    });
  } catch (error) {
    console.error("AI route error:", error);
    return NextResponse.json({ error: "AI request failed: " + error.message }, { status: 500 });
  }
}
