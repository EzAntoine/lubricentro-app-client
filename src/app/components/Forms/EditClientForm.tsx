import { useEffect, useState } from "react";
import { URL } from "../../../../config/consts";
import CreateVehicleOnClientForm from "./CreateVehicleOnClientForm";

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
const EditClientForm = ({
  isEditing,
  setIsEditing,
  editedClient,
  setEditedClient,
  setActualClient,
  fetchClients,
}) => {
  const clientVehicles: string[] = [];
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedClient({ ...editedClient, [name]: value });
  };

  const handleSave = async () => {
    const updatedClient = {
      ...editedClient,
      vehicles: [...(editedClient.vehicles || []), ...clientVehicles],
    };

    await fetch(`${URL}/clients/${editedClient._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(updatedClient),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al modificar cliente");
        }
        fetchClients();
        setActualClient(updatedClient);
        swal("Cliente modificado correctamente!", "", "success");
      })
      .catch((error) => {
        swal(
          "Error al modificar el cliente",
          "Por favor intente nuevamente.",
          "error"
        );
      });
    setIsEditing(false);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isEditing) {
          setIsEditing(false);
        }
      } else if (e.key === "Enter" || e.keyCode === 13 || e.keyCode === 108) {
        e.preventDefault();
        handleSave();
      }
    };
    if (isEditing) {
      document.addEventListener("keydown", onKeyDown);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isEditing]);

  const addVehicle = (vehicle: Vehicle) => {
    setEditedClient((prev) => ({
      ...prev,
      vehicles: [...(prev.vehicles || []), vehicle.plate],
    }));
    clientVehicles.push(vehicle.plate);
  };

  return (
    <div>
      <div className="grid grid-cols-2 w-full">
        <label className="block mb-2 mr-2">
          <strong>Nombre:</strong>
          <input
            type="text"
            name="name"
            value={editedClient.name}
            onChange={handleEditChange}
            className="border p-1 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          <strong>Email:</strong>
          <input
            type="email"
            name="email"
            value={editedClient.email}
            onChange={handleEditChange}
            className="border p-1 rounded w-full"
          />
        </label>
        <label className="block mb-2 mr-2">
          <strong>Apellido:</strong>
          <input
            type="text"
            name="surname"
            value={editedClient.surname}
            onChange={handleEditChange}
            className="border p-1 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          <strong>Teléfono:</strong>
          <input
            type="text"
            name="phone"
            value={editedClient.phone}
            onChange={handleEditChange}
            className="border p-1 rounded w-full"
          />
        </label>
        <label className="block mb-2 mr-2">
          <strong>DNI:</strong>
          <input
            type="text"
            name="dni"
            value={editedClient.dni}
            onChange={handleEditChange}
            className="border p-1 rounded w-full"
          />
        </label>

        <label className="block mb-2 mt-3 mr-4">
          <strong>Agregar Vehículo</strong>
          <button
            type="button"
            onClick={() => setIsPopupOpen(true)}
            className="m-2 px-2 bg-green-600 rounded-full text-white text-2xl font-bold"
          >
            +
          </button>
        </label>
      </div>
      <label className="block mb-2">
        <strong>Detalle:</strong>
        <textarea
          name="detail"
          value={editedClient.detail}
          onChange={handleEditChange}
          className="border p-1 rounded w-full"
        />
      </label>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setIsEditing(false)}
          className="mr-2 bg-red-800 hover:bg-[#72241d] text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-[#1a7742] text-white px-4 py-2 rounded"
        >
          Confirmar
        </button>
      </div>
      <CreateVehicleOnClientForm
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        addVehicle={addVehicle}
      />
    </div>
  );
};

export default EditClientForm;
