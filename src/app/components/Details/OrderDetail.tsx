import {
  XMarkIcon,
  ChatBubbleOvalLeftIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import EditOrderForm from "../Forms/EditOrderForm";

const OrderDetail = ({ order, onClose, fetchOrders }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState(order);
  const [actualOrder, setActualOrder] = useState(order);

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
        <h2 className="text-xl font-bold -mt-4 mb-4">Orden de trabajo</h2>

        {isEditing ? (
          <EditOrderForm
            setIsEditing={setIsEditing}
            editedOrder={editedOrder}
            setEditedOrder={setEditedOrder}
            setActualOrder={setActualOrder}
            fetchOrders={fetchOrders}
          />
        ) : (
          <>
            <p>
              <strong>Fecha de ingreso:</strong>{" "}
              {new Date(actualOrder.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Cliente:</strong> {actualOrder.clientName}
            </p>
            <p className="flex items-center">
              <strong>Telefono:</strong> {actualOrder.clientPhone}
              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/${actualOrder.clientPhone}`,
                    "_blank"
                  )
                }
                className="mb-1 ml-2 h-5 w-5"
              >
                <ChatBubbleOvalLeftIcon />
              </button>
            </p>
            <p>
              <strong>Patente:</strong> {actualOrder.vehiclePlate}
            </p>
            <p>
              <strong>Marca y modelo:</strong>{" "}
              {/* actualOrder.vehicle.modelAndBrand */ "Marca y modelo"}
            </p>
            <p>
              <strong>Falla:</strong> {actualOrder.failure}
            </p>
            <p>
              <strong>Solucion estimada:</strong> {actualOrder.estimateSolution}
            </p>
            <p>
              <strong>Presupuesto:</strong> ${actualOrder.price}
            </p>
            <p>
              <strong>Observaciones:</strong> {actualOrder.observations}
            </p>
            <p>
              <strong>Estado:</strong> {actualOrder.status}
            </p>
            <p>
              <strong>Orden creada por:</strong> {actualOrder.createdBy}
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

export default OrderDetail;
