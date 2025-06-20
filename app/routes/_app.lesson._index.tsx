import { MetaFunction } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Click from "~/components/Click";
import { useAuth } from "~/components/Contexts/AuthContext";
import { useLesson } from "~/components/Contexts/LessonContext"
import LoadingScreen from "~/components/game/LoadingScreen";
import ProgressBar from "~/components/ProgressBar";
import { lessonMindset } from "~/libs/questions/lesson-mindset";
import '~/css/animation.css';
import BubbleChat from "~/components/BubbleChat";
import SVG from 'react-inlinesvg';
import LottieAnimation from "~/components/lotties/LottieAnimation";
import { typeToLabel } from "~/libs/questions/typeMap";
import CompleteScreen from "~/components/game/CompleteScreen";

export const meta: MetaFunction = () => {
  return [
    { title: 'Selfness - บทเรียนพัฒนาทักษะประจำวัน' },
    { name: 'description', content: 'เนื้อหาบทเรียนประจำวันสำหรับพัฒนาทักษะ Soft Skill และการสื่อสาร' },
  ];
};

export function HydrateFallback() {
  return <p>Loading Game...</p>;
}



export default function Lesson() {
  const { loading, lessonIndex } = useLesson();
  const { UserInfo } = useAuth();
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [step, setStep] = useState(0);
  const [openNext, setOpenNext] = useState(false);
  const QuestionRef = useRef<HTMLTableSectionElement>(null);

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    if (lessonMindset[lessonIndex]?.steps)
      if (step < lessonMindset[lessonIndex]?.steps?.length) {
        setOpenNext(true)
      }
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };


  function toggleOption(option: string, currentOptions: string[] | any): string[] {
    if (currentOptions.includes(option)) {
      console.log("remove", currentOptions)
      return currentOptions.filter((item: string) => item !== option);
    } else {
      console.log("added")
      return [...currentOptions, option];
    }
  }

  function calcProgess(step: number, max: number) {
    return step / max * 100
  }


  useEffect(() => {
    if (QuestionRef?.current) {
      QuestionRef.current.scrollIntoView();
    }
  }, [step]);

  if (typeof window === "undefined")
    return <LoadingScreen />


  return (

    <section ref={QuestionRef} className=" max-w-4xl   md:p-12 rounded-lg -my-10">
      {lessonMindset[lessonIndex]?.steps
        && lessonMindset[lessonIndex]?.steps?.length > step && UserInfo && !loading && <div className="sticky top-0 z-[99] bg-white px-5 pt-5 pb-2  shadow rounded-2xl">
          <div className="flex justify-between items-center">

            <a href="/learn" className="flex items-center gap-1">
              <svg
                className="text-zinc-400"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22" opacity={0.5}></path><path fill="currentColor" d="M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 1 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06"></path>
              </svg>
              <div className="text-sm text-zinc-400">Close</div>
            </a>

            <div className="flex ">
              <div className="flex gap-1 font-bold items-center cursor-default hover:bg-zinc-100 rounded-md w-fit px-2 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fe3a52" d="M2 9.26c0 3.748 4.02 7.711 6.962 10.11C10.294 20.458 10.96 21 12 21s1.706-.543 3.038-1.63C17.981 16.972 22 13.009 22 9.26C22 3.35 16.5.663 12 5.5C7.5.663 2 3.349 2 9.26" opacity="0.5" /><path fill="#fe3a52" d="M10.093 10.747quiz?.133-.191.23-.325c.056.097.119.21.194.348l1.71 3.109c.166.302.33.598.493.813c.175.23.482.546.975.555s.813-.294.996-.518c.172-.208.345-.498.523-.794l.055-.092c.221-.368.36-.598.483-.764c.113-.154.179-.204.228-.231s.125-.058.315-.077c.206-.02.474-.02.904-.02H18a.75.75 0 0 0 0-1.5h-.834c-.387 0-.73 0-1.016.027a2.2 2.2 0 0 0-.91.264a2.2 2.2 0 0 0-.694.644c-.171.232-.347.525-.546.857l-.048.08c-.087.144-.159.264-.224.368l-.21-.377l-1.709-3.108c-.154-.28-.307-.56-.463-.764c-.17-.224-.462-.52-.93-.545c-.467-.025-.789.237-.982.442c-.177.186-.36.448-.543.71l-.31.442c-.227.324-.37.526-.493.672a.8.8 0 0 1-.223.203c-.046.024-.118.05-.293.066c-.19.018-.438.018-.834.018H6a.75.75 0 0 0 0 1.5h.768c.357 0 .674 0 .94-.024c.29-.026.571-.085.85-.23c.28-.145.489-.343.676-.564c.173-.205.354-.464.559-.757z" /></svg>
                <div className="">{UserInfo?.overall?.life || 0}</div>
              </div>
              <div className="flex gap-1 font-bold items-center cursor-default hover:bg-zinc-100 rounded-md w-fit px-2 py-1">
                {/* <img src="/icons/gem.svg" alt="gem" className="size-5" /> */}
                <SVG
                  className="size-5"
                  src="/icons/gem.svg"
                  width={18}
                  height="auto"
                  title="gem"
                />
                <div className="">{UserInfo?.overall?.gems || 0}</div>
                {/* STEP {step} : {lessonMindset[lessonIndex]?.steps?.length} */}
              </div>
            </div>
          </div>
          <ProgressBar progress={calcProgess(step, lessonMindset[lessonIndex]?.steps?.length)} step={{
            index: step,
            length: lessonMindset[lessonIndex]?.steps?.length
          }} />
        </div>}
      {loading ? <LoadingScreen /> :
        lessonMindset[lessonIndex]?.steps
          && lessonMindset[lessonIndex]?.steps?.length > step ? <div className="relative mt-5 md:pb-0 pb-20">
          {/* <div className="text-xl">Lesson : {lessonIndex}</div> */}
          <div className="text-sm mx-auto w-fit rounded-full flex items-center bg-opacity-10 bg-[--primary-color-light] py-2 px-4 text-[--primary-color-dark]">
            <svg
              className="inline mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24" height="24"
              viewBox="0 0 24 24">
              <path fill="currentColor" fill-rule="evenodd" d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22m0-4.25a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75M12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2" clipRule="evenodd" /></svg>
            {lessonMindset[lessonIndex]?.note}
          </div>
          {[lessonMindset[lessonIndex]?.steps?.[step]]?.map((quiz) =>
            <div key={quiz?.id} className="mb-5">

              <div className="text-xl z-0 min-h-[200px] flex justify-center items-center">
                {/* {quiz?.text} */}
                <BubbleChat text={quiz?.text}>
                </BubbleChat>
              </div>
              <div className="text-sm  mb-2 text-zinc-700">{quiz?.type && typeToLabel[quiz.type]}</div>
              {quiz?.type === 'multiple-answer' && quiz?.options &&
                <div className="grid md:grid-cols-2 gap-3">
                  {quiz?.options.map((option) =>
                    (option?.value == "input") ?
                      <div key={option.value} className="flex w-full gap-2 h-full max-w-full max-h-full items-center space-x-2 cursor-pointer">
                        <input type="text"
                          className={`input w-full mx-1 focus:bg-[--secondary-color] focus:text-white `}
                          placeholder="other..."
                          onChange={(element) => {

                            handleAnswerChange(quiz?.id, toggleOption(element.target.value, answers?.[quiz?.id] || []))
                          }} />
                      </div>
                      : (
                        <label key={option.value} className="flex w-full h-full max-w-full max-h-full items-center gap-2 cursor-pointer">
                          <Click
                            key={option.label}
                            onClick={() => handleAnswerChange(quiz?.id, toggleOption(option.value, answers?.[quiz?.id] || []))}
                            className={`
                                                                    flex items-center justify-center
                                                                    font-semibold text-lg transition-all duration-200 ease-in-out w-full h-fit
                                                                    ${answers[quiz?.id]?.includes(String(option.value)) // Changed to option.value
                                ? 'bg-[#5a67d8] text-white shadow-md transform ' // Selected style
                                : 'bg-black text-gray-700 hover:shadow-sm' // Default/Hover style
                              }
                                                                `}
                            aria-label={`Option ${option.label} for ${quiz?.text}`} // Good for accessibility
                          >
                            <div className={`${!answers[quiz?.id]?.includes(String(option.value)) ? "btn-question" : "btn-question-active"} w-full h-full max-w-full line-clamp-1`}>{option.label}</div>
                          </Click>
                        </label>
                      ))}
                </div>
              }
              {quiz?.type === 'multiple-choice' && quiz?.options && (
                <div className=" grid md:grid-cols-2 gap-5">
                  {quiz?.options.map((option) =>

                    (option?.value == "input") ?
                      <div key={option.value} className="flex w-full h-full max-w-full max-h-full items-center space-x-2 cursor-pointer">
                        <input type="text"
                          className={`input w-full mx-1 focus:bg-[--secondary-color] focus:text-white `}
                          placeholder="other..."
                          onChange={(element) => handleAnswerChange(quiz?.id, String(element.target.value))} />
                      </div>
                      : (
                        <label key={option.value} className="flex w-full h-full max-w-full max-h-full items-center space-x-2 cursor-pointer">
                          <Click
                            key={option.label}
                            onClick={() => handleAnswerChange(quiz?.id, String(option.value))}
                            className={`
                                                                    flex items-center justify-center
                                                                    font-semibold text-lg transition-all duration-200 ease-in-out w-full h-fit
                                                                    ${answers[quiz?.id] === String(option.value) // Changed to option.value
                                ? 'bg-[#5a67d8] text-white shadow-md transform ' // Selected style
                                : 'bg-black text-gray-700 hover:shadow-sm' // Default/Hover style
                              }
                                                                `}
                            aria-label={`Option ${option.label} for ${quiz?.text}`} // Good for accessibility
                          >
                            <div className={`${answers[quiz?.id] !== String(option.value) ? "btn-question" : "btn-question-active"} w-full h-full max-w-full line-clamp-1`}>{option.label}</div>
                          </Click>
                        </label>
                      ))}
                </div>
              )}

              {quiz?.type === 'text-answer' && (
                <div className="  w-full ">
                  <div className="flex h-full max-w-full items-center space-x-2 cursor-pointer">
                    <input type="text"
                      className={`input w-full mx-1 focus:bg-[--secondary-color] focus:text-white `}
                      placeholder="ทำใจให้สบาย ลองสูดหายใจลึก..."
                      onChange={(element) => handleAnswerChange(quiz?.id, String(element.target.value))} />
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
          : <div className="">
            <CompleteScreen />
          </div>
      }

      <AnimatePresence>
        {openNext && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ duration: 0.2, }}
            className="w-full ease-swoosh max-w-2xl md:h-[150px] h-[150px] z-[99] md:pb-0 pb-20 fixed border-3 border-[--quinary-color] bg-white rounded-t-3xl p-4 bottom-0 md:left-auto left-0"
          >
            <LottieAnimation
              className="absolute top-[-150px] right-0 h-[200px] pointer-events-none"
              src="https://lottie.host/0cbdb3ef-2fa5-4d1d-9e4e-f66c879e010d/D0bRr9d93F.lottie"
            />
            <div className="text-2xl text-zinc-800 mb-4 font-bold">เยี่ยมไปเลย!</div>
            <button
              onClick={() => {
                setStep((prev) => prev + 1);
                setOpenNext(false);
              }}
              className="bg-[--quinary-color-medium] w-full"
            >
              <div className="btn-fifthary">ดำเนินการต่อ</div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>


  )
}
