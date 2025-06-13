import { useFetcher } from "@remix-run/react";
import { deletePost, incrementSupportCount, listenToPosts } from "~/services/PostsService";
import { Post } from "~/Models/Post";
import WritePost from "~/components/Feed/WritePost";
import { useEffect, useRef, useState } from "react";
import SideBar from "~/components/SideBar";
import { MetaFunction } from "@remix-run/node";
import '~/css/bubble.css';
import { formatNumberShort } from "~/libs/NumberFormat";
import { timeAgo } from "~/libs/DateFormat";

export const meta: MetaFunction = () => {
    const title = 'Selfness Share Feed - โพสต์เลย! แบ่งปันทุกความรู้และทริคการพัฒนาตัวเอง';
    const description = 'Selfness Share Feed: พื้นที่ปลอดภัยให้คุณฝึกโพสต์ แบ่งปันความรู้ ทริคการพัฒนา Soft Skill และเรื่องราวของคุณ เพื่อสร้างความมั่นใจและแรงบันดาลใจให้ผู้อื่น';
    const url = 'https://selfness.khain.app/share'; // **IMPORTANT: Replace with your actual domain**
    const imageUrl = 'https://selfness.khain.app/images/selfness-share-og-image.jpg'; // **IMPORTANT: Create a compelling image (1200x630px recommended) and replace this URL**

    return [
        // Standard Meta Tags
        { title: title },
        { name: 'description', content: description },
        { name: 'keywords', content: 'Selfness, Soft Skill, การสื่อสาร, พัฒนาตัวเอง, โพสต์, แบ่งปัน, ความรู้, ทริค, แรงบันดาลใจ, ชุมชน, โซเชียล' },
        { name: 'robots', content: 'index, follow' }, // Tells search engines to index and follow links

        // Open Graph Tags (for social media sharing)
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        { property: 'og:type', content: 'website' }, // Use 'article' if it's a specific blog post, but 'website' is generally safer for a sharing page
        { property: 'og:image', content: imageUrl },
        { property: 'og:image:width', content: '1200' }, // Recommended width for OG image
        { property: 'og:image:height', content: '630' }, // Recommended height for OG image
        { property: 'og:site_name', content: 'Selfness' },
        { property: 'og:locale', content: 'th_TH' }, // Specify Thai locale

        // Twitter Card Tags (for Twitter sharing)
        { name: 'twitter:card', content: 'summary_large_image' }, // 'summary_large_image' is generally preferred for a prominent image
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: imageUrl },
        { name: 'twitter:alt', content: 'Selfness Share: พื้นที่แบ่งปันความรู้และทริคการพัฒนา Soft Skill' }, // Alt text for the image
        // { name: 'twitter:site', content: '@YourTwitterHandle' }, // Optional: Your Twitter handle
        // { name: 'twitter:creator', content: '@YourTwitterHandle' }, // Optional: Creator's Twitter handle
    ];
};


export default function FeedPage() {
    // const { posts } = useLoaderData<typeof loader>();
    const [posts, setPosts] = useState<Post[]>();

    useEffect(() => {
        const unsubscribe = listenToPosts({ limitCount: 20 }, (updatedPosts) => {
            setPosts(updatedPosts);
        });

        return () => unsubscribe(); // Clean up listener on unmount
    }, []);




    return (<div className="flex">

        <SideBar />
        <main className="max-h-[100vh] w-full overflow-auto p-5 bg-zinc-200/30">
            <h1 className="text-2xl font-bold mb-6 ">Selfness Feed</h1>
            <WritePost />
            {posts ? posts.map((post: Post) => (
                <PostCard key={post.id} post={post} />
            ))
            : <div className="m-auto w-fit h-fit">Loading...</div>
        }
        </main>
    </div>

    );
}

