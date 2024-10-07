import { QuestionModel } from "~/models/Question";

/**
 * This function returns a random selection of questions from the database.
 * The `answer` field in the `data` object of each question is filtered out.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.uid) {
    // throw createError({
    //   statusCode: 400,
    //   message: "Missing required field: uid",
    // });
  }
  // TODO: uid 为用户的学号，调用此 api 后会在 quiz 表中创建一条记录，记录用户的学号和抽取的题目
  // 另见：~/models/Quiz.ts、Mongoose 文档
  // 如果数据库中有未结束的 quiz 记录，返回 403 Forbidden
  const questions = await QuestionModel.find({}, { "data.answer": 0 });
  const selectedIndexes = new Set<number>();
  const maxSelections = 5;

  // TODO: 抽完题目后将对应的题目 id 保存到 quiz 表中，然后返回 quiz 的 id，而不是直接返回题目
  if (questions.length < maxSelections) {
    return questions;
  } else {
    while (selectedIndexes.size < maxSelections) {
      // TODO: Selection should consider the timeLimit and score of each question
      selectedIndexes.add(Math.floor(Math.random() * questions.length));
    }
    return Array.from(selectedIndexes).map((index) => questions[index]);
  }
});
