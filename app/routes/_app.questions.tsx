import { MetaFunction } from "@remix-run/react";
import CommunicationAssessmentForm from "~/components/Form";



export const meta: MetaFunction = () => {
  return [
    { title: 'Selfness - แบบทดสอบ Softskill' },
    { name: 'description', content: 'Selfness: แอปพลิเคชันพัฒนาทักษะ Soft Skill และการสื่อสาร' },
  ];
};


export default function _questions() {

  return <CommunicationAssessmentForm />
  
  // (
  //   <div className="flex ">

  //     <SideBar />
  //     <main className=" flex max-h-[100vh] pb-10 w-full overflow-auto p-5">
  //       <section className="min-h-[150vh] ">
          
  //         <CommunicationAssessmentForm />
  //       </section>
  //       <Overall />
  //     </main>
      
  //   </div>


  // )
}
