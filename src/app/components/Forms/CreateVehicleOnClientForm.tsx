import React, { useEffect, useState } from "react";
import { URL } from "../../../../config/consts";

const CreateVehicleOnClientForm = ({
  isPopupOpen,
  setIsPopupOpen,
  addVehicle,
}) => {
  const [vehicle, setVehicle] = useState({
    plate: "",
    brand: "",
    modelo: "",
    engine: "",
    kilometers: "",
    year: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/vehicles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(vehicle),
      });

      if (!response.ok) {
        throw new Error("Error al crear nuevo vehículo.");
      }

      const data = await response.json();
      await addVehicle(data.data);

      setVehicle({
        plate: "",
        brand: "",
        modelo: "",
        engine: "",
        kilometers: "",
        year: "",
        details: "",
      });
      swal("Vehículo creado correctamente!", "", "success");
      setIsPopupOpen(false);
    } catch (error) {
      swal(
        "Error al crear nuevo vehículo.",
        "Por favor intente nuevamente.",
        "error"
      );
    }
  };

  useEffect(() => {
    const onEscClose = (e) => {
      if (e.key === "Escape") {
        if (isPopupOpen) {
          setIsPopupOpen(false);
        }
      } else if (e.key === "Enter") {
        handleSubmit(e);
      }
    };
    if (isPopupOpen) {
      document.addEventListener("keydown", onEscClose);
    }
    return () => document.removeEventListener("keydown", onEscClose);
  }, [isPopupOpen]);

  if (!isPopupOpen) return null;

  return (
    <div className="mt-14 fixed inset-0 flex items-center justify-center">
      <div className="bg-[#2d2c2d] bg-opacity-100 p-6 rounded-lg shadow-md w-200">
        <h2 className="flex items-center justify-center text-lg font-bold mb-4 text-gray-200">
          Agregar Vehículo
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div>
              <div className="mb-2">
                <label
                  htmlFor="plate"
                  className="block text-sm font-medium text-gray-300"
                >
                  Patente:
                </label>
                <input
                  type="text"
                  name="plate"
                  className="mt-1 mb-2 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  onChange={handleChange}
                  value={vehicle.plate}
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-300"
                >
                  Marca:
                </label>
                <input
                  type="text"
                  name="brand"
                  className="mt-1 mb-2 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  onChange={handleChange}
                  value={vehicle.brand}
                  required
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="engine"
                  className="block text-sm font-medium text-gray-300"
                >
                  Motor:
                </label>
                <input
                  type="text"
                  name="engine"
                  className="mt-1 mb-2 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  onChange={handleChange}
                  value={vehicle.engine}
                />
              </div>
            </div>
            <div>
              <div className="mb-2">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-300"
                >
                  Año:
                </label>
                <input
                  type="number"
                  name="year"
                  className="mt-1 mb-2 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  onChange={handleChange}
                  value={vehicle.year}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="modelo"
                  className="block text-sm font-medium text-gray-300"
                >
                  Modelo:
                </label>
                <input
                  type="text"
                  name="modelo"
                  className="mt-1 mb-2 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  onChange={handleChange}
                  value={vehicle.modelo}
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="kilometers"
                  className="block text-sm font-medium text-gray-300"
                >
                  Kilómetros:
                </label>
                <input
                  type="number"
                  name="kilometers"
                  className="mt-1 mb-2 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  onChange={handleChange}
                  value={vehicle.kilometers}
                />
              </div>
            </div>
            <div className="-mt-2 col-span-2">
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-300"
              >
                Detalles:
              </label>
              <textarea
                name="details"
                className="mt-1 mb-2 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                onChange={handleChange}
                value={vehicle.details}
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="mr-2 bg-red-800 hover:bg-[#72241d] text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-[#1a7742] text-white px-4 py-2 rounded"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVehicleOnClientForm;
