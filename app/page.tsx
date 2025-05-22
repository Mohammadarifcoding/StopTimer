"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EmptyState from "@/src/components/EmptyState";
import TimerCard from "@/src/components/TimerCard";
import { useToast } from "@/src/hooks/use-toast";
import { Timer } from "@/src/lib/types";
import { AnimatePresence } from "framer-motion";
import { Clock, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Image from "next/image";
import logo from "@/src/assets/logo/logo.png";
import Logo from "@/src/shared/Logo";
import Navbar from "@/src/shared/Navbar/Navbar";


export default function Home() {
  const [timers, setTimers] = useState<Timer[]>([])
  const [newTimerName, setNewTimerName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  // Load timers from localStorage on initial render
  useEffect(() => {
    const savedTimers = localStorage.getItem("timers")
    if (savedTimers) {
      try {
        setTimers(JSON.parse(savedTimers))
      } catch (error) {
        console.error("Failed to parse saved timers", error)
      }
    }
  }, [])

  // Save timers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers))
  }, [timers])

  // Update running timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((currentTimers) =>
        currentTimers.map((timer) => {
          if (timer.isRunning) {
            return {
              ...timer,
              elapsedTime: timer.elapsedTime + 1000,
            }
          }
          return timer
        }),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const createTimer = () => {
    if (!newTimerName.trim()) {
      toast({
        title: "Timer name required",
        description: "Please enter a name for your timer",
        variant: "destructive",
      })
      return
    }

    const newTimer: Timer = {
      id: Date.now().toString(),
      name: newTimerName.trim(),
      createdAt: new Date().toISOString(),
      elapsedTime: 0,
      isRunning: false,
      color: getRandomColor(),
    }

    setTimers([...timers, newTimer])
    setNewTimerName("")
    setIsDialogOpen(false)

    toast({
      title: "Timer created",
      description: `"${newTimerName}" has been added to your timers`,
    })
  }

  const startTimer = (id: string) => {
    setTimers(
      timers.map((timer) => {
        if (timer.id === id) {
          return { ...timer, isRunning: true }
        }
        return timer
      }),
    )
  }

  const pauseTimer = (id: string) => {
    setTimers(
      timers.map((timer) => {
        if (timer.id === id) {
          return { ...timer, isRunning: false }
        }
        return timer
      }),
    )
  }

  const resetTimer = (id: string) => {
    setTimers(
      timers.map((timer) => {
        if (timer.id === id) {
          return { ...timer, elapsedTime: 0, isRunning: false }
        }
        return timer
      }),
    )
  }

  const deleteTimer = (id: string) => {
    const timerToDelete = timers.find((timer) => timer.id === id)
    setTimers(timers.filter((timer) => timer.id !== id))

    toast({
      title: "Timer deleted",
      description: `"${timerToDelete?.name}" has been removed`,
    })
  }

  const getRandomColor = () => {
    const colors = ["bg-purple-600", "bg-blue-600", "bg-teal-600", "bg-amber-600", "bg-rose-600", "bg-indigo-600"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (

   <div className="min-h-screen bg-gray-950 text-white bg-background dot-pattern">
      {/* <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
<Logo />
            <h1 className="text-xl font-bold text-white">StopTimer</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white border-0 gap-2">
                <PlusCircle className="h-4 w-4" />
                Create Timer
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Timer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="timer-name" className="text-gray-300">
                    Timer Name
                  </Label>
                  <Input
                    id="timer-name"
                    placeholder="e.g., Coding, Reading, Exercise"
                    value={newTimerName}
                    onChange={(e) => setNewTimerName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") createTimer()
                    }}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Button onClick={createTimer} className="w-full bg-purple-600 hover:bg-purple-700 text-white border-0">
                  Create Timer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header> */}
      <Navbar/>

      <main className="container max-w-5xl mx-auto p-4 py-8">
        <AnimatePresence mode="wait">
          {timers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EmptyState onCreateClick={() => setIsDialogOpen(true)} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {timers.map((timer) => (
                  <motion.div
                    key={timer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TimerCard
                      timer={timer}
                      onStart={() => startTimer(timer.id)}
                      onPause={() => pauseTimer(timer.id)}
                      onReset={() => resetTimer(timer.id)}
                      onDelete={() => deleteTimer(timer.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
