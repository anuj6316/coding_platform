import React, { useState, useCallback, useEffect } from 'react';

interface ResizablePanelProps {
  left: React.ReactNode;
  right: React.ReactNode;
  initialLeftWidth?: number; // percentage
}

export function ResizablePanelHorizontal({ left, right, initialLeftWidth = 40 }: ResizablePanelProps) {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newWidth = (e.clientX / window.innerWidth) * 100;
      if (newWidth > 10 && newWidth < 90) {
        setLeftWidth(newWidth);
      }
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="flex h-full w-full">
      <div style={{ width: `${leftWidth}%` }} className="h-full overflow-hidden">
        {left}
      </div>
      <div 
        className="w-1.5 bg-[#0f0f0f] hover:bg-blue-500/50 cursor-col-resize transition-colors z-10 flex items-center justify-center"
        onMouseDown={handleMouseDown}
      >
        <div className="w-0.5 h-8 bg-gray-700 rounded-full" />
      </div>
      <div style={{ width: `${100 - leftWidth}%` }} className="h-full overflow-hidden">
        {right}
      </div>
    </div>
  );
}

interface ResizablePanelVerticalProps {
  top: React.ReactNode;
  bottom: React.ReactNode;
  initialTopHeight?: number; // percentage
}

export function ResizablePanelVertical({ top, bottom, initialTopHeight = 60 }: ResizablePanelVerticalProps) {
  const [topHeight, setTopHeight] = useState(initialTopHeight);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      // Need to calculate relative to the container, but window height is fine for full screen apps usually.
      // Better to use a ref for the container but let's try window first for simplicity as it's a full screen app.
      // Actually, the vertical split is inside the right panel, so window.innerHeight might be wrong if header is present.
      // Let's use movementY for simplicity or just relative to window minus header.
      // Header is 56px (h-14).
      const headerHeight = 56;
      const availableHeight = window.innerHeight - headerHeight;
      const relativeY = e.clientY - headerHeight;
      const newHeight = (relativeY / availableHeight) * 100;
      
      if (newHeight > 10 && newHeight < 90) {
        setTopHeight(newHeight);
      }
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="flex flex-col h-full w-full">
      <div style={{ height: `${topHeight}%` }} className="w-full overflow-hidden">
        {top}
      </div>
      <div 
        className="h-1.5 bg-[#0f0f0f] hover:bg-blue-500/50 cursor-row-resize transition-colors z-10 flex items-center justify-center"
        onMouseDown={handleMouseDown}
      >
        <div className="h-0.5 w-8 bg-gray-700 rounded-full" />
      </div>
      <div style={{ height: `${100 - topHeight}%` }} className="w-full overflow-hidden">
        {bottom}
      </div>
    </div>
  );
}
