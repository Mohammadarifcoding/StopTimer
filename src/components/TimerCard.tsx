import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatTime } from "@/src/lib/formateTime"
import { Timer } from "@/src/lib/types"
import { MoreVertical, Pause, Play, RotateCcw, Trash2 } from "lucide-react"
import { useState } from "react"
import { motion } from 'framer-motion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

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
    <Card className="overflow-hidden bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-md">
      {/* Color top bar */}
      <div className={`h-1.5 w-full ${timer.color}`}></div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium truncate text-white" title={timer.name}>
            {timer.name}
          </h3>
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
              <DropdownMenuItem
                onClick={() => setShowDeleteAlert(true)}
                className="text-red-400 gap-2 hover:bg-gray-800 focus:bg-gray-800 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-center py-6">
          <div
            className={`text-5xl font-mono font-bold tracking-wider ${
              timer.isRunning ? "text-white" : "text-gray-300"
            }`}
          >
            <motion.span
              animate={timer.isRunning ? { opacity: [1, 0.7, 1] } : { opacity: 1 }}
              transition={{ repeat: timer.isRunning ? Number.POSITIVE_INFINITY : 0, duration: 2 }}
            >
              {hours}
            </motion.span>
            :
            <motion.span
              animate={timer.isRunning ? { opacity: [1, 0.7, 1] } : { opacity: 1 }}
              transition={{ repeat: timer.isRunning ? Number.POSITIVE_INFINITY : 0, duration: 2, delay: 0.3 }}
            >
              {minutes}
            </motion.span>
            :
            <motion.span
              animate={timer.isRunning ? { opacity: [1, 0.7, 1] } : { opacity: 1 }}
              transition={{ repeat: timer.isRunning ? Number.POSITIVE_INFINITY : 0, duration: 2, delay: 0.6 }}
              className={timer.isRunning ? "text-purple-400" : ""}
            >
              {seconds}
            </motion.span>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          {timer.isRunning ? (
            <Button
              onClick={onPause}
              variant="outline"
              className="flex-1 bg-transparent border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-white gap-2"
            >
              <Pause className="h-4 w-4" /> Pause
            </Button>
          ) : (
            <Button onClick={onStart} className={`flex-1 ${timer.color} hover:opacity-90 text-white border-0 gap-2`}>
              <Play className="h-4 w-4" /> Start
            </Button>
          )}

          <Button
            onClick={onReset}
            variant="outline"
            className="bg-transparent border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-white"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Status indicator */}
        {timer.isRunning && (
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
            <div className="relative">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <div className="absolute inset-0 h-2 w-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
            </div>
            Running
          </div>
        )}
      </div>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Timer</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete "{timer.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700 text-white border-0">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
