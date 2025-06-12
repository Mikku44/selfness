// app/components/FlashcardPersona.tsx
import React from 'react';
import PlayingCards from './CardPersona';

interface Flashcard {
    title: string;
    description: string;
    emoji: string;
    colorClass: string;
}

interface FlashcardPersonaProps {
    persona: Flashcard;
}

const FlashcardPersona: React.FC<FlashcardPersonaProps> = ({ persona }) => {
    return (
        <div className={`p-8 text-center  mb-10`}>
            <PlayingCards emoji={persona?.emoji} />
            {/* <p className="text-6xl mb-4">{persona.emoji}</p> */}
            <h2 className="text-4xl font-bold mb-4">{persona.title}</h2>
            <p className="text-lg leading-relaxed">{persona.description}</p>
        </div>
    );
};

export default FlashcardPersona;