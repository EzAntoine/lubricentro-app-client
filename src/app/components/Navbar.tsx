"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import Image from "next/image";
import MenuOverlay from "./MenuOverlay";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LogoNav from "../../../public/images/logo200px.png";

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
    <nav className="fixed top-0 right-0 left-0 z-10 bg-[#2d2c2d] bg-opacity-100">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="text-2xl md:text-2xl lg:text-3xl text-white font-semibold"
        >
          <Image src={LogoNav} alt="Home" className="" />
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
        <div className='menu hidden md:block md:w-auto" id="navbar"'>
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-9 mt-0 items-center">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="hover:text-gray-200 hover:underline hover:underline-offset-8 hover:decoration-2 hover:translate-y-0.5"
              >
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
}
