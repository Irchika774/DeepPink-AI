import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import Chat from "@/models/Chat";

export async function PUT(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { chatId, name } = await req.json();
    if (!chatId || !name?.trim()) {
      return NextResponse.json({ error: "Missing chatId or name" }, { status: 400 });
    }

    await connectDB();

    const chat = await Chat.findOneAndUpdate(
      { _id: chatId, userId },
      { name: name.trim() },
      { new: true }
    );

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, name: chat.name });
  } catch (error) {
    console.error("Rename chat error:", error);
    return NextResponse.json({ error: "Failed to rename chat" }, { status: 500 });
  }
}
