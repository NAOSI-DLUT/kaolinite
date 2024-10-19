import path from "path";
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
    return await $fetch(path.join(baseUrl, "/api/submit"), {
      method: "POST",
      body: { code: body.code, _id: quiz.questions[body.index] },
    });
  } else {
    const data = await $fetch<{ testcases: { status: number }[] }>(
      path.join(baseUrl, `/api/query?token=${body.token}`)
    );
    if (data.testcases.every((t) => t.status !== 0)) {
      if (!quiz.questionScores) {
        quiz.questionScores = [];
      }
      const correctCount = data.testcases.filter((t) => t.status === 1).length;
      quiz.questionScores[body.index] =
        (100 * correctCount) / data.testcases.length;
    }
    return data.testcases;
  }
});
