import { MULTIPLE_CHOICE_SCORING } from "~/libs/CalcForms";

// Function to calculate scores (re-using the one from before)
interface Question {
    id: string;
    category: string;
    text: string;
    type: 'rating' | 'multiple-choice';
    options?: { value: string | number; label: string }[];
}

export function calculateAssessmentScores(
    questions: Question[],
    answers: { [key: string]: string }
) {
    const categoryScores: { [category: string]: { totalScore: number; questionCount: number } } = {};

    questions.forEach(question => {
        const userAnswer = answers[question.id];

        if (userAnswer !== undefined && userAnswer !== '') {
            let score = 0;

            if (question.type === 'multiple-choice') {
                score = MULTIPLE_CHOICE_SCORING[userAnswer] || 0;
            }

            if (!categoryScores[question.category]) {
                categoryScores[question.category] = { totalScore: 0, questionCount: 0 };
            }

            categoryScores[question.category].totalScore += score;
            categoryScores[question.category].questionCount += 1;
        }
    });

    const results: { [category: string]: number } = {};
    for (const category in categoryScores) {
        const { totalScore, questionCount } = categoryScores[category];
        if (questionCount > 0) {
            const maxScorePerQuestion = 4; // Max score for multiple-choice
            const maxCategoryScore = questionCount * maxScorePerQuestion;
            results[category] = (totalScore / maxCategoryScore) * 100;
        } else {
            results[category] = 0;
        }
    }
    return results;
}

// Function to get the general interpretation level (re-using the one you provided)
function getOverallInterpretation(score: number): string {
    if (score > 90) {
        return "ดีเยี่ยม";
    } else if (score > 75) {
        return "ดี";
    } else if (score > 50) {
        return "ปานกลาง";
    } else if (score > 25) {
        return "ต่ำ";
    } else {
        return "ต่ำมาก";
    }
}

