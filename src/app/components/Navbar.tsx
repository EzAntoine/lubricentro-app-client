"use client";
import Link from "next/link";
import React, { useState } from "react";
//import NavLink from "./NavLink";
import Image from "next/image";
import MenuOverlay from "./MenuOverlay";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navLinks = [
  {
    title: "Sobre Nosotros",
    path: "#aboutus",
  },
  {
    title: "Servicios",
    path: "#services",
  },
  {
    title: "Contacto",
    path: "#contact",
  },
];

export default function NavBar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="">
      <div className="">
        <Link href={"/"} className="">
          <Image src={""} alt="Home" className="" />
        </Link>

        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-2 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
}
