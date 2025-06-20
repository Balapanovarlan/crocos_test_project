import Image from "next/image";
import burgerMenuIcon from "@/public/icons/burger_menu.svg";
import logo from "@/public/icons/logo.svg";
import { ShoppingBagIcon, User } from "lucide-react";
import { HeaderProps } from "@/app/types/types";
import Link from "next/link";

export const Header = ({ setIsOpen }: HeaderProps) => {
  return (
    <header className="py-7 px-4.5 relative">
      <div className="flex items-center justify-between">
        <button onClick={() => setIsOpen(true)} className="cursor-pointer">
          <Image src={burgerMenuIcon} alt="Menu" />
        </button>
        <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
          <Image src={logo} alt="Logo" width={29} height={29} />
        </Link>
        <div className="flex items-center gap-1.5">
          <Link
            href="/cart"
            className="border-[7px] border-black rounded-full active:scale-105"
          >
            <div className="p-2.25 rounded-full text-xs hover:bg-black/50 hover:text-white">
              <ShoppingBagIcon width={14} height={14} />
            </div>
          </Link>
          <Link
            href=""
            className="bg-black p-[15px] text-white  rounded-full 
          hover:bg-black/50 transition-colors duration-100 ease-in-out 
            active:scale-105
          "
          >
            <User width={14} height={14} />
          </Link>
        </div>
      </div>
    </header>
  );
};
