import { MetaFunction } from "@remix-run/react";
import { AnimatePresence,motion } from "framer-motion";
import { useState } from "react";
import Click from "~/components/Click";
import { useAuth } from "~/components/Contexts/AuthContext";
import { useLesson } from "~/components/Contexts/LessonContext"
import LoadingScreen from "~/components/game/LoadingScreen";
import ProgressBar from "~/components/ProgressBar";
import { lessonMindset } from "~/libs/questions/lesson-mindset";
import '~/css/animation.css';

export const meta: MetaFunction = () => {
  return [
    { title: 'Selfness - บทเรียนพัฒนาทักษะประจำวัน' },
    { name: 'description', content: 'เนื้อหาบทเรียนประจำวันสำหรับพัฒนาทักษะ Soft Skill และการสื่อสาร' },
  ];
};


export default function Lesson() {
  const { loading, lessonIndex } = useLesson();
  const { UserInfo } = useAuth();
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [step, setStep] = useState(0);
  const [openNext, setOpenNext] = useState(false);

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


  return (

    <section className="max-w-lg mx-auto -my-16  sticky top-0 h-full">
      {UserInfo && <div className="card-box   w-full bg-white flex mb-5">
        <div className="flex gap-1 font-bold items-center cursor-default hover:bg-zinc-100 rounded-md w-fit px-2 py-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fe3a52" d="M2 9.26c0 3.748 4.02 7.711 6.962 10.11C10.294 20.458 10.96 21 12 21s1.706-.543 3.038-1.63C17.981 16.972 22 13.009 22 9.26C22 3.35 16.5.663 12 5.5C7.5.663 2 3.349 2 9.26" opacity="0.5" /><path fill="#fe3a52" d="M10.093 10.747quiz?.133-.191.23-.325c.056.097.119.21.194.348l1.71 3.109c.166.302.33.598.493.813c.175.23.482.546.975.555s.813-.294.996-.518c.172-.208.345-.498.523-.794l.055-.092c.221-.368.36-.598.483-.764c.113-.154.179-.204.228-.231s.125-.058.315-.077c.206-.02.474-.02.904-.02H18a.75.75 0 0 0 0-1.5h-.834c-.387 0-.73 0-1.016.027a2.2 2.2 0 0 0-.91.264a2.2 2.2 0 0 0-.694.644c-.171.232-.347.525-.546.857l-.048.08c-.087.144-.159.264-.224.368l-.21-.377l-1.709-3.108c-.154-.28-.307-.56-.463-.764c-.17-.224-.462-.52-.93-.545c-.467-.025-.789.237-.982.442c-.177.186-.36.448-.543.71l-.31.442c-.227.324-.37.526-.493.672a.8.8 0 0 1-.223.203c-.046.024-.118.05-.293.066c-.19.018-.438.018-.834.018H6a.75.75 0 0 0 0 1.5h.768c.357 0 .674 0 .94-.024c.29-.026.571-.085.85-.23c.28-.145.489-.343.676-.564c.173-.205.354-.464.559-.757z" /></svg>
          <div className="">{UserInfo?.overall?.life || 0}</div>
        </div>
        <div className="flex gap-1 font-bold items-center cursor-default hover:bg-zinc-100 rounded-md w-fit px-2 py-1">
          <img src="/icons/gem.svg" alt="gem" className="size-5" />
          <div className="">{UserInfo?.overall?.gems || 0}</div>
        </div>
      </div>}
      <ProgressBar progress={0} className=" " />
      {loading ? <LoadingScreen /> :
        <div className="relative mt-5 md:pb-0 pb-20">
          <div className="text-xl">Lesson : {lessonIndex}</div>
          {[lessonMindset[lessonIndex]?.steps?.[step]]?.map((quiz) =>
            <div key={quiz?.id} className="mb-5">
              <div className="text-xl font-bold  mb-5">{quiz?.text}</div>
              {quiz?.type === 'multiple-answer' && quiz?.options &&
                <div className="grid md:grid-cols-2 gap-3">
                  {quiz?.options.map((option) =>
                    (option?.value == "input") ?
                      <div className="flex w-full gap-2 h-full max-w-full max-h-full items-center space-x-2 cursor-pointer">
                        <input type="text"
                          className={`input w-full mx-1 focus:bg-[--secondary-color] focus:text-white`}
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
                      <div className="flex w-full h-full max-w-full max-h-full items-center space-x-2 cursor-pointer">
                        <input type="text"
                          className={`input w-full mx-1 focus:bg-[--secondary-color] focus:text-white`}
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
                      className={`input w-full mx-1 focus:bg-[--secondary-color] focus:text-white`}
                      placeholder="ทำใจให้สบาย ลองสูดหายใจลึก..."
                      onChange={(element) => handleAnswerChange(quiz?.id, String(element.target.value))} />
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      }

      <AnimatePresence>
        {openNext && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full ease-swoosh max-w-lg md:h-[200px] h-fit z-[99] md:pb-0 pb-20 fixed bg-white rounded-t-3xl p-4 bottom-0 md:left-auto left-0"
          >
            <div className="text-2xl mb-4">เยี่ยมไปเลย!</div>
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
