import { QuizModel } from "~/models/Quiz";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const body = await readBody(event);
  // TODO: 如果用户已经回答过这套问题或问题已过期，返回 403 Forbidden
  const quiz = await QuizModel.findById(id);
  if (!quiz) {
    throw createError({ message: "quiz not found", status: 404 });
  }
  else if (quiz.answers.length > 0) {
    throw createError({ message: "quiz already answered", status: 403 });
  }
  else if (Date.now() - quiz.startTime.getDate() > quiz.totalTimeLimit) {
    throw createError({ message: "quiz time out", status: 403 });
  }
  return await QuizModel.findByIdAndUpdate(
    id,
    { answers: body.answers },
    { new: true }
  );
});
