
import { useEffect, useRef, useState } from "react";
import BubblyButton from "../BubbleButton";
import LottieWeb from "../lotties/LottieWeb";
import ExpandingCircle from "./ExpandingCircle";
import { useNavigate } from "@remix-run/react";

export default function CompleteScreen() {
    const soundSrc = '/sfx/result.mp3';
    const audioRef = useRef<HTMLAudioElement>(null);
    const isMount = useRef(null);
    const [transition, setTransition] = useState(false);
    const router = useNavigate();

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(error => {

                console.error('Error playing sound:', error);
            });
        }
    }, []);
    // const description = getRandomFact().description;
    return (
        <div ref={isMount} className=' flex justify-center flex-col items-center max-w-lg mx-auto'>
            <audio ref={audioRef} src={soundSrc} preload="auto" />
            <div className="">
                <LottieWeb
                    className="w-[300px] mt-5 relative z-10"
                    src="https://lottie.host/bafff4a7-8349-42f7-97d4-7ad2748c4cc8/TrrfFWZ39O.lottie" />
                <LottieWeb
                    className="w-[500px] absolute top-0 z-0 -translate-x-24"
                    src="https://lottie.host/7f1fcca2-7c22-4b31-9ce0-3cb1495e6725/UYPdbAEwYV.lottie" />
            </div>
            <div className="text-2xl text-zinc-700 font-bold mt-5"> ภารกิจสำเร็จ!</div>
            <div className="text-md text-zinc-500 mt-2 text-center">พร้อมลุยด่านใหม่ยัง?</div>
            {transition && <ExpandingCircle color="bg-[--primary-color]">
                <div className="flex justify-center items-center gap-10">
                    <div className="p-5 size-[150px] rounded-full font-bold bg-[--secondary-color] text-white">
                        <div className="">XP</div>
                        <div className="bg-white rounded-md text-zinc-800 px-3 py-2 ">30</div>
                    </div>
                   
                </div>
            </ExpandingCircle>}
            <BubblyButton
                onClick={() => {
                    setTransition(true)
                    setTimeout(() => {
                        // router("/learn")
                    }, 1000)
                }}
                className="bg-none mt-5 w-full">
                <div className="btn-primary">กลับสู่หน้าหลัก!</div>
            </BubblyButton>
        </div>
    )
}
