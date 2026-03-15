"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MediaContributionLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store authentication data
        if (typeof window !== "undefined") {
          localStorage.setItem("mediaContributorAuth", "true");
          localStorage.setItem("mediaContributorEmail", email);
          localStorage.setItem("mediaContributorUser", JSON.stringify(data.user));
          const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour
          localStorage.setItem("mediaContributorExpiry", String(expiresAt));
        }
        router.push("/media-contribution");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "radial-gradient(circle at 20% 20%, rgba(255,179,71,0.12), transparent 22%), radial-gradient(circle at 80% 10%, rgba(255,214,102,0.12), transparent 20%), radial-gradient(circle at 30% 80%, rgba(255,179,71,0.12), transparent 18%), #3a1300",
        color: "#fbe9d7",
      }}
    >
      <div
        className="w-full max-w-xl rounded-[32px] p-8 shadow-2xl"
        style={{
          background: "linear-gradient(145deg, #4c1b05 0%, #5c2105 40%, #431503 100%)",
          border: "1px solid rgba(255, 186, 102, 0.35)",
          boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
        }}
      >
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold" style={{ fontFamily: "Poppins" }}>
            Login
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full px-6 py-4 bg-[#f2f6ff] text-[#1f130a] placeholder-[#a97c59] shadow-inner outline-none"
              style={{
                border: "3px solid transparent",
                boxShadow: "inset 0 2px 6px rgba(0,0,0,0.15)",
              }}
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[#c28851]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </span>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full px-6 py-4 pr-12 bg-[#f2f6ff] text-[#1f130a] placeholder-[#a97c59] shadow-inner outline-none"
              style={{
                border: "3px solid transparent",
                boxShadow: "inset 0 2px 6px rgba(0,0,0,0.15)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-[#c28851] hover:text-[#a86841] transition cursor-pointer"
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm text-[#fbe9d7]">
            <label className="flex items-center gap-2 cursor-pointer" style={{ fontFamily: "Poppins" }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-amber-300 bg-transparent text-amber-400 focus:ring-amber-400"
              />
              Remember me
            </label>
            <button type="button" className="hover:text-amber-50" style={{ fontFamily: "Poppins" }}>
              Forgot Password?
            </button>
          </div>

          {error && (
            <div className="text-sm text-red-400" style={{ fontFamily: "Poppins" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full py-4 text-lg font-semibold shadow-lg transition transform hover:-translate-y-[1px]"
            style={{
              background: "linear-gradient(90deg, #ffb54c 0%, #f48a0a 100%)",
              color: "#3a1505",
              fontFamily: "Poppins",
              boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm" style={{ fontFamily: "Poppins", color: "#fbe9d7" }}>
          Don't have an account?{" "}
          <Link
            href="/media-contribution/register"
            className="font-semibold text-[#ffd48c] hover:underline cursor-pointer transition"
          >
            Register
          </Link>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 border border-white/20 text-sm font-semibold hover:bg-white/15 transition"
            style={{ fontFamily: "Poppins", color: "#fbe9d7" }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
