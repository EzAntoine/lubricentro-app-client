import React from "react";

interface User {
  _id: string;
  username: string;
}

interface UsersComponentProps {
  data: User[];
}

const UsersComponent: React.FC<UsersComponentProps> = ({ data }) => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2 px-4 py-2">Usuarios</h1>
      {data.length === 0 ? (
        <p>No hay órdenes disponibles.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                Usuario
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-400 bg-opacity-20 divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersComponent;
