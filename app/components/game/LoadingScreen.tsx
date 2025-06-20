import { getRandomFact } from "~/libs/facts/facts1";
import LottieWeb from "../lotties/LottieWeb";

export default function LoadingScreen() {

    const description = getRandomFact().description;
    return (
        <div className=' flex justify-center flex-col items-center max-w-lg mx-auto'>
            <div className="">
                <LottieWeb
                    className="w-[300px] mt-5"
                    src="https://lottie.host/1abc6e7e-9f01-4e9d-bf24-4d1c58cbd81d/FEH9KIAsSo.lottie" />
            </div>
            <div className="text-2xl text-zinc-700 font-bold mt-5">กำลังโหลด...</div>
            <div className="text-md text-zinc-500 mt-2 text-center">{description}</div>
        </div>
    )
}
