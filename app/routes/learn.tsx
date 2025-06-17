import { MetaFunction } from "@remix-run/react";
import Overall from "~/components/game/Overall";
import DailyPractice from "~/components/learn/DailyPractice";
import SideBar from "~/components/SideBar";


export const meta: MetaFunction = () => {
    return [
        { title: 'Selfness - พัฒนาทักษะการสื่อสาร' },
        { name: 'description', content: 'ภารกิจประจำวันสำหรับพัฒนาทักษะ Soft Skill และการสื่อสาร' },
    ];
};


export default function _questions() {

    return (
        <div className="flex ">

            <SideBar />
            <main className=" flex max-h-[100vh] pb-10 w-full overflow-auto p-5">
                <section className="min-h-[150vh] w-full my-10">
                    <DailyPractice></DailyPractice>
                </section>
                <Overall />
            </main>

        </div>


    )
}
