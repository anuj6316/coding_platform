import React from 'react';
import { Problem } from '@/types';
import { FileText, CheckCircle2, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProblemDescriptionProps {
  problem: Problem;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-gray-300 overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center border-b border-[#2d2d2d] bg-[#1e1e1e]">
        <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-white border-b-2 border-white bg-[#2d2d2d]/30">
          <FileText className="w-4 h-4 text-blue-400" />
          Description
        </button>
        <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-300 transition-colors">
          <CheckCircle2 className="w-4 h-4" />
          Solution
        </button>
        <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-300 transition-colors">
          <CheckCircle2 className="w-4 h-4" />
          Submission
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
          <div className="flex items-center gap-2">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-medium bg-[#2d2d2d]",
              problem.difficulty === 'Easy' && "text-green-400",
              problem.difficulty === 'Medium' && "text-yellow-400",
              problem.difficulty === 'Hard' && "text-red-400"
            )}>
              {problem.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#2d2d2d] text-gray-400">
              {problem.category}
            </span>
            <button className="p-1.5 hover:bg-[#2d2d2d] rounded transition-colors text-gray-500 hover:text-white">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="mb-8 text-sm leading-relaxed whitespace-pre-line">
            {problem.description}
          </div>

          {problem.examples.map((example) => (
            <div key={example.id} className="mb-6">
              <h3 className="text-white font-medium mb-2">Example {example.id}</h3>
              <div className="bg-[#2d2d2d] rounded-lg p-4 font-mono text-sm border-l-4 border-[#3d3d3d]">
                <div className="mb-1"><span className="text-gray-400">Input:</span> <span className="text-white">{example.input}</span></div>
                <div className="mb-1"><span className="text-gray-400">Output:</span> <span className="text-white">{example.output}</span></div>
                {example.explanation && (
                  <div><span className="text-gray-400">Explanation:</span> <span className="text-gray-300">{example.explanation}</span></div>
                )}
              </div>
            </div>
          ))}

          <div className="mt-8">
            <h3 className="text-white font-medium mb-3">Constraints:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              {problem.constraints.map((constraint, idx) => (
                <li key={idx} className="font-mono bg-[#2d2d2d]/50 px-2 py-1 rounded w-fit">{constraint}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
