import { Outlet } from "@remix-run/react";
import Overall from "~/components/game/Overall";
import SideBar from "~/components/SideBar";

export default function _app() {
    return (
        <div className="flex ">

            <SideBar />
            <main className="bg-zinc-200/30 flex max-h-[100vh] pb-10 w-full overflow-auto p-5">
                <section className="min-h-[150vh] w-full my-10">
                    <Outlet />
                </section>
                <Overall />
            </main>

        </div>
    )
}
