import {
  XMarkIcon,
  ChatBubbleOvalLeftIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";

const ClientDetail = ({ client, onClose }) => {
  const vehiclesList =
    client.vehicles.length > 0
      ? client.vehicles.join(", ")
      : "No hay vehículos asignados.";

  const onEscClose = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onEscClose);
    return () => document.removeEventListener("keydown", onEscClose);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-gray-200 text-black rounded-lg shadow-lg p-6 relative">
        <button onClick={onClose}>
          <XMarkIcon className="absolute top-2 right-2 h-6 w-6 text-gray-500 hover:text-gray-800" />
        </button>
        <h2 className="text-xl font-bold -mt-4 mb-4 underline">
          {client.name + " " + client.surname}
        </h2>
        <p>
          <strong>DNI:</strong> {client.dni}
        </p>
        <p className="flex items-center">
          <strong>Teléfono</strong> {client.phone}
          <button
            onClick={() =>
              window.open(`https://wa.me/${client.phone}`, "_blank")
            }
            className="mb-1 ml-2 h-5 w-5"
          >
            <ChatBubbleOvalLeftIcon />
          </button>
        </p>
        <p className="flex items-center">
          <strong>Email:</strong> {client.email}
          <button
            onClick={() => window.open(`mailto:${client.email}`, "_blank")}
            className="mb-1 ml-2 h-5 w-5"
          >
            <EnvelopeIcon />
          </button>
        </p>
        <p>
          <strong>Detalle:</strong> {client.detail}
        </p>
        <p>
          <strong>Vehículos:</strong> {vehiclesList}
        </p>
        <p>
          <strong>Cliente creado por:</strong> {client.createdBy}
        </p>
      </div>
    </div>
  );
};

export default ClientDetail;
