import React, { useState } from "react";

const StatusFilterButton = ({ filterStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (status: string) => {
    setSelectedStatus(status);
    setIsOpen(false);
    filterStatus(status);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:black"
          onClick={toggleDropdown}
        >
          {selectedStatus}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-200 ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {["Pendiente", "Terminado", "Retirado", "Demorado", "Todos"].map(
              (status) => (
                <a
                  key={status}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                  onClick={() => handleSelect(status)}
                >
                  {status}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusFilterButton;
