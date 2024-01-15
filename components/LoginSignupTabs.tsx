"use client";
import { usePathname } from "next/navigation";

export default function LoginSignupTabs() {
  const pathname = usePathname();
  return (
    <div className="flex">
      <div
        className={`flex-1 px-4 py-2 rounded-t-lg text-center 
      ${
        pathname == "/login"
          ? "border shadow-lg bg-btn-background"
          : "bg-white text-black"
      } hover:bg-btn-background-hover`}
      >
        <a href="/login" className="w-full h-full block">
          Login
        </a>
      </div>
      <div
        className={`flex-1 px-4 py-2 rounded-t-lg text-center 
      ${
        pathname == "/signup"
          ? " border shadow-lg bg-btn-background"
          : "bg-white text-black"
      } hover:bg-btn-background-hover`}
      >
        <a href="/signup" className="w-full h-full block">
          Sign Up
        </a>
      </div>
    </div>
  );
}
