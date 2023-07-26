import Image from "next/image";
import React from "react";
import ClientOnly from "../client/ClientOnly";
import NavbarActions from "./NavbarActions";
import Link from "next/link";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="bg-gray-800">
      <div className="flex items-center justify-between h-16 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="flex items-center text-white hover:text-gray-300"
          >
            <Image
              width={100}
              height={100}
              className="h-8 w-auto rounded-full"
              src="/images/AppLogo.avif"
              alt="Logo"
            />
            <span className="text-xl font-bold ml-2">Butterfly</span>
          </Link>
        </div>
        <div className="md:block">
          <ClientOnly>
              <NavbarActions />
          </ClientOnly>
        </div>
      </div>
    </nav>
  );
}
