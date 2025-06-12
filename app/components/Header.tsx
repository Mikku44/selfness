import { Link } from "@remix-run/react";

export default function Header({ show = true }) {
    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@100..700&display=swap" rel="stylesheet" />

            <header className="bg-[#f9f9f9] py-2 top-0 sticky z-[99] pb-3 border-b">
                <nav className=" flex mx-auto justify-between max-container">
                    <Link to="/" className="">
                        <img src="/logo/logo-with-text.png" className="h-8" alt="selfness logo" />
                    </Link>
                    {show &&
                        <Link to={"/questions"}>
                            <button className="">
                                <div className="btn-primary" >เริ่มกันเลย</div>
                            </button>
                        </Link>}
                </nav>
            </header>
        </>
    )
}
