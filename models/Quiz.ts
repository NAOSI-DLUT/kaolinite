import { model, Schema } from "mongoose";

export interface Quiz {
  _id: string;
  uid: string;
  questions: string[];
  answers: unknown[];
  score: number;
  totalScore: number;
  totalTimeLimit: number;
  startTime: Date;
}

const quizSchema = new Schema<Quiz>({
  uid: { type: String, required: true },
  questions: { type: [String], required: true },
  answers: { type: Object, required: true },
  score: { type: Number, required: true },
  totalScore: { type: Number, required: true },
  totalTimeLimit: { type: Number, required: true },
  startTime: { type: Date, required: true },
});

export const QuizModel = model<Quiz>("Quiz", quizSchema);