// Function to get detailed explanation for each category and score
function getDetailedInterpretation(category: string, score: number): string | undefined {
    const overallLevel = getOverallInterpretation(score);

    switch (category) {
        case 'ความมั่นใจในการสื่อสาร (Communication Confidence)':
            if (overallLevel === "ดีเยี่ยม") return "คุณมั่นใจอย่างเต็มเปี่ยมในการสื่อสาร ไม่ว่าจะในสถานการณ์ใดก็ตาม ความมั่นใจของคุณส่งผลให้การสื่อสารมีประสิทธิภาพและน่าเชื่อถือ";
            if (overallLevel === "ดี") return "คุณมีความมั่นใจในการสื่อสารเป็นส่วนใหญ่ แม้ในสถานการณ์ที่ท้าทายก็ยังสามารถแสดงออกได้อย่างมั่นใจ";
            if (overallLevel === "ปานกลาง") return "คุณมีความมั่นใจในการสื่อสารในระดับหนึ่ง แต่ยังคงมีบางสถานการณ์ที่อาจทำให้คุณประหม่าหรือลังเล การฝึกฝนจะช่วยเพิ่มความมั่นใจให้คุณได้";
            if (overallLevel === "ต่ำ") return "คุณอาจรู้สึกประหม่าหรือกังวลเมื่อต้องสื่อสาร โดยเฉพาะในสถานการณ์ที่ต้องเผชิญหน้ากับคนจำนวนมากหรือมีความเห็นที่แตกต่าง การสร้างความเชื่อมั่นในตัวเองเป็นสิ่งสำคัญ";
            if (overallLevel === "ต่ำมาก") return "ความกังวลและความประหม่าในการสื่อสารอาจเป็นอุปสรรคสำคัญสำหรับคุณ คุณอาจหลีกเลี่ยงการแสดงออกในที่สาธารณะ การเริ่มต้นจากการสื่อสารในวงเล็กๆ จะช่วยได้";
            break;

        case 'ทักษะการเข้าสังคม (Social Skills)':
            if (overallLevel === "ดีเยี่ยม") return "คุณมีทักษะการเข้าสังคมที่โดดเด่น สามารถสร้างความสัมพันธ์ใหม่ๆ และปรับตัวเข้ากับสภาพแวดล้อมทางสังคมได้อย่างยอดเยี่ยม";
            if (overallLevel === "ดี") return "คุณสามารถเข้าสังคมได้ดี และสร้างความสัมพันธ์กับผู้อื่นได้ง่าย คุณรู้สึกสบายใจในสถานการณ์ทางสังคมส่วนใหญ่";
            if (overallLevel === "ปานกลาง") return "คุณเข้าสังคมได้ในระดับปานกลาง อาจต้องใช้เวลาในการปรับตัวและทำความรู้จักกับคนใหม่ๆ การเปิดใจและเข้าร่วมกิจกรรมจะช่วยพัฒนาทักษะนี้";
            if (overallLevel === "ต่ำ") return "คุณอาจพบความท้าทายในการเริ่มต้นหรือรักษาความสัมพันธ์ทางสังคม การเข้าหาผู้คนใหม่ๆ อาจทำให้คุณรู้สึกไม่สบายใจ";
            if (overallLevel === "ต่ำมาก") return "คุณอาจหลีกเลี่ยงสถานการณ์ทางสังคมที่ไม่คุ้นเคย และพบว่าการสร้างมิตรภาพเป็นเรื่องยากมาก การฝึกฝนทีละเล็กทีละน้อยจะช่วยให้คุณผ่อนคลายขึ้น";
            break;

        case 'การจัดการความกังวลและ Mindset (Anxiety & Mindset Management)':
            if (overallLevel === "ดีเยี่ยม") return "คุณสามารถจัดการกับความกังวลได้อย่างยอดเยี่ยม และมีทัศนคติเชิงบวกต่อความผิดพลาด โดยมองว่าเป็นโอกาสในการเรียนรู้";
            if (overallLevel === "ดี") return "คุณจัดการความกังวลได้ดี และไม่ค่อยให้การตัดสินของผู้อื่นมามีผลกระทบต่อการแสดงออกของคุณ";
            if (overallLevel === "ปานกลาง") return "คุณรับมือกับความกังวลได้ในระดับหนึ่ง แต่บางครั้งความคิดเห็นของผู้อื่นอาจยังมีอิทธิพลต่อคุณ การฝึกควบคุมความคิดเชิงลบจะช่วยได้";
            if (overallLevel === "ต่ำ") return "ความกังวลเกี่ยวกับการตัดสินของผู้อื่นอาจส่งผลกระทบต่อการสื่อสารของคุณ คุณอาจกลัวการทำผิดพลาดจนไม่กล้าแสดงออก การปรับเปลี่ยนมุมมองเป็นสิ่งสำคัญ";
            if (overallLevel === "ต่ำมาก") return "คุณอาจจมอยู่กับความกังวลและความกลัวในการทำผิดพลาดอย่างมาก ซึ่งทำให้คุณไม่สามารถสื่อสารได้อย่างเต็มศักยภาพ การปรึกษาผู้เชี่ยวชาญอาจเป็นประโยชน์";
            break;

        case 'ความสามารถในการสื่อสารที่ชัดเจนและมีประสิทธิภาพ (Clarity & Effectiveness)':
            if (overallLevel === "ดีเยี่ยม") return "คุณเป็นผู้สื่อสารที่ชัดเจนและมีประสิทธิภาพอย่างหาตัวจับยาก สามารถทำให้เรื่องซับซ้อนเข้าใจง่าย และเป็นผู้ฟังที่ยอดเยี่ยม";
            if (overallLevel === "ดี") return "คุณสื่อสารได้ชัดเจนและตรงประเด็น สามารถอธิบายเรื่องต่างๆ ให้ผู้อื่นเข้าใจได้ดี และเป็นผู้ฟังที่ดี";
            if (overallLevel === "ปานกลาง") return "คุณสื่อสารได้ในระดับปานกลาง บางครั้งอาจมีปัญหาในการเรียบเรียงความคิด หรือการเข้าใจความรู้สึกของผู้อื่น การฝึกใช้ภาษากายและการฟังอย่างตั้งใจจะช่วยได้";
            if (overallLevel === "ต่ำ") return "คุณอาจพบความท้าทายในการอธิบายเรื่องซับซ้อนให้เข้าใจง่าย หรือการเป็นผู้ฟังที่เข้าใจลึกซึ้ง การฝึกโครงสร้างการสื่อสารและสังเกตภาษากายจะช่วยพัฒนาได้";
            if (overallLevel === "ต่ำมาก") return "คุณอาจสื่อสารได้ไม่ชัดเจนนัก ผู้อื่นอาจเข้าใจผิดบ่อยครั้ง และคุณอาจไม่ค่อยตระหนักถึงอิทธิพลของภาษากาย การเรียนรู้พื้นฐานการสื่อสารที่มีประสิทธิภาพจะช่วยคุณได้มาก";
            break;

        case 'การจัดการความขัดแย้ง (Conflict Management)':
            if (overallLevel === "ดีเยี่ยม") return "คุณมีความสามารถโดดเด่นในการจัดการความขัดแย้ง สามารถหาทางออกที่สร้างสรรค์และเป็นประโยชน์ร่วมกันสำหรับทุกฝ่ายได้อย่างยอดเยี่ยม";
            if (overallLevel === "ดี") return "คุณสามารถจัดการความขัดแย้งได้อย่างสุภาพและสร้างสรรค์ พยายามหาจุดร่วมเพื่อให้ทุกฝ่ายยอมรับได้";
            if (overallLevel === "ปานกลาง") return "คุณจัดการความขัดแย้งได้ในระดับหนึ่ง แต่บางครั้งอาจลังเลที่จะแสดงความไม่เห็นด้วย หรือพยายามหลีกเลี่ยงการเผชิญหน้า";
            if (overallLevel === "ต่ำ") return "คุณอาจพบความท้าทายในการจัดการความขัดแย้ง คุณอาจหลีกเลี่ยงการเผชิญหน้าหรือเข้าข้างฝ่ายใดฝ่ายหนึ่ง การเรียนรู้เทคนิคการสื่อสารในภาวะขัดแย้งเป็นสิ่งสำคัญ";
            if (overallLevel === "ต่ำมาก") return "คุณอาจไม่กล้าแสดงความไม่เห็นด้วย และพยายามหลีกเลี่ยงความขัดแย้งอย่างมาก ซึ่งอาจทำให้ปัญหาไม่ได้รับการแก้ไข การฝึกยืนยันสิทธิ์ของตัวเองอย่างเหมาะสมจะช่วยได้";
            break;

        default:
            return "ไม่สามารถให้คำอธิบายเฉพาะสำหรับหมวดหมู่นี้ได้";
    }
}

// --- ScoreInterpretation Component ---
interface ScoreInterpretationProps {
    category: string;
    score: number;
}

const ScoreInterpretation: React.FC<ScoreInterpretationProps> = ({ category, score }) => {
    const overallLevel = getOverallInterpretation(score);
    const detailedExplanation = getDetailedInterpretation(category, score);

    let textColorClass = "text-gray-800"; // Default
    if (overallLevel === "ดีเยี่ยม") {
        textColorClass = "text-green-700";
    } else if (overallLevel === "ดี") {
        textColorClass = "text-blue-700";
    } else if (overallLevel === "ปานกลาง") {
        textColorClass = "text-yellow-700";
    } else if (overallLevel === "ต่ำ") {
        textColorClass = "text-orange-700";
    } else if (overallLevel === "ต่ำมาก") {
        textColorClass = "text-red-700";
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-bold mb-3 text-[#5a67d8]">{category}</h3>
            <p className="text-xl font-semibold mb-2">
                คะแนน: <span className={textColorClass}>{score.toFixed(2)}%</span> ({overallLevel})
            </p>
            <p className="text-gray-700 leading-relaxed">
                {detailedExplanation}
            </p>
        </div>
    );
};

export default ScoreInterpretation;