import { QuestionModel } from "~/models/Question";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await QuestionModel.create(body);
});
