import '~/css/bubbleChat.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function BubbleChat({
    text = "",
    className = "",
    delay = 0,
}: {
    text?: string;
    className?: string;
    delay?: number;
}) {
    const [IsHidden, setIsHidden] = useState(false);
    if(!IsHidden)
    return (
        <AnimatePresence>
            <motion.div
                className={`bubble-chat bubble w-fit shadow-sm hover:-translate-y-1 hover:scale-105 duration-150 ${className}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay, duration: 0.1, ease: 'easeOut' }}
                exit={{ opacity: 0, y: 20 }}
                // onClick={()=> setIsHidden(true)}
            >
                {text}
            </motion.div>
        </AnimatePresence>
    );
}
