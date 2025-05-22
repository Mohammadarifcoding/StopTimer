import EmptyState from '@/src/components/EmptyState';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer } from '@/src/lib/types';
import { Slot } from '@radix-ui/react-slot';
import TimerCard from '@/src/components/TimerCard';
import manageTime from '@/src/lib/manageTime';
import { access } from '@/app/page';




const StopTimer = ({timers, access ,createTime}: {timers: Timer[], access :access , createTime: (name: string) => void}) => {

      // Update running timers every second

    return (
       <main className="container max-w-5xl mx-auto p-4 py-8">
        <AnimatePresence mode="wait">
          {timers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EmptyState createTime={createTime}  />
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
                      onStart={() => access.startTimer(timer.id)}
                      onPause={() => access.pauseTimer(timer.id)}
                      onReset={() => access.resetTimer(timer.id)}
                      onDelete={() => access.deleteTimer(timer.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    );
};

export default StopTimer;