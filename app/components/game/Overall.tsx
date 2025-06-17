import ProgressBar from "../ProgressBar";
import { useAuth } from "../Contexts/AuthContext";

export default function Overall() {
    const { user,UserInfo, setOnLogin } = useAuth();
   
    return (
        <>
            <aside className="w-[320px]  p-4 h-screen hidden lg:block md:hidden flex-shrink-0 sticky top-0">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@100..700&display=swap" rel="stylesheet" />
                {/* Hidden on small screens, block on medium and up */}


                <section className="">
                    <div className="grid gap-2">
                        {/* Status bar */}
                       {UserInfo && <div className="card-box bg-white flex">
                            <div className="flex gap-1 font-bold items-center cursor-default hover:bg-zinc-100 rounded-md w-fit px-2 py-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fe3a52" d="M2 9.26c0 3.748 4.02 7.711 6.962 10.11C10.294 20.458 10.96 21 12 21s1.706-.543 3.038-1.63C17.981 16.972 22 13.009 22 9.26C22 3.35 16.5.663 12 5.5C7.5.663 2 3.349 2 9.26" opacity="0.5" /><path fill="#fe3a52" d="M10.093 10.747q.133-.191.23-.325c.056.097.119.21.194.348l1.71 3.109c.166.302.33.598.493.813c.175.23.482.546.975.555s.813-.294.996-.518c.172-.208.345-.498.523-.794l.055-.092c.221-.368.36-.598.483-.764c.113-.154.179-.204.228-.231s.125-.058.315-.077c.206-.02.474-.02.904-.02H18a.75.75 0 0 0 0-1.5h-.834c-.387 0-.73 0-1.016.027a2.2 2.2 0 0 0-.91.264a2.2 2.2 0 0 0-.694.644c-.171.232-.347.525-.546.857l-.048.08c-.087.144-.159.264-.224.368l-.21-.377l-1.709-3.108c-.154-.28-.307-.56-.463-.764c-.17-.224-.462-.52-.93-.545c-.467-.025-.789.237-.982.442c-.177.186-.36.448-.543.71l-.31.442c-.227.324-.37.526-.493.672a.8.8 0 0 1-.223.203c-.046.024-.118.05-.293.066c-.19.018-.438.018-.834.018H6a.75.75 0 0 0 0 1.5h.768c.357 0 .674 0 .94-.024c.29-.026.571-.085.85-.23c.28-.145.489-.343.676-.564c.173-.205.354-.464.559-.757z" /></svg>
                                <div className="">{UserInfo?.overall?.life || 0}</div>
                            </div>
                            <div className="flex gap-1 font-bold items-center cursor-default hover:bg-zinc-100 rounded-md w-fit px-2 py-1">
                                <img src="/icons/gem.svg" alt="gem" className="size-5" />
                                <div className="">{UserInfo?.overall?.gems || 0}</div>
                            </div>
                        </div>}
                        {/* Dailay Practice */}
                        {UserInfo && <div className="card-box ">
                            <div className="text-lg text-zinc-600">ภารกิจประจำวัน! </div>
                            <div className="flex gap-2 items-center ">
                                <iframe className="size-12 inline" src="https://lottie.host/embed/b2e63c21-bb0e-49b6-b3f7-2cc96865143e/e9dNlFWP77.lottie"></iframe>
                                <div className="w-full">
                                    <div className="text-md text-zinc-600  mb-1">สะสมให้ครบ EXP!</div>
                                    <ProgressBar progress={UserInfo?.overall?.xp || 0} maxProgress={400} showLabel={false} fillColor={"bg-[var(--primary-color)]"} />
                                </div>
                            </div>
                        </div>}

                        {/* Profile Panel */}
                     
                           
                        {!user && <div className="card-box ">
                            <div className="text-md mb-2 text-zinc-600">สร้างบัญชีของคุณเพื่อดูการเติบโต</div>
                            <div className="grid  gap-2 items-center ">
                                <button onClick={() => setOnLogin(true)} className="bg-indigo-800">
                                    <span className="btn-secondary">
                                        สร้างบัญชี
                                    </span>
                                </button>
                                <button onClick={() => setOnLogin(true)} className="bg-[var(--fifthary-color-dark)]">
                                    <span className="btn-fifthary">
                                        เข้าสู่ระบบ
                                    </span>
                                </button>
                            </div>
                        </div>}
                        {/* Coin Panel */}
                        <div className=" card-box ">
                            <div className="text-md mb-2 text-zinc-600 font-bold">เติบโตแบบก้าวกระโดดด้วย Selfness Mindfulness</div>
                            <div className="flex flex-col gap-2 items-center ">
                                <iframe src="https://lottie.host/embed/2f6b01b7-3b10-4c3a-9b4b-276a508e9364/mq5LRBdj4A.lottie"></iframe>
                                <button className=" w-full">
                                    <span className="btn-primary">
                                        อัพเกรด
                                    </span>
                                </button>
                            </div>
                        </div>

                    </div>
                </section>
            </aside>
            <div className=""></div>
        </>

    )
}
