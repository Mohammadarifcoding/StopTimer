
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Clock, PlusCircle } from 'lucide-react';

interface EmptyStateProps {
  onCreateClick: () => void
}


export default function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-gray-800 rounded-xl bg-gray-900">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        className="mb-6"
      >
        <div className="bg-purple-600 p-6 rounded-full">
          <Clock className="h-12 w-12 text-white" />
        </div>
      </motion.div>

      <motion.h3
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold mb-2 text-white"
      >
        No timers yet
      </motion.h3>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 text-center mb-8 max-w-md"
      >
        Create your first timer to start tracking how much time you spend on different activities.
      </motion.p>

      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
        <Button
          onClick={onCreateClick}
          className="bg-purple-600 hover:bg-purple-700 text-white border-0 gap-2 px-6 py-6 text-lg"
        >
          <PlusCircle className="h-5 w-5" />
          Create Your First Timer
        </Button>
      </motion.div>
    </div>
  )
}
