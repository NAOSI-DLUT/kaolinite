export default defineEventHandler(async (event) => {
  // TODO: 输出一组 question id，返回对应的题目
  // IMPORTANT: 使用下面的方式从结果中去除答案信息
  // const questions = await QuestionModel.find(..., { "data.answer": 0 });
  return new Response("Not implemented", { status: 501 });
});
