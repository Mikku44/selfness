import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, User } from "firebase/auth";
import { auth } from "~/libs/firebase/auth.client";
import { generateRandomUsername } from "~/libs/randomName";
import { addOneUser } from "./UserService";
import { createNewUser } from "~/Models/User";


export async function registerUser({ email, password ,displayName}: { email: string; password: string ,displayName?:string}) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // If the user doesn't have a display name, assign one
        if (!user.displayName) {
            const randomName = generateRandomUsername();
            await updateProfile(user, { displayName: displayName || randomName });
        }

        // Save to Firestore
        const newUser = createNewUser(user); // create from Firebase user
        // console.log("REQ_RS_DATA : ",newUser)
        await addOneUser(newUser); // store in Firestore

        return user;
    } catch (error: any) {
        return {
            errorCode: error.code,
            errorMessage: error.message,
        };
    }
}

export async function loginUser({ email, password }: { email: string, password: string }) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            if ((user.displayName) == null) {
                await updateUser({ displayName: generateRandomUsername() })
            }

            
            return user
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return {
                errorCode,
                errorMessage
            }
        });

}
export function isUserLoggedIn(): Promise<User | null> {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe(); // เพื่อไม่ให้ฟังต่อเนื่อง
            resolve(user); // return user หรือ null
        });
    });
}

export function signOutUser() {
    return signOut(auth).then(() => {
        console.log("succesfully")
        return true;
    }).catch((error) => {
        console.log("failed")
        return false;
    });
}


export async function updateUser(updatedUser: { displayName?: string, photoURL?: string }) {
    if (auth?.currentUser) {
        return updateProfile(auth.currentUser, updatedUser).then(() => {
            return true
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return {
                errorCode,
                errorMessage
            }
        });
    } else {
        return {
            errorMessage: "Please Login before."
        }
    }
}