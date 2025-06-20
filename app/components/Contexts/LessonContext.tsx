import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";



type LessonContextType = {

    loading: boolean;
    lessonIndex: number;
    setSetlessonIndex: Dispatch<SetStateAction<number>>
    setLoading: Dispatch<SetStateAction<boolean>>

};

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export function LessonProvider({ children }: { children: React.ReactNode }) {

    const [loading, setLoading] = useState<boolean>(true);
    const [lessonIndex, setSetlessonIndex] = useState<number>(() => {
        // Load saved index or default to 0
        let saved : number | string | null = 0;
        if (typeof window !== "undefined") {
             saved = localStorage.getItem("lessonIndex");
        }
            return saved ? parseInt(saved as string, 10) : 0;
        });


    useEffect(() => {
        localStorage.setItem("lessonIndex", lessonIndex.toString());
    }, [lessonIndex]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 8000)

    }, []);


    return (
        <LessonContext.Provider value={{
            loading,
            setSetlessonIndex,
            lessonIndex,
            setLoading,
        }}>
            {children}
        </LessonContext.Provider>
    );
}

export function useLesson() {
    const context = useContext(LessonContext);
    if (!context) {
        throw new Error("useLesson must be used within an LessonProvider");
    }
    return context;
}
