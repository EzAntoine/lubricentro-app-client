interface SidebarProps {
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab, activeTab }) => {
  return (
    <aside className="w-64 bg-[#2d2c2d] bg-opacity-100 h-full p-4">
      <ul>
        <li
          onClick={() => setActiveTab("orders")}
          className={`cursor-pointer p-2 rounded-sm ${
            activeTab === "orders" ? "bg-gray-700" : "hover:bg-gray-600"
          }`}
        >
          Ordenes
        </li>
        {/* <li
          onClick={() => setActiveTab("products")}
          className={`cursor-pointer p-2 rounded-sm ${
            activeTab === "products" ? "bg-gray-700" : "hover:bg-gray-600"
          }`}
        >
          Productos
        </li> */}
        <li
          onClick={() => setActiveTab("clients")}
          className={`cursor-pointer p-2 rounded-sm ${
            activeTab === "clientes" ? "bg-gray-700" : "hover:bg-gray-600"
          }`}
        >
          Clientes
        </li>
        <li
          onClick={() => setActiveTab("vehicles")}
          className={`cursor-pointer p-2 rounded-sm ${
            activeTab === "vehicles" ? "bg-gray-700" : "hover:bg-gray-600"
          }`}
        >
          Vehiculos
        </li>
        <li
          onClick={() => setActiveTab("users")}
          className={`cursor-pointer p-2 rounded-sm ${
            activeTab === "users" ? "bg-gray-700" : "hover:bg-gray-600"
          }`}
        >
          Usuarios
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