function PostCard({ post }: { post: Post }) {
    // const fetcher = useFetcher();
    const [more, setMore] = useState(false);


    const handleDelete = async () => {
        try {
            if (post.id) {
                const result = await deletePost(post.id)
                if (result) alert("Successfully")
            }
        } catch (error: any) {
            alert(`ERROR ${error?.message}`)
        }
    }
    return (
        <div className="">
            <div className="bg-white border box rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center ">
                    <div className="flex items-center  gap-5">
                        <p className="font-semibold">{post.display_name}</p>
                        {post.created_at && <p className="text-sm text-gray-500"> • {timeAgo(post.created_at?.toDate())}</p>}
                    </div>
                    <div className="relative">
                        <button onClick={() => setMore(prev => !prev)} className="bg-white p-2 rounded-md hover:bg-zinc-200/30">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"></path>
                            </svg>
                        </button>
                        {more && <div className="p-1 absolute right-0 shadow rounded-md min-w-[200px] mt-1">
                            <button className="bg-white hover:bg-zinc-100/30 w-full px-2 py-1 text-left rounded-sm">Edit</button>
                            <button onClick={() => handleDelete()} className="bg-white hover:bg-zinc-100/30 w-full px-2 py-1 text-left rounded-sm">Delete</button>
                        </div>}
                    </div>
                </div>
                <p className="mt-2">{post.content}</p>
                {post.media && post.media.length > 0 && (
                    <div className="mt-2">
                        {post.media?.map((item) => {
                            switch (item.type) {
                                case "image":
                                    return <img src={item.url} alt={item.name || "Image"} />;
                                case "video":
                                    return <video controls src={item.url} />;
                                case "audio":
                                    return <audio controls src={item.url} />;
                                case "file":
                                    return <a href={item.url} download>{item.name || "Download file"}</a>;
                            }
                        })}
                    </div>
                )}
                {/* <fetcher.Form method="post" action={`/feed/support`}>
                    <input type="hidden" name="postId" value={post.id} />
                    <input type="hidden" name="currentCount" value={post.support_count || 0} />
                    <button
                        type="button"
                        onClick={() => setSupported(true)}
                        className="mt-4 inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
                    >
                        {!supported ? <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10L8.603 6.56a2.104 2.104 0 0 1 0-2.95a2.04 2.04 0 0 1 2.912 0L12 4l.485-.39a2.04 2.04 0 0 1 2.912 0a2.104 2.104 0 0 1 0 2.95zm0 4l-3.397 3.44a2.104 2.104 0 0 0 0 2.95a2.04 2.04 0 0 0 2.912 0L12 20l.485.39a2.04 2.04 0 0 0 2.912 0a2.104 2.104 0 0 0 0-2.95zm2-2l3.44-3.397a2.104 2.104 0 0 1 2.95 0a2.04 2.04 0 0 1 0 2.912L20 12l.39.485a2.04 2.04 0 0 1 0 2.912a2.104 2.104 0 0 1-2.95 0zm-4 0L6.56 8.603a2.104 2.104 0 0 0-2.95 0a2.04 2.04 0 0 0 0 2.912L4 12l-.39.485a2.04 2.04 0 0 0 0 2.912a2.104 2.104 0 0 0 2.95 0z"></path>
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <path fill="currentColor" d="m12.712 13.297l3.398 3.442a3.104 3.104 0 0 1 0 4.351a3.04 3.04 0 0 1-4.036.27l-.075-.062l-.073.062a3.04 3.04 0 0 1-1.664.634l-.203.007a3.04 3.04 0 0 1-2.17-.91a3.104 3.104 0 0 1 .002-4.354l3.397-3.44a1 1 0 0 1 1.424 0M21.09 7.89a3.04 3.04 0 0 1 .27 4.037l-.062.073l.062.075a3.04 3.04 0 0 1 .634 1.664l.007.203a3.04 3.04 0 0 1-.91 2.17a3.104 3.104 0 0 1-4.354-.002l-3.44-3.397a1 1 0 0 1 0-1.424L16.74 7.89a3.104 3.104 0 0 1 4.351 0m-13.827.002l3.44 3.397a1 1 0 0 1 0 1.424L7.26 16.11a3.104 3.104 0 0 1-4.351 0a3.04 3.04 0 0 1-.27-4.036l.062-.075l-.062-.073a3.04 3.04 0 0 1-.634-1.664l-.007-.203c0-.816.328-1.598.91-2.17a3.104 3.104 0 0 1 4.354.002M13.94 2a3.04 3.04 0 0 1 2.17.91a3.104 3.104 0 0 1-.002 4.354l-3.397 3.44a1 1 0 0 1-1.424 0L7.89 7.26a3.104 3.104 0 0 1 0-4.351a3.04 3.04 0 0 1 4.036-.27l.073.062l.075-.062a3.04 3.04 0 0 1 1.664-.634z"></path>
                        </svg>}
                        Support ({post.support_count})
                    </button>
                </fetcher.Form> */}
                <ClickCounter value={post.support_count} id={post.id} />
            </div>
        </div>
    );
}


function ClickCounter({ value = 0, id }: Readonly<{ value: number | undefined, id: string | undefined }>) {
    const [count, setCount] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    function handleCount() {
        setCount((prev) => prev + 1);

        // Clear the previous timeout if the user keeps clicking
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a new 3-second timeout
        timeoutRef.current = setTimeout(async () => {
            if (id) await incrementSupportCount(id, count + 1);
            setCount(0); // reset after saving
        }, 3000);
    }

    return (
        <button
            type="button"
            onClick={() => handleCount()}
            className="bg-white group btn-bubble animate"
        >
            <div className=" ">
                <div className=" flex gap-2 items-center">
                    {<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" className="fill-none active:scale-105  bg-white p-1 hover:bg-zinc-300/20 rounded-md group-active:fill-yellow-500 group-active:text-indigo-500 group-focus:fill-yellow-500">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5h2M5 4v2m6.5-2L11 6m7-1h2m-1-1v2m-4 3l-1 1m4 3l2-.5M18 19h2m-1-1v2m-5-3.482L7.482 10l-4.39 9.58a1 1 0 0 0 1.329 1.329z"></path>
                    </svg>}
                    <div className="relative">
                        {formatNumberShort(value + count)}
                        <div className=" group-active:opacity-100 opacity-0 absolute duration-300 top-[-15px] group-active:animate-ping text-[var(--secondary-color)]">+1</div>
                    </div>

                </div>
            </div>

        </button>

    );
}