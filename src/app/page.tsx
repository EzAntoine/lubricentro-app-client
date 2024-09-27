import Head from "next/head";
import Header from "./components/Header/Header";
import Services from "./components/Services/Services";
import AboutUs from "./components/About/AboutUs";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <div className="bg-hero-image min-h-screen bg-cover bg-center">
      <Head>
        <title>Lubricentro Maceratesi</title>
        <meta name="Lubricentro Maceratesi" content="" />
        <link
          rel="icon"
          href="/favicon.ico"
          type="image/x-icon"
          sizes="32x32"
        />
      </Head>

      <main className="flex min-h-screen flex-col  bg-[#2d2c2d] bg-opacity-70">
        <Header />
        <AboutUs />
        <Services />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
