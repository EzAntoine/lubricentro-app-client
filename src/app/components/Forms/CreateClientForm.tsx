import { useState } from "react";

export default function CreateClientForm() {
  const [newClient, setNewClient] = useState({
    name: "",
    surname: "",
    dni: "",
    email: "",
    phone: "",
    detail: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    /**fetch(`http://localhost:3001/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((json) => {
        if (json.access_token) {
          setToken(json.access_token);
          localStorage.setItem("userToken", json.access_token);
        }
      })
      .catch((error) => {
        swal(
          "Credenciales incorrectas!",
          "Por favor intente nuevamente.",
          "error"
        );
        setUserData({ username: "", password: "" });
      });
	  **/
  };

  return (
    <div className="-mt-10 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-[#2d2c2d] bg-opacity-100 p-6 rounded-lg shadow-md w-96">
        <div className="flex flex-col items-center justify-center">
          <p className="mb-2 text-center">NUEVO CLIENTE</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={inputHandler}
              value={newClient.name}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="surname"
              className="block text-sm font-medium text-gray-300"
            >
              Apellido:
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              required
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={inputHandler}
              value={newClient.surname}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="dni"
              className="block text-sm font-medium text-gray-300"
            >
              DNI:
            </label>
            <input
              type="number"
              id="dni"
              name="dni"
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={inputHandler}
              value={newClient.dni}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-300"
            >
              Telefono:
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              required
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={inputHandler}
              value={newClient.phone}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={inputHandler}
              value={newClient.email}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="detail"
              className="block text-sm font-medium text-gray-300"
            >
              Detalles:
            </label>
            <input
              type="detail"
              id="detail"
              name="detail"
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={inputHandler}
              value={newClient.detail}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            >
              Crear cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
