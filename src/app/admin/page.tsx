"use client";
import Head from "next/head";
import Dashboard from "@/app/components/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import LoginForm from "../components/Forms/LoginForm";
import Loading from "../components/Loader/Loading";

export default function AdminHome() {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(true); //Estado de carga.

  /* useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("userToken");
      setToken(storedToken ?? null);
    }
  }, []); */

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = localStorage.getItem("userToken");
      setToken(storedToken ?? null);
      setLoading(false);
    };

    checkToken();
  }, []);

  return (
    <div className="bg-hero-image h-screen bg-cover bg-center bg-fixed">
      <Head>
        <title>Lubricentro Maceratesi - Panel Administrativo</title>
        <meta name="Lubricentro Maceratesi" content="" />
        <link rel="preload" href="/images/herramientas.jpg" as="image" />
      </Head>

      <main className="flex h-screen flex-col bg-[#2d2c2d] bg-opacity-50">
        {loading ? (
          <Loading />
        ) : token ? (
          <Dashboard
            token={token}
            setToken={setToken}
            userData={userData}
            setUserData={setUserData}
          />
        ) : (
          <LoginForm
            token={token}
            setToken={setToken}
            userData={userData}
            setUserData={setUserData}
          />
        )}
      </main>
    </div>
  );
}
