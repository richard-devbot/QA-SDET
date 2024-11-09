"use client";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav
      className={`dark:bg-neutral-950/75 bg-white/75 p-4 fixed w-full z-50 top-0 left-0`}
    >
      <div className="mx-auto flex justify-around items-center dark:text-zinc-100 text-zinc-900 ">
        <Link href="/" className="flex gap-2 items-center justify-center ">
          <Image src="/logo.png" alt="Waigenie Logo" width={42} height={42} />
          <span className="text-2xl mt-2 font-bold">Waigenie</span>
        </Link>
        <div className="hidden md:flex space-x-4">
          <NavLink href="/about">About</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Link
            href="/signup"
            className="group flex items-center gap-1 dark:bg-zinc-100 bg-zinc-900 text-zinc-100 dark:text-zinc-900 rounded-full px-4 py-2 transition duration-300"
          >
            <span>Get started</span>
            <ArrowUpRight className="size-5 group-hover:rotate-45 transition-all duration-100" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-zinc-900 dark:text-white hover:border-b-2 hover:border-blue-400 px-4 py-2 transition duration-300 flex items-center gap-1 group"
    >
      {children}
    </Link>
  );
}
