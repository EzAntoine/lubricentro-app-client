import { URL } from "../../../../config/consts";

const EditClientForm = ({
  setIsEditing,
  editedClient,
  setEditedClient,
  setActualClient,
  fetchClients,
}) => {
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedClient({ ...editedClient, [name]: value });
  };

  const handleSave = async () => {
    await fetch(`${URL}/clients/${editedClient._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(editedClient),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al modificar cliente");
        }
        fetchClients();
        setActualClient(editedClient);
        swal("Cliente modificado correctamente!", "", "success");
      })
      .catch((error) => {
        swal(
          "Error al modificar el cliente",
          "Por favor intente nuevamente.",
          "error"
        );
      });
    setIsEditing(false);
  };

  return (
    <div>
      <div>
        <label className="block mb-2">
          Nombre:
          <input
            type="text"
            name="name"
            value={editedClient.name}
            onChange={handleEditChange}
            className="border p-1 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Apellido:
          <input
            type="text"
            name="surname"
            value={editedClient.surname}
            onChange={handleEditChange}
            className="border p-1 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          DNI:
          <input
            type="text"
            name="dni"
            value={editedClient.dni}
            onChange={handleEditChange}
            className="border p-1 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Teléfono:
          <input
            type="text"
            name="phone"
            value={editedClient.phone}
            onChange={handleEditChange}
            className="border p-1 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={editedClient.email}
            onChange={handleEditChange}
            className="border p-1 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Detalle:
          <textarea
            name="detail"
            value={editedClient.detail}
            onChange={handleEditChange}
            className="border p-1 rounded w-full"
          />
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

export default EditClientForm;
