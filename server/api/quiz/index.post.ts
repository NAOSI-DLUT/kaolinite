import { QuestionModel } from "~/models/Question";
import { QuizModel } from "~/models/Quiz";

/**
 * @brief 为用户随机抽取题目，并返回对应的测试记录 quiz
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const ongoingQuizzies = await QuizModel.find({
    uid: body.uid,
    // 未作答的测试记录
    answers: { $type: 10 },
  }).sort({ startTime: -1 });
  const latestQuiz = ongoingQuizzies[0];
  // 检查是否存在正在进行的测试
  if (
    latestQuiz &&
    Date.now() <
      latestQuiz.startTime.getTime() + latestQuiz.totalTimeLimit * 1000
  ) {
    throw createError({
      statusCode: 403,
      message: "An ongoing quiz already exists",
    });
  }

  // 抽取问题
  const questions = await QuestionModel.find(
    // 问题标签包含所有请求的标签
    { tags: { $all: body.tags } }
  );

  // 检查是否有足够的题目
  const totalScoreInDB = questions.reduce(
    (acc, question) => acc + question.score,
    0
  );
  if (totalScoreInDB < 100) {
    throw createError({
      statusCode: 400,
      message: "Not enough questions",
    });
  }

  let totalScore = 0;
  let totalTimeLimit = 0;
  let questionIds: string[] = [];
  while (totalScore < 100) {
    const question = questions[Math.floor(Math.random() * questions.length)];
    if (questionIds.includes(question._id)) {
      continue;
    }
    questionIds.push(question._id);
    totalScore += question.score;
    totalTimeLimit += question.timeLimit;
  }
  return await QuizModel.create({
    uid: body.uid,
    questions: Array.from(questionIds),
    totalScore,
    totalTimeLimit,
    startTime: new Date(),
  });
});
