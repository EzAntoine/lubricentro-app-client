import {
  XMarkIcon,
  ChatBubbleOvalLeftIcon,
  EnvelopeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import EditClientForm from "../Forms/EditClientForm";

const ClientDetail = ({ client, onClose, fetchClients }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [actualClient, setActualClient] = useState(client);
  const [editedClient, setEditedClient] = useState(client);

  const vehiclesList =
    client.vehicles.length > 0
      ? client.vehicles[0]
          .map(
            (vehicle) =>
              `[${vehicle.plate}] ${vehicle.brand} ${vehicle.modelo} (${vehicle.year})`
          )
          .join(" -- ")
      : "No hay vehículos asignados.";

  useEffect(() => {
    const onEscClose = (e) => {
      e.preventDefault();
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (!isEditing) {
      document.addEventListener("keydown", onEscClose);
    }
    return () => document.removeEventListener("keydown", onEscClose);
  }, [isEditing]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-gray-200 text-black rounded-lg shadow-lg p-6 relative">
        <button onClick={onClose}>
          <XMarkIcon className="absolute top-2 right-2 h-6 w-6 text-gray-500 hover:text-gray-800" />
        </button>
        <h2 className="text-xl font-bold -mt-4 mb-4 underline">
          {actualClient.name + " " + actualClient.surname}
        </h2>

        {isEditing ? (
          <EditClientForm
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editedClient={editedClient}
            setEditedClient={setEditedClient}
            setActualClient={setActualClient}
            fetchClients={fetchClients}
          />
        ) : (
          <>
            <p>
              <strong>DNI:</strong> {actualClient.dni}
            </p>
            <p className="flex items-center">
              <strong className="mr-2">Teléfono:</strong> {actualClient.phone}
              <button
                onClick={() =>
                  window.open(`https://wa.me/${actualClient.phone}`, "_blank")
                }
                className="mb-1 ml-2 h-5 w-5"
              >
                <ChatBubbleOvalLeftIcon />
              </button>
            </p>
            <p className="flex items-center">
              <strong className="mr-2">Email: </strong> {actualClient.email}
              <button
                onClick={() =>
                  window.open(`mailto:${actualClient.email}`, "_blank")
                }
                className="mb-1 ml-2 h-5 w-5"
              >
                <EnvelopeIcon />
              </button>
            </p>
            <p>
              <strong>Detalle:</strong> {actualClient.detail}
            </p>
            <p>
              <strong>Vehículos:</strong> {vehiclesList}
            </p>
            <p>
              <strong>Cliente creado por:</strong> {actualClient.createdBy}
            </p>
            <button
              onClick={() => {
                setIsEditing(true);
              }}
              className="flex mt-2 p-2 text-sm font-medium rounded bg-green-600 text-white hover:bg-[#1a7742] hover:text-white"
            >
              Editar
              <PencilSquareIcon className="ml-1 w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientDetail;
