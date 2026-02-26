import React from 'react';
import Editor from '@monaco-editor/react';
import { Play, MoreHorizontal, AlignLeft } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (value: string | undefined) => void;
  onRun: () => void;
  isRunning: boolean;
}

export function CodeEditor({ code, language, onChange, onRun, isRunning }: CodeEditorProps) {
  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] border-l border-[#2d2d2d]">
      {/* Toolbar */}
      <div className="h-10 flex items-center justify-between px-4 border-b border-[#2d2d2d] bg-[#1e1e1e]">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Code Editor
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-400 hover:text-white hover:bg-[#2d2d2d] rounded transition-colors">
            <AlignLeft className="w-3.5 h-3.5" />
            Format
          </button>
          <button 
            onClick={onRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isRunning ? 'Running...' : 'Run'}
          </button>
          <button className="p-1 hover:bg-[#2d2d2d] rounded text-gray-400 hover:text-white">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={onChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            fontFamily: "'JetBrains Mono', monospace",
            renderLineHighlight: 'line',
            contextmenu: true,
          }}
          beforeMount={(monaco) => {
            monaco.editor.defineTheme('custom-dark', {
              base: 'vs-dark',
              inherit: true,
              rules: [],
              colors: {
                'editor.background': '#1e1e1e',
                'editor.lineHighlightBackground': '#2d2d2d',
              }
            });
          }}
          onMount={(editor, monaco) => {
            monaco.editor.setTheme('custom-dark');
          }}
        />
      </div>

      {/* Status Bar */}
      <div className="h-8 border-t border-[#2d2d2d] flex items-center justify-between px-4 text-xs text-gray-500 bg-[#1e1e1e]">
        <div className="flex items-center gap-4">
          <button className="hover:text-gray-300 flex items-center gap-1">
            <ClockIcon className="w-3 h-3" /> History
          </button>
        </div>
        <div className="flex items-center gap-4 font-mono uppercase">
          <span>Ln 54, Col 6</span>
          <span>{language}</span>
        </div>
      </div>
    </div>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
