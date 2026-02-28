"use client";

import {
  Bed,
  Bell,
  DollarSign,
  HandCoins,
  House,
  Info,
  Mail,
  Menu,
  Settings,
  ShoppingCart,
  TicketPercent,
  Users,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

/* ================= ICON MAP ================= */
const ICONS = {
  House,
  DollarSign,
  Settings,
  TicketPercent,
  HandCoins,
  ShoppingCart,
  Utensils,
  Mail,
  Users,
  Bell,
  Info,
  Bed
};

type SidebarItem = {
  name: string;
  href: string;
  icon: keyof typeof ICONS;
};

/* ================= SIDEBAR DATA ================= */
const sidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "House",
  },
  {
    name: "Offer",
    href: "/offers",
    icon: "TicketPercent",
  },
  {
    name: "Facilities",
    href: "/facilities",
    icon: "HandCoins",
  },
   {
    name: "Room Type",
    href: "/roomType",
    icon: "Bed",
  },
  {
    name: "Room",
    href: "/room",
    icon: "Bed",
  },
   {
    name: "Dining",
    href: "/dining",
    icon: "Utensils",
  },
  {
    name: "Clients",
    href: "/clients",
    icon: "Users",
  },
  {
    name: "Sales",
    href: "/sales",
    icon: "DollarSign",
  },
  {
    name: "Users",
    href: "/user",
    icon: "Users",
  },
  {
    name: "Messages",
    href: "/message",
    icon: "Mail",
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: "Bell",
  },
  {
    name: "Help",
    href: "/help",
    icon: "Info",
  },
];

/* ================= SIDEBAR COMPONENT ================= */
export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-screen bg-[#1e1e1e] p-4 flex flex-col border-r border-[#2f2f2f] overflow-y-auto">
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-[#2f2f2f] transition-colors max-w-fit"
        >
          <Menu size={24} />
        </button>

        {/* Navigation */}
        <nav className="mt-8 flex-grow">
          {sidebarItems.map((item) => {
            const IconComponent = ICONS[item.icon];
            const isActive = pathname === item.href;

            return (
              <Link key={item.name} href={`/Admin/${item.href}`}>
                <div
                  className={`flex items-center p-4 text-sm font-medium rounded-lg 
                  hover:bg-[#2f2f2f] transition-colors mb-2
                  ${isActive ? "bg-[#2f2f2f]" : ""}`}
                >
                  <IconComponent size={20} className="min-w-[20px]" />
                  {isSidebarOpen && (
                    <span className="ml-4 whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
