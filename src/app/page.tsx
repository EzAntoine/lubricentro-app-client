import Head from "next/head";
import Header from "./components/Header";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import backgroundImg from "../../public/images/background-metal.jpg";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
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

      <main className="flex min-h-screen flex-col">
        <Header />
        <AboutUs />
        <Services />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
