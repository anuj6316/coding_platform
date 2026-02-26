import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, 
  Menu, 
  Settings, 
  Lightbulb, 
  Clock, 
  ChevronDown,
  Search,
  Command,
  X
} from 'lucide-react';
import LANGUAGES from '../data/languages.json';

interface HeaderProps {
  language: string;
  setLanguage: (lang: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  onOpenProblems: () => void;
  isRunning: boolean;
}

export function Header({ language, setLanguage, onRun, onSubmit, onOpenProblems, isRunning }: HeaderProps) {
  const [time, setTime] = useState(0);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="h-14 bg-[#1e1e1e] border-b border-[#2d2d2d] flex items-center justify-between px-4 text-gray-400 shrink-0 z-20 relative">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-[#2d2d2d] rounded-md transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={onOpenProblems}
            className="p-1.5 hover:bg-[#2d2d2d] rounded-md transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        
        <div className="hidden md:flex items-center gap-2 bg-[#2d2d2d] px-3 py-1.5 rounded-md text-sm min-w-[240px] text-gray-500">
          <Search className="w-4 h-4" />
          <span className="flex-1 text-left">Search Problems...</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={onSubmit}
          disabled={isRunning}
          className="hidden sm:flex items-center gap-2 bg-green-600/10 text-green-500 px-4 py-1.5 rounded-md hover:bg-green-600/20 transition-colors font-medium text-sm border border-green-600/20 disabled:opacity-50"
        >
          {isRunning ? 'Submitting...' : 'Submit'}
        </button>

        <div className="flex items-center gap-2 bg-[#2d2d2d] px-3 py-1.5 rounded-md text-sm font-mono text-gray-300">
          <Clock className="w-4 h-4 text-gray-500" />
          <span>{formatTime(time)}</span>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 bg-[#2d2d2d] px-3 py-1.5 rounded-md text-sm hover:bg-[#363636] transition-colors text-gray-200 min-w-[140px] justify-between"
          >
            <span className="truncate max-w-[120px]">
              {LANGUAGES.find(l => l.name === language)?.name || "Select Language"}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          
          {showLangMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowLangMenu(false)} />
              <div className="absolute top-full right-0 mt-1 w-64 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md shadow-xl z-20 py-1 max-h-80 overflow-y-auto custom-scrollbar">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      setLanguage(lang.name);
                      setShowLangMenu(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm hover:bg-[#3d3d3d] transition-colors",
                      language === lang.name ? "text-white bg-[#3d3d3d]" : "text-gray-400"
                    )}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="h-6 w-px bg-[#2d2d2d] mx-1" />

        <button className="p-1.5 hover:bg-[#2d2d2d] rounded-md transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        
        <button className="p-1.5 hover:bg-[#2d2d2d] rounded-md transition-colors">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-[10px] text-white font-bold">
            A
          </div>
        </button>
      </div>
    </header>
  );
}
