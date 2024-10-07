import { model, Schema } from "mongoose";

export interface Quiz {
  _id: string;
  uid: string;
  questions: string[];
  answers: string[];
  scores: number[];
  timeLimit: number;
  startTime: number;
  endTime: number;
}

const QuizSchema = new Schema<Quiz>({
  uid: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  answers: [{ type: String }],
  scores: [{ type: Number }],
  timeLimit: { type: Number, required: true },
  startTime: { type: Number },
  endTime: { type: Number },
});

export const QuizModel = model<Quiz>("Quiz", QuizSchema);
