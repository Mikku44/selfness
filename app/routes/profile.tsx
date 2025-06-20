import { MetaFunction } from '@remix-run/react';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useAuth } from '~/components/Contexts/AuthContext';
import ProgressBar from '~/components/ProgressBar';
import SideBar from '~/components/SideBar'
import getRankByXP, { nextRank } from '~/libs/ranks';
import { User } from '~/Models/User';
import { signOutUser } from '~/services/AuthService';
import SVG from 'react-inlinesvg';
import ButtonShop from '~/components/ButtonShop';


export const meta: MetaFunction = () => {
    const title = 'Selfness - เปลี่ยนความกลัวเป็นความกล้า คว้าทุกโอกาส';
    const description = 'Selfness: แอปพลิเคชันพัฒนาทักษะ Soft Skill และการสื่อสาร ช่วยให้คนที่ไม่กล้าพูด ไม่กล้าเข้าสังคม ปลดล็อกความมั่นใจ เพื่อคว้าทุกโอกาสในชีวิต.';
    const url = 'https://selfness.khain.app/';
    const imageUrl = 'https://selfness.khain.app/images/selfness-home-og-image.jpg';

    return [
        // Standard Meta Tags for SEO
        { title: title },
        { name: 'description', content: description },
        { name: 'keywords', content: 'Selfness, Soft Skill, การสื่อสาร, พัฒนาตัวเอง, ความมั่นใจ, กล้าพูด, กล้าเข้าสังคม, ปลดล็อกโอกาส, แอปพลิเคชัน, พัฒนาบุคลิกภาพ' },
        { name: 'robots', content: 'index, follow' }, // บอก Search Engine ให้จัดทำดัชนีและติดตามลิงก์

        // Open Graph Tags for Social Media Sharing (e.g., Facebook, Line)
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        { property: 'og:type', content: 'website' }, // 'website' เหมาะสำหรับหน้าหลัก
        { property: 'og:image', content: imageUrl },
        { property: 'og:image:width', content: '1200' }, // แนะนำความกว้างสำหรับ OG Image
        { property: 'og:image:height', content: '630' }, // แนะนำความสูงสำหรับ OG Image
        { property: 'og:site_name', content: 'Selfness' },
        { property: 'og:locale', content: 'th_TH' }, // ระบุภาษาไทย

        // Twitter Card Tags for Twitter Sharing
        { name: 'twitter:card', content: 'summary_large_image' }, // แนะนำสำหรับรูปภาพขนาดใหญ่
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: imageUrl },
        { name: 'twitter:alt', content: 'Selfness: แอปพลิเคชันพัฒนา Soft Skill และการสื่อสารสำหรับคนที่ไม่กล้าพูด ไม่กล้าเข้าสังคม' }, // ข้อความอธิบายรูปภาพสำหรับ Twitter

    ];
};


