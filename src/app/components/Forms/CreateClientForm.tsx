import { useEffect, useState } from "react";
import { URL } from "../../../../config/consts";
import CreateVehicleOnClientForm from "./CreateVehicleOnClientForm";

interface Client {
  name: string;
  surname: string;
  dni: string;
  phone: string;
  email: string;
  detail: string;
  vehicles: Vehicle[];
  createdBy: string | null;
}
interface Vehicle {
  _id: string;
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
export default function CreateClientForm({ setFormOpen, fetchClients }) {
  const clientVehicles: Vehicle[] = [];

  const [newClient, setNewClient] = useState<Client>({
    name: "",
    surname: "",
    dni: "",
    email: "",
    phone: "",
    detail: "",
    createdBy: localStorage.getItem("username"),
    vehicles: [],
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(`${URL}/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(newClient),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al crear nuevo cliente");
        }
        setNewClient({
          name: "",
          surname: "",
          dni: "",
          email: "",
          phone: "",
          detail: "",
          vehicles: [],
          createdBy: localStorage.getItem("username"),
        });
        swal("Cliente creado correctamente!", "", "success");
        fetchClients();
        setFormOpen(false);
      })
      .catch((error) => {
        swal(
          "Error al crear nuevo cliente",
          "Por favor intente nuevamente.",
          "error"
        );
      });
  };

  const cancelHandler = () => {
    setFormOpen(false);
  };

  useEffect(() => {
    const onEscClose = (e) => {
      if (e.key === "Escape") {
        cancelHandler();
      }
    };
    if (!isPopupOpen) {
      document.addEventListener("keydown", onEscClose);
    }
    document.addEventListener("keydown", onEscClose);
    return () => document.removeEventListener("keydown", onEscClose);
  }, [isPopupOpen]);

  const addVehicle = (vehicle: Vehicle) => {
    setNewClient((prev) => ({
      ...prev,
      vehicles: [...prev.vehicles, vehicle.plate],
    }));
    clientVehicles.push(vehicle.plate);
  };

  return (
    <div className="-mt-8 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-[#2d2c2d] bg-opacity-100 p-6 rounded-lg shadow-md w-200">
        <div className="flex flex-col items-center justify-center">
          <p className="mb-2 text-center font-semibold">NUEVO CLIENTE</p>
        </div>
        <form
          onSubmit={submitHandler}
          className="grid grid-cols-2 gap-4 w-full p-4"
        >
          <div>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                onChange={inputHandler}
                value={newClient.name}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300"
              >
                Telefono:
              </label>
              <input
                type="phone"
                id="phone"
                name="phone"
                required
                className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                onChange={inputHandler}
                value={newClient.phone}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="dni"
                className="block text-sm font-medium text-gray-300"
              >
                DNI:
              </label>
              <input
                type="number"
                id="dni"
                name="dni"
                className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                onChange={inputHandler}
                value={newClient.dni}
              />
            </div>
          </div>
          <div>
            <div className="mb-2">
              <label
                htmlFor="surname"
                className="block text-sm font-medium text-gray-300"
              >
                Apellido:
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                required
                className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                onChange={inputHandler}
                value={newClient.surname}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                onChange={inputHandler}
                value={newClient.email}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Vehículos:
              </label>
              <div className="inline-flex w-full">
                <select
                  className="mt-1 w-9/10 p-2 border text-black border-gray-300 rounded-md"
                  defaultValue=""
                  disabled={!newClient.vehicles?.length} // Deshabilitar si no hay vehículos
                >
                  <option value="" disabled>
                    Vehículos
                  </option>
                  {newClient.vehicles.map((vehicle, index) => (
                    <option key={index} value={vehicle.plate}>
                      {`[${vehicle.plate}] ${vehicle.brand} ${vehicle.modelo} (${vehicle.year})`}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(true)}
                  className="m-2 px-2 bg-green-600 rounded-full text-white text-2xl font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-2 mb-4">
            <label
              htmlFor="detail"
              className="block text-sm font-medium text-gray-300"
            >
              Detalles:
            </label>
            <textarea
              name="detail"
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={inputHandler}
              value={newClient.detail}
            />
          </div>
          <div className="col-span-2 flex justify-between">
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
              Crear cliente
            </button>
          </div>
        </form>
      </div>
      <CreateVehicleOnClientForm
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        addVehicle={addVehicle}
      />
    </div>
  );
}
