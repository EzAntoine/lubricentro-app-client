import Image from "next/image";
import LogoNav from "../../../../public/images/logo200px.png";

export default function NavbarAdmin() {
  return (
    <nav className="flex items-center justify-between p-4 bg-[#2d2c2d] bg-opacity-100 text-white">
      <div className="flex items-center">
        <Image
          src={LogoNav}
          alt="Lubricentro Maceratesi"
          className="h-8 mr-2"
        />
        <input type="text" placeholder="Buscar..." className="p-2 rounded" />
      </div>
      <div>
        <span>Usuario</span>
      </div>
    </nav>
  );
}
