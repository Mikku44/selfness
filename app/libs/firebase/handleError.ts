
/**
 * Translates Firebase authentication error codes into user-friendly messages.
 * @param error The Firebase error object.
 * @returns An object containing the original error code and a user-friendly error message.
 */
export function handleFirebaseError(error: any) {
    let userErrorMessage = "An unexpected error occurred. Please try again.";
    let errorCode = error.code;

    switch (error.code) {
        case "auth/email-already-in-use":
            userErrorMessage = "This email address is already registered. Please use a different email or try logging in.";
            break;
        case "auth/invalid-email":
            userErrorMessage = "The email address you entered is not valid. Please check the format and try again.";
            break;
        case "auth/operation-not-allowed":
            userErrorMessage = "Email/password authentication is not enabled. Please contact support.";
            break;
        case "auth/weak-password":
            userErrorMessage = "Your password is too weak. Please choose a password with at least 6 characters.";
            break;
        case "auth/user-disabled":
            userErrorMessage = "This user account has been disabled. Please contact support if you believe this is an error.";
            break;
        case "auth/network-request-failed":
            userErrorMessage = "A network error occurred. Please check your internet connection and try again.";
            break;
        case "auth/wrong-password": // Common for login, good to include
            userErrorMessage = "Incorrect password. Please try again.";
            break;
        case "auth/user-not-found": // Common for login
            userErrorMessage = "No account found with this email. Please register or check your email address.";
            break;
        // Add more cases as you encounter them
        default:
            // console.error("Firebase Auth Error (unhandled):", error); // Log original error for debugging
            userErrorMessage = "Something went wrong. Please try again later.";
            break;
    }


    return {
        errorCode: errorCode,
        errorMessage: userErrorMessage,
    };
}