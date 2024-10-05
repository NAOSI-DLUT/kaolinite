import { QuestionModel } from "~/models/Question";

export default defineEventHandler(async (event) => {
  if (event.method === "GET") {
    return await QuestionModel.find();
  } else if (event.method === "POST") {
    const body = await readBody(event);
    return await QuestionModel.create(body);
  } else {
    return new Response("Method not allowed", { status: 405 });
  }
});
