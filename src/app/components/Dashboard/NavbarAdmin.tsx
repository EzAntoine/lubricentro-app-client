import Image from "next/image";
import LogoNav from "../../../../public/images/logo200px.png";
import profileLogo from "../../../../public/svg/profile-round.svg";

export default function NavbarAdmin() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-10 bg-[#2d2c2d] bg-opacity-100 text-white">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Image src={LogoNav} alt="Lubricentro Maceratesi" />
        <div className="flex flex-wrap">
          <span className="mr-2 p-1">Usuario</span>
          {/* La siguiente imagen sera reemplazada por una generica o en si se implementa login google con la foto respectiva. */}
          <Image
            src={profileLogo}
            alt="Foto de perfil"
            className="h-8 w-8 p-1 rounded-full bg-gray-200"
          />
        </div>
      </div>
    </nav>
  );
}
