'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type QuickEventProps = {
  trigger: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
};

export default function QuickEvent({ trigger, onClose, children }: QuickEventProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsOpen(true);
    }
  }, [trigger]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 text-white"
          initial={{ opacity: 0, }}
          animate={{ opacity: 1,}}
          exit={{ opacity: 0,  }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="absolute top-4 right-4">
            <button
              onClick={handleClose}
              className="text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded"
            >
              ✕ Close
            </button>
          </div>
          <div className="p-6 max-w-md text-center">{children ?? 'Quick Event Triggered!'}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


//   <QuickEvent trigger={trigger} onClose={() => setTrigger(false)}>
//         <h1 className="text-2xl font-bold">This is a full screen quick event!</h1>
//       </QuickEvent>