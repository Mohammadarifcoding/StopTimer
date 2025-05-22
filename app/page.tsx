"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EmptyState from "@/src/components/EmptyState";
import TimerCard from "@/src/components/TimerCard";
import { useToast } from "@/src/hooks/use-toast";
import { Timer } from "@/src/lib/types";
import { AnimatePresence } from "framer-motion";
import { Clock, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/src/assets/logo/logo.png";
import Logo from "@/src/shared/Logo";
import Navbar from "@/src/shared/Navbar/Navbar";
import manageTime from "@/src/lib/manageTime";
import StopTimer from "@/src/Pages/StopTimer/StopTimer";

export default function Home() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [newTimerName, setNewTimerName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load timers from localStorage on initial render
  useEffect(() => {
    const savedTimers = manageTime.getTimers();
    if (savedTimers.length > 0) {
      try {
        setTimers([...savedTimers]);
      } catch (error) {
        toast({
          title: "Error loading timers",
          description:
            "There was an error loading your timers. Please try again.",
          variant: "destructive",
        });
      }
    }
  }, []);

  // // Save timers to localStorage whenever they change
  useEffect(() => {
    manageTime.setTimes(timers)
  }, [timers])

  // // Update running timers every second
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimers((currentTimers) =>
  //       currentTimers.map((timer) => {
  //         if (timer.isRunning) {
  //           return {
  //             ...timer,
  //             elapsedTime: timer.elapsedTime + 1000,
  //           }
  //         }
  //         return timer
  //       }),
  //     )
  //   }, 1000)

  //   return () => clearInterval(interval)
  // }, [])

  // const createTimer = () => {
  //   if (!newTimerName.trim()) {
  //     toast({
  //       title: "Timer name required",
  //       description: "Please enter a name for your timer",
  //       variant: "destructive",
  //     })
  //     return
  //   }

  //   const newTimer: Timer = {
  //     id: Date.now().toString(),
  //     name: newTimerName.trim(),
  //     createdAt: new Date().toISOString(),
  //     elapsedTime: 0,
  //     isRunning: false,
  //     color: getRandomColor(),
  //   }

  //   setTimers([...timers, newTimer])
  //   setNewTimerName("")
  //   setIsDialogOpen(false)

  //   toast({
  //     title: "Timer created",
  //     description: `"${newTimerName}" has been added to your timers`,
  //   })
  // }

  // const startTimer = (id: string) => {
  //   setTimers(
  //     timers.map((timer) => {
  //       if (timer.id === id) {
  //         return { ...timer, isRunning: true }
  //       }
  //       return timer
  //     }),
  //   )
  // }

  // const pauseTimer = (id: string) => {
  //   setTimers(
  //     timers.map((timer) => {
  //       if (timer.id === id) {
  //         return { ...timer, isRunning: false }
  //       }
  //       return timer
  //     }),
  //   )
  // }

  // const resetTimer = (id: string) => {
  //   setTimers(
  //     timers.map((timer) => {
  //       if (timer.id === id) {
  //         return { ...timer, elapsedTime: 0, isRunning: false }
  //       }
  //       return timer
  //     }),
  //   )
  // }

  // const deleteTimer = (id: string) => {
  //   const timerToDelete = timers.find((timer) => timer.id === id)
  //   setTimers(timers.filter((timer) => timer.id !== id))

  //   toast({
  //     title: "Timer deleted",
  //     description: `"${timerToDelete?.name}" has been removed`,
  //   })
  // }

  // const getRandomColor = () => {
  //   const colors = ["bg-purple-600", "bg-blue-600", "bg-teal-600", "bg-amber-600", "bg-rose-600", "bg-indigo-600"]
  //   return colors[Math.floor(Math.random() * colors.length)]
  // }

  return (
    <div className="min-h-screen bg-gray-950 text-white bg-background dot-pattern">
      <Navbar />

      <main className="container max-w-5xl mx-auto p-4 py-8">
        <StopTimer timers={timers} />
      </main>
    </div>
  );
}
