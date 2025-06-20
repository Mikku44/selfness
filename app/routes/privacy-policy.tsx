// app/routes/privacy-policy.tsx

import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import Header from '~/components/Header';

// Optional: Define meta tags for this page
export const meta: MetaFunction = () => {
  return [
    { title: 'นโยบายความเป็นส่วนตัว - Selfness' },
    { name: 'description', content: 'นโยบายความเป็นส่วนตัวของแอปพลิเคชัน Selfness' },
  ];
};

export default function PrivacyPolicyPage() {
    
  return (
    <>
    <Header />
    <main className="min-h-screen bg-[#f9f9f9] text-[#1a1a1a] px-6 py-12 ">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#1a1a1a]">นโยบายความเป็นส่วนตัวของ Selfness</h1>
        <p className="text-sm text-center text-[#5a67d8] mb-12">
          <strong>ปรับปรุงล่าสุด:</strong> 5 มิถุนายน 2568
        </p>

        <p className="mb-6 leading-relaxed">
          Selfness (ต่อไปนี้จะเรียกว่า &quot;เรา,&quot; &quot;ของเรา,&quot; หรือ &quot;แอป&quot;) มุ่งมั่นที่จะปกป้องความเป็นส่วนตัวของผู้ใช้งาน (&quot;คุณ&quot; หรือ &quot;ผู้ใช้&quot;) แอปพลิเคชันและบริการของเรา (&quot;บริการ&quot;) นโยบายความเป็นส่วนตัวนี้อธิบายถึงวิธีที่เราเก็บรวบรวม, ใช้, เปิดเผย, และปกป้องข้อมูลส่วนบุคคลของคุณเมื่อคุณใช้บริการของเรา
        </p>
        <p className="mb-8 leading-relaxed">
          การที่คุณใช้บริการของเรา ถือว่าคุณได้อ่านและเข้าใจนโยบายความเป็นส่วนตัวนี้ และตกลงที่จะผูกพันตามข้อกำหนดของนโยบายนี้
        </p>

        {/* --- 1. ข้อมูลที่เราเก็บรวบรวม --- */}
        <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">1. ข้อมูลที่เราเก็บรวบรวม</h2>
        <p className="mb-4 leading-relaxed">
          เราเก็บรวบรวมข้อมูลประเภทต่างๆ เพื่อให้สามารถให้บริการของเราได้อย่างมีประสิทธิภาพและเพื่อปรับปรุงประสบการณ์การใช้งานของคุณ ข้อมูลเหล่านี้อาจรวมถึง:
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-[#333]">1.1 ข้อมูลที่คุณให้ไว้โดยตรง:</h3>
        <ul className="list-disc list-inside mb-6 space-y-2 text-[#4a4a4a] leading-relaxed">
          <li><strong>ข้อมูลบัญชี:</strong> เมื่อคุณสร้างบัญชีผู้ใช้ เราอาจขอข้อมูลเช่น ชื่อผู้ใช้งาน, ที่อยู่อีเมล, และรหัสผ่าน</li>
          <li><strong>ข้อมูลโปรไฟล์:</strong> ข้อมูลที่คุณให้เพิ่มเติมในโปรไฟล์ของคุณ เช่น อายุ, เพศ, ระดับทักษะปัจจุบัน, หรือเป้าหมายในการพัฒนาตนเอง</li>
          <li><strong>ข้อมูลการสำรวจทักษะ:</strong> คำตอบที่คุณให้ในแบบสำรวจเบื้องต้นเพื่อประเมินทักษะการพูด การเข้าสังคม และความกล้า/ความมั่นใจ</li>
          <li>
            <strong>ข้อมูลเนื้อหาผู้ใช้:</strong>
            <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
              <li>**การบันทึกเสียงและวิดีโอ:** การบันทึกเสียงหรือวิดีโอที่คุณอัปโหลดหรือสร้างขึ้นภายในแอปเพื่อวัตถุประสงค์ในการฝึกฝน การวิเคราะห์ด้วย AI (เช่น การฝึกพูดหน้ากระจก, การฝึกบทบาทสมมติ)</li>
              <li>**ข้อความและข้อมูลที่พิมพ์:** ข้อความที่คุณพิมพ์หรือโต้ตอบในสถานการณ์จำลองบทสนทนา หรือการเขียนบันทึกประจำวัน</li>
              <li>**ข้อมูลการรายงานผลภารกิจ:** ข้อมูลที่คุณบันทึกเมื่อทำภารกิจประจำวันเสร็จสิ้น เช่น ความรู้สึก, ผลลัพธ์ที่ได้</li>
            </ul>
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4 text-[#333]">1.2 ข้อมูลที่เราเก็บรวบรวมโดยอัตโนมัติจากการใช้งานของคุณ:</h3>
        <ul className="list-disc list-inside mb-8 space-y-2 text-[#4a4a4a] leading-relaxed">
          <li><strong>ข้อมูลการใช้งาน:</strong> ข้อมูลเกี่ยวกับการเข้าถึงและการใช้งานบริการของเรา เช่น ฟีเจอร์ที่คุณใช้, เวลาที่ใช้ในแอป, ความถี่ในการใช้งาน, ความคืบหน้าในการทำภารกิจ/บทเรียน, การโต้ตอบกับ AI</li>
          <li><strong>ข้อมูลอุปกรณ์:</strong> ข้อมูลเกี่ยวกับอุปกรณ์ที่คุณใช้เข้าถึงบริการ เช่น ประเภทอุปกรณ์, ระบบปฏิบัติการ, ตัวระบุอุปกรณ์ (Device ID), ที่อยู่ IP</li>
          <li><strong>ข้อมูลบันทึก (Log Data):</strong> ข้อมูลที่เซิร์ฟเวอร์ของเราบันทึกโดยอัตโนมัติเมื่อคุณเข้าถึงหรือใช้บริการ เช่น ที่อยู่ IP, วันที่และเวลาที่เข้าถึง, ประเภทเบราว์เซอร์, และหน้าเว็บที่คุณเข้าชมก่อนหน้า</li>
        </ul>

        {/* --- 2. วิธีที่เราใช้ข้อมูลของคุณ --- */}
        <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">2. วิธีที่เราใช้ข้อมูลของคุณ</h2>
        <p className="mb-4 leading-relaxed">
          เราใช้ข้อมูลที่เราเก็บรวบรวมเพื่อวัตถุประสงค์ดังต่อไปนี้:
        </p>
        <ul className="list-disc list-inside mb-8 space-y-2 text-[#4a4a4a] leading-relaxed">
          <li><strong>เพื่อให้และปรับปรุงบริการ:</strong> เพื่อให้คุณสามารถใช้งานแอปได้, ปรับแต่งเนื้อหาและภารกิจให้เหมาะกับระดับทักษะและเป้าหมายของคุณ, และปรับปรุงประสิทธิภาพและฟังก์ชันการทำงานของแอป</li>
          <li><strong>การวิเคราะห์ด้วย AI และการให้ฟีดแบ็กส่วนบุคคล:</strong> เพื่อให้ AI ของเราสามารถวิเคราะห์การบันทึกเสียง/วิดีโอ/ข้อความของคุณ และให้ฟีดแบ็ก คำแนะนำ และแบบฝึกหัดที่ปรับให้เข้ากับคุณโดยเฉพาะ</li>
          <li><strong>การติดตามความคืบหน้า:</strong> เพื่อติดตามพัฒนาการของคุณในแอปและแสดงผลความก้าวหน้า</li>
          <li><strong>การสื่อสารกับคุณ:</strong> เพื่อส่งการแจ้งเตือนเกี่ยวกับภารกิจประจำวัน, อัปเดตบริการ, การเปลี่ยนแปลงนโยบาย, หรือตอบคำถามที่คุณส่งมา</li>
          <li><strong>การวิเคราะห์และวิจัย:</strong> เพื่อทำความเข้าใจพฤติกรรมการใช้งานของผู้ใช้, วิเคราะห์แนวโน้ม, และทำการวิจัยเพื่อพัฒนาฟีเจอร์ใหม่ๆ และปรับปรุงคุณภาพของบริการ</li>
          <li><strong>การรักษาความปลอดภัย:</strong> เพื่อตรวจจับและป้องกันกิจกรรมที่ไม่ได้รับอนุญาต หรือการใช้งานในทางที่ผิด และเพื่อรักษาความปลอดภัยของระบบและข้อมูลผู้ใช้</li>
          <li><strong>การปฏิบัติตามกฎหมาย:</strong> เพื่อปฏิบัติตามกฎหมาย, ข้อบังคับ, กระบวนการทางกฎหมาย, หรือการร้องขอของหน่วยงานราชการ</li>
        </ul>

        {/* --- 3. การแบ่งปันข้อมูลของคุณ --- */}
        <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">3. การแบ่งปันข้อมูลของคุณ</h2>
        <p className="mb-4 leading-relaxed">
          เราจะไม่ขาย เช่า หรือให้เช่าข้อมูลส่วนบุคคลของคุณแก่บุคคลที่สามเพื่อวัตถุประสงค์ทางการตลาดโดยไม่ได้รับอนุญาตจากคุณ อย่างไรก็ตาม เราอาจแบ่งปันข้อมูลของคุณในกรณีต่อไปนี้:
        </p>
        <ul className="list-disc list-inside mb-8 space-y-2 text-[#4a4a4a] leading-relaxed">
          <li>
            <strong>ผู้ให้บริการ:</strong> เราอาจแบ่งปันข้อมูลกับผู้ให้บริการภายนอกที่เราจ้างมาเพื่อช่วยในการดำเนินงานของเรา เช่น ผู้ให้บริการโฮสติ้งคลาวด์, ผู้ให้บริการวิเคราะห์ข้อมูล, ผู้ให้บริการ AI, ผู้ให้บริการประมวลผลการชำระเงิน
            ผู้ให้บริการเหล่านี้จะได้รับอนุญาตให้ใช้ข้อมูลของคุณเท่าที่จำเป็นเพื่อให้บริการแก่เราเท่านั้น และเรากำหนดให้พวกเขาต้องรักษาความลับของข้อมูล
          </li>
          <li>
            <strong>เพื่อวัตถุประสงค์ทางกฎหมายและการคุ้มครอง:</strong> เราอาจเปิดเผยข้อมูลของคุณหากเราเชื่อโดยสุจริตว่าการเปิดเผยดังกล่าวมีความจำเป็นเพื่อ:
            <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
              <li>ปฏิบัติตามกฎหมาย, ข้อบังคับ, หรือคำสั่งศาล</li>
              <li>บังคับใช้ข้อกำหนดการใช้งานของเรา หรือนโยบายอื่นๆ</li>
              <li>ตรวจจับ ป้องกัน หรือแก้ไขปัญหาการฉ้อโกง, ความปลอดภัย, หรือปัญหาทางเทคนิค</li>
              <li>ปกป้องสิทธิ์, ทรัพย์สิน, หรือความปลอดภัยของ Selfness, ผู้ใช้ของเรา, หรือสาธารณะชน</li>
            </ul>
          </li>
        </ul>

        {/* --- 4. การเก็บรักษาข้อมูล --- */}
        <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">4. การเก็บรักษาข้อมูล</h2>
        <p className="mb-8 leading-relaxed">
          เราจะเก็บรักษาข้อมูลส่วนบุคคลของคุณตราบเท่าที่จำเป็นเพื่อให้บรรลุวัตถุประสงค์ที่ระบุไว้ในนโยบายความเป็นส่วนตัวนี้ เว้นแต่กฎหมายจะกำหนดหรืออนุญาตให้เก็บรักษานานกว่านั้น เมื่อข้อมูลไม่จำเป็นอีกต่อไป เราจะดำเนินการลบหรือทำให้เป็นข้อมูลที่ไม่สามารถระบุตัวตนได้
        </p>

        {/* --- 5. ความปลอดภัยของข้อมูล --- */}
        <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">5. ความปลอดภัยของข้อมูล</h2>
        <p className="mb-8 leading-relaxed">
          เราใช้มาตรการรักษาความปลอดภัยทางกายภาพ, ทางเทคนิค, และการบริหารจัดการที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของคุณจากการเข้าถึงโดยไม่ได้รับอนุญาต, การเปิดเผย, การเปลี่ยนแปลง, หรือการทำลายโดยไม่ชอบด้วยกฎหมาย อย่างไรก็ตาม ไม่มีระบบใดที่รับประกันความปลอดภัยได้อย่างสมบูรณ์แบบ คุณมีส่วนร่วมในการรักษาความปลอดภัยของข้อมูลโดยการรักษารหัสผ่านของคุณให้เป็นความลับและออกจากระบบเมื่อเลิกใช้งาน
        </p>

        {/* --- 6. สิทธิ์ของคุณ --- */}
        <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">6. สิทธิ์ของคุณ</h2>
        <p className="mb-4 leading-relaxed">
          ภายใต้กฎหมายคุ้มครองข้อมูลส่วนบุคคลที่บังคับใช้ คุณอาจมีสิทธิ์บางประการเกี่ยวกับข้อมูลส่วนบุคคลของคุณ รวมถึงสิทธิ์ในการ:
        </p>
        <ul className="list-disc list-inside mb-8 space-y-2 text-[#4a4a4a] leading-relaxed">
          <li>เข้าถึงข้อมูลส่วนบุคคลของคุณ</li>
          <li>ขอแก้ไขข้อมูลที่ไม่ถูกต้องหรือไม่สมบูรณ์</li>
          <li>ขอให้ลบข้อมูลส่วนบุคคลของคุณ</li>
          <li>คัดค้านการประมวลผลข้อมูลส่วนบุคคลของคุณ</li>
          <li>ขอให้จำกัดการประมวลผลข้อมูลของคุณ</li>
          <li>ร้องขอข้อมูลของคุณในรูปแบบที่สามารถส่งต่อไปยังผู้ควบคุมข้อมูลอื่นได้ (สิทธิ์ในการส่งต่อข้อมูล)</li>
        </ul>
        <p className="mb-8 leading-relaxed">
          หากต้องการใช้สิทธิ์เหล่านี้ โปรดติดต่อเราตามรายละเอียดในส่วน &quot;ติดต่อเรา&quot;
        </p>

        {/* --- 7. ความเป็นส่วนตัวของเด็ก --- */}
        <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">7. ความเป็นส่วนตัวของเด็ก</h2>
        <p className="mb-8 leading-relaxed">
          บริการของเราไม่ได้มุ่งเป้าหมายไปยังบุคคลที่มีอายุต่ำกว่า 13 ปี (หรืออายุที่กฎหมายกำหนดในเขตอำนาจศาลของคุณ) และเราไม่ได้เก็บรวบรวมข้อมูลส่วนบุคคลจากเด็กที่มีอายุต่ำกว่าเกณฑ์ดังกล่าวโดยเจตนา หากเราทราบว่าเราได้เก็บรวบรวมข้อมูลส่วนบุคคลจากเด็กที่มีอายุต่ำกว่า 13 ปีโดยไม่ได้รับความยินยอมจากผู้ปกครองที่ตรวจสอบได้ เราจะดำเนินการลบข้อมูลนั้นออกจากบันทึกของเราโดยเร็วที่สุด
        </p>

        {/* --- 8. การเปลี่ยนแปลงนโยบายความเป็นส่วนตัวนี้ --- */}
        <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">8. การเปลี่ยนแปลงนโยบายความเป็นส่วนตัวนี้</h2>
        <p className="mb-8 leading-relaxed">
          เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราวเพื่อสะท้อนถึงการเปลี่ยนแปลงในการดำเนินงานของเรา หรือการเปลี่ยนแปลงข้อกำหนดทางกฎหมาย เราจะแจ้งให้คุณทราบถึงการเปลี่ยนแปลงที่สำคัญใดๆ โดยการโพสต์นโยบายที่อัปเดตบนแอปหรือเว็บไซต์ของเรา และ/หรือโดยการแจ้งเตือนอื่นๆ วันที่ &quot;ปรับปรุงล่าสุด&quot; ที่ด้านบนของนโยบายจะแสดงถึงวันที่นโยบายมีการเปลี่ยนแปลงครั้งล่าสุด
        </p>

        {/* --- 9. ติดต่อเรา --- */}
        <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">9. ติดต่อเรา</h2>
        <p className="mb-4 leading-relaxed">
          หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ หรือต้องการใช้สิทธิ์ของคุณ โปรดติดต่อเราได้ที่:
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