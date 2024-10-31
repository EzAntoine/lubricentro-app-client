import React, { useState } from "react";

const CreateVehicleOnClientForm = ({ isOpen, onClose, addVehicle }) => {
  const [vehicle, setVehicle] = useState({
    plate: "",
    brand: "",
    model: "",
    year: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addVehicle(vehicle);
    onClose(); // Cierra el popup después de agregar el vehículo
  };

  if (!isOpen) return null;

  return (
    <div className="mt-14 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#2d2c2d] bg-opacity-100 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Agregar Vehículo</h2>
        <form onSubmit={handleSubmit}>
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
          <label
            htmlFor="model"
            className="block text-sm font-medium text-gray-300"
          >
            Modelo:
          </label>
          <input
            type="text"
            name="model"
            placeholder="Modelo"
            className="mt-1 mb-2 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            onChange={handleChange}
            value={vehicle.model}
            required
          />
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-300"
          >
            Año:
          </label>
          <input
            type="text"
            name="year"
            className="mt-1 mb-2 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            onChange={handleChange}
            value={vehicle.year}
          />
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
          <div className="mt-4 -mb-4 flex">
            <button
              onClick={onClose}
              className="w-full m-2 py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full m-2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVehicleOnClientForm;
