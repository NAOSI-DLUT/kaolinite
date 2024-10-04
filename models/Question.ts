interface Question {
  title: string;
  description?: string;
  timeLimit: number;
  score: number;
  tags: string[];
  desktopOnly: boolean;
}

interface ChoiceQuestion extends Question {
  options: string[];
  answer: number | number[];
  multiple: boolean;
}

interface TextQuestion extends Question {
  answer: string;
}

interface TestCase {
  input: string;
  output: string;
}

interface CodeQuestion extends Question {
  testCases: TestCase[];
}
