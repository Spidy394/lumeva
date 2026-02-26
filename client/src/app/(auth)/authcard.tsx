"use client";

import { useState } from "react";
import { motion } from "framer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";

type Props = {
  mode: "login" | "register";
};

export default function Auth({ mode }: Props) {
  const isLogin = mode === "login";
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const { error: err } = await signIn.email({
          email,
          password,
        });
        if (err) {
          setError(err.message || "Login failed");
          setLoading(false);
          return;
        }
      } else {
        if (!name.trim()) {
          setError("Name is required");
          setLoading(false);
          return;
        }
        const { error: err } = await signUp.email({
          email,
          password,
          name,
        });
        if (err) {
          setError(err.message || "Registration failed");
          setLoading(false);
          return;
        }
      }

      router.push("/feed");
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/feed",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">

      {/* 🔥 BRANDING */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <span className="text-5xl font-semibold tracking-tight text-violet-600">
          Lumeva
        </span>
      </motion.div>

      {/* AUTH CARD */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm border"
      >
        {/* Header */}
        <div className="space-y-2 mb-8">
          <h1 className="text-2xl font-semibold">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-gray-500">
            {isLogin
              ? "Login to continue building."
              : "Start building with matched collaborators."}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <div className="space-y-5">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600"
              disabled={loading}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600"
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600"
            disabled={loading}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded-xl text-sm font-medium hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isLogin ? "Logging in..." : "Creating account..."}
              </>
            ) : (
              isLogin ? "Login" : "Create account"
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google OAuth */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 border rounded-xl text-sm font-medium hover:bg-gray-50 transition disabled:opacity-60 flex items-center justify-center gap-3"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        {/* Switch */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          {isLogin ? (
            <>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-black font-medium">
                Register
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/login" className="text-black font-medium">
                Login
              </Link>
            </>
          )}
        </div>

      </motion.div>
    </div>
  );
}