import { QuestionModel } from "~/models/Question";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  return await QuestionModel.findById(id, { "data.answer": 0 });
});
