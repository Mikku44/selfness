import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";



type LessonContextType = {

    loading: boolean;
    lessonID: string;

    setSetlessonID: Dispatch<SetStateAction<string>>
    setLoading: Dispatch<SetStateAction<boolean>>

};

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export function LessonProvider({ children }: { children: React.ReactNode }) {

    const [loading, setLoading] = useState(true);
    const [lessonID, setSetlessonID] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 8000)

    }, []);


    return (
        <LessonContext.Provider value={{
            loading,
            setSetlessonID,
            setLoading,
            lessonID
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
