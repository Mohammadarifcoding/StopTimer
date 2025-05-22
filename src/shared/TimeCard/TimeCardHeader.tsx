// TimerCardHeader.tsx
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, RotateCcw, Trash2 } from "lucide-react";

interface Props {
  name: string;
  onReset: () => void;
  onDeleteTrigger: () => void;
}

export default function TimeCardHeader ({ name, onReset, onDeleteTrigger }: Props) {
  return (
    <div className="sm:mb-4 mb-0">
      <div className="flex justify-between items-start sm:mt-5 mt-0">
        <h3 className="text-lg font-medium truncate text-white" title={name}>{name}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800 text-gray-200">
            <DropdownMenuItem onClick={onReset} className="gap-2 hover:bg-gray-800 focus:bg-gray-800">
              <RotateCcw className="h-4 w-4" /> Reset
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDeleteTrigger} className="text-red-400 gap-2 hover:bg-gray-800 focus:bg-gray-800 hover:text-red-300">
              <Trash2 className="h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}