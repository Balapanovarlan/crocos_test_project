import { SidebarProps } from "@/app/types/types";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SidebarMain({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-105 bg-white text-text-gray/87 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative text-5 text-text-gray/87 uppercase font-medium">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5"
          >
            <X />
          </button>

          <div className="flex flex-col items-center gap-13.5">
            <nav className="flex flex-col items-center justify-center  pt-40.25">
              <Link
                href="/"
                className="flex w-full justify-center py-8 px-34.75 border-b-1 border-t-1 border-text-gray/10 hover:bg-text-gray/10 transition-colors ease-in-out"
              >
                Home
              </Link>
              <Link
                href="/#new"
                className="flex w-full justify-center py-8 px-34.75 border-b-1  border-text-gray/10  hover:bg-text-gray/10 transition-colors ease-in-out"
              >
                New
              </Link>
              <Link
                href="/#about"
                className="flex w-full justify-center py-8 px-34.75 border-b-1  border-text-gray/10  hover:bg-text-gray/10 transition-colors ease-in-out"
              >
                About Us
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
