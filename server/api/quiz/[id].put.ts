import {
  isCheckboxQuestion,
  isCodeQuestion,
  isRadioQuestion,
  isTextQuestion,
  Question,
  QuestionModel,
} from "~/models/Question";
import { Quiz, QuizModel } from "~/models/Quiz";

async function scoring(quiz: Quiz, userAnswers: any[]) {
  const questions = await QuestionModel.find({ _id: { $in: quiz.questions } });
  const questionsMap = questions.reduce((acc, question) => {
    acc[question._id] = question;
    return acc;
  }, {} as Record<string, Question<unknown>>);

  console.log(quiz.questionScores);

  const questionScores =
    quiz.questionScores ?? Array<number>(quiz.questions.length).fill(0);

  for (let index = 0; index < quiz.questions.length; index++) {
    const question = questionsMap[quiz.questions[index]];
    const userAnswer = userAnswers[index];

    if (userAnswer == null) {
      continue;
    }
    if (isRadioQuestion(question)) {
      if (question.data.answer === userAnswer) {
        questionScores[index] = question.score;
      }
    } else if (isCheckboxQuestion(question)) {
      let correctCount = 0;
      for (const answer of userAnswer) {
        if (question.data.answer.includes(answer)) {
          correctCount++;
        } else {
          correctCount = 0;
          break;
        }
      }
      questionScores[index] =
        (correctCount / question.data.answer.length) * question.score;
    } else if (isTextQuestion(question)) {
      let correctCount = 0;
      for (let i = 0; i < question.data.answer.length; i++) {
        if (
          userAnswer[i] &&
          question.data.answer[i].toLowerCase() === userAnswer[i].toLowerCase()
        ) {
          correctCount++;
        }
      }
      questionScores[index] =
        (correctCount / question.data.answer.length) * question.score;
    } else if (isCodeQuestion(question)) {
      // 已在临时 judge 接口中处理
      // questionScores[index] = 0;
    }
  }
  return questionScores;
}

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const body = await readBody(event);

  if (!body.answers) {
    throw createError({ message: "Answers are required", status: 400 });
  }
  const quiz = await QuizModel.findById(id);
  if (!quiz) {
    throw createError({ message: "Quiz not found", status: 404 });
  }
  if (quiz.answers) {
    throw createError({ message: "Quiz already answered", status: 403 });
  }
  if (
    Date.now() >
    quiz.startTime.getTime() + quiz.totalTimeLimit * 1000 + 2000
  ) {
    throw createError({ message: "Quiz time limit exceeded", status: 403 });
  }

  const questionScores = await scoring(quiz, body.answers);

  return await QuizModel.findByIdAndUpdate(
    id,
    {
      answers: body.answers,
      score: questionScores.reduce((acc, score) => acc + score, 0),
      questionScores,
    },
    { new: true }
  );
});
