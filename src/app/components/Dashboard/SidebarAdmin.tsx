export default function Sidebar({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  return (
    <aside className="w-64 bg-[#2d2c2d] bg-opacity-100 h-full p-4">
      <ul>
        {/* <li
          onClick={() => setActiveTab("ordenes")}
          className="cursor-pointer p-2 hover:bg-gray-300"
        >
          Ordenes
        </li>
        <li
          onClick={() => setActiveTab("productos")}
          className="cursor-pointer p-2 hover:bg-gray-300"
        >
          Productos
        </li>
        <li
          onClick={() => setActiveTab("clientes")}
          className="cursor-pointer p-2 hover:bg-gray-300"
        >
          Clientes
        </li> */}
        <li
          onClick={() => setActiveTab("users")}
          className="cursor-pointer p-2 hover:bg-gray-300"
        >
          Usuarios
        </li>
      </ul>
    </aside>
  );
}
