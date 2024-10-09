import { QuestionModel } from "~/models/Question";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (event.method === "GET") {
    return await QuestionModel.findById(id);
  } else if (event.method === "PUT") {
    const body = await readBody(event);
    return await QuestionModel.findByIdAndUpdate(id, body, { new: true });
  } else if (event.method === "DELETE") {
    return await QuestionModel.findByIdAndDelete(id);
  } else {
    return new Response("Method not allowed", { status: 405 });
  }
});
