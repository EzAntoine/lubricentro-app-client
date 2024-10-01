import React from "react";

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
      <h1 className="text-xl font-bold mb-2 px-4 py-2">Órdenes</h1>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersComponent;
