import { useEffect } from "react";
import { URL } from "../../../../config/consts";

const EditOrderForm = ({
  isEditing,
  setIsEditing,
  editedOrder,
  setEditedOrder,
  actualOrder,
  setActualOrder,
  fetchOrders,
  actualVehicle,
}) => {
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder({ ...editedOrder, [name]: value });
  };

  const handleSave = async () => {
    await fetch(`${URL}/orders/${editedOrder._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(editedOrder),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al modificar orden");
        }
        fetchOrders();
        setActualOrder(editedOrder);
        swal("Orden modificada correctamente!", "", "success");
      })
      .catch((error) => {
        swal(
          "Error al modificar la orden",
          "Por favor intente nuevamente.",
          "error"
        );
      });
    setIsEditing(false);
  };

  useEffect(() => {
    const onEscClose = (e) => {
      if (e.key === "Escape") {
        if (isEditing) {
          setIsEditing(false);
        }
      } else if (e.key === "Enter" || e.keyCode === 13 || e.keyCode === 108) {
        handleSave();
      }
    };
    if (isEditing) {
      document.addEventListener("keydown", onEscClose);
    }
    return () => document.removeEventListener("keydown", onEscClose);
  }, [isEditing]);

  return (
    <div>
      <div className="grid grid-cols-2 w-full">
        <label className="block mb-2">
          <strong>Fecha de ingreso: </strong>
          {new Date(actualOrder.date).toLocaleDateString()}
        </label>
        <label className="block mb-2">
          <strong>Cliente: </strong>
          {actualOrder.clientName}
        </label>
        <label className="block mb-2">
          <strong>Patente: </strong>
          {actualOrder.vehiclePlate}
        </label>
        <label className="block mb-2">
          <strong>Marca y modelo: </strong>
          {actualVehicle.brand +
            " " +
            actualVehicle.modelo +
            " " +
            actualVehicle.year}
        </label>
        <label className="block mb-2 mr-2">
          <strong>Teléfono: </strong>
          <p>+54 - {editedOrder.clientPhone}</p>
        </label>
        <label className="block mb-2">
          <strong>Presupuesto: </strong>
          <input
            type="number"
            name="price"
            value={editedOrder.price}
            onChange={handleEditChange}
            className="border p-1 rounded w-full"
          />
        </label>
        <label className="block mb-2 mr-2">
          <strong>Solución estimada: </strong>
          <textarea
            name="estimateSolution"
            value={editedOrder.estimateSolution}
            onChange={handleEditChange}
            className="border p-1 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          <strong>Falla:</strong>
          <textarea
            name="failure"
            value={editedOrder.failure}
            onChange={handleEditChange}
            className="border p-1 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          <strong>Estado: </strong>
          {actualOrder.status}
        </label>
        <label className="block mb-2">
          <strong>Observaciones: </strong>
          <textarea
            name="observations"
            value={editedOrder.observations}
            onChange={handleEditChange}
            className="border p-1 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          <strong>Orden creada por: </strong>
          {actualOrder.createdBy}
        </label>
      </div>
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
    </div>
  );
};

export default EditOrderForm;
