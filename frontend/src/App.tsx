import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProblemDescription } from './components/ProblemDescription';
import { CodeEditor } from './components/CodeEditor';
import { TestcasePanel } from './components/TestcasePanel';
import { PROBLEMS } from './data/problems';
import { ResizablePanelHorizontal, ResizablePanelVertical } from './components/ResizableLayout';
import { ProblemList } from './components/ProblemList';
import { Toaster, toast } from 'sonner';
import { Example, Problem } from './types';
import { executeCodeLocal } from './services/backendService';

export default function App() {
  const [currentProblem, setCurrentProblem] = useState<Problem>(PROBLEMS[0]);
  const [language, setLanguage] = useState('Python (3.12.5)');
  const [code, setCode] = useState(currentProblem.starterCode['python']);
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<string | undefined>(undefined);
  const [isProblemListOpen, setIsProblemListOpen] = useState(false);
  const [testCases, setTestCases] = useState<Example[]>(currentProblem.examples);

  const getBaseLanguage = (lang: string) => {
    const base = lang.split(' ')[0].toLowerCase();
    if (base === 'c++') return 'cpp';
    if (base === 'sql') return 'sql';
    return base;
  };

  const handleProblemChange = (problem: Problem) => {
    setCurrentProblem(problem);
    const baseLang = getBaseLanguage(language);
    setCode(problem.starterCode[baseLang] || problem.starterCode['python'] || '');
    setTestCases(problem.examples);
    setExecutionResult(undefined);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    const baseLang = getBaseLanguage(lang);
    setCode(currentProblem.starterCode[baseLang] || '');
  };

  const handleRun = async () => {
    setIsRunning(true);
    setExecutionResult(undefined);
    
    try {
      // Use the first test case input
      const input = testCases[0].input;
      // Pass full language name (e.g. "Python (3.12.5)") as the backend expects it
      const result = await executeCodeLocal(language, code, input);
      setExecutionResult(result.output);
    } catch (error) {
      setExecutionResult(error instanceof Error ? error.message : String(error));
      toast.error('Execution failed');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    toast.info('Submission logic would go here (connecting to a real judge).');
  };

  return (
    <div className="h-screen w-full bg-[#0f0f0f] text-white flex flex-col overflow-hidden font-sans">
      <Toaster theme="dark" position="top-center" />
      <Header 
        language={language} 
        setLanguage={handleLanguageChange}
        onRun={handleRun}
        onSubmit={handleSubmit}
        onOpenProblems={() => setIsProblemListOpen(true)}
        isRunning={isRunning}
      />
      
      <div className="flex-1 overflow-hidden">
        <ResizablePanelHorizontal
          left={<ProblemDescription problem={currentProblem} />}
          right={
            <ResizablePanelVertical
              top={
                <CodeEditor 
                  code={code} 
                  language={getBaseLanguage(language)} 
                  onChange={(val) => setCode(val || '')}
                  onRun={handleRun}
                  isRunning={isRunning}
                />
              }
              bottom={
                <TestcasePanel 
                  testCases={testCases} 
                  setTestCases={setTestCases} 
                  result={executionResult} 
                />
              }
            />
          }
        />
      </div>

      <ProblemList
        isOpen={isProblemListOpen}
        onClose={() => setIsProblemListOpen(false)}
        problems={PROBLEMS}
        currentProblemId={currentProblem.id}
        onSelectProblem={handleProblemChange}
      />
    </div>
  );
}
