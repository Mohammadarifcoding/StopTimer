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
    <div className="flex gap-3 mt-4">
      {isRunning ? (
        <Button onClick={onPause} variant="outline" className="flex-1 bg-transparent border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-white gap-2">
          <Pause className="h-4 w-4" /> Pause
        </Button>
      ) : (
        <Button onClick={onStart} className={`flex-1 ${color} hover:opacity-90 text-white border-0 gap-2`}>
          <Play className="h-4 w-4" /> Start
        </Button>
      )}
      <Button onClick={onReset} variant="outline" className="bg-transparent border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-white">
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
}