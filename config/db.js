import mongoose from "mongoose";

let cached = global.mongoose || { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    let uri = process.env.MONGODB_URI;
    if (uri && uri.includes("${DB_PASSWORD}")) {
      uri = uri.replace("${DB_PASSWORD}", process.env.DB_PASSWORD || "");
    }
    cached.promise = mongoose.connect(uri).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
