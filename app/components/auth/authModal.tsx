import { FormEvent, useState } from "react";
import { loginUser, registerUser } from "~/services/AuthService";
import { useAuth } from "../Contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function AuthModal() {
  const [action, setAction] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [loadingForm, setLoadingForm] = useState(false);
  const [isVisiblePass, setIsVisiblePass] = useState([false, false]);
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
              <button
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
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
