import { Timestamp } from "firebase/firestore"

export interface UsageStats  {
    id?:string
    count:number
    source:{
        mobile:number;
        web:number
    }
    latest_update:Timestamp
}



