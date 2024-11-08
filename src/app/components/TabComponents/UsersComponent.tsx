import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { URL } from "../../../../config/consts";
import CreateUserForm from "../Forms/CreateUserForm";

interface User {
  _id: string;
  username: string;
}

const UsersComponent = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    await fetch(`${URL}/users`, {
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
        setUsers(data.data);
      })
      .catch((error) => {
        swal("Error al obtener clientes", "", "error");
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const clickHandler = (e) => {
    setFormOpen(true);
  };

  return (
    <>
      {formOpen ? (
        <CreateUserForm setFormOpen={setFormOpen} fetchUsers={fetchUsers} />
      ) : (
        <div>
          <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-1 -mt-1">
            <h1 className="text-xl font-bold p-2">Usuarios</h1>
            <button
              onClick={clickHandler}
              className="px-4 py-1.5 text-sm font-medium text-white bg-[#1a7742] border border-gray-300 shadow-sm rounded hover:bg-[#72241d]"
            >
              Nuevo Usuario
            </button>
            <div></div>
          </div>
          {users.length === 0 ? (
            <p className="py-6 text-lg bg-[#2d2c2d] bg-opacity-80 text-center">
              No hay usuarios disponibles.
            </p>
          ) : (
            <div className="overflow-y-auto max-h-[570px]">
              <table className="w-full h-full divide-y divide-gray-200 bg-[#2d2c2d] bg-opacity-80">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 min-h-screen">
                  {users.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.username}
                      </td>
                      <td className="flex justify-end mx-auto mr-4">
                        {/*  <button className="mt-2 p-2 text-sm font-medium rounded bg-gray-50 text-black hover:bg-[#1a7742] hover:text-white">
                          <PencilSquareIcon className="w-5 h-5" />
                        </button>
                        <button className="mt-2 ml-2 p-2 text-sm font-medium rounded bg-gray-50 text-black hover:bg-[#72241d] hover:text-white">
                          <TrashIcon className="w-5 h-5" />
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UsersComponent;
