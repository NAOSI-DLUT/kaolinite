import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  // 在断开连接的情况下重新连接
  if (event.path.startsWith("/api") && mongoose.connection.readyState === 0) {
    mongoose.connect(process.env.MONGODB_URI!);
  }
});
