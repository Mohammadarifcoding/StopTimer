import React from 'react';

export default function TimerStatus() {
  return (
    <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
      <div className="relative">
        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
        <div className="absolute inset-0 h-2 w-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
      </div>
      Running
    </div>
  );
}