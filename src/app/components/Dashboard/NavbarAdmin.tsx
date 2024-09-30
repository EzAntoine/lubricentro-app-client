import Image from "next/image";
import LogoNav from "../../../../public/images/logo200px.png";

export default function NavbarAdmin() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-10 bg-[#2d2c2d] bg-opacity-100 text-white">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Image src={LogoNav} alt="Lubricentro Maceratesi" />
        <input type="text" placeholder="Buscar..." className="p-2 rounded" />
        <div>
          <span>Usuario</span>
        </div>
      </div>
    </nav>
  );
}
