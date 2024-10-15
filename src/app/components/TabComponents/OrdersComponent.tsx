import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import CreateOrderForm from "../Forms/CreateOrderForm";
import { URL } from "../../../../config/consts";
interface Order {
  _id: string;
  date: Date;
  clientId: string;
  clientName: string;
  vehiclePlate: string;
  failure: string;
  estimatedSolution: string;
  price: number;
  status: string;
}

const OrdersComponent = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    await fetch(`${URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Error al obtener ordenes");
        }
        const data = await response.json();
        setOrders(data.data);
      })
      .catch((error) => {
        swal("Error al obtener ordenes", "", "error");
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const clickHandler = (e) => {
    setFormOpen(true);
  };

  return (
    <>
      {formOpen ? (
        <CreateOrderForm setFormOpen={setFormOpen} fetchOrders={fetchOrders} />
      ) : (
        <div>
          <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-1 -mt-1">
            <h1 className="text-xl font-bold p-2">Órdenes</h1>
            <button
              onClick={clickHandler}
              className="px-4 py-1.5 text-sm font-medium text-white bg-[#1a7742] rounded hover:bg-[#72241d]"
            >
              Nueva Orden
            </button>
            <input
              type="text"
              placeholder="Buscar..."
              className="p-1 rounded"
            />
          </div>
          {orders.length === 0 ? (
            <p className="py-6 text-lg bg-[#2d2c2d] bg-opacity-80 text-center">
              No hay ordenes disponibles.
            </p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Patente
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Falla
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Presupuesto
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-[#2d2c2d] bg-opacity-80 divide-y divide-gray-200 min-h-screen">
                {orders.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.clientId} {/* Buscar nombre de cliente. */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.vehiclePlate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.failure}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.price}
                    </td>
                    <td className="flex justify-end mx-auto mr-4">
                      <button className="mt-2 p-2 text-sm font-medium rounded bg-gray-50 text-black hover:bg-[#1a7742] hover:text-white">
                        Desplegable
                      </button>
                      <button className="mt-2 ml-2 p-2 text-sm font-medium rounded bg-gray-50 text-black hover:bg-[#1a7742] hover:text-white">
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
      )}
    </>
  );
};
export default OrdersComponent;
