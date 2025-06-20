import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  visible?: boolean; // 👈 new prop to control visibility
  className?: string;
  fillColor?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  showLabel?: boolean;
  maxProgress?: number;
  step?: {
    index: number;
    length: number;
  };
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  visible = true,
  className = '',
  fillColor = 'bg-[#5a67d8]',
  backgroundColor = 'bg-gray-200',
  showPercentage = true,
  showLabel = true,
  maxProgress,
  step = null,
}) => {
  const isCustomMax = typeof maxProgress === 'number';
  const max = isCustomMax ? maxProgress : 100;
  const clampedProgress = Math.max(0, Math.min(progress, max));
  const widthPercent = (clampedProgress / max) * 100;

  return (
    <motion.div
      className={`w-full ${className}`}
      // initial={{ opacity: 0, y: -30 }}
      // animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      // transition={{ duration: 0.2 }}
    >
      {/* Background bar */}
      <div className={`w-full h-4 ${backgroundColor} relative rounded-full overflow-hidden`}>
        {/* Fill bar */}
        <motion.div
          className={`h-full ${fillColor} rounded-full absolute transition-all duration-200 ease-out`}
          initial={{ width: 0 }}
          animate={{ width: `${widthPercent}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-2">
        {showLabel && (
          <div className="text-gray-700">
            ความคืบหน้า {step && `${step.index} / ${step.length}`}
          </div>
        )}
        {showPercentage && (
          <div className="text-right text-sm font-semibold text-gray-700">
            {isCustomMax
              ? `${clampedProgress} / ${max}`
              : `${widthPercent.toFixed(2)}%`}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProgressBar;
