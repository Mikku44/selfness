import { useState, useEffect, useRef } from "react";

const socialPlatforms = [
    {
        name: "Facebook",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52" height="52" viewBox="0 0 48 48">
                <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
            </svg>
        ),
        shareUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
        name: "Instagram",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52" height="52" viewBox="0 0 48 48">
                <radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"></stop><stop offset=".328" stop-color="#ff543f"></stop><stop offset=".348" stop-color="#fc5245"></stop><stop offset=".504" stop-color="#e64771"></stop><stop offset=".643" stop-color="#d53e91"></stop><stop offset=".761" stop-color="#cc39a4"></stop><stop offset=".841" stop-color="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9"></stop><stop offset=".999" stop-color="#4168c9" stop-opacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
            </svg>
        ),
        // Instagram does not have a direct share url; typically share from app
        shareUrl: () => "#",
    },
    {
        name: "X",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52" height="52" viewBox="0 0 50 50">
                <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
            </svg>
        ),
        shareUrl: (url: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    },
    // Add more platforms here
];

interface ShareButtonProps {
    url?: string; // URL to share, defaults to current page
    className? : string;
}

export function ShareButton({ url,className }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copySuccess, setCopySuccess] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Default to current URL if no url prop
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

    const copyToClipboard = () => {
        if (!inputRef.current) return;
        inputRef.current.select();
        document.execCommand("copy");
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
    };

    // Close modal on ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <>
            <button
                aria-label="Share"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                }}
                className={`px-4 py-2  bg-white h-full m-0 hover:bg-zinc-400/10 transition rounded ${className}`}
            >
                <div className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        className="stroke-current"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                    >
                        <path d="m17 11l-4-4v2c-2 0-6 2.2-6 7c0-.667 1.2-3 6-3v2z"></path>
                        <circle cx={12} cy={12} r={10}></circle>
                    </svg>
                    แบ่งปัน
                </div>
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black m-0 bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setIsOpen(false)}
                    aria-modal="true"
                    role="dialog"
                    style={{ margin: 0 }}
                >
                    <div
                        className="bg-white rounded-lg max-w-md w-full p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-semibold mb-4">แชร์ลิงก์นี้</h2>

                        <div className="flex items-center mb-4">
                            <input
                                ref={inputRef}
                                type="text"
                                readOnly
                                value={shareUrl}
                                className="flex-grow border rounded-l input px-3 mr-2 w-full text-gray-800 select-all"
                                onFocus={(e) => e.currentTarget.select()}
                            />
                            <button
                                onClick={copyToClipboard}
                                className=" "
                            >
                                <div className={copySuccess? "btn-question-active" : "btn-question"}>{copySuccess ? <div className="flex gap-2 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <mask id="lineMdCircleFilledToConfirmCircleFilledTransition0">
                                            <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                                <path fill="#fff" d="M3 12c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9Z"></path>
                                                <path stroke="#000" strokeDasharray={14} strokeDashoffset={14} d="M8 12l3 3l5 -5">
                                                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="14;0"></animate>
                                                </path>
                                            </g>
                                        </mask>
                                        <rect width={24} height={24} fill="currentColor" mask="url(#lineMdCircleFilledToConfirmCircleFilledTransition0)"></rect>
                                    </svg>
                                    Done!
                                </div> : "Copy"}</div>
                            </button>
                        </div>


                        <div className="flex space-x-4 justify-center">
                            {socialPlatforms.map(({ name, icon, shareUrl: getShareUrl }) => (
                                <a
                                    key={name}
                                    href={getShareUrl(shareUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Share on ${name}`}
                                    className="text-gray-600 hover:text-blue-600 transition"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-6 transition w-full"
                        >
                            <div className="btn-question">Close</div>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
