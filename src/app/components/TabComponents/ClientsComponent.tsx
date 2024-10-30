import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import CreateClientForm from "../Forms/CreateClientForm";
import { URL } from "../../../../config/consts";
import SortButton from "../Buttons/SortButton";
import SearchBar from "../Buttons/SearchBar";
import search from "../resources/SearchFunctions";
import ClientDetail from "../Details/ClientDetail";
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
  const [clientsFiltered, setClientsFiltered] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>();

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
        setClientsFiltered(data.data);
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

  const handleSort = (option: string) => {
    if (option === "az") {
      const sortedClients = [...clientsFiltered].sort((a, b) =>
        a.surname.toLowerCase().localeCompare(b.surname.toLowerCase())
      );
      setClientsFiltered(sortedClients);
    } else {
      fetchClients();
    }
  };

  const onSearch = (searchText: string) => {
    search(searchText, clients, setClientsFiltered);
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
          <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-1 -mt-1">
            <h1 className="text-xl font-bold p-2">Clientes</h1>
            <button
              onClick={clickHandler}
              className="px-4 py-1.5 text-sm font-medium text-white bg-[#1a7742] rounded hover:bg-[#72241d]"
            >
              Nuevo Cliente
            </button>
            <div className="flex items-center">
              <div className="mr-4 rounded">
                <SortButton onSort={handleSort} />
              </div>
              <SearchBar onSearch={onSearch} />
            </div>
          </div>
          {clientsFiltered.length === 0 ? (
            <p className="py-6 text-lg bg-[#2d2c2d] bg-opacity-80 text-center">
              No hay clientes disponibles.
            </p>
          ) : (
            <div className="overflow-y-auto max-h-[570px]">
              <table className="w-full h-full divide-y divide-gray-200 bg-[#2d2c2d] bg-opacity-80">
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
                <tbody className="divide-y divide-gray-200 min-h-screen">
                  {clientsFiltered.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.surname + " " + item.name}
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
                        <button
                          className="mt-2 p-2 text-sm font-medium rounded bg-gray-50 text-black hover:bg-[#1a7742] hover:text-white"
                          onClick={() => setSelectedClient(item)}
                        >
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
            </div>
          )}
        </div>
      )}
      {selectedClient && (
        <ClientDetail
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </>
  );
};
export default ClientsComponent;
