"use client";
import { useState, useEffect } from "react";
import NavbarAdmin from "./NavbarAdmin";
import Sidebar from "./SidebarAdmin";
import OrdersComponent from "../TabComponents/OrdersComponent";
import ClientsComponent from "../TabComponents/ClientsComponent";
import UsersComponent from "../TabComponents/UsersComponent";
import VehiclesComponent from "../TabComponents/VehiclesComponent";
import { LoginFormProps } from "@/types/types";

export default function Dashboard({
  setToken,
  userData,
  setUserData,
}: LoginFormProps) {
  const [activeTab, setActiveTab] = useState("orders");
  const [data, setData] = useState([]);

  /**useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/${activeTab}`);
      const result = await response.json();

      setData(result);
    };

    fetchData();
  }, [activeTab]);**/

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersComponent data={data} />;
      case "clients":
        return <ClientsComponent />;
      case "users":
        return <UsersComponent data={data} />;
      case "vehicles":
        return <VehiclesComponent data={data} />;
      default:
        return null;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    setUserData({
      username: "",
      password: "",
    });
  };

  return (
    <div className="bg-hero-image min-h-screen bg-cover bg-center bg-fixed bg-opacity-90">
      <NavbarAdmin logout={logout} />
      <div className="flex flex-grow mt-14">
        <div className="mt-14 fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-10;">
          <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>
        <main className="ml-64 h-screen flex-grow py-2 mb-2 min-h-screen">
          <div className="bg-gray-400 bg-opacity-20 divide-y divide-gray-200">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
