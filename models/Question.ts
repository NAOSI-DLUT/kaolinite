import { model, Schema } from "mongoose";

export interface Question<T> {
  _id?: string;
  title: string;
  description?: string;
  timeLimit: number;
  score: number;
  tags: string[];
  desktopOnly: boolean;
  type: string;
  // The `answer` field in data will be filtered out when sending to the client
  data: T;
}

export interface RadioData {
  options: string[];
  answer: number;
}

export interface CheckboxData {
  options: string[];
  answer: number[];
}

export interface TextData {
  answer: string;
}

export interface CodeData {
  answer: { input: string; output: string }[];
}

export const isRadioQuestion = (
  question: Question<unknown>
): question is Question<RadioData> => question.type === "radio";

export const isCheckboxQuestion = (
  question: Question<unknown>
): question is Question<CheckboxData> => question.type === "checkbox";

export const isTextQuestion = (
  question: Question<unknown>
): question is Question<TextData> => question.type === "text";

export const isCodeQuestion = (
  question: Question<unknown>
): question is Question<CodeData> => question.type === "code";

const questionSchema = new Schema<Question<unknown>>({
  title: { type: String, required: true },
  description: { type: String },
  timeLimit: { type: Number, required: true },
  score: { type: Number, required: true },
  tags: { type: [String], required: true },
  desktopOnly: { type: Boolean, required: true },
  type: { type: String, required: true },
  data: { type: Object, required: true },
});

export const QuestionModel = model<Question<unknown>>(
  "Question",
  questionSchema
);
