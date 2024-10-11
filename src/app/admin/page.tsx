"use client";
import Head from "next/head";
import Dashboard from "@/app/components/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import LoginForm from "../components/Forms/LoginForm";

export default function AdminHome() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("userToken");
      setToken(storedToken ?? null);
    }
  }, []);

  return (
    <div className="bg-hero-image min-h-screen bg-cover bg-center">
      <Head>
        <title>Lubricentro Maceratesi - Panel Administrativo</title>
        <meta name="Lubricentro Maceratesi" content="" />
        <link
          rel="icon"
          href="/favicon.ico"
          type="image/x-icon"
          sizes="32x32"
        />
      </Head>

      <main className="flex min-h-screen flex-col  bg-[#2d2c2d] bg-opacity-70">
        {token ? (
          <Dashboard token={token} setToken={setToken} />
        ) : (
          <LoginForm token={token} setToken={setToken} />
        )}
      </main>
    </div>
  );
}
