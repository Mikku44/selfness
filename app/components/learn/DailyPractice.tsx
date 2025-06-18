import { useState } from "react";
import WeeklyDatePicker from "../game/WeeklyDatePicker";
import Plant from "../game/Plant";
import { useNavigate } from "@remix-run/react";

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

export default function DailyPractice() {
    const [currentDay, setCurrentDay] = useState(null);
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
                <div className="grid md:grid-cols-4 gap-2">
                    
                    {menuCategories.map((list) => {
                        return <div
                            key={list.label}
                            onClick={() => router(`./daily-practice/${list.href}`)}
                            className="border rounded-xl px-2 py-3 cursor-pointer">
                            {list.label}
                        </div>
                    })}
                </div>
            </div>
        </section>
    )
}
