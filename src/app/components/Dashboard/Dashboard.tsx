"use client";
import { useState, useEffect } from "react";
import NavbarAdmin from "./NavbarAdmin";
import Sidebar from "./SidebarAdmin";
import OrdersComponent from "../TabComponents/OrdersComponent";
import ClientsComponent from "../TabComponents/ClientsComponent";
import UsersComponent from "../TabComponents/UsersComponent";
import VehiclesComponent from "../TabComponents/VehiclesComponent";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/${activeTab}`);
      const result = await response.json();

      console.log(result);
      setData(result);
    };

    fetchData();
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersComponent data={data} />;
      case "clients":
        return <ClientsComponent data={data} />;
      case "users":
        return <UsersComponent data={data} />;
      case "vehicles":
        return <VehiclesComponent data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <NavbarAdmin />
      <div className="flex flex-grow mt-14">
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
        <main className="flex-grow py-2">
          <div className="bg-gray-400 bg-opacity-20 divide-y divide-gray-200">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
