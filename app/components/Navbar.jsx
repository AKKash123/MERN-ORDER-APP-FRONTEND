"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contacts" },
    { name: "Login", href: "/login" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Wollen<span className="text-pink-500">Designs</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-700"
                } hover:text-indigo-500 transition`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* ✅ Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-indigo-600 focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <span className="text-3xl">&times;</span>  
          ) : (
            <span className="text-3xl">&#9776;</span>   
          )}
        </button>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 text-gray-700 hover:bg-indigo-100"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
