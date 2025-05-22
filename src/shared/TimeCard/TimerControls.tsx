import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

interface Props {
  isRunning: boolean;
  color: string;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function TimerControls({ isRunning, color, onStart, onPause, onReset }: Props) {
  return (
    <div className="flex gap-3 sm:mt-4 ">
      {isRunning ? (
        <Button onClick={onPause} variant="outline" className="flex-1 p-3 bg-transparent border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-white gap-2">
          <Pause className="h-4 w-4" />   <span className="sm:block hidden">Pause</span>
        </Button>
      ) : (
        <Button onClick={onStart} className={`flex-1 ${color} p-3 hover:opacity-90 text-white border-0 gap-2`}>
          <Play className="h-4 w-4" /> <span  className="sm:block hidden">Start</span> 
        </Button>
      )}
      <Button onClick={onReset} variant="outline" className="bg-transparent p-3 border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-white">
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
}