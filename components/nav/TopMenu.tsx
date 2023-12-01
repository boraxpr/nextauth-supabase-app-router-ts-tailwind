"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU = [
  {
    name: "Quotations",
    path: "quotations",
  },
  {
    name: "Projects",
    path: "projects",
  },
];

export default function TopMenu() {
  const pathName = usePathname();
  return (
    <div className="h-full flex">
      {MENU.map((item) => (
        <Link
          key={item.name}
          href={`/${item.path}`}
          className={cn(
            "hover:bg-white flex justify-center items-center px-2 text-white font-medium text-sm hover:text-primary pt-[3px]",
            pathName.startsWith(`/${item.path}`) &&
              "border-white border-b-[3px]"
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
