import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";

export async function POST(req) {
  const body = await req.text();
  const headerList = await headers();
  const svixHeaders = {
    "svix-id": headerList.get("svix-id"),
    "svix-timestamp": headerList.get("svix-timestamp"),
    "svix-signature": headerList.get("svix-signature"),
  };

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
  let event;

  try {
    event = wh.verify(body, svixHeaders);
  } catch (err) {
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }

  await connectDB();

  if (event.type === "user.created" || event.type === "user.updated") {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const name = `${first_name || ""} ${last_name || ""}`.trim() || "PinkSeek User";
    const email = email_addresses?.[0]?.email_address || "";

    await User.findOneAndUpdate(
      { clerkId: id },
      { name, email, image: image_url },
      { upsert: true, new: true }
    );
  }

  if (event.type === "user.deleted") {
    await User.findOneAndDelete({ clerkId: event.data.id });
  }

  return NextResponse.json({ success: true });
}
