"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_URL } from "@/config";

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        localStorage.setItem("loggedIn", "true");
        router.push("/dashboard");
      } else {
        setError("密碼錯誤，請再試一次！");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("登入失敗，請稍後再試。");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f7f8fa] text-[#4b5563]">
      <h1 className="text-2xl font-bold mb-6">登入管理後台</h1>
      <input
        type="password"
        placeholder="輸入密碼"
        className="border p-2 rounded mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-[#94c9ad] hover:bg-[#cfa7b4] text-white font-bold py-2 px-6 rounded-full shadow-md transform hover:scale-105 transition"
      >
        登入
      </button>
      {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
    </main>
  );
}
