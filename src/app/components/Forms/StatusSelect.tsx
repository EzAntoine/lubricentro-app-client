import React, { useState } from "react";
import { URL } from "../../../../config/consts";

const StatusSelect = ({ order }) => {
  const [status, setStatus] = useState(order.status);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;

    swal({
      title: "¿Estás seguro?",
      text: `¿Deseas cambiar el estado a "${newStatus}"?`,
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancelar",
          value: null,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: "Sí, cambiar",
          value: true,
          visible: true,
          closeModal: true,
        },
      },
      dangerMode: true,
    }).then((confirmChange) => {
      if (confirmChange) {
        setStatus(newStatus);
        updateStatus(order._id, newStatus);
      } else {
        event.target.value = status;
      }
    });
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${URL}/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el estado");
      }
      swal("Estado actualizado correctamente!", "", "success");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <select
      id="status"
      name="status"
      value={status}
      onChange={handleStatusChange}
      className="mt-2 px-1 py-1 text-sm font-medium text-black bg-gray-50 border border-gray-300 rounded"
    >
      <option key={status} value={status}>
        {status}
      </option>
      {status !== "Pendiente" && <option value="Pendiente">Pendiente</option>}
      {status !== "Realizado" && <option value="Realizado">Realizado</option>}
      {status !== "Retirado" && <option value="Retirado">Retirado</option>}
      {status !== "Demorado" && <option value="Demorado">Demorado</option>}
    </select>
  );
};

export default StatusSelect;
