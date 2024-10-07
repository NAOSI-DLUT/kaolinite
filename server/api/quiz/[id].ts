export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  // TODO: 从 quiz 表中得到对应的题目 id，然后返回题目
  // IMPORTANT: 使用下面的方式从结果中去除答案信息
  // const questions = await QuestionModel.find(..., { "data.answer": 0 });
  return id;
});
