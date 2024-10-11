import { useState } from "react";

interface LoginFormProps {
  token: string | null;
  setToken: (token: string | null) => void;
}
export default function LoginForm({ token, setToken }: LoginFormProps) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.access_token) {
          setToken(json.access_token);
          localStorage.setItem("userToken", json.access_token);
        }
      })
      .catch((error) => console.log("Error: " + error));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-96">
        <p className="mb-4 text-center">Ingrese usuario y contraseña</p>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={inputHandler}
              value={userData.username}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={inputHandler}
              value={userData.password}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
