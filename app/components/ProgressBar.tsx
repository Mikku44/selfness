import React from 'react';

interface ProgressBarProps {
  /**
   * The current progress value (0-100).
   */
  progress: number;
  /**
   * Optional: Tailwind CSS class names for the outer container.
   */
  className?: string;
  /**
   * Optional: Color of the progress bar fill (Tailwind color class, e.g., 'bg-blue-500').
   * Default is 'bg-[#5a67d8]'.
   */
  fillColor?: string;
  /**
   * Optional: Color of the progress bar background (Tailwind color class, e.g., 'bg-gray-200').
   * Default is 'bg-gray-200'.
   */
  backgroundColor?: string;
  /**
   * Optional: Whether to display the percentage text.
   * Default is true.
   */
  showPercentage?: boolean;
  step?: {
    index:number, // current step
    length:number // step length
  };
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className = '',
  fillColor = 'bg-[#5a67d8]', // Selfness primary color
  backgroundColor = 'bg-gray-200',
  showPercentage = true,
  step = null,
}) => {
  // Ensure progress is clamped between 0 and 100
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={`w-full  ${className}`}>
      {/* Background bar */}
      <div className={`w-full h-4 ${backgroundColor} relative rounded-full overflow-hidden`}>
        {/* Fill bar */}
        <div
          className={`h-full ${fillColor} rounded-full absolute overflow-hidden transition-all  duration-500 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        >
          <div className={`progess-bar`} ></div>
        </div>
      </div>
      {/* Percentage text */}
      <div className="flex justify-between mt-2">
        <div className="text-gray-700 ">ความคืบหน้า {step && `${step.index} / ${step.length}`}</div>
        {showPercentage && (
          <div className="text-right text-sm font-semibold text-gray-700 ">
            {(clampedProgress.toFixed(2))}%
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;