import walogo from "../../../public/svg/whatsapp-color.svg";
import fblogo from "../../../public/svg/facebook-round.svg";
import iglogo from "../../../public/svg/instagram-round.svg";
import maillogo from "../../../public/svg/email-round.svg";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact">
      <div className="w-full p-8 bg-[#2ccc71] bg-opacity-20">
        <h2 className="text-left text-4xl font-bold text-white md:mb-12">
          Contacto
        </h2>
        <div className="text-gray-300 font-bold text-base sm:text-lg mb-6 lg:text-xl px-24 text-balance">
          <Link href="wa.me/+542911111111" className="flex items-center">
            <h3 className="text-2xl">
              Escribinos por Whatsapp al +542911111111 o haciendo click aquí
            </h3>
            <Image
              src={walogo}
              alt="Whatsapp +542911111111"
              title="Whatsapp +542911111111"
              className="w-10 h-10 transform hover:scale-110 transition-transform duration-300 ease-in-out mx-6"
            />
          </Link>
          <h3 className="text-2xl mt-4">Redes Sociales</h3>
          <div className="container mx-auto flex flex-col items-center">
            <ul className="flex space-x-4">
              <Link
                href="mailto:lubricentro@gmail.com"
                className="mx-4 hover:scale-110 transition-transform duration-200 ease-in-out"
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
                className="mx-4 hover:scale-110 transition-transform duration-200 ease-in-out"
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
                className="mx-4 hover:scale-110 transition-transform duration-200 ease-in-out"
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
          </div>
          <h3 className="text-2xl mt-4">Ubicacion</h3>
          <h4 className="text-center text-xl">
            Calle 123, Bahia Blanca (B8000), Buenos Aires, Argentina
          </h4>
          <div>MAPA DE GOOGLE CON UBICACION</div>
        </div>
      </div>
    </section>
  );
}
