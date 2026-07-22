import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import Chat from "@/models/Chat";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const chats = await Chat.find({ userId })
      .select("_id name createdAt")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, chats });
  } catch (error) {
    console.error("Get chats error:", error);
    return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 });
  }
}
