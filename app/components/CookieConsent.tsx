// components/CookieConsent.tsx
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = Cookies.get("cookie_consent");
        if (!consent) {
            setVisible(true);
        }
    }, []);

    const acceptAll = () => {
        Cookies.set("cookie_consent", "all", { expires: 365 });
        setVisible(false);
    };

    const essentialOnly = () => {
        Cookies.set("cookie_consent", "essential", { expires: 365 });
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between">
            <div className="text-sm text-gray-700 max-w-lg mb-2 sm:mb-0">
                เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์ของคุณบนเว็บไซต์นี้ หากคุณใช้ต่อ แสดงว่าคุณยอมรับการใช้คุกกี้ของเรา
                <a href="/privacy-policy" className="ml-1 text-blue-600 underline">อ่านเพิ่มเติม</a>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={essentialOnly}
                    className=""
                >
                    <div className="btn-question">เฉพาะที่จำเป็น</div>
                </button>
                <button
                    onClick={acceptAll}
                    className="bg-[var(--secondary-color)]"
                >
                    <div className="btn-question-active">ยอมรับทั้งหมด</div>
                </button>
            </div>
        </div>
    );
}