export default function profile() {

    // const [UserInfo, setUserInfo] = useState<User | null>(null);

    const { user, UserInfo, setOnLogin } = useAuth();


    // const fetchUser = async () => {
    //     if (user) {
    //         const userInfo = await getUserByUid(user.uid)
    //         setUserInfo(userInfo);
    //         // console.log(userInfo)
    //     } else {
    //         console.log("No User data");
    //     }

    // }

    // useEffect(() => {
    //     fetchUser();
    // }, [user]);
    return (

        <div className="flex " >

            <SideBar />

            <main className="max-h-[100vh] w-full bg-zinc-200/30 overflow-auto p-5">
                <section className="min-h-[150vh] max-w-2xl mx-auto md:ml-[100px]">
                    {(user && UserInfo) && <ProfilePage user={UserInfo} />}
                    <section className="mt-5">
                        <div className="grid gap-2">
                            {/* Status bar */}
                            {UserInfo && <div className="card-box bg-white flex">
                                <div className="flex gap-1 font-bold items-center cursor-default hover:bg-zinc-100 rounded-md w-fit px-2 py-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fe3a52" d="M2 9.26c0 3.748 4.02 7.711 6.962 10.11C10.294 20.458 10.96 21 12 21s1.706-.543 3.038-1.63C17.981 16.972 22 13.009 22 9.26C22 3.35 16.5.663 12 5.5C7.5.663 2 3.349 2 9.26" opacity="0.5" /><path fill="#fe3a52" d="M10.093 10.747q.133-.191.23-.325c.056.097.119.21.194.348l1.71 3.109c.166.302.33.598.493.813c.175.23.482.546.975.555s.813-.294.996-.518c.172-.208.345-.498.523-.794l.055-.092c.221-.368.36-.598.483-.764c.113-.154.179-.204.228-.231s.125-.058.315-.077c.206-.02.474-.02.904-.02H18a.75.75 0 0 0 0-1.5h-.834c-.387 0-.73 0-1.016.027a2.2 2.2 0 0 0-.91.264a2.2 2.2 0 0 0-.694.644c-.171.232-.347.525-.546.857l-.048.08c-.087.144-.159.264-.224.368l-.21-.377l-1.709-3.108c-.154-.28-.307-.56-.463-.764c-.17-.224-.462-.52-.93-.545c-.467-.025-.789.237-.982.442c-.177.186-.36.448-.543.71l-.31.442c-.227.324-.37.526-.493.672a.8.8 0 0 1-.223.203c-.046.024-.118.05-.293.066c-.19.018-.438.018-.834.018H6a.75.75 0 0 0 0 1.5h.768c.357 0 .674 0 .94-.024c.29-.026.571-.085.85-.23c.28-.145.489-.343.676-.564c.173-.205.354-.464.559-.757z" /></svg>
                                    <div className="">{UserInfo?.overall?.life || 0}</div>
                                </div>
                                <div className="flex gap-1 font-bold items-center cursor-default hover:bg-zinc-100 rounded-md w-fit px-2 py-1">
                                    {/* <img src="/icons/gem.svg" alt="gem" className="size-5" /> */}
                                    <SVG
                                        className="size-5"
                                        src="/icons/gem.svg"
                                        width={18}
                                        height="auto"
                                        title="gem"
                                    />
                                    <div className="">{UserInfo?.overall?.gems || 0}</div>
                                </div>
                            </div>}
                            {/* Dailay Practice */}
                            {UserInfo && <div className="card-box ">
                                <div className="text-lg text-zinc-600">ภารกิจประจำวัน! </div>
                                <div className="flex gap-2 items-center ">
                                    <iframe className="size-12 inline" src="https://lottie.host/embed/b2e63c21-bb0e-49b6-b3f7-2cc96865143e/e9dNlFWP77.lottie"></iframe>
                                    <div className="w-full">
                                        <div className="text-md text-zinc-600  mb-1">สะสมให้ครบเพื่อเลื่อนสู่ {nextRank(UserInfo?.overall?.xp).name} </div>
                                        <ProgressBar progress={UserInfo?.overall?.xp || 0} maxProgress={getRankByXP(UserInfo?.overall?.xp).maxXP} showLabel={false} fillColor={"bg-[var(--primary-color)]"} />
                                    </div>
                                </div>
                            </div>}

                            {/* Profile Panel */}


                            {!user && <div className="card-box ">
                                <div className="text-md mb-2 text-zinc-600">สร้างบัญชีของคุณเพื่อดูการเติบโต</div>
                                <div className="grid  gap-2 items-center ">
                                    <button onClick={async () => setOnLogin(true)} className="bg-indigo-800">
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
                </section>

            </main>
        </div>
    )
}


function ProfilePage({ user }: { user: User }) {
    const handleLogout = async () => {
        const result = await signOutUser();
        if (result) {
            toast.success("Logged out!")
        } else {
            toast.error("Something went wrong please, try again later!")
        }
        window.location.reload();
    }
    return (
        <div className="mx-auto mt-10 p-6 rounded-xl shadow-md bg-white space-y-4">
            {/* Profile Image */}
            <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full border overflow-hidden bg-gray-200 flex items-center justify-center text-xl font-bold text-white">
                    <ProfileAvatar name={user.display_name} image={user.profile_image} />
                </div>
                <div>
                    <h2 className="text-xl font-semibold">{user.display_name}</h2>
                    <p className="text-sm text-gray-500">ID: {user.id}</p>
                    {/* Created At */}
                    <div className="text-xs text-gray-400 text-right pt-2">
                        เข้าร่วมเมื่อ {new Date(user.created_at.seconds * 1000).toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Cover Image (optional) */}
            {user.cover_image && (
                <div>
                    <img
                        src={user.cover_image}
                        alt="Cover"
                        className="w-full h-40 object-cover rounded-lg"
                    />
                </div>
            )}

            {/* Overall Stats */}
            <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-2">Overall Stats</h3>
                <div className="flex justify-between text-sm capitalize">
                    <div>
                        <span className="font-semibold">XP:</span> {user.overall.xp}
                    </div>
                    <div>
                        <span className="font-semibold">Stack:</span> {user.overall.stack}
                    </div>
                    <div>
                        <span className="font-semibold">Rank:</span> {user.overall.rank}
                    </div>
                </div>
            </div>

            {/* Achievements */}
            <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-2">Achievements</h3>
                {user.achievements.length === 0 ? (
                    <p className="text-sm text-gray-500">No achievements yet.</p>
                ) : (
                    <ul className="list-disc pl-5 text-sm space-y-1">
                        {user.achievements.map((acm) => (
                            <li key={acm.ACM_ID}>
                                {acm.ACM_name} × {acm.amount}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="">
                {/* <button
                    className='bg-[var(--secondary-color)] w-full'
                    onClick={() => handleLogout()}>
                    <div className="btn-question-active">Logout</div>
                </button> */}
                <ButtonShop
                    className="w-full"
                    onClick={() => handleLogout()}
                    text="Log out"
                ></ButtonShop>
            </div>


        </div>
    );
}


function ProfileAvatar({ name, image }: { name: string; image?: string }) {
    const [fallbackSrc, setFallbackSrc] = useState<string>("");

    useEffect(() => {
        if (!image && name) {
            const avatar = generateInitialAvatar(name, 64);
            setFallbackSrc(avatar);
        }
    }, [image, name]);

    return (
        <img
            src={image || fallbackSrc}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border"
        />
    );
}


export function generateInitialAvatar(name: string, size = 1024): string {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    // Background color (based on name hash)
    const bgColor = stringToColor(name);
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Initial letter
    const initial = name.charAt(0).toUpperCase();
    ctx.font = `${size * 0.5}px sans-serif`;
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initial, size / 2, size / 2);

    return canvas.toDataURL();
}

function stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 50%)`;
}
