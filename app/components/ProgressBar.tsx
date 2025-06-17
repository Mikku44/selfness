import React from 'react';

interface ProgressBarProps {
  progress: number; // Current progress value
  className?: string;
  fillColor?: string; // Fill color
  backgroundColor?: string; // Bar background
  showPercentage?: boolean; // Show percent or raw number
  showLabel?: boolean; // Show "ความคืบหน้า"
  maxProgress?: number; // Custom max value
  step?: {
    index: number;
    length: number;
  };
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
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
    <div className={`w-full ${className}`}>
      {/* Background bar */}
      <div className={`w-full h-4 ${backgroundColor} relative rounded-full overflow-hidden`}>
        {/* Fill bar */}
        <div
          className={`h-full ${fillColor} rounded-full absolute overflow-hidden transition-all duration-500 ease-out`}
          style={{ width: `${widthPercent}%` }}
        >
          <div className={`progess-bar ${fillColor}`} ></div>
        </div>

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
    </div>
  );
};

export default ProgressBar;
