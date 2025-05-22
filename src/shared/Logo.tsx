import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function Logo () {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        className=""
      >
        <div className="bg-purple-600 p-2 rounded-full">
          <Clock className="h-5 w-5 text-white" />
        </div>
      </motion.div>
    );
};
