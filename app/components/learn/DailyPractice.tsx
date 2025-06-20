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
import { motion } from "framer-motion";
import ExpandingCircle from "../game/ExpandingCircle";
import ButtonSlide from "../ButtonSlide";

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
        <section className=" max-w-4xl md:p-12 rounded-lg my-10">
            <h1 className="text-2xl font-bold mb-6 ">Daily practices</h1>
            <div className="min-h-[250px] rounded-xl overflow-hidden mb-3">
                <Plant className="min-h-[250px]"></Plant>
            </div>

            <WeeklyDatePicker onDateSelect={(date: any) => setCurrentDay(date)} variant="light"></WeeklyDatePicker>
            <div className="">
                {/* <h2 className="text-xl font-bold mb-6 ">Daily practices</h2> */}
                <div className="tabs grid grid-cols-2 py-2 mb-4 gap-2">
                    <button
                        className={`${seletedTab == "habit" ? "bg-[--secondary-color-light] text-white" : "bg-white"} rounded-md input h-12 `}
                        onClick={() => setseletedTab("habit")}>
                        Habit
                    </button>
                    <button
                        className={`${seletedTab == "challenge" ? "bg-[--secondary-color-light] text-white" : "bg-white"} rounded-md input h-12 `}
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
    const [transition, setTransition] = useState(false);
    const [title, setTitle] = useState({
        lesson: "",
        sub: ""
    });


    return <section className="min-h-screen ">
        {title?.lesson && <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={title?.lesson ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.2 }}
            className="lesson px-2 py-4 z-10 bg-white input cursor-default shadow h-fit border border-white sticky top-0 rounded-xl">
            <div className="font-medium text-zinc-800 capitalize">{title.lesson}</div>
            <div className="font-normal text-zinc-700">{title.sub}</div>

        </motion.div>}
        <div className="steps flex gap-20 flex-col mt-10 mb-20 relative">
            <div className=" ">

            </div>
            {/* {lessonIndex} */}
            {lessonMindset.map((mindset, index) =>
                <motion.div
                    key={index}
                    initial={{ opacity: 0, }}
                    whileTap={{ scale: 0.8 }}
                    whileInView={{ opacity: 1, }}
                    transition={{ duration: 0.3 }}
                    onViewportEnter={() => {

                        setTitle({
                            lesson: mindset.category,
                            sub: mindset.lesson,
                        })
                    }}
                    className="mx-auto"
                >
                    <ButtonSlide href={`#lesson-${index}`}
                        onClick={() => {
                            setSetlessonIndex(index)
                            setTransition(true);
                            setTimeout(()=> {
                                window.location.href = `/lesson?lesson=${index}`
                            },500)
                        }}
                        className="capitalize w-[64px] h-[64px] rounded-full hover:w-[350px] line-clamp-1 text-ellipsis overflow-hidden"
                        text={""}
                        icon={
                            
                            <div className="flex gap-2 w-full  text-ellipsis ">
                                <svg className="min-w-[24px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M14.757 2.621a4.682 4.682 0 0 1 6.622 6.622l-9.486 9.486c-.542.542-.86.86-1.216 1.137q-.628.492-1.35.835c-.406.193-.834.336-1.56.578l-3.332 1.11l-.802.268a1.81 1.81 0 0 1-2.29-2.29l1.378-4.133c.242-.727.385-1.155.578-1.562q.344-.72.835-1.35c.276-.354.595-.673 1.137-1.215zM4.4 20.821l2.841-.948c.791-.264 1.127-.377 1.44-.526q.572-.274 1.073-.663c.273-.214.525-.463 1.115-1.053l7.57-7.57a7.36 7.36 0 0 1-2.757-1.744A7.36 7.36 0 0 1 13.94 5.56l-7.57 7.57c-.59.589-.84.84-1.053 1.114q-.39.5-.663 1.073c-.149.313-.262.649-.526 1.44L3.18 19.6zM15.155 4.343c.035.175.092.413.189.69a5.86 5.86 0 0 0 1.4 2.222a5.86 5.86 0 0 0 2.221 1.4c.278.097.516.154.691.189l.662-.662a3.182 3.182 0 0 0-4.5-4.5z" clipRule="evenodd" /></svg>
                                <div className="opacity-0 w-0 line-clamp-1 absolute  group-hover:static group-hover:opacity-90 group-hover:w-[300px]">{mindset.lesson}</div>
                            </div>
                                
                            
                        }
                        aria-label={mindset.lesson}
                    />
                </motion.div>

                // <motion.a href={`/lesson?lesson=${index}`} key={index}
                //     onClick={() => {
                //         setSetlessonIndex(index)
                //         setTransition(true);
                //     }}
                //      initial={{ opacity: 0, }}
                //      whileTap={{scale:0.8}}
                //     whileInView={{ opacity: 1,}}
                //     transition={{ duration: 0.3 }}
                //     onViewportEnter={() => {

                //         setTitle({
                //             lesson: mindset.category,
                //             sub: mindset.lesson,
                //         })
                //     }}
                //     aria-label={mindset.lesson}
                //     className={` group size-[72px] input bg-[--quinary-color]`}

                // >

                //     <div className=" rounded-full mx-auto w-fit h-full flex items-center justify-start text-white">
                //         {/* {calcDistance(index)} : {index % 4} */}
                //         <svg xmlns="http://www.w3.org/2000/svg"
                //             className="size-[30px]"
                //             width="24"
                //             height="24"
                //             viewBox="0 0 24 24">
                //             <path
                //                 fill="currentColor"
                //                 d="m13.629 20.472l-.542.916c-.483.816-1.69.816-2.174 0l-.542-.916c-.42-.71-.63-1.066-.968-1.262c-.338-.197-.763-.204-1.613-.219c-1.256-.021-2.043-.098-2.703-.372a5 5 0 0 1-2.706-2.706C2 14.995 2 13.83 2 11.5v-1c0-3.273 0-4.91.737-6.112a5 5 0 0 1 1.65-1.651C5.59 2 7.228 2 10.5 2h3c3.273 0 4.91 0 6.113.737a5 5 0 0 1 1.65 1.65C22 5.59 22 7.228 22 10.5v1c0 2.33 0 3.495-.38 4.413a5 5 0 0 1-2.707 2.706c-.66.274-1.447.35-2.703.372c-.85.015-1.275.022-1.613.219c-.338.196-.548.551-.968 1.262" />
                //         </svg>
                //     </div>
                // </motion.a>
            )
            }
            {transition && <ExpandingCircle duration={0.5} />}


        </div>
    </section>
}