import { Question } from "~/Models/Question";

// Define a scoring map for multiple-choice options.
// Adjust these values based on how you want to weight each response.
export const MULTIPLE_CHOICE_SCORING: { [key: string]: number } = {
    // Communication Confidence (q1_x)
    'very_anxious': 1,
    'moderately_anxious': 2,
    'confident': 3,
    'very_confident': 4,

    'rarely_speak': 1,
    'hesitate': 2,
    'speak_often': 3,
    'lead_discussion': 4, // Used in q1_2 and q1_4

    'avoid': 1,
    'wait': 2,
    'initiate_cautiously': 3,
    'initiate_easily': 4,

    'keep_silent': 1,
    'express_if_asked': 2,
    'express_politely': 3,

    // Social Skills (q2_x)
    'very_difficult': 1,
    'moderate': 2,
    'easy': 3,
    'very_easy': 4,

    'wait_always': 1,
    'mix': 2,
    'approach_always': 3, // Slightly less proactive than lead_interactions
    'lead_interactions': 4,

    'very_uncomfortable': 1,
    'uncomfortable': 2,
    'comfortable': 3,
    'very_comfortable': 4,

    'struggle_to_adapt': 1,
    'slow_adapt': 2,
    'easy_adapt': 3,
    'highly_adaptable': 4,


    // Anxiety & Mindset Management (q3_x)
    'extremely_concerned': 1,
    'highly_concerned': 2,
    'slightly_concerned': 3,
    'not_concerned': 4,

    'prevents_speaking': 1,
    'hesitate_greatly': 2,
    'speak_with_caution': 3,
    'no_impact': 4,

    'blame': 1,
    'learn': 3,
    'seek_feedback': 4,

    'very_low_confidence': 1,
    'low_confidence': 2,
    'high_confidence': 3,
    'very_high_confidence': 4,

    // Clarity & Effectiveness (q4_x)
    'very_poorly': 1,
    'poorly': 2,
    'well': 3,
    'excellently': 4,

    'not_at_all': 1,
    'slightly_confident': 2,
    'quite_confident': 3,

    'very_poor_listener': 1,
    'poor_listener': 2,
    'good_listener': 3,
    'excellent_listener': 4,

    'interrupt': 1,
    'listen': 3,
    'active_listener': 4,

    'not_at_all_aligned': 1,
    'poorly_aligned': 2,
    'well_aligned': 3,
    'perfectly_aligned': 4,

    'no_awareness': 1,
    'low_awareness': 2,
    'high_awareness': 3,
    'full_awareness': 4,

    // Conflict Management (q5_x)
    'never_express': 1,
    'indirectly_express': 2,
    'express_respectfully': 3,
    'constructively_challenge': 4,

    'avoid_mediation': 1,
    'take_sides': 2,
    'seek_mutual_ground': 3,
    'facilitate_win_win': 4,
};

export function calculateAssessmentScores(
    questions: Question[],
    answers: { [key: string]: string } // answers will store option.value as string
) {
    const categoryScores: { [category: string]: { totalScore: number; questionCount: number } } = {};

    questions.forEach(question => {
        const userAnswer = answers[question.id];

        if (userAnswer !== undefined && userAnswer !== '') {
            let score = 0;

            if (question.type === 'multiple-choice') {
                score = MULTIPLE_CHOICE_SCORING[userAnswer] || 0; // Get score from mapping, default to 0 if not found
            }
            // Add scoring logic for 'rating' type if you introduce it later
            // else if (question.type === 'rating') {
            //     score = parseInt(userAnswer, 10); // Assuming rating questions store 1-5 directly
            // }

            if (!categoryScores[question.category]) {
                categoryScores[question.category] = { totalScore: 0, questionCount: 0 };
            }

            categoryScores[question.category].totalScore += score;
            categoryScores[question.category].questionCount += 1;
        }
    });

    // Calculate average score per category
    const results: { [category: string]: number } = {};
    for (const category in categoryScores) {
        const { totalScore, questionCount } = categoryScores[category];
        if (questionCount > 0) {
            // Normalize to a percentage or average.
            // Assuming max score per question is 4 (for multiple-choice)
            const maxScorePerQuestion = 4;
            const maxCategoryScore = questionCount * maxScorePerQuestion;
            results[category] = (totalScore / maxCategoryScore) * 100; // Return as a percentage (0-100)
        } else {
            results[category] = 0;
        }
    }

    return results;
}

