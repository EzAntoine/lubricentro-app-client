import { useEffect, useState } from "react";
import { URL } from "../../../../config/consts";

interface Client {
  _id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  detail: string;
}

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
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client>();

  useEffect(() => {
    if (!selectedClient) {
      fetch(`${URL}/clients`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Error al obtener clientes");
          }
          const data = await response.json();
          setClients(data.data);
        })
        .catch((error) => {
          setClients([]);
        });
    }
  }, [selectedClient]);

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
            <select className="w-full py-2 px-3 text-sm font-medium text-black bg-gray-50 border border-gray-300 rounded">
              {clients.length === 0 ? (
                <option disabled>No hay clientes disponibles.</option>
              ) : (
                clients.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name + " " + item.surname}
                  </option>
                ))
              )}
            </select>
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
