import { FormEvent, useState } from "react";
import { loginUser, registerUser } from "~/services/AuthService";
import { useAuth } from "../Contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import ButtonShop from "../ButtonShop";
import Checkbox from "../Checkbox";

export default function AuthModal() {
  const [action, setAction] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [loadingForm, setLoadingForm] = useState(false);
  const [isVisiblePass, setIsVisiblePass] = useState([false, false]);
  const [isAgree, setIsAgree] = useState(false);
  const { user, onLogin, setOnLogin } = useAuth();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoadingForm(true);

    const formData = new FormData(e.currentTarget);
    const displayName = formData.get("displayName")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString().trim() ?? "";

    if (!email || !password) {
      setError("Email and password are required.");
      setLoadingForm(false);
      return;
    }

    try {
      if (action === "login") {
        const result: any = await loginUser({ email, password });
        if (result?.errorCode) {
          toast.error(` ${result?.errorMessage}`);
          return;
        } else {
          toast.success(`Login Succesfully!`);

        }
      } else {
        const result: any = await registerUser({ email, password, displayName });
        if (result?.errorCode) {
          toast.error(` ${result?.errorMessage}`);
          return;
        } else {
          toast.success(`Register Succesfully!`);
        }
      }
      setOnLogin(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoadingForm(false);
    }
  }

  return (
    <AnimatePresence>
      {onLogin && (
        <motion.div
          className="fixed inset-0 z-[99] flex items-center justify-center bg-black/20 bg-opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOnLogin(false)}
        >
          <motion.div
            className="relative w-full max-w-md border-2 rounded-xl p-6 bg-white shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* Toggle Login/Register */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() =>
                  setAction(action === "login" ? "register" : "login")
                }
                className="bg-[var(--secondary-color)] px-4 py-1 rounded text-white"
              >
                {action === "login" ? "Register" : "Login"}
              </button>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
              <h2 className="text-xl font-bold text-center">
                {action === "login" ? "Login" : "Register"}
              </h2>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              {action == "register" && <input
                type="text"
                name="displayName"
                placeholder="Display Name"
                required
                className="w-full p-2 border rounded input"
              />}

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full p-2 border rounded input"
              />
              <div className="relative w-full">
                <input
                  type={isVisiblePass[0] ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full p-2 border rounded input"
                />
                <button
                  type="button"
                  onClick={() => setIsVisiblePass([!isVisiblePass[0], isVisiblePass[1]])}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 bg-white"
                >
                  {isVisiblePass[0] ? "Hide" : "Show"}
                </button>
              </div>

              {action === "register" && (
                <div className="relative w-full mt-2">
                  <input
                    type={isVisiblePass[1] ? "text" : "password"}
                    name="password-confirm"
                    placeholder="Confirm Password"
                    required
                    className="w-full p-2 border rounded input"
                  />
                  <button
                    type="button"
                    onClick={() => setIsVisiblePass([isVisiblePass[0], !isVisiblePass[1]])}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 bg-white"
                  >
                    {isVisiblePass[1] ? "Hide" : "Show"}
                  </button>
                </div>
              )}

              <Checkbox
              checked={isAgree}
              onChange={(e:any) => {
                setIsAgree(e.target.checked)
              }}
               text={`${isAgree ? "Yes" : "No"}, I ${isAgree ? "" : "don't"} agree to your Terms and Privacy Policy.`} />

              <button
              disabled={!isAgree}
              type="button" className="input cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-black flex gap-2 items-center bg-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-zinc-300 transition-all ease-in duration-200">
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-6">
                  <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107" />
                  <path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00" />
                  <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" fill="#4CAF50" />
                  <path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2" />
                </svg>
                Continue with Google
              </button>

              <ButtonShop 
              type="submit"
              className="bg-[--primary-color] disabled:opacity-50 disabled:cursor-not-allowed mt-[-10px]"
              disabled={!isAgree}
              text={loadingForm
                ? "Processing..."
                : action === "login"
                  ? "Login"
                  : "Register"}
              ></ButtonShop>
              {/* <button
                type="submit"
                disabled={loadingForm}
                className="w-full  text-white "
              >
                <span className="btn-primary">
                  {loadingForm
                    ? "Processing..."
                    : action === "login"
                      ? "Login"
                      : "Register"}
                </span>
              </button> */}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
