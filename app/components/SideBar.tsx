import { Link } from "@remix-run/react";
import MobileSidebar from "./MobileSidebar";

export default function SideBar() {
    return (
        <>   
        <aside className="w-[300px]  p-4 h-screen border-r-2 hidden md:block flex-shrink-0">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@100..700&display=swap" rel="stylesheet" />
            {/* Hidden on small screens, block on medium and up */}
            <h2 className="text-2xl font-bold mb-6">
                <Link to="/overview" className="">
                    <img src="/logo/logo-with-text.png" className="h-8" alt="selfness logo" />
                </Link>
            </h2>
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link to="/learn" className=" py-2 px-3 rounded hover:bg-zinc-50 transition-colors flex gap-2 items-center">
                        <img src="/icons/education.png" alt="home icon" 
                        className="size-5" />
                            Learn
                        </Link>
                    </li>
                    <li>
                        <Link to="/questions" className=" py-2 px-3 rounded hover:bg-zinc-50 transition-colors flex gap-2 items-center">
                        <img src="/icons/puzzle.png" alt="home icon" 
                        className="size-5" />
                            Questionnaire
                        </Link>
                    </li>
                    <li>
                        <Link to="/share" className="flex items-center gap-2 py-2 px-3 rounded hover:bg-zinc-50 transition-colors">
                         <img src="/icons/global.png" alt="feed icon" 
                         className="size-5"/>
                            Share Feed
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="#" className="block py-2 px-3 rounded hover:bg-zinc-50 transition-colors">
                            ประจำวัน
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="block py-2 px-3 rounded hover:bg-zinc-50 transition-colors">
                            ความก้าวหน้า
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="block py-2 px-3 rounded hover:bg-zinc-50 transition-colors">
                            พัฒนาตัวเอง
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="block py-2 px-3 rounded hover:bg-zinc-50 transition-colors">
                            ร้านค้า
                        </Link>
                    </li>*/}
                    <li>
                        <Link to="/profile" className="flex items-center gap-2 py-2 px-3 rounded hover:bg-zinc-50 transition-colors">
                         <img src="/icons/profile.png" alt="profile icon" 
                         className="size-5"/>
                            Profile
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="#" className="block py-2 px-3 rounded hover:bg-zinc-50 transition-colors">
                            การตั้งค่า
                        </Link>
                    </li>  */}
                </ul>
            </nav>
            
        </aside>
         <MobileSidebar />
        </>
     
    )
}
