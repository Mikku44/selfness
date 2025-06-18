import { toast } from "sonner"

export async function toastSound(message: string, options?: any, sfx?: string) {
    if (sfx) {
        const flipSound = new Audio(sfx)
        flipSound.play()
    }
    return toast(message, options || null)
}