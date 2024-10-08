import { QuizModel } from "~/models/Quiz"

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  // return query.uid;
  const uid = query.uid;
  // TODO: 返回用户所有的 quiz 记录
  // 检查 uid 是否存在
  if (!uid) {
    return { error: "User ID is required." };
  }

  try {
    // 查询用户所有的 quiz 记录
    const quizzes = await QuizModel.find({ uid: uid });

    return quizzes;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return { error: "Failed to fetch quizzes." };
  }
});
