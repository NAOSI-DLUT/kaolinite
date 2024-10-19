import { posix } from "path";
import { QuizModel } from "~/models/Quiz";

const baseUrl = process.env.JUDGE_BASE_URL!;

// 算法类题目临时 judge 接口
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const quiz = await QuizModel.findById(body.id);
  if (!quiz) {
    return createError({ status: 404, message: "Quiz not found" });
  }
  if (body.code) {
    return await $fetch(posix.join(baseUrl, "/api/v1/submit"), {
      method: "POST",
      body: { code: body.code, _id: quiz.questions[body.index] },
    });
  } else {
    const data = await $fetch<{ testcases: { status: number }[] }>(
      posix.join(baseUrl, `/api/v1/query?token=${body.token}`)
    );
    const questionScores =
      quiz.questionScores ?? Array<number>(quiz.questions.length).fill(0);

    const correctCount = data.testcases.filter((t) => t.status === 1).length;
    questionScores[body.index] = (100 * correctCount) / data.testcases.length;

    quiz.questionScores = questionScores;
    quiz.save();
    return data.testcases;
  }
});
