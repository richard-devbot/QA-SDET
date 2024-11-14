"use client";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`dark:bg-neutral-950/75 bg-white/75 p-4 fixed w-full z-50 top-0 left-0`}
    >
      <div className="mx-auto flex justify-around items-center dark:text-zinc-100 text-zinc-900">
        <Link href="/" className="flex gap-2 items-center justify-center">
          <Image src="/logo.png" alt="Waigenie Logo" width={42} height={42} />
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl mt-2 font-bold"
          >
            Waigenie
          </motion.span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className="text-zinc-900 dark:text-white px-4 py-2">
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/services" legacyBehavior passHref>
                <NavigationMenuLink className="text-zinc-900 dark:text-white px-4 py-2">
                  Services
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger className="text-zinc-900 dark:text-white bg-transparent hover:bg-transparent px-4 py-2">
                Products
              </NavigationMenuTrigger>
              <NavigationMenuContent className="absolute left-1/2 -translate-x-1/2 rounded-md">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-2 p-2 w-[400px] rounded-full"
                >
                  <NavigationMenuLink
                    href="/products/IdeaForge"
                    className="block px-4 py-2 text-sm text-zinc-900 dark:text-white hover:bg-blue-100 dark:hover:bg-neutral-800 rounded-md"
                  >
                    Idea Forge
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/products/DomDetective"
                    className="block px-4 py-2 text-sm text-zinc-900 dark:text-white hover:bg-blue-100 dark:hover:bg-neutral-800 rounded-md"
                  >
                    Dom Detective
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/products/CucumberCraft"
                    className="block px-4 py-2 text-sm text-zinc-900 dark:text-white hover:bg-blue-100 dark:hover:bg-neutral-800 rounded-md"
                  >
                    Cucumber Craft
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/products/AutoScribe"
                    className="block px-4 py-2 text-sm text-zinc-900 dark:text-white hover:bg-blue-100 dark:hover:bg-neutral-800 rounded-md"
                  >
                    AutoScribe
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/products/WebTrekker"
                    className="block px-4 py-2 text-sm text-zinc-900 dark:text-white hover:bg-blue-100 dark:hover:bg-neutral-800 rounded-md"
                  >
                    WebTrekker
                  </NavigationMenuLink>
                </motion.div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref>
                <NavigationMenuLink className="text-zinc-900 dark:text-white px-4 py-2">
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className="text-zinc-900 dark:text-white px-4 py-2">
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2"
        >
          <Link
            href="/signup"
            className="group flex items-center gap-1 dark:bg-zinc-100 bg-zinc-900 text-zinc-100 dark:text-zinc-900 rounded-full px-4 py-2 transition duration-300"
          >
            <span>Get started</span>
            <ArrowUpRight className="size-5 group-hover:rotate-45 transition-all duration-100" />
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}
