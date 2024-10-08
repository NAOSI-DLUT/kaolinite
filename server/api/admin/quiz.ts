import { QuizModel } from "~/models/Quiz";

export default defineEventHandler(async (event) => {
  return await QuizModel.find();
});
