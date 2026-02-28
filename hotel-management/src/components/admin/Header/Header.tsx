"use client";

import { useAuth } from "@/src/context/AuthContext";
import { Bell, User, LogOut } from "lucide-react";
import Image from "next/image";
import { useState } from "react";


export const Header = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100">
          Dashboard
        </h1>

        <div className="flex items-center space-x-6">
          <Image
            src="/en.svg"
            alt="flag"
            width={25}
            height={18}
            className="cursor-pointer"
          />

          <Bell className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />

          {/* USER DROPDOWN */}
          <div className="relative">
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full border flex items-center justify-center">
                <User />
              </div>
              <span className="hidden sm:block text-gray-100 font-medium">
                {user?.name || "User"}
              </span>
            </div>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-[#2a2a2a] rounded-md shadow-lg border border-gray-700">
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-[#3a3a3a] flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
