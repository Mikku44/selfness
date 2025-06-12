import { Timestamp } from "firebase/firestore"

export interface ReG {
    id?:string
    persona:string
    comms:number
    social:number
    anxiety:number
    clarity:number
    conflict:number
    created_at:Timestamp
    date_key?:string
    NOTD?:number
}