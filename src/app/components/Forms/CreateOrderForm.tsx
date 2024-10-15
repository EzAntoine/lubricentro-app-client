import { useState } from "react";
import { URL } from "../../../../config/consts";

export default function CreateOrderForm({ setFormOpen, fetchOrders }) {
  const [newOrder, setNewOrder] = useState({
    date: new Date().toISOString(),
    vehiclePlate: "",
    clientId: "",
    failure: "",
    estimatedSolution: "",
    price: "",
    status: "Pendiente",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(`${URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(newOrder),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al crear nueva orden.");
        }
        setNewOrder({
          date: new Date().toISOString(),
          vehiclePlate: "",
          clientId: "",
          failure: "",
          estimatedSolution: "",
          price: "",
          status: "Pendiente",
        });
        swal("Orden creada correctamente!", "", "success");
        fetchOrders();
        setFormOpen(false);
      })
      .catch((error) => {
        swal(
          "Error al crear nueva orden",
          "Por favor intente nuevamente.",
          "error"
        );
      });
  };

  return (
    <div className="-mt-10 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-[#2d2c2d] bg-opacity-100 p-6 rounded-lg shadow-md w-96">
        <div className="flex flex-col items-center justify-center">
          <p className="mb-2 text-center">NUEVA ORDEN</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="mb-2">
            <label
              htmlFor="clientId"
              className="block text-sm font-medium text-gray-300"
            >
              Cliente:
            </label>
            <input
              type="text"
              id="clientId"
              name="clientId"
              required
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={inputHandler}
              value={newOrder.clientId}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="vehiclePlate"
              className="block text-sm font-medium text-gray-300"
            >
              Patente:
            </label>
            <input
              type="text"
              id="vehiclePlate"
              name="vehiclePlate"
              required
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={inputHandler}
              value={newOrder.vehiclePlate}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="failure"
              className="block text-sm font-medium text-gray-300"
            >
              Falla:
            </label>
            <input
              type="text"
              id="failure"
              name="failure"
              required
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={inputHandler}
              value={newOrder.failure}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="estimatedSolution"
              className="block text-sm font-medium text-gray-300"
            >
              Solucion Propuesta:
            </label>
            <input
              type="text"
              id="estimatedSolution"
              name="estimatedSolution"
              required
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={inputHandler}
              value={newOrder.estimatedSolution}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-300"
            >
              Presupuesto:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={inputHandler}
              value={newOrder.price}
            />
          </div>
          <div>
            <button
              type="submit"
              className="mt-1 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            >
              Crear orden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
