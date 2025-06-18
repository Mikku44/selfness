// app/components/CommunicationAssessmentForm.tsx
import React, { useEffect, useRef, useState } from 'react';
import Click from './Click';
import ProgressBar from './ProgressBar';
import { Question } from '~/Models/Question';
import { calculateAssessmentScores } from '~/libs/CalcForms';
import ScoreInterpretation from './ScoreInterpretation';
import { Flashcard, getFlashcardPersona } from '~/libs/flashcards';
import FlashcardPersona from './FlashcardPersona';
import { ShareButton } from './ShareButton';
import { updateUsageStats } from '~/services/UsageStatsService.client';
import { getDeviceType } from '~/libs/getDeviceType';
import { addRGOne, getReGStats, getRGOneWithID } from '~/services/RGStatsService.client';
import { ReG } from '~/Models/Registration';
import ColumnChart from './ColumnChart';
import { useSearchParams } from '@remix-run/react';
import { decodeFromRandom, encodeToRandom } from '~/libs/EncodeToDecode';
import { questions } from '~/libs/questions/q1';
import RadarChart from './RadarChart';
import BubbleChat from './BubbleChat';
import HoldToContinueButton from './HoldToContinueButton';
import QuickEvent from './QuickEvent';
import TextEffect from './TextEffect';
import { selfHelpQuotesTH } from '~/libs/quotes';
import { addUserAchievement, patchUserOverallStats } from '~/services/UserService';
import { useAuth } from './Contexts/AuthContext';
import { toast } from 'sonner';





