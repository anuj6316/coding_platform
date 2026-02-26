export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  examples: Example[];
  constraints: string[];
  starterCode: Record<string, string>;
}

export interface Example {
  id: number;
  input: string;
  output: string;
  explanation?: string;
}

export interface TestResult {
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Compilation Error';
  output?: string;
  expected?: string;
  input?: string;
  error?: string;
}
