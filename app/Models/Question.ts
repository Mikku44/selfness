// Define the structure for a single question
export interface Question {
    id: string;
    category: string;
    text: string;
    type: 'rating' | 'multiple-choice'; // Add more types if needed
    options?: { value: string | number; label: string }[]; // For multiple-choice
}