"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface DropdownMenuProps {
  items: { label: string; href: string }[];
}

export default function DropdownMenu({ items }: DropdownMenuProps) {
  const pathname = usePathname();

  return (
    <div className="absolute top-10 left-0 mt-1 w-[240px] bg-[#F8f9ff] shadow-xl    opacity-0 invisible
  group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-5">
      <ul className="flex flex-col p-2">
        {items.map((item, idx) => {
          const isActive = pathname === item.href;

          return (
            <li key={idx}>
              <Link
                href={item.href}
                className={`
                  block pl-5 py-3 transition-colors hover:text-[#a18348] opacity-80
                  ${isActive ? "text-[#a18348] " : ""}
                `}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
