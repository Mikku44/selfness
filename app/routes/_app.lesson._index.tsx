import { Progress } from "@antv/g2plot";
import { MetaFunction } from "@remix-run/react";
import { useAuth } from "~/components/Contexts/AuthContext";
import { useLesson } from "~/components/Contexts/LessonContext"
import LoadingScreen from "~/components/game/LoadingScreen";
import ProgressBar from "~/components/ProgressBar";

export const meta: MetaFunction = () => {
  return [
    { title: 'Selfness - บทเรียนพัฒนาทักษะประจำวัน' },
    { name: 'description', content: 'เนื้อหาบทเรียนประจำวันสำหรับพัฒนาทักษะ Soft Skill และการสื่อสาร' },
  ];
};


export default function Lesson() {
  const { loading } = useLesson();
  const { UserInfo } = useAuth();
  return (

    <section className="max-w-lg mx-auto -my-16  sticky top-0 h-full">
      {UserInfo && <div className="card-box   w-full bg-white flex mb-5">
        <div className="flex gap-1 font-bold items-center cursor-default hover:bg-zinc-100 rounded-md w-fit px-2 py-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fe3a52" d="M2 9.26c0 3.748 4.02 7.711 6.962 10.11C10.294 20.458 10.96 21 12 21s1.706-.543 3.038-1.63C17.981 16.972 22 13.009 22 9.26C22 3.35 16.5.663 12 5.5C7.5.663 2 3.349 2 9.26" opacity="0.5" /><path fill="#fe3a52" d="M10.093 10.747q.133-.191.23-.325c.056.097.119.21.194.348l1.71 3.109c.166.302.33.598.493.813c.175.23.482.546.975.555s.813-.294.996-.518c.172-.208.345-.498.523-.794l.055-.092c.221-.368.36-.598.483-.764c.113-.154.179-.204.228-.231s.125-.058.315-.077c.206-.02.474-.02.904-.02H18a.75.75 0 0 0 0-1.5h-.834c-.387 0-.73 0-1.016.027a2.2 2.2 0 0 0-.91.264a2.2 2.2 0 0 0-.694.644c-.171.232-.347.525-.546.857l-.048.08c-.087.144-.159.264-.224.368l-.21-.377l-1.709-3.108c-.154-.28-.307-.56-.463-.764c-.17-.224-.462-.52-.93-.545c-.467-.025-.789.237-.982.442c-.177.186-.36.448-.543.71l-.31.442c-.227.324-.37.526-.493.672a.8.8 0 0 1-.223.203c-.046.024-.118.05-.293.066c-.19.018-.438.018-.834.018H6a.75.75 0 0 0 0 1.5h.768c.357 0 .674 0 .94-.024c.29-.026.571-.085.85-.23c.28-.145.489-.343.676-.564c.173-.205.354-.464.559-.757z" /></svg>
          <div className="">{UserInfo?.overall?.life || 0}</div>
        </div>
        <div className="flex gap-1 font-bold items-center cursor-default hover:bg-zinc-100 rounded-md w-fit px-2 py-1">
          <img src="/icons/gem.svg" alt="gem" className="size-5" />
          <div className="">{UserInfo?.overall?.gems || 0}</div>
        </div>
      </div>}
      <ProgressBar progress={0} className=" " />
      {loading ? <LoadingScreen /> :
        <div className="relative">


        </div>
      }</section>


  )
}
