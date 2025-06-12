import { Link } from "@remix-run/react";

export default function Footer() {
    return (
        <footer className=" md:py-12 py-8 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Info */}
                <div className="  md:text-left">
                    <Link to="/" className="">
                        <img src="/logo/logo-with-text.png" className="h-8" alt="selfness logo" />
                    </Link>

                    <p className="text-[#a0a0a0] text-sm py-4">
                        © 2025 Selfness. สงวนลิขสิทธิ์.
                    </p>
                </div>

                {/* Quick Links */}
                <div className=" md:text-left">
                    <h4 className="text-lg font-semibold mb-4">นโยบายและเงื่อนไข</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a
                                href="/privacy-policy"
                                className="text-[#a0a0a0] hover:text-[var(--primary-color)] transition-colors duration-200"
                            >
                                นโยบายความเป็นส่วนตัว
                            </a>
                        </li>
                        <li>
                            <a
                                href="/terms-of-service"
                                className="text-[#a0a0a0] hover:text-[var(--primary-color)] transition-colors duration-200"
                            >
                                ข้อกำหนดและเงื่อนไข
                            </a>

                        </li>
                        <li>
                            <a
                                href="/cookie-policy"
                                className="text-[#a0a0a0] hover:text-[var(--primary-color)] transition-colors duration-200"
                            >
                                นโยบายการใช้คุกกี้
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Social Media / Call to Action */}
                <div className=" md:text-left">
                    <h4 className="text-lg font-semibold mb-4">ดาวน์โหลด</h4>
                    <div className="flex md:justify-start space-x-4">
                        <Link target="_blank" to="https://play.google.com/store/apps/details?id=com.duolingo">
                            <div className="flex gap-2 items-center bg-zinc-900 rounded-md px-2 py-1 text-white hover:opacity-90 duration-150 text-[14px]">
                                <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 30 30">
                                    <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
                                </svg>
                                <div className="">Google Play</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
