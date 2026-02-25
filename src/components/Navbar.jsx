import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "@/theme/ThemeProvider";
import { Moon, Sun, ChevronDown } from "lucide-react";
import logo from "/favicon.png";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b dark:bg-slate-900/70 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-0">
          <img
            src={logo}
            className="h-14 w-14"
            alt="TrustLedgerLabs"
          />
          <span className="font-bold text-3xl text-slate-900 dark:text-slate-100">
            TrustLedgerLabs
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">

          {/* About */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-xl font-semibold transition ${
                isActive
                  ? "bg-slate-700 hover:bg-slate-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-emerald-400"
              }`
            }
          >
            About
          </NavLink>

          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="px-4 py-2 rounded-md text-xl font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-emerald-400 flex items-center gap-1"
            >
              Products <ChevronDown size={18} />
            </button>

            {open && (
              <div className="absolute top-full mt-3 w-56 rounded-lg bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 py-2">
                <Link
                  to="/products/blockchain"
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 text-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Blockchain Solutions
                </Link>
                <Link
                  to="/products/ai"
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 text-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  AI Platform
                </Link>
                <Link
                  to="/products/consulting"
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 text-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Consulting
                </Link>
              </div>
            )}
          </div>

          {/* Blog */}
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-xl font-semibold transition ${
                isActive
                  ? "bg-slate-700 hover:bg-slate-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-emerald-400"
              }`
            }
          >
            Blog
          </NavLink>

          {/* Job Opening */}
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-xl font-semibold transition ${
                isActive
                  ? "bg-slate-700 hover:bg-slate-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-emerald-400"
              }`
            }
          >
            Job Opening
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Contact Button */}
          <Link
            to="/contact"
            className="hidden sm:inline-flex px-6 py-3 rounded-lg text-xl font-semibold bg-slate-700 hover:bg-slate-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-sm transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
