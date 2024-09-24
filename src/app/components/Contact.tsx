import walogo from "../../../public/svg/whatsapp-color.svg";
/* import fblogo from "../../../public/svg/facebook-round.svg";
import iglogo from "../../../public/svg/instagram-round.svg";
import maillogo from "../../../public/svg/email-round.svg"; */
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact">
      <div className="w-full p-10 bg-[#2ccc71] bg-opacity-20">
        <h2 className="text-left text-4xl font-bold text-white md:mb-12">
          Contacto
        </h2>
        <div className="text-gray-300 font-bold text-base sm:text-lg mb-6 lg:text-xl px-24 text-balance grid-cols-2">
          <Link href="wa.me/+542911111111" className="flex items-center">
            <h3 className="text-2xl">Whatsapp:</h3>
            <h3 className="mx-3">+542911111111 o haciendo click aquí</h3>
            <Image
              src={walogo}
              alt="Whatsapp +542911111111"
              title="Whatsapp +542911111111"
              className=" w-10 h-10 transform hover:scale-110 transition-transform duration-300 ease-in-out"
            />
          </Link>
          {/* <h3 className="text-2xl mt-4">Redes Sociales</h3>
          <div className="container mx-auto flex flex-col items-center">
            <ul className="flex space-x-4">
              <Link
                href="mailto:lubricentro@gmail.com"
                className="hover:scale-110 transition-transform duration-200 ease-in-out"
              >
                <li className="flex items-center">
                  <Image
                    src={maillogo}
                    alt="Email"
                    title="lubricentro@gmail.com"
                    className="w-10 h-10"
                  />
                  lubricentro@gmail.com
                </li>
              </Link>
              <Link
                href="https://instagram.com/lubricentro"
                className="hover:scale-110 transition-transform duration-200 ease-in-out"
              >
                <li className="flex items-center">
                  <Image
                    src={iglogo}
                    alt="Instagram @lubricentro"
                    title="Instagram @lubricentro"
                    className="w-9 h-9 mr-1"
                  />
                  @Instagram
                </li>
              </Link>
              <Link
                href="https://facebook.com/lubricentro"
                className="hover:scale-110 transition-transform duration-200 ease-in-out"
              >
                <li className="flex items-center">
                  <Image
                    src={fblogo}
                    alt="Facebook"
                    title="Facebook"
                    className="w-10 h-10"
                  />
                  Facebook
                </li>
              </Link>
            </ul>
          </div> */}
          <div className="flex items-center">
            <h3 className="text-2xl">Ubicación:</h3>
            <h3 className="mx-3">
              Malvinas 474, (B8000) Bahía Blanca, Provincia de Buenos Aires,
              Argentina
            </h3>
            <Link
              href="https://www.google.com.ar/maps/search/?api=1&query=-38.7248,-62.2845&zoom=15"
              target="_blank"
            >
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Ir a Google Maps
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
