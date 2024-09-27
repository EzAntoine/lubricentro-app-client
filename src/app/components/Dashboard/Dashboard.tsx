"use client";
import { useState, useEffect } from "react";
import Navbar from "./NavbarAdmin";
import Sidebar from "./SidebarAdmin";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("users");
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

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar setActiveTab={setActiveTab} />
        <main className="flex-grow p-4">
          <h1 className="text-xl font-bold">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <ul>
            {data.map((item) => (
              <li key={item.id} className="border-b py-2">
                {item.name}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
