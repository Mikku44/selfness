import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Card = {
    id: number
    image: string
    description: string
    ref: string
    emoji: string
}

const Multicards: any = {
    "🚀": [
        {
            id: 1,
            image: "/cards/The Dare.png",
            description: "การมีความกล้าไม่ได้หมายถึงไม่กลัว แต่หมายถึงการลงมือทำแม้จะกลัวอยู่ก็ตาม",
            ref: "Good Vibes, Good Life – Vex King",
        },
        {
            id: 2,
            image: "/cards/The Dare 2.png",
            description: "คุณไม่ได้อยู่เพื่อให้ใครชอบ แต่อยู่เพื่อใช้ชีวิตของคุณให้ดีที่สุด",
            ref: "กล้าที่จะถูกเกลียด – Ichiro Kishimi & Fumitake Koga",
        },
        {
            id: 3,
            image: "/cards/The Dare 3.png",
            description: "พลังของคุณเริ่มต้นเมื่อคุณหยุดเปรียบเทียบตัวเองกับคนอื่น",
            ref: "Good Vibes, Good Life – Vex King",
        },
    ],

    "🗺️": [
        {
            id: 5,
            image: "/cards/The Explorer.png",
            description: "จงใช้ชีวิตให้เหมือนการเดินทาง ไม่ใช่การแข่งขัน",
            ref: "Good Vibes, Good Life – Vex King",
        },
        {
            id: 6,
            image: "/cards/The Explorer 2.png",
            description: "การออกจาก comfort zone คือจุดเริ่มต้นของความเป็นไปได้ใหม่",
            ref: "กล้าที่จะถูกเกลียด – Ichiro Kishimi & Fumitake Koga",
        },
        {
            id: 7,
            image: "/cards/The Explorer 3.png",
            description: "การออกจาก comfort zone คือจุดเริ่มต้นของความเป็นไปได้ใหม่",
            ref: "กล้าที่จะถูกเกลียด – Ichiro Kishimi & Fumitake Koga",
        },
    ],

    "💡": [
        {
            id: 7,
            image: "/cards/The Learner.png",
            description: "ความผิดพลาดคือครูที่ดีที่สุด ถ้าคุณยอมเรียนรู้",
            ref: "Good Vibes, Good Life – Vex King",
        },
        {
            id: 8,
            image: "/cards/The Learner 2.png",
            description: "คุณเติบโตได้เสมอ ถ้าคุณกล้าที่จะเผชิญกับความจริงของตัวเอง",
            ref: "กล้าที่จะถูกเกลียด – Ichiro Kishimi & Fumitake Koga",
        },
        {
            id: 9,
            image: "/cards/The Learner 3.png",
            description: "ชีวิตคือกระบวนการเรียนรู้ อย่าหยุดตั้งคำถามกับตัวเอง",
            ref: "กล้าที่จะถูกเกลียด – Ichiro Kishimi & Fumitake Koga",
        },
    ],

    "🤫": [
        {
            id: 10,
            image: "/cards/The Observer.png",
            description: "เมื่อคุณเฝ้าดูความคิดโดยไม่ตัดสิน คุณจะเข้าใจตัวเองมากขึ้น",
            ref: "กล้าที่จะถูกเกลียด – Ichiro Kishimi & Fumitake Koga",
        },
        {
            id: 11,
            image: "/cards/The Observer 2.png",
            description: "ความสงบภายในเริ่มจากการเฝ้าสังเกต ไม่ใช่การควบคุม",
            ref: "Good Vibes, Good Life – Vex King",
        },
        {
            id: 12,
            image: "/cards/The Observer 3.png",
            description: "การรับรู้ตัวเองคือกุญแจสำคัญสู่การเปลี่ยนแปลง",
            ref: "กล้าที่จะถูกเกลียด – Ichiro Kishimi & Fumitake Koga",
        },
    ],

    "✨": [
        {
            id: 13,
            image: "/cards/Communicator.png",
            description: "คำพูดที่มาจากใจ มีพลังเปลี่ยนใจคนได้จริง",
            ref: "Good Vibes, Good Life – Vex King",
        },
        {
            id: 14,
            image: "/cards/Communicator 2.png",
            description: "การสื่อสารที่แท้จริงเริ่มจากความเข้าใจ ไม่ใช่แค่การพูด",
            ref: "กล้าที่จะถูกเกลียด – Ichiro Kishimi & Fumitake Koga",
        },
        {
            id: 15,
            image: "/cards/Communicator3.png",
            description: "จงพูดในสิ่งที่ใช่ โดยไม่ต้องกลัวการถูกเกลียด",
            ref: "กล้าที่จะถูกเกลียด – Ichiro Kishimi & Fumitake Koga",
        },
    ],
};



