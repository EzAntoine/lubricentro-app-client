import Image from "next/image";
import LogoNav from "../../../../public/images/logo200px.png";
import DropdownMenu from "./DropdownMenu";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function NavbarAdmin({ token, setToken }) {
  const logoutHandler = () => {
    setToken(null);
    localStorage.clear();
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-10 bg-[#2d2c2d] bg-opacity-100 text-white">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Image src={LogoNav} alt="Lubricentro Maceratesi" />
        <div className="flex flex-wrap">
          <DropdownMenu />
          {/* La siguiente imagen sera reemplazada por una generica o en si se implementa login google con la foto respectiva. */}
        </div>
        <button className="mt-2 ml-2 p-2 text-sm font-medium rounded bg-gray-50 text-black hover:bg-[#72241d] hover:text-white">
          <PowerIcon className="w-5 h-5" onClick={logoutHandler} />
        </button>
      </div>
    </nav>
  );
}
