import React from "react";
import Link from "next/link";
import { DiscordLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { FaFacebook } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black py-8 sticky top-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-around w-full">
          <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col">
            <span className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">
              About Us
            </span>
            <span className="flex justify-start items-center gap-2 dark:text-zinc-100 text-zinc-900 text-2xl">
              <span>SDET</span>
              <img src="/logo.svg" alt="logo" className="size-12" />
              <span>Genie</span>
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              We are dedicated to providing high-quality services and products
              to our customers.
            </span>
          </div>
          <div className="w-full md:w-1/5 mb-6 md:mb-0 dark:text-white text-zinc-900 pl-14">
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
          </div>
          <div className="w-full md:w-1/5 mb-6 md:mb-0 dark:text-white text-zinc-900 flex flex-col">
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
          </div>
          <div className="w-full md:w-1/5 text-zinc-900 dark:text-white flex flex-col">
            <span className="text-lg font-semibold mb-4">Follow Us</span>
            <ul className="flex flex-col space-y-2">
              <li className="">
                <Link
                  href=""
                  aria-label="instagram"
                  className="w-fit flex justify-start items-center gap-2"
                >
                  <InstagramLogoIcon className="size-5" />
                  <span>Instagram</span>
                </Link>
              </li>
              <li className="">
                <Link
                  href=""
                  aria-label="facebook"
                  className="flex justify-start items-center gap-2 w-fit"
                >
                  <FaFacebook className="size-5" />
                  <span>Facebook</span>
                </Link>
              </li>
              <li className="">
                <Link
                  href=""
                  aria-label="discord"
                  className="flex justify-start items-center gap-2 w-fit"
                >
                  <DiscordLogoIcon className="size-5" />
                  <span>Discord</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <span className="text-gray-600 dark:text-gray-100 text-xs">
            © {new Date().getFullYear()} SDET-Genie. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
