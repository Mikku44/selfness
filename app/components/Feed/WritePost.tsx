import { useRef, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { createPost } from "~/services/PostsService";
import { inferMediaTypeFromMime } from "~/libs/MIME";
import { uploadFileToStorage } from "~/libs/firebase/uploadFile";
import { Post } from "~/Models/Post";
import { useAuth } from "../Contexts/AuthContext";


export default function WritePost() {
    const { user } = useAuth()
    const [form, setForm] = useState({
        display_name: user?.displayName || "",
        user_id: "", // Set this dynamically if auth is available
        content: "",
        media: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string[]>([]);
    const [fileTypes, setFileTypes] = useState<string[]>([]);
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);

    const [fileType, setFileType] = useState<string | null>(null);


    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const audioInputRef = useRef<HTMLInputElement>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setMediaFiles((f: File[]) => [...f, file]);
            const url = URL.createObjectURL(file);
            setPreview((prev: string[]) => [...prev, url]);
            setFileType(file.type.split("/")[0]); // 'image', 'video', 'audio', etc.


        }
    }



    let uploadedUrl: string | null = null
    let file: File | null = null

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (form?.media) {
            file = form?.media as File;
            uploadedUrl = await uploadFileToStorage(file);
        }

        let payload: Post = {
            display_name: form.display_name.trim(),
            user_id: form.user_id.trim() || "anonymous", // Fallback user ID
            content: form.content.trim().substring(0, 3000),
            media: null,
            tags: [],
        }

        if (file) {
            payload.media = [
                {
                    url: uploadedUrl || "",
                    type: file ? inferMediaTypeFromMime(file.type) : "file",
                    name: file?.name || "",
                    mime_type: file?.type || "",
                },
            ] as any
        }

        try {
            const result = await createPost(payload);

            if (result) {
                // navigate("/share");
                setForm({
                    display_name: "",
                    user_id: "",
                    content: "",
                    media: null,
                })

                if (fileInputRef?.current) {
                    fileInputRef.current.value = '';
                }
                if (imageInputRef?.current) {
                    imageInputRef.current.value = '';
                }
                if (audioInputRef?.current) {
                    audioInputRef.current.value = '';
                }
            } else {
                setError("ไม่สามารถสร้างโพสต์ได้ กรุณาลองใหม่");
            }
        } catch (err) {
            console.error(err);
            setError("เกิดข้อผิดพลาดในการส่งโพสต์");
        } finally {
            setLoading(false);
        }
    }

    const LIMIT_TEXT: number | null = 3000;

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const { name, value } = e.target;
        if (LIMIT_TEXT) {
            setForm((prev) => ({
                ...prev,
                [name]: value.length <= LIMIT_TEXT ? value : value.slice(0, LIMIT_TEXT),
            }));
        }
        else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    }

    const handleRemoveFile = (index: number) => {
        setPreview((prev) => prev.filter((_, i) => i !== index));
        setFileTypes((prev) => prev.filter((_, i) => i !== index));
        setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit} className="space-y-4 border bg-white   rounded-xl p-5">
                <input
                    type="text"
                    name="display_name"
                    placeholder="Display name"
                    className="w-full px-3 py-2 rounded-xl border"
                    value={form.display_name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="content" className="relative ">
                    <textarea
                        name="content"
                        id="content"
                        placeholder="What is in your mind?"
                        className="w-full px-3 py-2 min-h-[100px] max-h-[300px] mt-2 rounded-xl border"
                        rows={2}
                        value={form.content}
                        onChange={(el) => handleChange(el)}
                        required
                    />
                    <div className="absolute right-0 bottom-0 px-2 mb-2 text-sm">{form.content.length} / {LIMIT_TEXT} </div>

                </label>
                {preview?.length > 0 && <div className="flex gap-2">
                    {preview?.map((prev: string, index: number) =>
                        <div className="mt-4 relative">
                            {fileType === "image" && <img src={prev} alt="prev" className="max-w-xs rounded-xl" />}
                            {fileType === "video" && <video src={prev} controls className="max-w-xs rounded" />}
                            {fileType === "audio" && <audio src={prev} controls />}
                            {fileType === "application" && (
                                <a href={prev} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                    Preview file
                                </a>
                            )}
                            <div onClick={() => handleRemoveFile(index)} className="absolute top-0 right-0 rounded-full bg-black/80 text-white p-1 m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 6L6 18M6 6l12 12"></path>
                                </svg>
                            </div>
                        </div>
                    )}
                </div>}

                <section className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        {/* <label htmlFor="file">
                                <input
                                    id="file"
                                    type="file"
                                    className="hidden "
                                    multiple
                                    ref={fileInputRef}
                                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                                    onChange={handleFileChange}
                                />

                                <div className=" cursor-pointer hover:text-[var(--primary-color)]"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className=" ">
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                        <path d="M12 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v3.5M9 9h1m-1 4h6m-6 4h3m7 5.5a4.75 4.75 0 0 1 3.5-3.5a4.75 4.75 0 0 1-3.5-3.5a4.75 4.75 0 0 1-3.5 3.5a4.75 4.75 0 0 1 3.5 3.5"></path>
                                    </g>
                                </svg>
                                </div>
                            </label>
                            <label htmlFor="sound">
                                <input
                                    id="sound"
                                    type="file"
                                    ref={audioInputRef}
                                    className="hidden "
                                    accept="audio/*"
                                    onChange={handleFileChange}
                                />
                                <div className=" cursor-pointer hover:text-[var(--primary-color)]"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className=" ">
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                        <path d="M9 5a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3z"></path>
                                        <path d="M5 10a7 7 0 0 0 14 0M8 21h8m-4-4v4"></path>
                                    </g>
                                </svg>
                                </div>
                            </label>
                            <label htmlFor="photoi">
                                <input
                                    id="photoi"
                                    type="file"
                                    className="hidden "
                                    ref={imageInputRef}
                                    accept="image/*,video/*"
                                    onChange={handleFileChange}
                                />
                                <div className=" cursor-pointer hover:text-[var(--primary-color)]"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className=" ">
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                        <path d="M9 15H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3"></path>
                                        <path d="M9 12a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3zm-6 0l2.296-2.296a2.41 2.41 0 0 1 3.408 0L9 10"></path>
                                        <path d="M14 13.5v3l2.5-1.5zM7 6v.01"></path>
                                    </g>
                                </svg>
                                </div>
                            </label> */}
                    </div>
                    <button
                        type="submit"
                        disabled={(form.content.length <= 0)}
                        className=" disabled:opacity-50"
                    >
                        <div className="btn-question">{loading ? "กำลังโพสต์..." : "โพสต์เลย"}</div>
                    </button>
                </section>
                {error && <p className="text-red-600">{error}</p>}
            </form>
        </div>
    );
}
