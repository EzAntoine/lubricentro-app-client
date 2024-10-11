import Image from "next/image";
import LogoNav from "../../../../public/images/logo200px.png";
import DropdownMenu from "./DropdownMenu";
import { PowerIcon } from "@heroicons/react/24/outline";
import { LoginFormProps } from "@/types/types";

export default function NavbarAdmin({
  setToken,
  userData,
  setUserData,
}: LoginFormProps) {
  const logoutHandler = () => {
    setToken(null);
    localStorage.clear();
    setUserData({
      username: "",
      password: "",
    });
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-10 bg-[#2d2c2d] bg-opacity-100 text-white">
      <div className="flex flex-wrap items-end justify-between mx-auto px-4 py-2">
        <Image src={LogoNav} alt="Lubricentro Maceratesi" priority />
        <div className="flex flex-wrap">
          <DropdownMenu userData={userData} />
          {/* La siguiente imagen sera reemplazada por una generica o en si se implementa login google con la foto respectiva. */}
          <button className="ml-2 p-2 text-sm font-medium rounded bg-gray-50 text-black hover:bg-[#b93c30] hover:text-white">
            <PowerIcon className="w-6 h-6" onClick={logoutHandler} />
          </button>
        </div>
      </div>
    </nav>
  );
}
