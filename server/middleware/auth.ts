import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  // jwt should be stored in Authorization header like `Authorization: Bearer token`
  if (event.path.startsWith("/api/admin")) {
    const token = event.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      throw createError({ statusCode: 401, message: "Unauthorized" });
    }
    const payload = jwt.verify(token, process.env.SECRET!);
    if (!payload) {
      throw createError({ statusCode: 401, message: "Unauthorized" });
    }
    event.context.auth = payload;
  }
});
