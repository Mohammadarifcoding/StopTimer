import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatTime } from "@/src/lib/formateTime"
import { Timer } from "@/src/lib/types"
import { MoreVertical, Pause, Play, RotateCcw, Trash2 } from "lucide-react"
import { useState } from "react"
import { motion } from 'framer-motion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import TimeCardHeader from "../shared/TimeCard/TimeCardHeader"
import TimerDisplay from "../shared/TimeCard/TimerDisplay"
import TimerControls from "../shared/TimeCard/TimerControls"
import TimerStatus from "../shared/TimeCard/TimerStatus"
import DeleteDialog from "../shared/TimeCard/DeleteDialog"

interface TimerCardProps {
  timer: Timer
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onDelete: () => void
}

export default function TimerCard({ timer, onStart, onPause, onReset, onDelete }: TimerCardProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  const { hours, minutes, seconds } = formatTime(timer.elapsedTime)

  return (
     <Card className="overflow-hidden bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-md w-full max-w-sm mx-auto">
      <div className={`sm:block hidden h-1.5 w-full ${timer.color}`}></div>
      <div className="p-4 sm:p-5">
        <TimeCardHeader
          name={timer.name}
          onReset={onReset}
          onDeleteTrigger={() => setShowDeleteAlert(true)}
        />
        <div className="flex items-center justify-between ">
 <TimerDisplay hours={hours} minutes={minutes} seconds={seconds} isRunning={timer.isRunning} />
 <TimerControls
          isRunning={timer.isRunning}
          onPause={onPause}
          onStart={onStart}
          onReset={onReset}
          color={timer.color}
        />
        </div>
       

       
         {
          timer.isRunning && <TimerStatus />

         }
        
        <DeleteDialog
          open={showDeleteAlert}
          onOpenChange={() => setShowDeleteAlert(false)}
          onDelete={onDelete}
          timerName={timer.name}
        />
      </div>
    </Card>
  )
}
