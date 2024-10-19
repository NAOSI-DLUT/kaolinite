import { model, Schema } from "mongoose";

/**
 * 用户测试记录
 * @field uid 学号
 * @field questions 测试题目列表，为题目的 _id
 * @field answers 用户的答案列表
 * @field score 用户的得分
 * @field totalScore 测试的总分
 * @field totalTimeLimit 测试的总时间限制
 * @field startTime 测试开始时间
 */
export interface Quiz {
  _id: string;
  uid: string;
  questions: string[];
  answers?: unknown[];
  score?: number;
  questionScores?: number[];
  totalScore: number;
  totalTimeLimit: number;
  startTime: Date;
}

const quizSchema = new Schema<Quiz>({
  uid: { type: String, required: true },
  questions: { type: [String], required: true },
  answers: { type: Object },
  score: { type: Number },
  questionScores: { type: [Number] },
  totalScore: { type: Number, required: true },
  totalTimeLimit: { type: Number, required: true },
  startTime: { type: Date, required: true },
});

const QuizModel = model<Quiz>("Quiz", quizSchema);

export { QuizModel };
