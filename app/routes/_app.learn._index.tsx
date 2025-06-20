import { MetaFunction } from "@remix-run/react";
import DailyPractice from "~/components/learn/DailyPractice";


export const meta: MetaFunction = () => {
    return [
        { title: 'Selfness - พัฒนาทักษะการสื่อสาร' },
        { name: 'description', content: 'ภารกิจประจำวันสำหรับพัฒนาทักษะ Soft Skill และการสื่อสาร' },
    ];
};


export default function _learn() {

    return <DailyPractice />
}
