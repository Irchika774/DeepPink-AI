import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import Chat from "@/models/Chat";

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const chat = await Chat.create({
      userId,
      name: "New Chat 💕",
      messages: [],
    });

    return NextResponse.json({ success: true, chatId: chat._id });
  } catch (error) {
    console.error("Create chat error:", error);
    return NextResponse.json({ error: "Failed to create chat" }, { status: 500 });
  }
}
