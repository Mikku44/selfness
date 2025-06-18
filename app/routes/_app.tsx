import { Outlet } from "@remix-run/react";
import { ReactNode } from "react";
import Overall from "~/components/game/Overall";
import SideBar from "~/components/SideBar";

export default function _app({children}:{children:ReactNode}) {
    return (
        <div className="flex ">

            <SideBar />
            <main className=" flex max-h-[100vh] pb-10 w-full overflow-auto p-5">
                <section className="min-h-[150vh] w-full my-10">
                    <Outlet />
                </section>
                <Overall />
            </main>

        </div>
    )
}
