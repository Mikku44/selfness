'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  onComplete: () => void;
  holdDuration?: number; // in milliseconds
  className?: string;
  label?: string;
};

export default function HoldToContinueButton({
  onComplete,
  holdDuration = 2000,
  className = '',
  label = 'Hold to Continue',
}: Props) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startHold = () => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / holdDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(intervalRef.current!);
        onComplete();
      }
    }, 16); // ~60fps
  };

  const cancelHold = () => {
    clearInterval(intervalRef.current!);
    setProgress(0);
  };

  return (
    <button
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      className={`relative overflow-hidden rounded-full px-6 py-3 bg-blue-600 text-white font-semibold ${className}`}
    >
      <span className="relative z-10">{label}</span>
      <motion.div
        className="absolute left-0 top-0 h-full bg-blue-400/50"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: 'linear', duration: 0.1 }}
      />
    </button>
  );
}


// <HoldToContinueButton
//   onComplete={() => alert('Action triggered!')}
//   holdDuration={2000}
// />