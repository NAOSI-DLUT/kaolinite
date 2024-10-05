import { model, Schema } from "mongoose";

export interface Question {
  _id?: string;
  title: string;
  description?: string;
  timeLimit: number;
  score: number;
  tags: string[];
  desktopOnly: boolean;
  type: "choice" | "text" | "code";
  // The `answer` field in data will be filtered out when sending to the client
  data: ChoiceData | TextData | CodeData;
}

export interface ChoiceData {
  options: string[];
  answer: number | number[];
  multiple: boolean;
}

export interface TextData {
  answer: string;
}

interface TestCase {
  input: string;
  output: string;
}

export interface CodeData {
  answer: TestCase[];
}

const questionSchema = new Schema<Question>({
  title: { type: String, required: true },
  description: { type: String },
  timeLimit: { type: Number, required: true },
  score: { type: Number, required: true },
  tags: { type: [String], required: true },
  desktopOnly: { type: Boolean, required: true },
  type: { type: String, required: true },
  data: { type: Object, required: true },
});

export const QuestionModel = model<Question>("Question", questionSchema);
