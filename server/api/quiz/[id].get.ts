import { QuizModel } from "~/models/Quiz";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  return await QuizModel.findById(id);
});
