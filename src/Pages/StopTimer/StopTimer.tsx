import EmptyState from '@/src/components/EmptyState';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer } from '@/src/lib/types';
import { Slot } from '@radix-ui/react-slot';

const StopTimer = ({timers}: {timers: Timer[]}) => {

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
              <EmptyState  />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* <AnimatePresence>
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
              </AnimatePresence> */}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    );
};

export default StopTimer;