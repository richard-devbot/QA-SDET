"use client";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { Raleway } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signout } from "@/actions/auth";
import { useRouter } from "next/navigation";

const raleway = Raleway({
  weight: "400",
  subsets: ["latin"],
});

export default function Navbar({
  isLoggedIn,
  userName,
  userImage,
}: {
  isLoggedIn: boolean;
  userName: string | null | undefined;
  userImage: string | null | undefined;
}) {
  const router = useRouter();
  const handleClick = async () => {
    await signout();
    router.push("/");
  };
  return (
    <nav
      className={`dark:bg-neutral-950/75 bg-white/75 p-4 fixed w-full z-50 top-0 left-0 ${raleway.className}`}
    >
      <div className="mx-auto flex justify-around items-center dark:text-zinc-100 text-zinc-900 ">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold">SDET</span>
          <Image src="/logo.svg" alt="SDET-Genie Logo" width={40} height={40} />
          <span className="text-2xl font-bold">Genie</span>
        </Link>
        <div className="hidden md:flex space-x-4">
          <NavLink href="/about">
            <span>About</span>
          </NavLink>
          <NavLink href="/products">
            <span>Products</span>
          </NavLink>
          <NavLink href="/services">
            Services
            {/* <ChevronDown className="size-5 group-hover:rotate-180 transition-all duration-100" /> */}
          </NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/support">Support</NavLink>
        </div>
        <div className="flex items-center justify-center gap-2">
          {/* <ModeToggle /> */}
          {isLoggedIn ? (
            <Button
              onClick={handleClick}
              className="flex items-center gap-1 group bg-black rounded-full p-2 transition duration-300"
            >
              <Image
                src={userImage || "/default-user.png"}
                alt="User Image"
                width={30}
                height={30}
                className="rounded-full"
              />
              <span className="hidden md:block">{userName}</span>
              <ArrowUpRight className="size-5 group-hover:rotate-180 transition-all duration-100" />
            </Button>
          ) : (
            <Link
              href="/signup"
              className="group flex items-center gap-1 dark:bg-zinc-100 bg-zinc-900 text-zinc-100 dark:text-zinc-900 rounded-full px-4 py-2 transition duration-300"
            >
              <span>Get started</span>
              <ArrowUpRight className="size-5 group-hover:rotate-45 transition-all duration-100" />
            </Link>
          )}
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
      className="text-zinc-900 dark:text-white hover:dark:bg-zinc-800 hover:bg-zinc-300 rounded-full px-4 py-2 transition duration-300 flex items-center gap-1 group"
    >
      {children}
    </Link>
  );
}
