import Head from "next/head";
import Header from "../components/Header";
import Services from "../components/Services";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="">
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

      <main className="">
        <Header />
        <AboutUs />
        <Services />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
