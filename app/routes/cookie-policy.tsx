// app/routes/cookie-policy.tsx

import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import Header from '~/components/Header';

// Optional: Define meta tags for this page
export const meta: MetaFunction = () => {
  return [
    { title: 'นโยบายคุกกี้ - Selfness' },
    { name: 'description', content: 'นโยบายการใช้คุกกี้และเทคโนโลยีการติดตามของแอปพลิเคชัน Selfness' },
  ];
};

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f9f9f9] text-[#1a1a1a] px-6 py-12 ">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-8 text-[#1a1a1a]">นโยบายคุกกี้ของ Selfness</h1>
          <p className="text-sm text-center text-[#5a67d8] mb-12">
            <strong>ปรับปรุงล่าสุด:</strong> 5 มิถุนายน 2568
          </p>

          <p className="mb-6 leading-relaxed">
            นโยบายคุกกี้ฉบับนี้อธิบายว่าคุกกี้คืออะไร และเรา (&quot;เรา,&quot; &quot;ของเรา,&quot; หรือ &quot;แอป Selfness&quot;) ใช้คุกกี้และเทคโนโลยีที่คล้ายกันอย่างไรในแอปพลิเคชันมือถือและเว็บไซต์ (รวมเรียกว่า &quot;บริการ&quot;) ของเรา โดยมีจุดมุ่งหมายเพื่อให้คุณเข้าใจประเภทของคุกกี้ที่เราใช้, ข้อมูลที่เราเก็บรวบรวมโดยใช้คุกกี้, และวิธีที่คุณสามารถควบคุมคุกกี้เหล่านี้
          </p>
          <p className="mb-8 leading-relaxed">
            เมื่อคุณเข้าถึงหรือใช้งานบริการของเรา เราจะขอความยินยอมจากคุณในการใช้คุกกี้ที่ไม่จำเป็นตามกฎหมายและข้อบังคับที่เกี่ยวข้อง
          </p>

          ---

          <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">1. คุกกี้คืออะไร?</h2>
          <p className="mb-8 leading-relaxed">
            คุกกี้คือไฟล์ข้อความขนาดเล็กที่ถูกจัดเก็บไว้บนอุปกรณ์ของคุณ (คอมพิวเตอร์, แท็บเล็ต, สมาร์ทโฟน) เมื่อคุณเข้าชมเว็บไซต์หรือใช้งานแอปพลิเคชัน คุกกี้ช่วยให้เว็บไซต์/แอปจดจำคุณ, จดจำข้อมูลการเข้าสู่ระบบ, จดจำการตั้งค่าภาษา, หรือจดจำพฤติกรรมการใช้งานของคุณในแต่ละครั้งที่เข้าชม เพื่อให้ประสบการณ์การใช้งานของคุณดีขึ้น
          </p>

          ---

          <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">2. ประเภทของคุกกี้ที่เราใช้</h2>
          <p className="mb-4 leading-relaxed">
            เราใช้คุกกี้หลายประเภทเพื่อวัตถุประสงค์ที่แตกต่างกัน:
          </p>
          <ul className="list-disc list-inside mb-8 space-y-2 text-[#4a4a4a] leading-relaxed">
            <li>
              <strong>คุกกี้ที่จำเป็นอย่างยิ่ง (Strictly Necessary Cookies):</strong>
              <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                <li>คุกกี้เหล่านี้จำเป็นต่อการทำงานพื้นฐานของบริการ เช่น การจัดการเซสชัน, การรักษาความปลอดภัย, การจดจำสถานะการเข้าสู่ระบบของคุณ หากไม่มีคุกกี้เหล่านี้ บริการอาจไม่สามารถทำงานได้อย่างถูกต้อง</li>
                <li>การใช้คุกกี้ประเภทนี้ไม่จำเป็นต้องได้รับความยินยอมจากคุณ แต่เราจะแจ้งให้คุณทราบถึงการใช้งาน</li>
              </ul>
            </li>
            <li>
              <strong>คุกกี้เพื่อการวิเคราะห์และประสิทธิภาพ (Analytics & Performance Cookies):</strong>
              <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                <li>คุกกี้เหล่านี้ช่วยให้เราเข้าใจว่าผู้ใช้โต้ตอบกับบริการของเราอย่างไร โดยการเก็บรวบรวมและรายงานข้อมูลที่ไม่ระบุตัวตน เช่น จำนวนผู้เยี่ยมชม, หน้าเว็บที่เข้าชมมากที่สุด, ระยะเวลาที่ใช้ในแต่ละหน้า ข้อมูลเหล่านี้ช่วยให้เราปรับปรุงและพัฒนาบริการให้ดีขึ้น</li>
                <li>ตัวอย่าง: Google Analytics, Firebase Analytics</li>
              </ul>
            </li>
            <li>
              <strong>คุกกี้เพื่อการทำงาน (Functionality Cookies):</strong>
              <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                <li>คุกกี้เหล่านี้ช่วยให้บริการสามารถจดจำตัวเลือกที่คุณเลือกไว้ (เช่น ชื่อผู้ใช้, ภาษา หรือภูมิภาคที่คุณอยู่) และปรับแต่งประสบการณ์การใช้งานให้เหมาะสมกับคุณ</li>
                <li>ตัวอย่าง: จดจำภาษาที่คุณเลือก, จดจำการตั้งค่าการแจ้งเตือน</li>
              </ul>
            </li>
            <li>
              <strong>คุกกี้เพื่อการตลาดและโฆษณา (Marketing & Advertising Cookies):</strong>
              <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                <li>คุกกี้เหล่านี้ใช้เพื่อส่งโฆษณาที่เกี่ยวข้องกับความสนใจของคุณ และเพื่อวัดประสิทธิภาพของแคมเปญโฆษณา พวกมันมักจะถูกวางโดยเครือข่ายโฆษณาด้วยความยินยอมจากผู้ประกอบการเว็บไซต์</li>
                <li>ตัวอย่าง: Google Ads, Facebook Pixel (หากคุณใช้เพื่อติดตาม Conversion หรือ Remarketing)</li>
              </ul>
            </li>
          </ul>

          ---

          <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">3. ข้อมูลที่เก็บรวบรวมผ่านคุกกี้</h2>
          <p className="mb-8 leading-relaxed">
            คุกกี้อาจเก็บรวบรวมข้อมูลที่ไม่ใช่ข้อมูลส่วนบุคคลและข้อมูลส่วนบุคคล ทั้งนี้ขึ้นอยู่กับประเภทของคุกกี้ ข้อมูลที่เก็บรวบรวมอาจรวมถึง:
            ที่อยู่ IP, ประเภทเบราว์เซอร์และอุปกรณ์, หน้าที่เข้าชม, เวลาที่ใช้ในบริการ, คลิกที่เกิดขึ้น, ภาษาที่ต้องการ, การตั้งค่าผู้ใช้ และอื่นๆ
          </p>

          ---

          <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">4. วิธีที่เราใช้คุกกี้</h2>
          <p className="mb-8 leading-relaxed">
            เราใช้คุกกี้เพื่อ:
          </p>
          <ul className="list-disc list-inside mb-8 space-y-2 text-[#4a4a4a] leading-relaxed">
            <li>ทำให้บริการของเราทำงานได้อย่างถูกต้องและมีประสิทธิภาพ</li>
            <li>จดจำคุณเมื่อคุณกลับมาใช้บริการของเรา</li>
            <li>วิเคราะห์ว่าบริการของเราถูกใช้งานอย่างไร และเพื่อปรับปรุงประสิทธิภาพ</li>
            <li>ปรับแต่งประสบการณ์ของคุณให้เป็นส่วนตัว</li>
            <li>แสดงโฆษณาที่เกี่ยวข้องกับความสนใจของคุณ (หากได้รับความยินยอม)</li>
          </ul>

          ---

          <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">5. คุกกี้ของบุคคลที่สาม</h2>
          <p className="mb-8 leading-relaxed">
            นอกจากคุกกี้ที่เราวางเอง (คุกกี้บุคคลที่หนึ่ง) ผู้ให้บริการบุคคลที่สามบางราย (เช่น ผู้ให้บริการวิเคราะห์ข้อมูล หรือเครือข่ายโฆษณา) อาจวางคุกกี้บนอุปกรณ์ของคุณเมื่อคุณใช้งานบริการของเรา คุกกี้เหล่านี้เรียกว่าคุกกี้บุคคลที่สาม และอยู่ภายใต้นโยบายความเป็นส่วนตัวของบุคคลที่สามนั้นๆ
          </p>

          ---

          <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">6. การควบคุมคุกกี้ของคุณ</h2>
          <p className="mb-4 leading-relaxed">
            คุณมีสิทธิ์ที่จะตัดสินใจว่าจะยอมรับหรือปฏิเสธคุกกี้หรือไม่ คุณสามารถใช้สิทธิ์ของคุณในการตั้งค่าคุกกี้โดยเลือกตัวเลือกที่เหมาะสมบนแบนเนอร์หรือศูนย์จัดการความยินยอมเกี่ยวกับคุกกี้ (Cookie Consent Management Platform) ที่ปรากฏขึ้นเมื่อคุณเข้าชมบริการของเรา
          </p>
          <p className="mb-4 leading-relaxed">
            นอกจากนี้ คุณยังสามารถจัดการการตั้งค่าคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ของคุณได้ เบราว์เซอร์ส่วนใหญ่จะอนุญาตให้คุณบล็อกคุกกี้, ลบคุกกี้ที่มีอยู่, หรือตั้งค่าการแจ้งเตือนเมื่อมีคุกกี้ถูกส่ง อย่างไรก็ตาม โปรดทราบว่าการบล็อกหรือลบคุกกี้บางประเภทอาจส่งผลกระทบต่อการทำงานของบริการของเรา
          </p>
          <p className="mb-8 leading-relaxed">
            สำหรับข้อมูลเพิ่มเติมเกี่ยวกับวิธีจัดการคุกกี้ในเบราว์เซอร์ยอดนิยม โปรดเยี่ยมชม:
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-[#4a4a4a]">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#5a67d8] hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-[#5a67d8] hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.microsoft.com/en-us/topic/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-[#5a67d8] hover:underline">Microsoft Edge</a></li>
              <li><a href="https://support.apple.com/en-us/HT201265" target="_blank" rel="noopener noreferrer" className="text-[#5a67d8] hover:underline">Apple Safari</a></li>
            </ul>
          </p>

          ---

          <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">7. การเปลี่ยนแปลงนโยบายคุกกี้</h2>
          <p className="mb-8 leading-relaxed">
            เราอาจปรับปรุงนโยบายคุกกี้ฉบับนี้เป็นครั้งคราวเพื่อสะท้อนถึงการเปลี่ยนแปลงในการดำเนินงานของเรา หรือการเปลี่ยนแปลงข้อกำหนดทางกฎหมาย เราจะแจ้งให้คุณทราบถึงการเปลี่ยนแปลงที่สำคัญใดๆ โดยการโพสต์นโยบายที่อัปเดตบนแอปหรือเว็บไซต์ของเรา และ/หรือโดยการแจ้งเตือนอื่นๆ วันที่ &quot;ปรับปรุงล่าสุด&quot; ที่ด้านบนของนโยบายจะแสดงถึงวันที่นโยบายมีการเปลี่ยนแปลงครั้งล่าสุด
          </p>

          ---

          <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">8. ติดต่อเรา</h2>
          <p className="mb-4 leading-relaxed">
            หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับนโยบายคุกกี้ฉบับนี้ โปรดติดต่อเราได้ที่:
          </p>
          <p className="mb-2 text-[#4a4a4a] leading-relaxed">
            <strong>Selfness Team</strong>
          </p>
          <p className="mb-2 text-[#4a4a4a] leading-relaxed">
            <strong>อีเมล:</strong> <a href="mailto:khain.app@gmail.com" className="text-[#5a67d8] hover:underline">khain.app@gmail.com</a>
          </p>
          <p className="mb-8 text-[#4a4a4a] leading-relaxed">
            <strong>เว็บไซต์:</strong> <Link to="/contact" className="text-[#5a67d8] hover:underline">selfness.khain.app/contact</Link>
          </p>
        </div>
      </main>
    </>
  );
}