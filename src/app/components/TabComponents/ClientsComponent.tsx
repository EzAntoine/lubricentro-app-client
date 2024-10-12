import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import CreateClientForm from "../Forms/CreateClientForm";

interface Client {
  _id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  detail: string;
}

interface ClientsComponentProps {
  data: Client[];
}

const ClientsComponent: React.FC<ClientsComponentProps> = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    const response = await fetch("http://localhost:3001/clients");
    const data = await response.json();
    setClients(data);
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
          <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-2">
            <h1 className="text-xl font-bold p-2">Clientes</h1>
            <button
              onClick={clickHandler}
              className="px-4 py-2 text-sm font-medium text-white bg-[#1a7742] rounded hover:bg-[#72241d]"
            >
              Nuevo Cliente
            </button>
            <input
              type="text"
              placeholder="Buscar..."
              className="p-2 rounded"
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
              <tbody className="bg-gray-400 bg-opacity-20 divide-y divide-gray-200">
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
