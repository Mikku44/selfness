import { useState } from "react";
import WeeklyDatePicker from "../game/WeeklyDatePicker";
import Plant from "../game/Plant";
import { useNavigate } from "@remix-run/react";
import { MarshRun } from "../lotties/MarshRun";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import LottieWeb from "../lotties/LottieWeb";
import { lessonMindset } from "~/libs/questions/lesson-mindset";
import { useLesson } from "../Contexts/LessonContext";
import BubbleChat from "../BubbleChat";

const menuCategories = [
    {
        label: "Mindset Practice",
        href: "mindset"
    },
    {
        label: "Speaking Practice",
        href: "speaking"
    },
    {
        label: "Eye contact Practice",
        href: "eye"
    },
    {
        label: "Mindfulness Practice",
        href: "mindulness"
    },
]

type Tap = "habit" | "challenge"

export default function DailyPractice() {
    const [currentDay, setCurrentDay] = useState(null);
    const [seletedTab, setseletedTab] = useState<Tap>("habit");
    const router = useNavigate()
    return (
        <section className=" md:max-w-auto max-w-4xl w-full">
            <h1 className="text-2xl font-bold mb-6 ">Daily practices</h1>
            <div className="min-h-[250px] rounded-xl overflow-hidden mb-3">
                <Plant className="min-h-[250px]"></Plant>
            </div>

            <WeeklyDatePicker onDateSelect={(date: any) => setCurrentDay(date)} variant="light"></WeeklyDatePicker>
            <div className="">
                {/* <h2 className="text-xl font-bold mb-6 ">Daily practices</h2> */}
                <div className="tabs grid grid-cols-2 py-2 mb-4 gap-2">
                    <button
                        className={`${seletedTab == "habit" ? "bg-[--secondary-color-light] text-white" : "bg-white"} rounded-md h-12 `}
                        onClick={() => setseletedTab("habit")}>
                        Habit
                    </button>
                    <button
                        className={`${seletedTab == "challenge" ? "bg-[--secondary-color-light] text-white" : "bg-white"} rounded-md h-12 `}
                        onClick={() => setseletedTab("challenge")}>
                        Challenge
                    </button>
                </div>
                {seletedTab == "challenge" && <div className="grid gap-2">

                    {menuCategories.map((list) => {
                        return <div
                            key={list.label}
                            onClick={() => router(`./daily-practice/${list.href}`)}
                            className="border rounded-xl px-2 py-3 bg-white cursor-pointer">
                            {list.label}
                        </div>
                    })}
                </div>

                }
                {seletedTab == "habit" && <div className="grid gap-2">

                    <Journey />

                </div>

                }
            </div>
        </section>
    )
}

function Journey() {
    const { setSetlessonIndex, lessonIndex } = useLesson();



    return <section className="min-h-screen ">
        <div className="lesson px-2 py-4 z-10 bg-white/50 h-fit border border-white sticky top-0 rounded-xl">Lesson</div>
        <div className="steps flex gap-5 flex-col mt-10 mb-20 relative">
            <div className=" ">

                {/* <DotLottieReact

                    src="https://lottie.host/0dec50ed-2b1e-4378-ad6e-fa656a946f73/XqaSC4PSiJ.lottie"
                    loop
                    autoplay
                /> */}

                {/* <LottieWeb 
                className="w-[150px] absolute top-0"
                src="https://lottie.host/0dec50ed-2b1e-4378-ad6e-fa656a946f73/XqaSC4PSiJ.lottie" /> */}
            </div>
            {lessonIndex}
            {lessonMindset.map((mindset, index) => <a href={`#${index}`} key={index}
                onClick={() => {
                    setSetlessonIndex(index)

                    // setTimeout(() => {
                    //     window.location.href = ("/lesson")
                    // },
                    //     300)

                }
                }
                aria-label={mindset.lesson}
                className={` group size-[72px] mt-2 border-2 
           shadow shadow-[--quinary-color] border-[--quinary-color-light]
           hover:bg-[--quinary-color-medium]
            bg-[--quinary-color] mx-auto rounded-full focus:bg-[--quinary-color-dark]`}

            >

                <div className=" rounded-full mx-auto w-fit h-full flex items-center justify-center text-white">
                    {/* {calcDistance(index)} : {index % 4} */}
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="size-[30px]"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="m13.629 20.472l-.542.916c-.483.816-1.69.816-2.174 0l-.542-.916c-.42-.71-.63-1.066-.968-1.262c-.338-.197-.763-.204-1.613-.219c-1.256-.021-2.043-.098-2.703-.372a5 5 0 0 1-2.706-2.706C2 14.995 2 13.83 2 11.5v-1c0-3.273 0-4.91.737-6.112a5 5 0 0 1 1.65-1.651C5.59 2 7.228 2 10.5 2h3c3.273 0 4.91 0 6.113.737a5 5 0 0 1 1.65 1.65C22 5.59 22 7.228 22 10.5v1c0 2.33 0 3.495-.38 4.413a5 5 0 0 1-2.707 2.706c-.66.274-1.447.35-2.703.372c-.85.015-1.275.022-1.613.219c-.338.196-.548.551-.968 1.262" />
                    </svg>
                </div>
            </a>)}

        </div>
    </section>
}