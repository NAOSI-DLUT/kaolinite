import { QuizModel } from "~/models/Quiz";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const body = await readBody(event);
  // TODO: 如果用户已经回答过这套问题或问题已过期，返回 403 Forbidden
  return await QuizModel.findByIdAndUpdate(
    id,
    { answers: body.answers },
    { new: true }
  );
});
