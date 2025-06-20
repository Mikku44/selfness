import { motion } from "framer-motion";
import { ReactNode } from "react";


interface ExpandingCircleProps {
  className?: string;
  color?: string;
  duration?: number;
  delay?: number;
  children?: ReactNode;
  onComplete?: () => void;
}

export default function ExpandingCircle({
  className = "",
  color = "bg-[--quinary-color]",
  duration = 0.8,
  delay = 0,
  children = null,
  onComplete,
}: ExpandingCircleProps) {
  return (
    <>
      <motion.div
        className={`fixed top-1/2 left-1/2 size-10 rounded-full z-50 ${color} ${className}`}
        initial={{ scale: 0, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: 100 }}
        transition={{ duration, delay, ease: "easeInOut" }}
        onAnimationComplete={onComplete}
      >
      </motion.div>
      <div className="fixed z-[99]">
        {children}
      </div>
    </>
  );
}
