import { QuestionModel } from "~/models/Question";

/**
 * This function returns a random selection of questions from the database.
 * The `answer` field in the `data` object of each question is filtered out.
 */
export default defineEventHandler(async (event) => {
  const questions = await QuestionModel.find({}, { "data.answer": 0 });
  const selectedIndexes = new Set<number>();
  const maxSelections = 5;

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
