import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { motion } from 'framer-motion';

// Assuming your bubble.css contains the definition for the 'animate' class
// and the 'bubbly-button' base styles.
import '../css/bubble.css';

type BubblyButtonProps = {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement> | MouseEvent | TouchEvent | PointerEvent | null) => void;
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
    // State to manage the 'animate' class
    const [isAnimating, setIsAnimating] = useState(false);

    // This useEffect replaces your setTimeout logic
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (isAnimating) {
            timeoutId = setTimeout(() => {
                setIsAnimating(false);
            }, 1000); // ANIMATION_DURATION is 1000ms
             const timer = setTimeout(() => {
                const flipSound = new Audio("/sfx/start.mp3")
                flipSound.play()
        
            }, 200)
        }

        
        // Cleanup function for the timeout
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isAnimating]); // Re-run effect when isAnimating changes

    // Your onClick handler from the original component
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement> | MouseEvent | TouchEvent | PointerEvent | null) => {
        if (disabled) return;

        // Trigger the animation by setting state
        setIsAnimating(true);

        // Call the original onClick prop if provided
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <>
        
        <motion.button
            // Pass the ref to motion.button for direct DOM access if absolutely needed,
            // though for class toggling, state is often cleaner.
            // ref={buttonRef} // You could still pass this if you need it for other non-animation purposes

            // Combine your base class with the conditionally added 'animate' class
            className={`bubbly-button ${className} ${isAnimating ? 'animate' : ''}`.trim()}

            // Use Framer Motion's 'onTap' event to trigger your class logic
            onTap={(event, info) => {
                // Framer Motion's onTap provides a different event object.
                // Cast or convert if your onClick specifically needs a React.MouseEvent.
                // For simplicity here, we'll pass the original event if it's a MouseEvent,
                // otherwise null or a generic Event.
                handleButtonClick(event as unknown as React.MouseEvent<HTMLButtonElement>);
            }}

            // Optional: You can still add Framer Motion's direct style animations
            // for subtle visual feedback that's integrated with Framer Motion's physics.
            whileTap={{
                scale: 0.95, // Slight squash effect on tap
                transition: { type: "spring", stiffness: 300, damping: 10 }
            }}
            whileHover={!disabled ? { scale: 1.02 } : {}} // Optional hover effect
            initial={{ scale: 1 }} // Initial state

            disabled={disabled}
            type={type}
        >
            {children}
        </motion.button>
        </>
    );
};

export default BubblyButton;