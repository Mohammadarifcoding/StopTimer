import { motion } from "framer-motion";

interface Props {
  hours: string;
  minutes: string;
  seconds: string;
  isRunning: boolean;
}

export default function TimerDisplay({ hours, minutes, seconds, isRunning }: Props) {
  return (
    <div className="flex justify-center py-6">
      <div className={`text-5xl font-mono font-bold tracking-wider ${isRunning ? "text-white" : "text-gray-300"}`}>
        <motion.span animate={isRunning ? { opacity: [1, 0.7, 1] } : { opacity: 1 }} transition={{ repeat: isRunning ? Infinity : 0, duration: 2 }}>{hours}</motion.span>
        :
        <motion.span animate={isRunning ? { opacity: [1, 0.7, 1] } : { opacity: 1 }} transition={{ repeat: isRunning ? Infinity : 0, duration: 2, delay: 0.3 }}>{minutes}</motion.span>
        :
        <motion.span animate={isRunning ? { opacity: [1, 0.7, 1] } : { opacity: 1 }} transition={{ repeat: isRunning ? Infinity : 0, duration: 2, delay: 0.6 }} className={isRunning ? "text-purple-400" : ""}>{seconds}</motion.span>
      </div>
    </div>
  );
}