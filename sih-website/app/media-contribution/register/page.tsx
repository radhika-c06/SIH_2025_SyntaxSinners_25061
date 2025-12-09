"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MediaContributionRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.phone) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);

    // Register user via API
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/media-contribution/login");
        }, 1500);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Registration failed. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: "radial-gradient(circle at 20% 20%, rgba(255,179,71,0.12), transparent 22%), radial-gradient(circle at 80% 10%, rgba(255,214,102,0.12), transparent 20%), radial-gradient(circle at 30% 80%, rgba(255,179,71,0.12), transparent 18%), #3a1300",
        color: "#fbe9d7",
      }}
    >
      <div
        className="w-full max-w-2xl rounded-[32px] p-8 shadow-2xl"
        style={{
          background: "linear-gradient(145deg, #4c1b05 0%, #5c2105 40%, #431503 100%)",
          border: "1px solid rgba(255, 186, 102, 0.35)",
          boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: "Poppins" }}>
            Register
          </h1>
          <p className="text-sm text-[#d4a574]" style={{ fontFamily: "Poppins" }}>
            Join our community of media contributors
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-full px-6 py-4 bg-[#f2f6ff] text-[#1f130a] placeholder-[#a97c59] shadow-inner outline-none text-sm"
              style={{
                border: "3px solid transparent",
                boxShadow: "inset 0 2px 6px rgba(0,0,0,0.15)",
              }}
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[#c28851]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </span>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-full px-6 py-4 bg-[#f2f6ff] text-[#1f130a] placeholder-[#a97c59] shadow-inner outline-none text-sm"
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

          {/* Phone */}
          <div className="relative">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-full px-6 py-4 bg-[#f2f6ff] text-[#1f130a] placeholder-[#a97c59] shadow-inner outline-none text-sm"
              style={{
                border: "3px solid transparent",
                boxShadow: "inset 0 2px 6px rgba(0,0,0,0.15)",
              }}
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[#c28851]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
              </svg>
            </span>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-full px-6 py-4 pr-12 bg-[#f2f6ff] text-[#1f130a] placeholder-[#a97c59] shadow-inner outline-none text-sm"
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

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-full px-6 py-4 pr-12 bg-[#f2f6ff] text-[#1f130a] placeholder-[#a97c59] shadow-inner outline-none text-sm"
              style={{
                border: "3px solid transparent",
                boxShadow: "inset 0 2px 6px rgba(0,0,0,0.15)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-[#c28851] hover:text-[#a86841] transition cursor-pointer"
            >
              {showConfirmPassword ? (
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

          {/* Terms and Conditions */}
          <div className="flex items-start gap-3 text-sm" style={{ fontFamily: "Poppins" }}>
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 mt-1 rounded border-amber-300 bg-transparent text-amber-400 focus:ring-amber-400 flex-shrink-0 cursor-pointer"
            />
            <label htmlFor="agreeTerms" className="cursor-pointer text-[#fbe9d7]">
              I agree to the{" "}
              <span className="text-[#ffd48c] font-semibold hover:underline cursor-pointer">
                Terms and Conditions
              </span>{" "}
              and{" "}
              <span className="text-[#ffd48c] font-semibold hover:underline cursor-pointer">
                Privacy Policy
              </span>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 rounded-lg px-4 py-3 border border-red-500/20" style={{ fontFamily: "Poppins" }}>
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="text-sm text-green-400 bg-green-500/10 rounded-lg px-4 py-3 border border-green-500/20" style={{ fontFamily: "Poppins" }}>
              {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full py-4 text-lg font-semibold shadow-lg transition transform hover:-translate-y-[1px] mt-6 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            style={{
              background: loading ? "#cccccc" : "linear-gradient(90deg, #ffb54c 0%, #f48a0a 100%)",
              color: "#3a1505",
              fontFamily: "Poppins",
              boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
              opacity: loading ? 0.8 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm" style={{ fontFamily: "Poppins", color: "#fbe9d7" }}>
          Already have an account?{" "}
          <Link href="/media-contribution/login" className="font-semibold text-[#ffd48c] hover:underline">
            Login here
          </Link>
        </div>

        {/* Back Button */}
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
