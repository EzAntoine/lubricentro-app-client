import React from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
interface Order {
  _id: string;
  date: Date;
  estimatedSolution: string;
  vehiclePlate: string;
  clientName: string;
}

interface OrdersComponentProps {
  data: Order[];
}

const OrdersComponent: React.FC<OrdersComponentProps> = ({ data }) => {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <h1 className="text-xl font-bold p-2">Órdenes</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-[#1a7742] rounded hover:bg-[#72241d]">
          Nueva Orden
        </button>
        <input type="text" placeholder="Buscar..." className="p-2 rounded" />
      </div>
      {data.length === 0 ? (
        <p>No hay órdenes disponibles.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Placa del Vehículo
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Solución Estimada
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Nombre del Cliente
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-gray-400 bg-opacity-20 divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.vehiclePlate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* item.estimatedSolution */ "Cambio de aceite"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* item.clientName */ "Fernando Chiappe"}
                </td>
                <td className="flex justify-end mx-auto mr-4">
                  <button className="mt-2 p-2 text-sm font-medium rounded bg-gray-50 text-black hover:bg-[#1a7742] hover:text-white">
                    <EyeIcon className="w-5 h-5" />
                  </button>
                  <button className="mt-2 ml-2 p-2 text-sm font-medium rounded bg-gray-50 text-black hover:bg-[#1a7742] hover:text-white">
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersComponent;
