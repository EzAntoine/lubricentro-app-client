import { LoginFormProps } from "@/types/types";
import LogoNav from "../../../../public/images/logo200px.png";
import swal from "sweetalert";
import Image from "next/image";
import { LOGIN_URL } from "../../../../config/consts";

export default function LoginForm({
  token,
  setToken,
  userData,
  setUserData,
}: LoginFormProps) {
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(`${LOGIN_URL}`, {
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
          localStorage.setItem("username", userData.username);
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
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-[#2d2c2d] bg-opacity-100 p-6 rounded-lg shadow-md w-96">
        <div className="flex flex-col items-center justify-center">
          <Image src={LogoNav} alt="Lubricentro Maceratesi" priority />
          <p className="mt-2 mb-4 text-center">Ingrese usuario y contraseña</p>
        </div>
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
