import { QuestionModel } from "~/models/Question";
import { QuizModel } from "~/models/Quiz";

/**
 * This function returns a random selection of questions from the database.
 * The `answer` field in the `data` object of each question is filtered out.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.uid) {
    throw createError({
      statusCode: 400,
      message: "Missing required field: uid",
    });
  }
  // TODO: uid 为用户的学号，调用此 api 后会在 quiz 表中创建一条记录，记录用户的学号和抽取的题目
  // 另见：~/models/Quiz.ts、Mongoose 文档
  // 如果数据库中有未结束的 quiz 记录，返回 403 Forbidden
  // 检查是否有未结束的 quiz 记录
  const ongoingQuiz = await QuizModel.findOne({ uid: body.uid, totalTimeLimit: { $gt: 0 } });
  if (ongoingQuiz) {
    throw createError({
      statusCode: 403,
      message: "There is an ongoing quiz.",
    });
  }

  // 抽取问题
  const questions = await QuestionModel.find({}, { "data.answer": 0 });
  const selectedIndexes = new Set<number>();
  const maxSelections = 5;
  // TODO: 抽完题目后将对应的题目 id 保存到 quiz 表中，然后返回 quiz 的 id，而不是直接返回题目
  // 如果题目数量不足，直接返回
  if (questions.length < maxSelections) {
    return questions;
  } else {
    // 根据题目的时间限制和分数选择题目
    while (selectedIndexes.size < maxSelections) {
      // TODO: Selection should consider the timeLimit and score of each question
      const randomIndex = Math.floor(Math.random() * questions.length);
      const question = questions[randomIndex];

      // 确保选择有效的题目
      if (question.timeLimit > 0 && question.score > 0) {
        selectedIndexes.add(randomIndex);
      }
    }

    const selectedQuestions = Array.from(selectedIndexes).map((index) => questions[index]);

    // 创建新的 quiz 记录
    const newQuiz = new QuizModel({
      uid: body.uid,
      questions: selectedQuestions.map(q => q._id), // 存储选中问题的 ID
      answers: [],
      score: 0,
      totalScore: selectedQuestions.reduce((sum, q) => sum + q.score, 0), // 计算总分
      totalTimeLimit: selectedQuestions.reduce((sum, q) => sum + q.timeLimit, 0), // 计算总时间限制
      startTime: new Date(),
    });

    await newQuiz.save();

    // 返回新创建的 quiz 的 ID
    return { message: "Quiz created successfully", quizId: newQuiz._id };
  }
});
