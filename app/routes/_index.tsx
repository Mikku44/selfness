import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import StatsDisplay from "~/components/StatsDisplay";

import { loader as firebaseLoader } from "~/libs/firebase/firebase.server"; 


export const meta: MetaFunction = () => {
  const title = 'Selfness - เปลี่ยนความกลัวเป็นความกล้า คว้าทุกโอกาส';
  const description = 'Selfness: แอปพลิเคชันพัฒนาทักษะ Soft Skill และการสื่อสาร ช่วยให้คนที่ไม่กล้าพูด ไม่กล้าเข้าสังคม ปลดล็อกความมั่นใจ เพื่อคว้าทุกโอกาสในชีวิต.';
  const url = 'https://selfness.khain.app/'; // **สำคัญ: URL ของหน้าหลักแอปพลิเคชันของคุณ**
  const imageUrl = 'https://selfness.khain.app/images/selfness-home-og-image.jpg'; // **สำคัญ: URL ของรูปภาพ Open Graph 1200x630px ที่คุณสร้างขึ้น**

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

export const loader = firebaseLoader;


export default function Index() {

  return (
    <>
      <Header />
      <main className="min-h-screen pb-10 bg-[#f9f9f9] text-[#1a1a1a] px-6 py-20`">
        {/* --- Hero Section --- */}
        <section className="mb-20">
          <div className="max-container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left md:w-1/2">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                Dare to begin
              </h1>
              <p className="text-lg md:text-xl text-[#4a4a4a] mb-8 max-w-lg mx-auto md:mx-0">
                ปลดล็อกศักยภาพการสื่อสารในตัวคุณ ช่วยให้คุณพูดเก่งขึ้น
                และเข้าสังคมได้อย่างมั่นใจ
              </p>
              <Link to="/questions">
                <button className="">
                  <div className="btn-primary">เริ่มทดสอบทักษะ Soft Skill ของคุณ</div>
                </button>
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              {/*
          // แนะนำให้เปลี่ยนรูปภาพนี้เป็นรูปที่สื่อถึงการพัฒนาตนเอง, การสื่อสาร, หรือความมั่นใจ
          // อาจเป็นคนกำลังพูดอย่างมั่นใจ, หรือกราฟิกที่สื่อถึงการพัฒนาทักษะ
          // ตัวอย่าง: <img src="/images/confident-person-speaking.png" alt="Confident person speaking" className="w-full max-w-sm md:max-w-md rounded-lg shadow-xl"/>
        */}
              <img
                src="/images/Miroodles - Color Comp.png"
                alt="Illustration of a hand holding a brush, symbolizing creativity and self-improvement"
                className="w-full max-w-xs md:max-w-sm lg:max-w-md"
              />
            </div>
          </div>
        </section>

        {/* register section */}
        <StatsDisplay />

        {/* --- Problems & Solutions Section --- */}
        <section className="mb-20">
          <div className="max-container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              ปัญหา &amp; ทางออก ที่ Selfness ช่วยคุณได้
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Problem 1 */}
              <div className="bg-white p-8 rounded-lg  hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-[#333]">
                  เข้าสังคมไม่เก่ง
                </h3>
                <p className="text-[#555] leading-relaxed">
                  รู้สึกประหม่าเมื่อต้องเจอคนใหม่ๆ ไม่รู้จะเริ่มบทสนทนายังไง?
                  Selfness มีแบบฝึกหัดสร้างความมั่นใจในการเข้าสังคม
                  และสถานการณ์จำลองที่ช่วยให้คุณเริ่มบทสนทนาได้อย่างเป็นธรรมชาติ.
                </p>
              </div>
              {/* Problem 2 */}
              <div className="bg-white p-8 rounded-lg  hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-[#333]">
                  ไม่กล้าพูดในที่สาธารณะ
                </h3>
                <p className="text-[#555] leading-relaxed">
                  เสียงสั่น ใจเต้นแรงเมื่อต้องพรีเซนต์งาน?
                  เราช่วยคุณฝึกพูดหน้ากระจก วิเคราะห์โทนเสียงและภาษากายด้วย AI
                  สร้างความคุ้นเคยกับการสื่อสารในที่สาธารณะ.
                </p>
              </div>
              {/* Problem 3 */}
              <div className="bg-white p-8 rounded-lg  hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-[#333]">
                  พูดไม่เก่ง / เรียบเรียงคำพูดยาก
                </h3>
                <p className="text-[#555] leading-relaxed">
                  คิดอะไรได้แต่พูดออกมาไม่เป็นคำพูดที่เข้าใจง่าย?
                  Selfness มีบทเรียนและภารกิจที่ช่วยให้คุณเรียบเรียงความคิด
                  ใช้คำพูดที่เหมาะสม และสื่อสารได้อย่างมีประสิทธิภาพ.
                </p>
              </div>
              {/* Problem 4 (Optional) */}
              <div className="bg-white p-8 rounded-lg  hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-[#333]">
                  กลัวโดนเกลียด / กังวลคำตัดสิน
                </h3>
                <p className="text-[#555] leading-relaxed">
                  คุณไม่จำเป็นต้องสมบูรณ์แบบ! เราช่วยปรับ Mindset
                  สร้างความเข้าใจในตัวเอง และสอนวิธีรับมือกับความกังวล
                  เพื่อให้คุณกล้าเป็นตัวของตัวเองอย่างมั่นใจ.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Features Section --- */}
        <section className="py-20 px-4">
          <div className="max-w-6xl w-full  mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">ฟีเจอร์เด่นของ Selfness</h2>
            <div className="grid gap-10">
              {/* Feature 1 - Emoji Left, Content Right */}
              <div className="grid md:grid-cols-2 items-center gap-10 p-8 rounded-lg transition-shadow duration-300">
                <div className="flex justify-center md:justify-end items-center">
                  <img
                    src="/images/hug.png"
                    alt="Illustration of a hand holding a brush, symbolizing creativity and self-improvement"
                    className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                  />
                </div>
                <div className="max-w-md mx-auto md:mx-0">
                  <h3 className="text-2xl font-semibold mb-3 text-[#333] text-center md:text-left">แบบสำรวจประเมินทักษะ</h3>
                  <p className="text-[#555] leading-relaxed text-center md:text-left">
                    เริ่มต้นด้วยการวิเคราะห์จุดแข็งและจุดที่ต้องพัฒนา เพื่อสร้างเส้นทางการเรียนรู้ที่เหมาะสมกับคุณที่สุด.
                  </p>
                </div>
              </div>

              {/* Feature 2 - Content Left, Emoji Right */}
              <div className="grid md:grid-cols-2 items-center gap-10 p-8 rounded-lg transition-shadow duration-300">
                <div className="max-w-md mx-auto md:mx-0 order-2 md:order-1">
                  <h3 className="text-2xl font-semibold mb-3 text-[#333] text-center md:text-left">
                    ภารกิจประจำวันแบบ Gamified
                  </h3>
                  <p className="text-[#555] leading-relaxed text-center md:text-left">
                    ฝึกฝนทักษะผ่าน Task สั้นๆ สนุกๆ ในทุกวัน เหมือนเล่นเกมเพื่อเก็บเลเวลการสื่อสารของคุณ.
                  </p>
                </div>
                <div className="flex justify-center md:justify-start items-center order-1 md:order-2">
                  <img
                    src="/images/game.png"
                    alt="Illustration of a hand holding a brush, symbolizing creativity and self-improvement"
                    className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                  />
                </div>
              </div>

              {/* Feature 3 - Emoji Left, Content Right */}
              <div className="grid md:grid-cols-2 items-center gap-10 p-8 rounded-lg transition-shadow duration-300">
                <div className="flex justify-center md:justify-end items-center">
                  <img
                    src="/images/ai.png"
                    alt="Illustration of a hand holding a brush, symbolizing creativity and self-improvement"
                    className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                  />
                </div>
                <div className="max-w-md mx-auto md:mx-0">
                  <h3 className="text-2xl font-semibold mb-3 text-[#333] text-center md:text-left">
                    AI วิเคราะห์และให้คำแนะนำส่วนบุคคล
                  </h3>
                  <p className="text-[#555] leading-relaxed text-center md:text-left">
                    รับฟีดแบ็กเชิงลึกจากการวิเคราะห์การพูดและภาษากายด้วย AI พร้อมคำแนะนำที่แม่นยำเพื่อแก้ไขจุดบกพร่องของคุณ.
                  </p>
                </div>
              </div>

              {/* Feature 4 - Content Left, Emoji Right */}
              <div className="grid md:grid-cols-2 items-center gap-10 p-8 rounded-lg transition-shadow duration-300">
                <div className="max-w-md mx-auto md:mx-0 order-2 md:order-1">
                  <h3 className="text-2xl font-semibold mb-3 text-[#333] text-center md:text-left">
                    สถานการณ์จำลองแบบโต้ตอบ
                  </h3>
                  <p className="text-[#555] leading-relaxed text-center md:text-left">
                    ฝึกโต้ตอบในสถานการณ์ทางสังคมต่างๆ กับ AI เพื่อเตรียมความพร้อมสำหรับชีวิตจริงโดยไม่ต้องกังวล.
                  </p>
                </div>
                <div className="flex justify-center md:justify-start items-center order-1 md:order-2">
                  <img
                    src="/images/box.png"
                    alt="Illustration of a hand holding a brush, symbolizing creativity and self-improvement"
                    className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                  />
                </div>
              </div>

              {/* Feature 5 - Emoji Left, Content Right */}
              <div className="grid md:grid-cols-2 items-center gap-10 p-8 rounded-lg transition-shadow duration-300">
                <div className="flex justify-center md:justify-end items-center">
                  <img
                    src="/images/growth.png"
                    alt="Illustration of a hand holding a brush, symbolizing creativity and self-improvement"
                    className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                  />
                </div>
                <div className="max-w-md mx-auto md:mx-0">
                  <h3 className="text-2xl font-semibold mb-3 text-[#333] text-center md:text-left">ติดตามความก้าวหน้า</h3>
                  <p className="text-[#555] leading-relaxed text-center md:text-left">
                    เห็นพัฒนาการของตัวเองอย่างชัดเจนผ่านกราฟและสถิติ สร้างแรงบันดาลใจให้คุณมุ่งมั่นต่อไป.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}
