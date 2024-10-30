import { useEffect, useState } from "react";
import { URL } from "../../../../config/consts";

export default function CreateUserForm({ setFormOpen, fetchUsers }) {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(`${URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al crear nuevo cliente");
        }
        setNewUser({
          username: "",
          password: "",
        });
        swal("Usuario creado correctamente!", "", "success");
        fetchUsers();
        setFormOpen(false);
      })
      .catch((error) => {
        swal(
          "Error al crear nuevo usuario",
          "Por favor intente nuevamente.",
          "error"
        );
      });
  };

  const cancelHandler = () => {
    setFormOpen(false);
  };

  const onEscClose = (e) => {
    if (e.key === "Escape") {
      cancelHandler();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onEscClose);
    return () => document.removeEventListener("keydown", onEscClose);
  }, []);

  return (
    <div className="-mt-10 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-[#2d2c2d] bg-opacity-100 p-6 rounded-lg shadow-md w-96">
        <div className="flex flex-col items-center justify-center">
          <p className="mb-2 text-center">NUEVO CLIENTE</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="mb-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Usuario:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={inputHandler}
              value={newUser.username}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="surname"
              className="block text-sm font-medium text-gray-300"
            >
              Contraseña:
            </label>
            <input
              type="password"
              id="pasword"
              name="password"
              required
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={inputHandler}
              value={newUser.password}
            />
          </div>

          <div className="flex">
            <button
              type="button"
              className="w-full m-2 py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-200"
              onClick={cancelHandler}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full m-2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            >
              Crear usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
