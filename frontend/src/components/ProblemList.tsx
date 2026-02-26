import React from 'react';
import { Problem } from '@/types';
import { X, CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProblemListProps {
  isOpen: boolean;
  onClose: () => void;
  problems: Problem[];
  currentProblemId: string;
  onSelectProblem: (problem: Problem) => void;
}

export function ProblemList({ isOpen, onClose, problems, currentProblemId, onSelectProblem }: ProblemListProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#1e1e1e] border-r border-[#3d3d3d] h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
        <div className="h-14 border-b border-[#2d2d2d] flex items-center justify-between px-4 bg-[#252525]">
          <h2 className="font-medium text-white">Problem List</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#3d3d3d] rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {problems.map((problem) => (
            <button
              key={problem.id}
              onClick={() => {
                onSelectProblem(problem);
                onClose();
              }}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-lg mb-2 transition-colors border text-left group",
                currentProblemId === problem.id
                  ? "bg-[#2d2d2d] border-blue-500/50"
                  : "bg-[#1e1e1e] border-transparent hover:bg-[#2d2d2d] hover:border-[#3d3d3d]"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "mt-1 w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                  currentProblemId === problem.id ? "border-green-500 text-green-500" : "border-gray-600 text-transparent"
                )}>
                  {currentProblemId === problem.id && <div className="w-2 h-2 rounded-full bg-green-500" />}
                </div>
                <div>
                  <h3 className={cn(
                    "font-medium mb-1",
                    currentProblemId === problem.id ? "text-white" : "text-gray-300 group-hover:text-white"
                  )}>
                    {problem.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={cn(
                      "font-medium",
                      problem.difficulty === 'Easy' && "text-green-400",
                      problem.difficulty === 'Medium' && "text-yellow-400",
                      problem.difficulty === 'Hard' && "text-red-400"
                    )}>
                      {problem.difficulty}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{problem.category}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