export default function PlayingCards({ emoji = "🚀" }: { emoji?: string }) {
    const [openedCard, setOpenedCard] = useState<Card | null>(null)
    const [isFlipped, setIsFlipped] = useState(false)
    const [isAnimated, setIsAnimated] = useState(false);
    const [shouldAnimateX, setShouldAnimateX] = useState(false);
    const cards = Multicards[emoji]


    const handleDownload = () => {
        if (!openedCard?.image) return;

        // สร้างลิงก์ดาวน์โหลดภาพตรงจาก URL
        const link = document.createElement("a");
        link.href = openedCard.image;

        // ตั้งชื่อไฟล์ (แก้ตามไฟล์จริงถ้าต้องการ)
        const fileName = openedCard.image.split("/").pop() || `${openedCard.image.split("/")[2]}`;
        link.download = fileName;

        // คลิกลิงก์เพื่อดาวน์โหลด
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            setShouldAnimateX(window.innerWidth >= 1024); // Only on large screens
        }
    }, []);

    useEffect(() => {
        setIsAnimated(true);
        if (openedCard) {
            const timer = setTimeout(() => {
                const flipSound = new Audio("/sfx/cardflip.mp3")
                flipSound.play()
                setIsFlipped(true)
                setIsAnimated(false);
            }, 1000)

            return () => clearTimeout(timer)
        } else {
            setIsFlipped(false)
        }
    }, [openedCard])

    return (
        <div className="flex items-center justify-center">
            <div className="relative mb-10 md:w-[300px] md:h-[400px] w-[240px] h-[340px]">
                <div className="flex items-center justify-center">
                    <div className="relative group mb-10 md:w-[300px] md:h-[400px] w-[240px] h-[340px]">
                        {/* Black spade card (back) */}
                        <div
                            className={`absolute rounded-xl cursor-pointer overflow-hidden group-hover:translate-x-[200px] group-hover:rotate-8 hover:translate-y-[-20px] border-emerald-400 bg-gradient-to-br from-emerald-600 to-teal-700 md:w-[300px] md:h-[400px] w-[240px] h-[340px] shadow-lg duration-700 ${isAnimated ? "translate-x-6 -translate-y-2 rotate-12" : ""
                                }`}
                            onClick={() => setOpenedCard(cards[2])}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img src={`${cards[2].image}`} alt="Back card" className="object-cover h-full w-full" />
                            </div>
                        </div>

                        {/* Red club card (middle) */}
                        <div
                            className={`absolute rounded-xl cursor-pointer overflow-hidden group-hover:translate-x-[20px] group-hover:-rotate-0 hover:translate-y-[-20px] border-orange-500 bg-white md:w-[300px] md:h-[400px] w-[240px] h-[340px] shadow-lg transition-all duration-700 ${isAnimated ? "translate-x-3 -translate-y-1 rotate-6" : ""
                                }`}
                            onClick={() => setOpenedCard(cards[1])}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img src={`${cards[1].image}`} alt="Middle card" className="object-cover h-full w-full" />
                            </div>
                        </div>

                        {/* Red heart card (front) */}
                        <div
                            onClick={() => setOpenedCard(cards[0])}
                            className="absolute rounded-xl overflow-hidden group-hover:translate-x-[-200px] group-hover:-rotate-6 hover:translate-y-[-20px] border-pink-500 duration-700 bg-white md:w-[300px] md:h-[400px] w-[240px] h-[340px] shadow-lg cursor-pointer"
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img src={openedCard?.image || cards[0].image} alt="Front card" className="object-cover h-full w-full" />
                            </div>
                        </div>
                    </div>
                </div>


                {/* Fullscreen flipped card */}
                <AnimatePresence>
                    {openedCard && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0.2 }}
                            transition={{ duration: 0.1 }}
                            className="fixed inset-0 bg-black/80 flex items-center flex-wrap justify-center z-50"
                            onClick={() => setOpenedCard(null)}
                        >
                            <motion.div
                                initial={{ x: shouldAnimateX ? 250 : 0, scale: 1 }}
                                animate={{ x: shouldAnimateX ? 0 : 0, scale: 1.1 }}
                                transition={{
                                    x: { delay: 1.1, duration: 0.6 },
                                    scale: { type: "spring", stiffness: 200, damping: 20 },
                                }}
                                className="flex flex-wrap justify-center gap-6 items-center"
                                onClick={(e) => { e.stopPropagation(), setIsFlipped(prev => !prev) }} // prevent closing
                            >
                                {/* Flip Card */}
                                <div className="w-[300px] h-[400px] min-w-[300px] perspective">
                                    <div
                                        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
                                    >
                                        {/* Front Face */}
                                        <div className="absolute backface-hidden w-full h-full rounded-xl overflow-hidden shadow-xl">
                                            <img src={`${openedCard?.image}`} alt="Card front" className="w-full h-full object-cover" />
                                        </div>
                                        {/* Back Face */}
                                        <div className="absolute backface-hidden w-full h-full rotate-y-180 bg-white rounded-xl shadow-xl flex items-center justify-center flex-col gap-5 p-4">
                                            <p className="text-center text-lg text-gray-800"><br />{openedCard?.ref}</p>
                                            {isFlipped && <div className="flex gap-2 items-center justify-center">
                                                <button
                                                    aria-label="get the card"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleDownload()
                                                    }}
                                                    className="px-4 py-2 bg-white hover:bg-zinc-400/10 transition"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                                            <path strokeDasharray={32} strokeDashoffset={32} d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9">
                                                                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="32;0"></animate>
                                                                <set fill="freeze" attributeName="stroke-dasharray" begin="0.8s" to="2 4"></set>
                                                            </path>
                                                            <path strokeDasharray={32} strokeDashoffset={32} d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9">
                                                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="32;0"></animate>
                                                            </path>
                                                            <path strokeDasharray={10} strokeDashoffset={10} d="M12 8v7.5">
                                                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="10;0"></animate>
                                                            </path>
                                                            <path strokeDasharray={6} strokeDashoffset={6} d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5">
                                                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="6;0"></animate>
                                                            </path>
                                                        </g>
                                                    </svg>

                                                </button>
                                                <button
                                                    aria-label="flip card"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setIsFlipped(prev => !prev)
                                                    }}
                                                    className="px-4 py-2 bg-white hover:bg-zinc-400/10 transition"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                                            <path strokeDasharray={24} strokeDashoffset={24} d="M12 6c3.31 0 6 2.69 6 6c0 3.31 -2.69 6 -6 6h-2.5">
                                                                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="24;0"></animate>
                                                            </path>
                                                            <path strokeDasharray={6} strokeDashoffset={6} d="M9 18l3 3M9 18l3 -3">
                                                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="6;0"></animate>
                                                            </path>
                                                        </g>
                                                    </svg>

                                                </button>
                                                <button
                                                    aria-label="flip card"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setOpenedCard(null)
                                                    }}
                                                    className="px-4 py-2 bg-white hover:bg-zinc-400/10 transition"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                                            <path strokeDasharray={64} strokeDashoffset={64} d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z">
                                                                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"></animate>
                                                            </path>
                                                            <path strokeDasharray={8} strokeDashoffset={8} d="M12 12l4 4M12 12l-4 -4M12 12l-4 4M12 12l4 -4">
                                                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"></animate>
                                                            </path>
                                                        </g>
                                                    </svg>
                                                </button>

                                            </div>}
                                        </div>


                                    </div>
                                </div>

                                {/* Description Panel */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.1, type: "spring" }}
                                    className="text-white max-w-sm"
                                >
                                    <h2 className="text-2xl font-bold mb-2">🧠 ประโยคชวนคิด</h2>
                                    <p className="text-md">
                                        {openedCard.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
