"use client";
import { useState, useEffect } from "react";
import NavbarAdmin from "./NavbarAdmin";
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
      <NavbarAdmin />
      <div className="flex flex-grow mt-14">
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
        <main className="flex-grow p-4">
          {/* <h1 className="text-xl font-bold">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1> */}
          {/* <ul>
            {data.map((item) => (
              <li key={item._id} className="border-b py-2">
                {item.username}
              </li>
            ))}
          </ul> */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  {" "}
                    Username
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-400 bg-opacity-20 divide-y divide-gray-200">
              {data.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.username}
                  </td>{" "}
                   
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
