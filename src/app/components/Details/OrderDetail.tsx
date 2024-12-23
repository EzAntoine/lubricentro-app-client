import {
  XMarkIcon,
  ChatBubbleOvalLeftIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { act, useEffect, useState } from "react";
import EditOrderForm from "../Forms/EditOrderForm";
import { URL } from "../../../../config/consts";

const OrderDetail = ({ order, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState(order);
  const [actualOrder, setActualOrder] = useState(order);
  const [actualVehicle, setActualVehicle] = useState({
    plate: "",
    brand: "",
    modelo: "",
    engine: "",
    kilometers: "",
    year: "",
    details: "",
  });

  useEffect(() => {
    const fetchActualOrder = async () => {
      await fetch(`${URL}/orders/${order._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error(
              `Error al obtener Orden con ID: ${actualOrder._id}`
            );
          }
          const data = await res.json();

          setActualOrder(data.data[0]);
        })
        .catch((error) => {
          console.log(
            `Error al obtener Orden con ID: ${actualOrder._id} - ${error.message}`
          );
        });
    };
    fetchActualOrder();
  }, [actualOrder.status]);

  useEffect(() => {
    const fetchVehicle = async () => {
      await fetch(`${URL}/vehicles/plate/${order.vehiclePlate}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error(
              "Error al obtener vehículo con dominio: " +
                actualOrder.vehiclePlate
            );
          }
          const data = await res.json();
          setActualVehicle(data.data);
        })
        .catch((error) => {
          console.log("Error al obtener vehiculo de orden: " + error.message);
        });
    };
    fetchVehicle();
  }, [actualOrder.vehiclePlate]);

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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-gray-200 text-black rounded-lg p-6 relative">
        <button onClick={onClose}>
          <XMarkIcon className="absolute top-2 right-2 h-6 w-6 text-gray-500 hover:text-gray-800" />
        </button>
        <h2 className="text-xl font-bold -mt-4 mb-4 underline">
          Orden de trabajo Nº {actualOrder.number}
        </h2>

        {isEditing ? (
          <EditOrderForm
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editedOrder={editedOrder}
            setEditedOrder={setEditedOrder}
            actualOrder={actualOrder}
            setActualOrder={setActualOrder}
            actualVehicle={actualVehicle}
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
              {actualVehicle.brand + " " + actualVehicle.modelo}
            </p>
            <p>
              <strong>Kilómetros:</strong> {actualVehicle.kilometers + " km."}
            </p>
            <p>
              <strong>Motor:</strong> {actualVehicle.engine}
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
            {order.status !== "Retirado" && order.status !== "Terminado" && (
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
                className="flex mt-2 p-2 text-sm font-medium rounded bg-green-600 text-white hover:bg-[#1a7742] hover:text-white"
              >
                Editar
                <PencilSquareIcon className="ml-1 w-5 h-5" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
