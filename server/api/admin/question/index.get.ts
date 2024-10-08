import { QuestionModel } from "~/models/Question";

export default defineEventHandler(async (event) => {
  return await QuestionModel.find();
});
