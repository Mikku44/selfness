import React, { useRef } from 'react';
import '../css/bubble.css'; // Your converted CSS file

type BubblyButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

const BubblyButton: React.FC<BubblyButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const ANIMATION_DURATION = 1000;

  const animateButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Don't prevent default unless you have a specific reason
    // e.preventDefault();

    const button = buttonRef.current;
    if (!button || disabled) return;

    // Remove existing animation class
    button.classList.remove('animate');

    // Force reflow to ensure the class removal takes effect
    void button.offsetHeight;

    // Add animation class
    button.classList.add('animate');

    // Remove animation class after duration
    setTimeout(() => {
      button.classList.remove('animate');
    }, ANIMATION_DURATION);

    // Call the onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`bubbly-button ${className}`.trim()}
      onClick={animateButton}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default BubblyButton;