export interface Flashcard {
    title: string;
    description: string;
    emoji: string; // Optional: for visual flair
    colorClass: string; // Optional: for styling
}

export function calculateOverallScore(categoryScores: { [category: string]: number }): number {
    const scoresArray = Object.values(categoryScores);
    if (scoresArray.length === 0) {
        return 0;
    }
    const totalScore = scoresArray.reduce((sum, score) => sum + score, 0);
    return totalScore / scoresArray.length; // Returns an average percentage (0-100)
}

export function getFlashcardPersona(overallScore: number): Flashcard {
    if (overallScore >= 90) {
        return {
            title: "ผู้กล้า (The Daring One)",
            description: "คุณเป็นคนที่ไม่กลัวอะไรเลย กล้าที่จะทำทุกอย่างตรงหน้า! คุณมีทักษะการสื่อสารที่โดดเด่นและเป็นธรรมชาติในทุกๆ ด้าน มีโอกาสที่จะเติบโตแบบก้าวกระโดดและเป็นผู้นำด้านการสื่อสารอย่างแท้จริง",
            emoji: "🚀",
            colorClass: "bg-green-100 border-green-500 text-green-800"
        };
    } else if (overallScore >= 75) {
        return {
            title: "นักสื่อสารมากฝีมือ (The Skilled Communicator)",
            description: "คุณมีทักษะการสื่อสารที่แข็งแกร่งและมีประสิทธิภาพในหลายมิติ สามารถรับมือกับสถานการณ์ต่างๆ ได้ดีเยี่ยม และเป็นที่พึ่งของผู้อื่นได้ในเรื่องการสื่อสาร",
            emoji: "✨",
            colorClass: "bg-blue-100 border-blue-500 text-blue-800"
        };
    } else if (overallScore >= 50) {
        return {
            title: "ผู้เรียนรู้ (The Learner)",
            description: "คุณมีพื้นฐานที่ดีในทักษะการสื่อสารและสามารถรับมือกับสถานการณ์ทั่วไปได้ แต่ยังมีช่องว่างสำหรับการพัฒนาเพื่อให้ทักษะของคุณก้าวไปอีกขั้น การเรียนรู้และฝึกฝนอย่างต่อเนื่องจะพาคุณไปสู่จุดที่โดดเด่น",
            emoji: "💡",
            colorClass: "bg-yellow-100 border-yellow-500 text-yellow-800"
        };
    } else if (overallScore >= 25) {
        return {
            title: "ผู้สำรวจ (The Explorer)",
            description: "คุณกำลังอยู่ในช่วงเริ่มต้นของการสำรวจและทำความเข้าใจทักษะการสื่อสารของคุณ มีหลายด้านที่คุณสามารถพัฒนาได้อย่างก้าวกระโดด การเปิดใจเรียนรู้และลองผิดลองถูกจะช่วยให้คุณค้นพบจุดแข็งใหม่ๆ",
            emoji: "🗺️",
            colorClass: "bg-orange-100 border-orange-500 text-orange-800"
        };
    } else {
        return {
            title: "ผู้เฝ้ารอ (The Observer)",
            description: "คุณอาจพบความท้าทายอย่างมากในการสื่อสารและเข้าสังคม ซึ่งอาจทำให้คุณเลือกที่จะสังเกตการณ์มากกว่าเข้าร่วม การเริ่มต้นด้วยก้าวเล็กๆ และการค้นหาสภาพแวดล้อมที่ปลอดภัยจะช่วยให้คุณเริ่มพัฒนาได้",
            emoji: "🤫",
            colorClass: "bg-red-100 border-red-500 text-red-800"
        };
    }
}