// Define the assessment form component
const CommunicationAssessmentForm: React.FC = () => {
    // Define your questions based on the categories discussed

    const { UserInfo, setOnLogin } = useAuth()

    const [searchParams, setSearchParams] = useSearchParams();
    const [trigger, setTrigger] = useState(true);

    // State to store user answers
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [clickedCount, setClickedCount] = useState(0);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [calculatedScores, setCalculatedScores] = useState<any>(null);
    const [showResults, setShowResults] = useState(false);
    const [overallPersona, setOverallPersona] = useState<Flashcard | null>(null); // New state for the persona
    const [charAvg, setCharAvg] = useState([
        { category: 'Anxiety', value: 0 },
        { category: 'Clarity', value: 0 },
        { category: 'Comms', value: 0 },
        { category: 'Conflict', value: 0 },
        { category: 'Social', value: 0 },
    ]);
    const [chartData, setChartData] = useState([
        { category: 'Anxiety', value: 0 },
        { category: 'Clarity', value: 0 },
        { category: 'Comms', value: 0 },
        { category: 'Conflict', value: 0 },
        { category: 'Social', value: 0 },
    ]);

    const [quote, setQuote] = useState("");






    const QuestionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Handle countQNStats when activeCategoryIndex is 1
        if (activeCategoryIndex === 1) {
            // Assuming countQNStats is a function defined elsewhere
            countQNStats();
            // console.log("Calling countQNStats()");
        }

        // When activeCategoryIndex becomes greater than 1, set trigger to true
        // if (activeCategoryIndex > 1) {
        //     setTrigger(true);
        // }

        // Handle auto-setting trigger to false after 3 seconds when it becomes true
        let timerId: any;
        if (trigger) {
            // Set a timeout to set trigger to false after 3000 milliseconds (3 seconds)
            timerId = setTimeout(() => {
                setTrigger(false);
                setClickedCount(0);
                console.log("Trigger set to false after 3 seconds.");
            }, 5000); // 3000 milliseconds = 3 seconds
        }

        // Scroll into view if QuestionRef exists
        if (QuestionRef?.current) {
            QuestionRef.current.scrollIntoView({ behavior: "smooth" });
        }

        // Cleanup function for the effect
        // This will clear the timeout if the component unmounts
        // or if activeCategoryIndex/trigger changes before the timeout completes.
        return () => {
            if (timerId) {
                clearTimeout(timerId);
                setTrigger(false)
                console.log("Timeout cleared.");
            }
        };

    }, [activeCategoryIndex, trigger]);

    let _tempLastIndex: number = 0;
    let _tempQuotes: Array<number> = [];

    const randomQuote = () => {
        if (_tempQuotes.length >= selfHelpQuotesTH.length) {
            _tempQuotes = [];
        }

        let randomIndex: number;
        let attempts = 0;
        do {
            randomIndex = Math.floor(Math.random() * selfHelpQuotesTH.length);
            attempts++;
        } while (_tempQuotes.includes(randomIndex) && attempts < 100); // safety

        _tempQuotes.push(randomIndex);
        setQuote(selfHelpQuotesTH[randomIndex].text);
        return randomIndex;
    };

    useEffect(() => {
        if (activeCategoryIndex > 0) {
            if (_tempLastIndex < activeCategoryIndex) {
                randomQuote()
                setTrigger(true)
                _tempLastIndex = activeCategoryIndex;
            }
        }
    }, [activeCategoryIndex]);

    useEffect(() => {
        const fetchReGStats = async () => {
            const result: ReG[] = await getReGStats();
            // console.log(result)

            const aggregateData = (result: ReG[]) => {
                const categoryTotals = {
                    "Anxiety": 0,
                    "Clarity": 0,
                    "Comms": 0,
                    "Conflict": 0,
                    "Social": 0
                };

                // Count total for each category across all people
                result.forEach((RGStat: ReG) => {
                    categoryTotals["Anxiety"] += RGStat.anxiety;
                    categoryTotals["Clarity"] += RGStat.clarity;
                    categoryTotals["Comms"] += RGStat.comms;
                    categoryTotals["Conflict"] += RGStat.conflict;
                    categoryTotals["Social"] += RGStat.social;
                });

                // Convert to chart data format
                return Object.entries(categoryTotals).map(([category, total]) => ({
                    category,
                    value: (total / result.length)
                }));
            };



            // Use one of the aggregation methods
            const data: any = aggregateData(result);


            setCharAvg(data)

        }

        if (isSubmitted) {
            fetchReGStats();
        }
    }, [isSubmitted]);

    useEffect(() => {
        const fetchScore = async () => {
            const scoreState = searchParams.get("scoreState");
            if (scoreState && !calculatedScores) {
                setIsSubmitted(true);
                console.log(scoreState)
                const RGStat: ReG | any = await getRGOneWithID({ id: decodeFromRandom((scoreState)) }) || {};

                // console.log(RGStat)

                const scores: any = {}


                const fieldToCategoryMap: any = {
                    "comms": "ความมั่นใจในการสื่อสาร (Communication Confidence)",
                    "social": "ทักษะการเข้าสังคม (Social Skills)",
                    "anxiety": "การจัดการความกังวลและ Mindset (Anxiety & Mindset Management)",
                    "clarity": "ความสามารถในการสื่อสารที่ชัดเจนและมีประสิทธิภาพ (Clarity & Effectiveness)",
                    "conflict": "การจัดการความขัดแย้ง (Conflict Management)",
                };
                if (RGStat)
                    Object.entries(RGStat).forEach(([field, value]) => {
                        // Skip non-score fields (like 'id', 'persona', 'created_at', etc.)
                        const nonScoreFields = ['id', 'persona', 'created_at', 'date_key', 'NOTD'];
                        if (nonScoreFields.includes(field)) return;

                        // Map the field back to its original category name
                        const category = fieldToCategoryMap[field];
                        if (category) {
                            scores[category] = value as number;
                        }
                    });

                setChartData([
                    { category: 'Anxiety', value: RGStat.anxiety },
                    { category: 'Clarity', value: RGStat.clarity },
                    { category: 'Comms', value: RGStat.comms },
                    { category: 'Conflict', value: RGStat.conflict },
                    { category: 'Social', value: RGStat.social },
                ])

                setCalculatedScores(scores);
                // const overallScore = calculateOverallScore(scores); // Calculate overall score
                const persona = getFlashcardPersona(scores); // Get the persona
                setOverallPersona(persona); // Set the persona to state
            }
        };
        fetchScore()
    }, [searchParams]);

    const countQNStats = async () => {
        await updateUsageStats("QN-001", { device: getDeviceType() });
    }

    // Group questions by category for better display
    const groupedQuestions = questions.reduce((acc, question) => {
        if (!acc[question.category]) {
            acc[question.category] = [];
        }
        acc[question.category].push(question);
        return acc;
    }, {} as Record<string, Question[]>);

    const handleAnswerChange = (questionId: string, value: string | number) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: `${value}`,
        }));
    };

    const categoryToFieldMap: Record<string, keyof ReG> = {
        "ความมั่นใจในการสื่อสาร (Communication Confidence)": "comms",
        "ทักษะการเข้าสังคม (Social Skills)": "social",
        "การจัดการความกังวลและ Mindset (Anxiety & Mindset Management)": "anxiety",
        "ความสามารถในการสื่อสารที่ชัดเจนและมีประสิทธิภาพ (Clarity & Effectiveness)": "clarity",
        "การจัดการความขัดแย้ง (Conflict Management)": "conflict",
    };




    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setActiveCategoryIndex(0)
        // Calculate scores
        const scores = calculateAssessmentScores(questions, answers);
        // const overallScore = calculateOverallScore(scores); // Calculate overall score
        const persona = getFlashcardPersona(scores); // Get the persona
        setOverallPersona(persona); // Set the persona to state

        const RGStat: any = {
            persona: persona.title,
            comms: 0,
            social: 0,
            anxiety: 0,
            clarity: 0,
            conflict: 0,
        };

        Object.entries(scores).forEach(([category, value]: any) => {
            // return console.log("CAT:",category,", VALUE :",value,"TYPE : ")
            const field = categoryToFieldMap[category];
            if (field) {
                RGStat[field] = (value);
            }
        });




        // return console.log("DONE")

        await updateUsageStats("RG-001", { device: getDeviceType() });
        const id = await addRGOne(RGStat)

        setSearchParams((prev) => {
            prev.set("scoreState", encodeToRandom(id));
            return prev;
        });

        setChartData([
            { category: 'Anxiety', value: RGStat.anxiety },
            { category: 'Clarity', value: RGStat.clarity },
            { category: 'Comms', value: RGStat.comms },
            { category: 'Conflict', value: RGStat.conflict },
            { category: 'Social', value: RGStat.social },
        ])

        setShowResults(true);
        // console.log('Submitted Answers:', answers);
        // console.log('Calculated Category Scores:', scores);
        // console.log('Overall Score:', overallScore);
        // console.log('Overall Persona:', persona);
        // console.log('Category Scores:', scores);
        // alert('แบบสำรวจเสร็จสมบูรณ์! (ดูผลใน Console)');
        setCalculatedScores(scores);
        setIsSubmitted(true);
    };

    // Calculate answered questions count
    const answeredQuestionsCount = questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== '').length;

    // Calculate total questions count
    const totalQuestionsCount = questions.length;

    // Calculate progress percentage
    const progress = (answeredQuestionsCount / totalQuestionsCount) * 100;

    const allQuestionsAnswered = questions.every(q => answers[q.id] !== undefined && answers[q.id] !== '');

    const categoryNames = Object.keys(groupedQuestions);
    // const currentCategoryName = categoryNames[activeCategoryIndex];



    return (
        <div ref={QuestionRef} className=" max-w-4xl  bg-white md:p-12 rounded-lg my-10">
            {!isSubmitted && <div className="">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#1a1a1a]">
                    มาดูกันว่า ทักษะคุยกับคนของคุณดีแค่ไหน?
                </h2>
                <p className="text-center text-gray-600 mb-8 leading-relaxed">
                    โปรดเลือกตัวเลือกที่สะท้อนถึงตัวคุณได้มากที่สุดในแต่ละคำถาม ทุกคำตอบจะถูกนำไปวิเคราะห์เพื่อปรับบทเรียนให้ เข้ากับคุณมากที่สุด
                </p>


                <ProgressBar progress={progress} step={{
                    index: activeCategoryIndex + 1,
                    length: categoryNames.length
                }} className="mb-4 bg-white px-5 pt-5 pb-2 shadow rounded-2xl sticky top-0 z-10 " />
                <form onSubmit={handleSubmit} className="space-y-10">
                    {Object.entries(groupedQuestions).map(([category, categoryQuestions], index) => {
                        if (index === activeCategoryIndex)
                            return (
                                <div key={category} className="border-b border-gray-200 pb-8 last:border-b-0">
                                    <h3 className="text-2xl font-semibold mb-6 text-[#5a67d8] border-b-2 border-[#5a67d8] pb-2 inline-block">
                                        {category}
                                    </h3>
                                    <div className="space-y-6">
                                        {categoryQuestions.map((q) => (
                                            <div key={q.id} className="bg-gray-50 p-6 rounded-md shadow-sm">
                                                <p className="text-lg font-medium mb-4 text-gray-800">{q.text}</p>
                                                {q.type === 'rating'
                                                    && (
                                                        <div className="flex justify-between items-center text-gray-700 text-sm">
                                                            <span>ไม่เห็นด้วยเลย/น้อยที่สุด (1)</span>
                                                            <div className="flex space-x-3 md:space-x-4">
                                                                {[1, 2, 3, 4, 5].map((score) => (
                                                                    <label key={score} className="flex flex-col items-center cursor-pointer">
                                                                        <Click
                                                                            key={score}
                                                                            onClick={() => handleAnswerChange(q.id, String(score))}
                                                                            className={`
                                                                            rounded-full flex items-center justify-center
                                                                            font-semibold text-lg transition-all duration-200 ease-in-out w-full h-fit
                                                                            ${answers[q.id] === String(score)
                                                                                    ? 'bg-[#5a67d8] text-white shadow-md transform ' // Selected style
                                                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-sm' // Default/Hover style
                                                                                }
                                                                        `}
                                                                            aria-label={`Score ${score} for ${q.text}`} // Good for accessibility
                                                                        >
                                                                            {score}
                                                                        </Click>
                                                                        <span className="mt-1 font-semibold">{score}</span>
                                                                    </label>
                                                                ))}
                                                            </div>
                                                            <span>เห็นด้วยอย่างยิ่ง/มากที่สุด (5)</span>
                                                        </div>
                                                    )}
                                                {q.type === 'multiple-choice' && q.options && (
                                                    <div className="space-y-3 grid md:grid-cols-2 gap-5">
                                                        {q.options.map((option) => (
                                                            <label key={option.value} className="flex w-full h-full max-w-full max-h-full items-center space-x-2 cursor-pointer">
                                                                <Click
                                                                    key={option.label}
                                                                    onClick={() => handleAnswerChange(q.id, String(option.value))}
                                                                    className={`
                                                                    flex items-center justify-center
                                                                    font-semibold text-lg transition-all duration-200 ease-in-out w-full h-fit
                                                                    ${answers[q.id] === String(option.value) // Changed to option.value
                                                                            ? 'bg-[#5a67d8] text-white shadow-md transform ' // Selected style
                                                                            : 'bg-black text-gray-700 hover:shadow-sm' // Default/Hover style
                                                                        }
                                                                `}
                                                                    aria-label={`Option ${option.label} for ${q.text}`} // Good for accessibility
                                                                >
                                                                    <div className={`${answers[q.id] !== String(option.value) ? "btn-question" : "btn-question-active"} w-full h-full max-w-full line-clamp-1`}>{option.label}</div>
                                                                </Click>
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                    })}
                    {/* Navigation for next category */}
                    <div className="flex justify-center items-center mt-8 h-fit gap-5 flex-wrap">
                        {activeCategoryIndex != 0 && (
                            <Click
                                onClick={() => setActiveCategoryIndex(activeCategoryIndex - 1)}
                            >
                                <div className="btn-primary">ย้อนกลับหมวดก่อนหน้า</div>
                            </Click>
                        )}
                        {activeCategoryIndex < categoryNames.length - 1 && (
                            <>
                                <Click
                                    onClick={() => {

                                        setActiveCategoryIndex(activeCategoryIndex + 1)
                                    }}
                                >
                                    <div className="btn-primary">ไปยังหมวดถัดไป</div>
                                </Click>
                                {allQuestionsAnswered && <div className="">
                                    <Click
                                        type="submit"
                                        soundSrc='/sfx/start.mp3'
                                        // disabled={!allQuestionsAnswered}
                                        className={` ${allQuestionsAnswered ? "bg-black" : "bg-gray-500"} overflow-visible`}
                                        animate={true}
                                    >
                                        <div className={`${allQuestionsAnswered ? "btn-primary shadow-md" : "btn-disabled "}`}>ส่งแบบสำรวจ</div>
                                    </Click>
                                </div>}
                            </>

                        )}

                        {activeCategoryIndex == categoryNames.length - 1 &&

                            <div className="">
                                <Click
                                    type="submit"
                                    soundSrc='/sfx/start.mp3'
                                    // disabled={!allQuestionsAnswered}
                                    className={` ${allQuestionsAnswered ? "bg-black" : "bg-gray-500"} overflow-visible`}
                                    animate={true}
                                >
                                    <div className={`${allQuestionsAnswered ? "btn-primary shadow-md" : "btn-disabled "}`}>ส่งแบบสำรวจ</div>
                                </Click>
                            </div>
                        }
                    </div>

                </form>

                <QuickEvent trigger={trigger} onClose={() => { setTrigger(false); setClickedCount(0) }}>
                    <BubbleChat className='absolute z-10 mb-5' text={quote} />

                    <button
                        onClick={(e) => {
                            setTrigger(false)
                        }}
                        className='bg-[var(--primary-color)] group text-[var(--primary-color)]'>
                        <span className='btn-question duration-100 '>ดำเนินการต่อ</span>
                    </button>
                </QuickEvent>
            </div>}

            {isSubmitted && <div>
                <h2 className="text-3xl font-bold text-center text-[#1a1a1a]">
                    พร้อมฝึกทักษะใหม่หรือยัง?
                </h2>
                <h3 className="text-xl font-bold text-center mb-6 text-[#1a1a1a]">
                    คุณผ่านด่านการประเมินทักษะการสื่อสาร!
                </h3>

                {/* Display the overall persona flashcard first */}
                <div className="relative">

                    <BubbleChat className='absolute z-10 left-[40%] animate-bounce' text='คลิกเพื่อเปิดดูการ์ด!' />
                    {overallPersona && <FlashcardPersona persona={overallPersona} />}
                </div>

                <div className=" mx-auto w-full justify-center items-center flex md:gap-3 gap-5 flex-wrap">
                    <button className=' md:w-auto w-[90%] bubbly-button animate' onClick={async () => {
                        setTrigger(true)
                        if (UserInfo?.id) {
                            patchUserOverallStats(UserInfo.id, { xp: 50 })
                            toast("You got 50 XP")


                            await addUserAchievement(UserInfo.id, {
                                ACM_ID: overallPersona?.emoji || "",
                                ACM_name: overallPersona?.title || "",
                                amount: 1,
                            });


                            toast("Achievement unlocked!", {
                                description: overallPersona?.title
                            })
                        } else {
                            toast.warning("Please login before! & Try again")
                            setOnLogin(true)
                        }

                    }}>
                        <div className="btn-primary ">
                            <div className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeDasharray={10} strokeDashoffset={10} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12l-5 -5M15 12l-5 5">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="10;0"></animate>
                                    </path>
                                </svg>
                                บันทึกความคืบหน้า
                            </div>
                        </div>
                    </button>
                    <button className='md:basis-auto basis-1/2 px-4 py-2 flex justify-center  bg-white h-full m-0 hover:bg-zinc-400/10 transition rounded'
                        onClick={() => {
                            window.location.replace("/questions")
                        }}>
                        <div className=" ">
                            <div className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                        <circle cx={12} cy={12} r={9}></circle>
                                        <path d="m13 8l2 2l-2 2m0-2h-1c-1 0-3 .6-3 3s2 3 3 3c.534 0 1.353-.171 2-.695"></path>
                                    </g>
                                </svg>
                                ทำแบบทดสอบอีกครั้ง
                            </div>
                        </div>
                    </button>

                    <ShareButton className='md:basis-auto basis-1/3 text-center flex justify-center' />
                </div>
                <hr className="my-10 border-t-2 border-gray-200" />

                {/* Then display the detailed category interpretations */}
                <h3 className="text-2xl font-bold text-center mb-6 text-[#1a1a1a]">
                    รายละเอียดคะแนนในแต่ละหมวดหมู่
                </h3>
                {calculatedScores && Object.entries(calculatedScores).length > 0 ? (
                    Object.entries(calculatedScores).map(([category, score]: any) => (
                        <ScoreInterpretation
                            key={category}
                            category={category}
                            score={score}
                        />
                    ))
                ) : (
                    <div className="m-auto w-fit">ไม่พบข้อมูลที่ลงทะเบียนไว้</div>
                )}

                <hr className="my-10 border-t-2 border-gray-200" />


                <h3 className="text-2xl font-bold text-center mb-6 text-[#1a1a1a]">
                    คะแนนของคุณ
                </h3>
                <RadarChart
                    data={chartData}
                    yLabel="Score"
                    maxValue={100}
                    title="Individual Performance"
                />
                {/* <ColumnChart
                    data={chartData}
                    title="รายละเอียดคะแนนของคุณ"
                    description="รายละเอียดคะแนนของคุณ"
                /> */}



                <hr className="my-10 border-t-2 border-gray-200" />


                <h3 className="text-2xl font-bold text-center mb-6 text-[#1a1a1a]">
                    ค่าเฉลี่ยคะแนนที่รวบรวมทั้งหมด
                </h3>
                <ColumnChart
                    data={charAvg}
                    yLabel="Percentage of Average (%)"
                    title="ค่าเฉลี่ยคะแนนที่รวบรวมทั้งหมด"
                    description="ค่าเฉลี่ยคะแนนที่รวบรวมทั้งหมด"
                />



            </div>}

        </div>
    );
};




export default CommunicationAssessmentForm;