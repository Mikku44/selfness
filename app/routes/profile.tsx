import { MetaFunction } from '@remix-run/react';
import { useEffect } from 'react'
import SideBar from '~/components/SideBar'
import { getUserOneWithID } from '~/services/UserService'


export const meta: MetaFunction = () => {
  const title = 'Selfness - เปลี่ยนความกลัวเป็นความกล้า คว้าทุกโอกาส';
  const description = 'Selfness: แอปพลิเคชันพัฒนาทักษะ Soft Skill และการสื่อสาร ช่วยให้คนที่ไม่กล้าพูด ไม่กล้าเข้าสังคม ปลดล็อกความมั่นใจ เพื่อคว้าทุกโอกาสในชีวิต.';
  const url = 'https://selfness.khain.app/'; 
  const imageUrl = 'https://selfness.khain.app/images/selfness-home-og-image.jpg'; 

  return [
    // Standard Meta Tags for SEO
    { title: title },
    { name: 'description', content: description },
    { name: 'keywords', content: 'Selfness, Soft Skill, การสื่อสาร, พัฒนาตัวเอง, ความมั่นใจ, กล้าพูด, กล้าเข้าสังคม, ปลดล็อกโอกาส, แอปพลิเคชัน, พัฒนาบุคลิกภาพ' },
    { name: 'robots', content: 'index, follow' }, // บอก Search Engine ให้จัดทำดัชนีและติดตามลิงก์

    // Open Graph Tags for Social Media Sharing (e.g., Facebook, Line)
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:type', content: 'website' }, // 'website' เหมาะสำหรับหน้าหลัก
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:width', content: '1200' }, // แนะนำความกว้างสำหรับ OG Image
    { property: 'og:image:height', content: '630' }, // แนะนำความสูงสำหรับ OG Image
    { property: 'og:site_name', content: 'Selfness' },
    { property: 'og:locale', content: 'th_TH' }, // ระบุภาษาไทย

    // Twitter Card Tags for Twitter Sharing
    { name: 'twitter:card', content: 'summary_large_image' }, // แนะนำสำหรับรูปภาพขนาดใหญ่
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
    { name: 'twitter:alt', content: 'Selfness: แอปพลิเคชันพัฒนา Soft Skill และการสื่อสารสำหรับคนที่ไม่กล้าพูด ไม่กล้าเข้าสังคม' }, // ข้อความอธิบายรูปภาพสำหรับ Twitter
   
  ];
};


export default function profile() {
    const fetchUser = async () => {
        const user = await getUserOneWithID({ id: "SN-0000001" })
        console.log(user)

    }

    useEffect(() => {
        fetchUser();
    }, []);
    return (

        <div className="flex " >

            <SideBar />
            <main className="max-h-[100vh] w-full bg-zinc-200/30 overflow-auto p-5">
                <section className="min-h-[150vh] ">
                    Profile s
                </section>
            </main>
        </div>
    )
}
