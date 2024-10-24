import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

const OrderDetail = ({ order, onClose }) => {
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
        <h2 className="text-lg font-bold -mt-4 mb-4">
          Orden de trabajo Nº XXXX
        </h2>
        <p>
          <strong>Fecha de ingreso:</strong>{" "}
          {new Date(order.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Cliente:</strong> {order.clientName}
        </p>
        <p>
          <strong>Telefono:</strong> {/* order.clientPhone */ "+54291111111"}
        </p>
        <p>
          <strong>Patente:</strong> {order.vehiclePlate}
        </p>
        <p>
          <strong>Marca y modelo:</strong>{" "}
          {/* order.vehicle.modelAndBrand */ "Marca y modelo"}
        </p>
        <p>
          <strong>Falla:</strong> {order.failure}
        </p>
        <p>
          <strong>Solucion estimada:</strong> {order.estimateSolution}
        </p>
        <p>
          <strong>Presupuesto:</strong> ${order.price}
        </p>
        <p>
          <strong>Estado:</strong> {order.status}
        </p>
        <p>
          <strong>Observaciones:</strong> {order.observations}
        </p>
      </div>
    </div>
  );
};

export default OrderDetail;
