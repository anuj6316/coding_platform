import React, { useState, useEffect } from 'react';
import { Example } from '@/types';
import { Plus, Maximize2, MoreHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestcasePanelProps {
  testCases: Example[];
  setTestCases: React.Dispatch<React.SetStateAction<Example[]>>;
  result?: string;
}

export function TestcasePanel({ testCases, setTestCases, result }: TestcasePanelProps) {
  const [activeMainTab, setActiveMainTab] = useState<'testcase' | 'result'>('testcase');
  const [activeCaseTab, setActiveCaseTab] = useState(0);

  useEffect(() => {
    if (result) {
      setActiveMainTab('result');
    }
  }, [result]);

  const handleAddTestcase = () => {
    const newId = testCases.length > 0 ? Math.max(...testCases.map(t => t.id)) + 1 : 1;
    setTestCases([
      ...testCases,
      {
        id: newId,
        input: 'x = ',
        output: '',
      }
    ]);
    setActiveCaseTab(testCases.length);
  };

  const handleRemoveTestcase = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (testCases.length <= 1) return;
    
    const newTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(newTestCases);
    
    if (activeCaseTab >= index && activeCaseTab > 0) {
      setActiveCaseTab(activeCaseTab - 1);
    }
  };

  const updateTestCase = (field: 'input' | 'output', value: string) => {
    const newTestCases = [...testCases];
    newTestCases[activeCaseTab] = {
      ...newTestCases[activeCaseTab],
      [field]: value
    };
    setTestCases(newTestCases);
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] border-l border-[#2d2d2d] border-t">
      {/* Header */}
      <div className="h-10 flex items-center justify-between px-4 border-b border-[#2d2d2d] bg-[#1e1e1e]">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveMainTab('testcase')}
            className={cn(
              "flex items-center gap-2 text-sm font-medium h-10 px-1 transition-colors border-b-2",
              activeMainTab === 'testcase' 
                ? "text-white border-green-500" 
                : "text-gray-500 border-transparent hover:text-gray-300"
            )}
          >
            <span className={cn(
              "w-4 h-4 flex items-center justify-center rounded text-[10px]",
              activeMainTab === 'testcase' ? "bg-[#2d2d2d] text-green-500" : "text-gray-500"
            )}>✓</span>
            Testcase
          </button>
          <button 
            onClick={() => setActiveMainTab('result')}
            className={cn(
              "flex items-center gap-2 text-sm font-medium h-10 px-1 transition-colors border-b-2",
              activeMainTab === 'result' 
                ? "text-white border-green-500" 
                : "text-gray-500 border-transparent hover:text-gray-300"
            )}
          >
            Test Result
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-[#2d2d2d] rounded text-gray-400 hover:text-white">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 hover:bg-[#2d2d2d] rounded text-gray-400 hover:text-white">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeMainTab === 'result' ? (
          <div className="space-y-4">
            {!result ? (
              <div className="text-sm text-gray-500 text-center mt-10">
                Run your code to see results.
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-[#2d2d2d] border border-[#3d3d3d]">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Execution Result:</h3>
                <pre className="font-mono text-sm text-white whitespace-pre-wrap">{result}</pre>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {testCases.map((example, idx) => (
                <div key={example.id} className="relative group/tab">
                  <button
                    onClick={() => setActiveCaseTab(idx)}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-xs font-medium transition-colors pr-8",
                      activeCaseTab === idx 
                        ? "bg-[#2d2d2d] text-white" 
                        : "bg-transparent text-gray-500 hover:bg-[#2d2d2d]/50 hover:text-gray-300"
                    )}
                  >
                    Case {idx + 1}
                  </button>
                  {testCases.length > 1 && (
                    <button 
                      onClick={(e) => handleRemoveTestcase(e, idx)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-700 text-gray-500 opacity-0 group-hover/tab:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Input</label>
                <textarea
                  value={testCases[activeCaseTab]?.input || ''}
                  onChange={(e) => updateTestCase('input', e.target.value)}
                  className="w-full bg-[#2d2d2d] rounded-lg p-3 font-mono text-sm text-white border border-[#3d3d3d] focus:outline-none focus:border-gray-500 min-h-[80px] resize-none"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Expected Output</label>
                <textarea
                  value={testCases[activeCaseTab]?.output || ''}
                  onChange={(e) => updateTestCase('output', e.target.value)}
                  className="w-full bg-[#2d2d2d] rounded-lg p-3 font-mono text-sm text-gray-300 border border-[#3d3d3d] focus:outline-none focus:border-gray-500 min-h-[40px] resize-none"
                />
              </div>
            </div>
            
            <button 
              onClick={handleAddTestcase}
              className="mt-6 flex items-center gap-2 px-3 py-1.5 rounded bg-[#2d2d2d] hover:bg-[#363636] text-xs font-medium text-gray-300 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Testcase
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
