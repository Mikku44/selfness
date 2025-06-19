import { Outlet } from "@remix-run/react";
import { LessonProvider } from "~/components/Contexts/LessonContext";
import Overall from "~/components/game/Overall";
import SideBar from "~/components/SideBar";

export default function _app() {
    return (
        <div className="flex ">

            <SideBar />
            <main className="bg-zinc-200/30 flex max-h-[100vh] relative pb-10 w-full overflow-auto p-5">
                <section className="min-h-[100vh] w-full my-10">
                    <LessonProvider>
                        <Outlet />
                    </LessonProvider>

                </section>
                <Overall />
            </main>

        </div>
    )
}
