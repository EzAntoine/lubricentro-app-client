import { useEffect, useRef, useState } from "react";

const SortButton = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // Limpia el evento al desmontar el componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSort = (option: string) => {
    if (option === "az") {
      onSort("az");
    } else {
      onSort("default");
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Botón para abrir/cerrar dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:black"
      >
        Ordenar
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-200 border-solid border-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-400 w-full text-left"
              role="menuitem"
              onClick={() => handleSort("az")}
            >
              A-Z
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-400 w-full text-left"
              role="menuitem"
              onClick={() => handleSort("recent")}
            >
              Más recientes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortButton;
