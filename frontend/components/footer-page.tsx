"use client";
import React from "react";
import Link from "next/link";
import { DiscordLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { FaFacebook } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <footer
      className="dark:bg-black py-8 sticky top-full"
      style={{
        background:
          "linear-gradient(to bottom, #FFFFFF 0%, #C9EFFF 59%, #C9EFFF 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 h-[500px]"
      >
        <div className="flex flex-col items-center justify-center h-full w-full gap-14">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold"
          >
            Want to add AI in your automation testing?
          </motion.span>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              className="bg-indigo-600 text-white rounded-lg p-2 transition duration-300 shadow-none hover:bg-indigo-700 hover:text-white hover:shadow-lg border-none"
              variant="outline"
            >
              Request a Demo
            </Button>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-4"
      >
        <div className="flex flex-wrap justify-around w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col"
          >
            <span className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">
              About Us
            </span>
            <span className="flex justify-start items-center gap-2 dark:text-zinc-100 text-zinc-900 text-2xl mb-5">
              <Image
                src="/logo.png"
                alt="Waigenie Logo"
                width={42}
                height={42}
              />
              <span className="text-2xl mt-2 font-bold">Waigenie</span>
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              We are dedicated to providing high-quality services and products
              to our customers.
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/5 mb-6 md:mb-0 dark:text-white text-zinc-900 pl-14"
          >
            <span className="text-lg font-semibold mb-4">Quick Links</span>
            <ul className="text-gray-600 dark:text-gray-300 mt-4">
              <li className="mb-2">
                <Link
                  href="/"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  Home
                </Link>
              </li>
              {/* <li className="mb-2">
                <Link
                  href="/products"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  Products
                </Link>
              </li> */}
              <li className="mb-2">
                <Link
                  href="/services"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  Services
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/about"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/support"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  Support
                </Link>
              </li>
              {/* <li className="mb-2">
                <Link
                  href="/pricing"
                  className="hover:text-gray-900 hover:dark:text-gray-100"
                >
                  Pricing
                </Link>
              </li> */}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full md:w-1/5 mb-6 md:mb-0 dark:text-white text-zinc-900 flex flex-col"
          >
            <span className="text-lg font-semibold mb-4">Contact Us</span>
            <span className="text-gray-600 dark:text-gray-300">
              123 Main Street
              <br />
              City, State 12345
              <br />
              Phone: (123) 456-7890
              <br />
              Email: info@example.com
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full md:w-1/5 text-zinc-900 dark:text-white flex flex-col"
          >
            <span className="text-lg font-semibold mb-4">Follow Us</span>
            <ul className="flex flex-col space-y-2">
              <motion.li whileHover={{ x: 10 }} className="">
                <Link
                  href=""
                  aria-label="instagram"
                  className="w-fit flex justify-start items-center gap-2"
                >
                  <InstagramLogoIcon className="size-5" />
                  <span>Instagram</span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} className="">
                <Link
                  href=""
                  aria-label="facebook"
                  className="flex justify-start items-center gap-2 w-fit"
                >
                  <FaFacebook className="size-5" />
                  <span>Facebook</span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} className="">
                <Link
                  href=""
                  aria-label="discord"
                  className="flex justify-start items-center gap-2 w-fit"
                >
                  <DiscordLogoIcon className="size-5" />
                  <span>Discord</span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="border-t border-gray-200 mt-8 pt-8 text-center"
        >
          <span className="text-gray-600 dark:text-gray-100 text-xs">
            © {new Date().getFullYear()} WaiGenie. All rights reserved.
          </span>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
