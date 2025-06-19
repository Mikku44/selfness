export const PsycologicalFacts = [
  {
    title: "ความมั่นใจไม่ใช่พรสวรรค์ แต่เป็นทักษะ",
    description:
      "นักจิตวิทยายืนยันว่า Self-confidence คือพฤติกรรมที่ฝึกได้ผ่านการลงมือทำและการสะสมประสบการณ์ (American Psychological Association)",
  },
  {
    title: "สมองเรียนรู้จากชัยชนะเล็กๆ",
    description:
      "ทุกครั้งที่เราก้าวข้ามความกลัว สมองจะหลั่ง dopamine ทำให้เรารู้สึกมั่นใจขึ้น และยิ่งฝึกซ้ำ สมองจะยิ่งจดจำว่าเราทำได้ (Harvard Health Publishing)",
  },
  {
    title: "พูดกับตัวเองเชิงบวกช่วยเพิ่มความมั่นใจ",
    description:
      "งานวิจัยจาก University of Michigan พบว่าการพูดกับตัวเองว่า “ฉันทำได้” หรือ “ไม่เป็นไร ลองดู” ช่วยลดความเครียดและเพิ่มความมั่นใจได้จริง",
  },
  {
    title: "ท่าทางภายนอกมีผลต่อความรู้สึกภายใน",
    description:
      "การยืนในท่ามั่นใจ (Power Pose) เพียง 2 นาที สามารถเพิ่มระดับฮอร์โมนความมั่นใจ และลดฮอร์โมนความเครียดได้ (Amy Cuddy – Harvard University)",
  },
  {
    title: "ยิ่งลงมือทำ ยิ่งมั่นใจ",
    description:
      "ความมั่นใจไม่ใช่ผลจากการรอให้พร้อม แต่เกิดจากการลงมือทำซ้ำๆ จนคล่องและเห็นพัฒนาการของตัวเอง",
  },
];


export function getRandomFact() {
  const index = Math.floor(Math.random() * PsycologicalFacts.length);
  return PsycologicalFacts[index];
}