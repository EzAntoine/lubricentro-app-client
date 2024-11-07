import { useEffect, useState } from "react";
import { URL } from "../../../../config/consts";
//import { PlusCircleIcon } from "@heroicons/react/24/outline";
interface Client {
  _id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  detail: string;
  vehicles: Vehicle[][];
}

interface Vehicle {
  plate: string;
  ownerId: string;
  brand: string;
  modelo: string;
  year: string;
  details: string;
  orders: Order[];
}

interface Order {
  date: Date;
  vehiclePlate: string;
  clientId: string;
  failure: string;
  estimateSolution: string;
  price: number;
  status: string;
  observations: string;
}

export default function CreateOrderForm({ setFormOpen, fetchOrders }) {
  const [newOrder, setNewOrder] = useState({
    date: new Date().toISOString(),
    vehiclePlate: "",
    clientId: "",
    failure: "",
    estimateSolution: "",
    price: "",
    status: "Pendiente",
    observations: "",
    createdBy: localStorage.getItem("username"),
  });
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>();

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
          const clientsSorted = data.data.sort((a, b) =>
            a.surname.toLowerCase().localeCompare(b.surname.toLowerCase())
          );
          setClients(clientsSorted);
        })
        .catch((error) => {
          setClients([]);
        });
    }
  }, [selectedClient]);

  /*   useEffect(() => {
    if (selectedClient) {
      fetch(`${URL}/clients/${selectedClient._id}`, {
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
          setSelectedClient(data.data);
          console.log(selectedClient.vehicles);
        })
        .catch((error) => {
          setClients([]);
        });
    }
  }, [selectedClient]); */

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
          clientId: "",
          vehiclePlate: "",
          failure: "",
          estimateSolution: "",
          price: "",
          status: "Pendiente",
          observations: "",
          createdBy: "",
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

  const clientSelectHandler = async (e) => {
    const selectedId = e.target.value;

    await fetch(`${URL}/clients/${selectedId}`, {
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
        setSelectedClient(data.data);
      })
      .catch((error) => {
        setSelectedClient(null);
      });

    setNewOrder({ ...newOrder, clientId: selectedId }); // Actualizar el newOrder con el clientId
  };

  const cancelHandler = () => {
    setFormOpen(false);
  };

  const onEscClose = (e) => {
    if (e.key === "Escape") {
      cancelHandler();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onEscClose);
    return () => document.removeEventListener("keydown", onEscClose);
  }, []);

  const plateSelectHandler = (e) => {
    const selectedPlate = e.target.value;

    setNewOrder({ ...newOrder, vehiclePlate: selectedPlate }); // Actualizar el newOrder con el clientId
  };

  return (
    <div className="-mt-10 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-[#2d2c2d] bg-opacity-100 p-6 rounded-lg shadow-md w-200">
        <div className="flex flex-col items-center justify-center">
          <p className="mb-2 text-center">NUEVA ORDEN</p>
        </div>
        <form
          onSubmit={submitHandler}
          className="grid grid-cols-2 gap-4 w-full p-4"
        >
          <div>
            <div className="mb-2">
              <label
                htmlFor="clientId"
                className="block text-sm font-medium text-gray-300"
              >
                Cliente:
              </label>
              <div className="w-full inline-flex items-center">
                <select
                  className="w-full mt-1 py-2 px-3 text-sm font-medium text-black bg-gray-50 border border-gray-300 rounded"
                  onChange={clientSelectHandler}
                  required
                >
                  <option value="">Seleccionar cliente</option>
                  {clients.length === 0 ? (
                    <option disabled>No hay clientes disponibles.</option>
                  ) : (
                    clients.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.surname + " " + item.name}
                      </option>
                    ))
                  )}
                </select>
                {/* <button
                className="h-10 w-10 flex items-center justify-center ml-2"
                title="Nuevo cliente"
                >
                <PlusCircleIcon className="h-9 w-9 text-white" />
                </button> */}
              </div>
            </div>

            <div className="mb-2">
              <label
                htmlFor="failure"
                className="block text-sm font-medium text-gray-300"
              >
                Falla:
              </label>
              <textarea
                name="failure"
                required
                className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                onChange={inputHandler}
                value={newOrder.failure}
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
          </div>

          <div>
            <div className="mb-2">
              <label
                htmlFor="vehiclePlate"
                className="block text-sm font-medium text-gray-300"
              >
                Patente:
              </label>
              <div className="w-full inline-flex items-center">
                <select
                  className="w-full mt-1 py-2 px-3 text-sm font-medium text-black bg-gray-50 border border-gray-300 rounded"
                  onChange={plateSelectHandler}
                  required
                >
                  <option value="">Seleccionar vehículo</option>
                  {selectedClient ? (
                    selectedClient.vehicles?.length === 0 ? (
                      <option disabled>
                        El cliente no tiene vehículos agregados.
                      </option>
                    ) : (
                      selectedClient.vehicles?.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))
                    )
                  ) : (
                    <option disabled>No hay cliente seleccionado.</option>
                  )}
                </select>
              </div>
            </div>
            <div className="mb-2">
              <label
                htmlFor="estimateSolution"
                className="block text-sm font-medium text-gray-300"
              >
                Solucion Propuesta:
              </label>
              <textarea
                name="estimateSolution"
                required
                className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                onChange={inputHandler}
                value={newOrder.estimateSolution}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="observations"
                className="block text-sm font-medium text-gray-300"
              >
                Observaciones:
              </label>
              <textarea
                name="observations"
                className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                onChange={inputHandler}
                value={newOrder.observations}
              />
            </div>
          </div>

          <div className="col-span-2 flex justify-between mt-2">
            <button
              onClick={cancelHandler}
              className="mr-2 bg-red-800 hover:bg-[#72241d] text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-[#1a7742] text-white px-4 py-2 rounded"
            >
              Crear orden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
