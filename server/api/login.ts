import { UserModel } from "~/models/User";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const admin = await UserModel.findOne({
    username: body.username,
    password: body.password,
  });
  if (!admin) {
    throw createError({
      statusCode: 401,
      message: "Invalid username or password",
    });
  }
  const token = jwt.sign({ username: body.username }, process.env.SECRET!, {
    expiresIn: "1h",
  });
  return { token };
});
