import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "~/libs/firebase/auth.client";
import { User as UserDB } from "~/Models/User";
import { getUserByUid, onUserByUid } from "~/services/UserService";


type AuthContextType = {
  user: User | null;
  UserInfo: UserDB | null;
  loading: boolean;
  onLogin: boolean;
  setOnLogin: Dispatch<SetStateAction<boolean>>
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [UserInfo, setUserInfo] = useState<UserDB | null>(null);
  const [onLogin, setOnLogin] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = onUserByUid(user.uid, (userInfo) => {
        if (userInfo) {
          setUserInfo(userInfo);
        } else {
          setUser(null);
        }
      });

      return () => unsubscribe(); // Cleanup on unmount
    }
  }, [user]);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, UserInfo, loading, onLogin, setOnLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
