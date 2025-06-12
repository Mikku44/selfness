// Example: app/components/ClickSoundButton.tsx

import React, { useRef } from 'react';
import BubblyButton from './BubbleButton';

interface ClickSoundButtonProps {
  children: React.ReactNode;
  soundSrc?: string; // Optional prop to specify sound source
  onClick?: () => void; // Original onClick handler
  className?: string; // For Tailwind or other styling
  type?: string; // For Tailwind or other styling
  disabled?: boolean;
  animate?:boolean;
}

const Click: React.FC<ClickSoundButtonProps> = ({
  children,
  soundSrc = '/sfx/correct.mp3', // Default sound source
  onClick,
  className,
  type = "button",
  disabled = false,
  animate = false,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null); // Create a ref for the audio element

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Rewind to start if already playing or played
      audioRef.current.play().catch(error => {
        // Catch potential errors, e.g., user hasn't interacted with the document yet
        // or browser blocking autoplay
        console.error('Error playing sound:', error);
      });
    }
    onClick?.(); // Call the original onClick handler if provided
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={soundSrc} preload="auto" />

      {/* The button or element that triggers the sound */}
      {animate ?
        <BubblyButton onClick={handleClick}
          disabled={disabled as any}
          className={` ${className}`}
          type={type as any}>
          {children}
        </BubblyButton>
        : <button
          onClick={handleClick}
          disabled={disabled as any}
          className={` ${className}`}
          type={type as any}
        >
          {children}
        </button>}
    </>
  );
};

export default Click;