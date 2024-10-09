import { Question, QuestionModel } from "~/models/Question";
import { QuizModel } from "~/models/Quiz";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (!query.quiz) {
    throw createError({
      statusCode: 400,
      message: "quiz is required",
    });
  }
  const quiz = await QuizModel.findById(query.quiz);
  if (!quiz) {
    throw createError({
      statusCode: 404,
      message: "Quiz not found",
    });
  }
  const questions = await QuestionModel.find({ _id: { $in: quiz.questions } });
  const questtionMap = questions.reduce((acc, question) => {
    acc[question._id] = question;
    return acc;
  }, {} as Record<string, Question<unknown>>);

  return quiz.questions.map((questionId) => {
    return questtionMap[questionId];
  });
});
