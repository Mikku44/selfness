// app/routes/terms-of-service.tsx

import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import Header from '~/components/Header';

// Optional: Define meta tags for this page
export const meta: MetaFunction = () => {
    return [
        { title: 'ข้อกำหนดและเงื่อนไข - Selfness' },
        { name: 'description', content: 'ข้อกำหนดและเงื่อนไขการใช้งานแอปพลิเคชัน Selfness' },
    ];
};

export default function TermsOfServicePage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-[#f9f9f9] text-[#1a1a1a] px-6 py-12 ">
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-center mb-8 text-[#1a1a1a]">ข้อกำหนดและเงื่อนไขการใช้งาน Selfness</h1>
                    <p className="text-sm text-center text-[#5a67d8] mb-12">
                        <strong>ปรับปรุงล่าสุด:</strong> 5 มิถุนายน 2568
                    </p>

                    <p className="mb-6 leading-relaxed">
                        ยินดีต้อนรับสู่ Selfness! ข้อกำหนดและเงื่อนไขการใช้งาน (ต่อไปนี้จะเรียกว่า &quot;ข้อกำหนด&quot;) เหล่านี้ควบคุมการเข้าถึงและการใช้งานแอปพลิเคชันมือถือและบริการที่เกี่ยวข้อง (&quot;บริการ&quot;) ของ Selfness (&quot;เรา&quot;, &quot;ของเรา&quot;).
                    </p>
                    <p className="mb-8 leading-relaxed">
                        โปรดอ่านข้อกำหนดเหล่านี้อย่างละเอียด การเข้าถึงหรือใช้งานบริการของเราแสดงว่าคุณตกลงที่จะผูกพันตามข้อกำหนดเหล่านี้ หากคุณไม่ตกลงในข้อกำหนดใดๆ คุณจะต้องไม่ใช้บริการของเรา
                    </p>

                    {/* --- 1. การยอมรับข้อกำหนด --- */}
                    <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">1. การยอมรับข้อกำหนด</h2>
                    <p className="mb-8 leading-relaxed">
                        การเข้าถึงและใช้งานบริการของเราอยู่ภายใต้ข้อตกลงของคุณกับข้อกำหนดเหล่านี้และนโยบายความเป็นส่วนตัวของเรา คุณตกลงว่าการใช้บริการของคุณเป็นไปตามกฎหมาย กฎระเบียบ และข้อบังคับที่เกี่ยวข้องทั้งหมด
                    </p>

                    {/* --- 2. การเปลี่ยนแปลงข้อกำหนด --- */}
                    <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">2. การเปลี่ยนแปลงข้อกำหนด</h2>
                    <p className="mb-8 leading-relaxed">
                        เราสงวนสิทธิ์ในการแก้ไขหรือเปลี่ยนแปลงข้อกำหนดเหล่านี้ได้ตลอดเวลา การเปลี่ยนแปลงจะมีผลทันทีเมื่อมีการเผยแพร่บนแอปหรือเว็บไซต์ของเรา การใช้งานบริการอย่างต่อเนื่องของคุณหลังจากมีการเปลี่ยนแปลงถือเป็นการยอมรับข้อกำหนดที่แก้ไขแล้ว เราจะพยายามแจ้งให้คุณทราบถึงการเปลี่ยนแปลงที่สำคัญผ่านช่องทางที่เหมาะสม
                    </p>

                    {/* --- 3. การใช้งานบริการ --- */}
                    <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">3. การใช้งานบริการ</h2>

                    <h3 className="text-2xl font-semibold mb-4 text-[#333]">3.1 คุณสมบัติการใช้งาน:</h3>
                    <p className="mb-4 leading-relaxed">
                        คุณต้องมีอายุอย่างน้อย 13 ปีบริบูรณ์จึงจะสามารถใช้บริการของเราได้ หากคุณมีอายุต่ำกว่า 18 ปีบริบูรณ์ คุณต้องได้รับความยินยอมจากผู้ปกครองหรือผู้ดูแลตามกฎหมายในการเข้าถึงและใช้งานบริการ
                    </p>

                    <h3 className="text-2xl font-semibold mb-4 text-[#333]">3.2 บัญชีผู้ใช้งาน:</h3>
                    <p className="mb-4 leading-relaxed">
                        คุณอาจต้องสร้างบัญชีเพื่อเข้าถึงฟีเจอร์บางอย่าง คุณมีหน้าที่รับผิดชอบในการรักษาความลับของข้อมูลบัญชีและรหัสผ่านของคุณ และรับผิดชอบต่อกิจกรรมทั้งหมดที่เกิดขึ้นภายใต้บัญชีของคุณ คุณตกลงที่จะแจ้งให้เราทราบทันทีหากมีการใช้งานบัญชีของคุณโดยไม่ได้รับอนุญาต
                    </p>

                    <h3 className="text-2xl font-semibold mb-4 text-[#333]">3.3 การใช้งานที่ได้รับอนุญาต:</h3>
                    <p className="mb-8 leading-relaxed">
                        บริการนี้มีวัตถุประสงค์เพื่อการใช้งานส่วนบุคคลและไม่ใช้เพื่อวัตถุประสงค์ทางการค้า คุณตกลงที่จะไม่ใช้บริการในทางที่ผิดกฎหมาย, เป็นการฉ้อโกง, หรือเป็นการละเมิดสิทธิ์ของผู้อื่น
                    </p>

                    {/* --- 4. ทรัพย์สินทางปัญญา --- */}
                    <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">4. ทรัพย์สินทางปัญญา</h2>
                    <p className="mb-4 leading-relaxed">
                        เนื้อหาทั้งหมดในบริการ รวมถึงแต่ไม่จำกัดเพียงข้อความ, กราฟิก, โลโก้, ไอคอน, รูปภาพ, คลิปเสียง, วิดีโอ, ข้อมูล, ซอฟต์แวร์, และการรวบรวมเนื้อหาดังกล่าว เป็นทรัพย์สินของ Selfness หรือผู้ให้อนุญาตของเรา และได้รับการคุ้มครองโดยกฎหมายลิขสิทธิ์และกฎหมายทรัพย์สินทางปัญญาอื่นๆ
                    </p>
                    <p className="mb-8 leading-relaxed">
                        คุณสามารถใช้เนื้อหาเหล่านี้เพื่อการใช้งานส่วนบุคคลตามที่บริการอนุญาตเท่านั้น ห้ามมิให้มีการทำซ้ำ, แจกจ่าย, ดัดแปลง, สร้างงานลอกเลียนแบบ, แสดงต่อสาธารณะ, ดำเนินการต่อสาธารณะ, เผยแพร่ซ้ำ, ดาวน์โหลด, จัดเก็บ, หรือส่งต่อเนื้อหาใดๆ ในบริการ เว้นแต่จะได้รับอนุญาตอย่างชัดเจนจากเรา
                    </p>

                    {/* --- 5. เนื้อหาผู้ใช้ --- */}
                    <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">5. เนื้อหาผู้ใช้</h2>
                    <p className="mb-4 leading-relaxed">
                        บริการของเราอาจอนุญาตให้คุณสร้าง, อัปโหลด, โพสต์, ส่ง, หรือจัดเก็บเนื้อหา (เช่น การบันทึกเสียง/วิดีโอ, ข้อความ) (ต่อไปนี้เรียกว่า &quot;เนื้อหาผู้ใช้&quot;)
                    </p>
                    <p className="mb-4 leading-relaxed">
                        คุณรับผิดชอบแต่เพียงผู้เดียวต่อเนื้อหาผู้ใช้ที่คุณให้ไว้ คุณยืนยันและรับรองว่าคุณเป็นเจ้าของเนื้อหาผู้ใช้ทั้งหมดที่คุณส่งมา หรือคุณมีสิทธิ์ที่จำเป็นทั้งหมดในการให้สิทธิ์แก่เราในการใช้เนื้อหาผู้ใช้ของคุณตามที่ระบุไว้ในข้อกำหนดเหล่านี้
                    </p>
                    <p className="mb-8 leading-relaxed">
                        คุณให้สิทธิ์แก่เราในการใช้เนื้อหาผู้ใช้ของคุณโดยไม่ผูกขาด, โอนได้, ทั่วโลก, ไม่เรียกเก็บค่าลิขสิทธิ์, สามารถให้สิทธิ์ช่วงได้ เพื่อดำเนินการ, พัฒนา, จัดหา, และปรับปรุงบริการของเรา
                    </p>

                    {/* --- 6. การชำระเงินและการสมัครสมาชิก (ถ้ามี) --- */}
                    <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">6. การชำระเงินและการสมัครสมาชิก</h2>
                    <p className="mb-4 leading-relaxed">
                        บริการบางส่วนอาจต้องมีการชำระเงินหรือการสมัครสมาชิกแบบพรีเมียม หากคุณเลือกที่จะใช้บริการแบบชำระเงิน คุณตกลงที่จะปฏิบัติตามเงื่อนไขการชำระเงินที่ระบุไว้ ณ เวลาที่ซื้อ หรือตามข้อกำหนดเพิ่มเติมที่แจ้งให้ทราบ
                    </p>
                    <p className="mb-8 leading-relaxed">
                        เราสงวนสิทธิ์ในการเปลี่ยนแปลงราคาสำหรับบริการของเราได้ตลอดเวลา แต่การเปลี่ยนแปลงดังกล่าวจะไม่ส่งผลกระทบต่อระยะเวลาการสมัครสมาชิกปัจจุบันของคุณ
                    </p>

                    {/* --- 7. การปฏิเสธความรับผิดชอบ --- */}
                    <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">7. การปฏิเสธความรับผิดชอบ</h2>
                    <p className="mb-8 leading-relaxed">
                        บริการและเนื้อหาทั้งหมดที่ให้บริการผ่านบริการนี้จัดทำขึ้น &quot;ตามสภาพที่เป็นอยู่&quot; และ &quot;ตามที่มี&quot; โดยไม่มีการรับประกันใดๆ ทั้งโดยชัดแจ้งหรือโดยนัย Selfness ไม่รับประกันว่าบริการจะปราศจากข้อผิดพลาด, ทำงานได้อย่างต่อเนื่อง, หรือจะแก้ไขข้อบกพร่องใดๆ เราไม่รับประกันความเหมาะสมของเนื้อหาสำหรับวัตถุประสงค์เฉพาะใดๆ
                    </p>

                    {/* --- 8. ข้อจำกัดความรับผิด --- */}
                    <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">8. ข้อจำกัดความรับผิด</h2>
                    <p className="mb-8 leading-relaxed">
                        ในขอบเขตสูงสุดที่กฎหมายอนุญาต Selfness จะไม่รับผิดชอบต่อความเสียหายทางอ้อม, โดยบังเอิญ, พิเศษ, เป็นผลสืบเนื่อง, หรือเป็นการลงโทษ หรือการสูญเสียผลกำไรหรือรายได้ใดๆ ไม่ว่าจะเกิดขึ้นโดยตรงหรือโดยอ้อม หรือการสูญเสียข้อมูล, การใช้งาน, ค่าความนิยม, หรือความสูญเสียที่ไม่สามารถจับต้องได้อื่นๆ ที่เกิดจากการเข้าถึงหรือการใช้บริการของคุณ
                    </p>

                    {/* --- 9. การชดเชยค่าเสียหาย --- */}
                    <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">9. การชดเชยค่าเสียหาย</h2>
                    <p className="mb-8 leading-relaxed">
                        คุณตกลงที่จะปกป้อง, ชดเชย, และทำให้ Selfness, บริษัทในเครือ, เจ้าหน้าที่, กรรมการ, พนักงาน, และตัวแทนของ Selfness พ้นจากความรับผิดชอบต่อการเรียกร้อง, ความเสียหาย, ความสูญเสีย, ต้นทุน, หรือค่าใช้จ่ายใดๆ (รวมถึงค่าทนายความที่สมเหตุสมผล) ที่เกิดขึ้นจากหรือเกี่ยวข้องกับการใช้งานบริการของคุณ หรือการละเมิดข้อกำหนดเหล่านี้ของคุณ
                    </p>

                    {/* --- 10. การยุติการใช้งาน --- */}
                    <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">10. การยุติการใช้งาน</h2>
                    <p className="mb-8 leading-relaxed">
                        เราอาจระงับหรือยุติการเข้าถึงบริการของคุณได้ทันที โดยไม่ต้องแจ้งให้ทราบล่วงหน้าหรือรับผิดชอบ ด้วยเหตุผลใดๆ ก็ตาม รวมถึงแต่ไม่จำกัดเพียงการละเมิดข้อกำหนดเหล่านี้ หากคุณต้องการยุติบัญชีของคุณ คุณสามารถทำได้โดยหยุดใช้บริการหรือติดต่อเรา
                    </p>

                    {/* --- 11. กฎหมายที่ใช้บังคับและเขตอำนาจศาล --- */}
                    <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">11. กฎหมายที่ใช้บังคับและเขตอำนาจศาล</h2>
                    <p className="mb-8 leading-relaxed">
                        ข้อกำหนดเหล่านี้จะถูกตีความและควบคุมโดยกฎหมายของประเทศไทย โดยไม่คำนึงถึงหลักการการขัดกันแห่งกฎหมาย คุณตกลงที่จะยอมรับเขตอำนาจศาลเฉพาะของศาลที่ตั้งอยู่ในประเทศไทยสำหรับการแก้ไขข้อพิพาทใดๆ ที่เกิดขึ้นจากข้อกำหนดเหล่านี้
                    </p>

                    {/* --- 12. เบ็ดเตล็ด --- */}
                    <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">12. เบ็ดเตล็ด</h2>
                    <ul className="list-disc list-inside mb-8 space-y-2 text-[#4a4a4a] leading-relaxed">
                        <li>หากข้อกำหนดใดๆ ของข้อตกลงนี้ถูกพิจารณาว่าไม่สามารถบังคับใช้ได้หรือไม่ถูกต้อง ข้อกำหนดที่เหลือจะยังคงมีผลบังคับใช้และมีผลสมบูรณ์</li>
                        <li>การไม่บังคับใช้สิทธิ์หรือข้อกำหนดใดๆ ของข้อกำหนดเหล่านี้โดยเรา จะไม่ถือเป็นการสละสิทธิ์ดังกล่าว</li>
                        <li>ข้อกำหนดเหล่านี้ประกอบขึ้นเป็นข้อตกลงทั้งหมดระหว่างคุณกับเราเกี่ยวกับการใช้งานบริการของเรา</li>
                    </ul>

                    {/* --- 13. ติดต่อเรา --- */}
                    <h2 className="text-3xl font-semibold mb-6 text-[#1a1a1a]">13. ติดต่อเรา</h2>
                    <p className="mb-4 leading-relaxed">
                        หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับข้อกำหนดเหล่านี้ โปรดติดต่อเราได้ที่:
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