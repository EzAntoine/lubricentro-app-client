import Head from "next/head";
import Dashboard from "@/app/components/Dashboard/Dashboard";

export default function AdminHome() {
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
        <Dashboard />
      </main>
    </div>
  );
}
