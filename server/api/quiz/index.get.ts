import { QuizModel } from "~/models/Quiz";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (!query.uid) {
    throw createError({
      statusCode: 400,
      message: "uid is required",
    });
  }
  return await QuizModel.find({ uid: query.uid }).sort({ startTime: -1 });
});
