export default function LoginForm() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-96">
        <p className="mb-4 text-center">Ingrese usuario y contraseña</p>
        <form>
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
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
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
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
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
