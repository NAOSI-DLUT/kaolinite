import { model, Schema } from "mongoose";

export interface Quiz {
  _id: string;
  uid: string;
  questions: string[];
  answers: unknown[];
  score: number;
  totalScore: number;
  timeLimit: number;
  startTime: number;
}

const quizSchema = new Schema<Quiz>({
  uid: { type: String, required: true },
  questions: { type: [String], required: true },
  answers: { type: Object, required: true },
  score: { type: Number, required: true },
  totalScore: { type: Number, required: true },
  timeLimit: { type: Number, required: true },
  startTime: { type: Number, required: true },
});

export const QuizModel = model<Quiz>("Quiz", quizSchema);
