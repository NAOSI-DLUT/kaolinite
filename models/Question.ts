import { model, Schema } from "mongoose";

/**
 * 题目数据
 * @field title 题目标题
 * @field description 题目描述
 * @field timeLimit 答题时间限制（秒）
 * @field score 题目分数
 * @field tags 题目标签
 * @field type 题目类型
 * @field data 题目数据，其中 `data.answer` 不会返回给用户
 */
export interface Question<T> {
  _id: string;
  title: string;
  description?: string;
  timeLimit: number;
  score: number;
  tags: string[];
  type: string;
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
  blankCount: number;
  answer: string[];
}

export interface CodeData {
  testCaseCount: number;
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
  type: { type: String, required: true },
  data: { type: Object, required: true },
});

const QuestionModel = model<Question<unknown>>("Question", questionSchema);

export { QuestionModel };
