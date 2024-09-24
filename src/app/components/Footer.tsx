/* import maillogo from "../../../public/svg/email-round.svg";
import wablogo from "../../../public/svg/whatsapp-black.svg"; */
import fblogo from "../../../public/svg/facebook-orig.svg";
import iglogo from "../../../public/svg/instagram-orig.svg";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <section className="text-gray-300 w-full p-2 bottom-0 right-0 left-0 bg-[#2d2c2d] bg-opacity-100 grid grid-cols-4">
      <div className="grid items-center">
        <h4 className="text-lg">Horarios</h4>
        <li className="list-none">Lunes a Viernes 9 a 18hs</li>
        <li className="list-none">Sabados y Domingos CERRADO</li>
      </div>
      <div className="container mx-auto text-lg col-start-2 col-span-2">
        <ul className="flex space-x-4 text-md items-center justify-center">
          {/* <Link
            href="mailto:lubricentro@gmail.com"
            className="hover:scale-110 transition-transform duration-200 ease-in-out hover:text-gray-400"
          >
            <li className="flex items-center">
              <Image
                src={maillogo}
                alt="Email"
                title="lubricentro@gmail.com"
                className="w-6 h-6"
              />
              lubricentro@gmail.com
            </li>
          </Link>
          <Link
            href="wa.me/+542911111111"
            className="hover:scale-110 transition-transform duration-200 ease-in-out hover:text-gray-400"
          >
            <li className="flex items-center">
              <Image
                src={wablogo}
                alt="Whatsapp +542911111111"
                title="Whatsapp +542911111111"
                className="w-5 h-5 mr-1"
              />
              +542911111111
            </li>
          </Link> */}
          <Link
            href="https://instagram.com/lubricentro"
            className="hover:scale-110 transition-transform duration-200 ease-in-out hover:text-gray-400"
          >
            <li className="flex items-center">
              <Image
                src={iglogo}
                alt="Instagram @lubricentro"
                title="Instagram @lubricentro"
                className="w-6 h-6 mr-1"
              />
              @Instagram
            </li>
          </Link>
          <Link
            href="https://facebook.com/lubricentro"
            className="hover:scale-110 transition-transform duration-200 ease-in-out hover:text-gray-400"
          >
            <li className="flex items-center">
              <Image
                src={fblogo}
                alt="Facebook"
                title="Facebook"
                className="w-6 h-6 mr-1"
              />
              Facebook
            </li>
          </Link>
        </ul>
      </div>
      <span className="items-end justify-end text-sm col-start-4 col-end-4 flex">
        Sitio creado por
        <Link
          href="https://ezequielantoine.vercel.app/"
          className="underline hover:text-cyan-600 mx-1"
        >
          EzAntoine
        </Link>
      </span>
    </section>
  );
}
