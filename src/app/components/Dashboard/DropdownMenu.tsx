import React, { useEffect, useState } from "react";
import profileLogo from "../../../../public/svg/profile-round.svg";
import Image from "next/image";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  return (
    <div>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex items-center justify-center"
        onClick={handleToggle}
      >
        Nombre Usuario
        <Image
          src={profileLogo}
          alt="Foto de perfil"
          className="h-8 w-8 p-1 ml-2 rounded-full bg-gray-200"
        />
      </button>
      {isOpen && (
        <ul className="mt-2 px-2">
          <li>Editar perfil</li>
          <li>Cerrar Sesion</li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
