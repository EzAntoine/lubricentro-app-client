import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import CreateClientForm from "../Forms/CreateClientForm";
import { URL } from "../../../../config/consts";
interface Client {
  _id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  detail: string;
}

const ClientsComponent = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const fetchClients = async () => {
    await fetch(`${URL}/clients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Error al obtener clientes");
        }
        const data = await response.json();
        setClients(data.data);
      })
      .catch((error) => {
        swal("Error al obtener clientes", "", "error");
      });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const clickHandler = (e) => {
    setFormOpen(true);
  };

  return (
    <>
      {formOpen ? (
        <CreateClientForm
          setFormOpen={setFormOpen}
          fetchClients={fetchClients}
        />
      ) : (
        <div>
          <div className="bg-[#2d2c2d] bg-opacity-90 flex flex-wrap items-center justify-between mx-auto px-4 py-1 -mt-1">
            <h1 className="text-xl font-bold p-2">Clientes</h1>
            <button
              onClick={clickHandler}
              className="px-4 py-1.5 text-sm font-medium text-white bg-[#1a7742] rounded hover:bg-[#72241d]"
            >
              Nuevo Cliente
            </button>
            <input
              type="text"
              placeholder="Buscar..."
              className="p-1 rounded"
            />
          </div>
          {clients.length === 0 ? (
            <p className="ml-4">No hay clientes disponibles.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Telefono
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Detalles
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-[#2d2c2d] bg-opacity-90 divide-y divide-gray-200 min-h-screen">
                {clients.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.name + " " + item.surname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.detail}
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
      )}
    </>
  );
};
export default ClientsComponent;
