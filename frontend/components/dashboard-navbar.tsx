// components/dashboard-navbar.tsx
"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar"; // Assuming SidebarLink is imported here
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconListCheck,
  IconCode,
  IconSearch,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@prisma/client";
import TestIdea from "./test-idea";
import GenerateBDD from "./generate-bdd";
import IdentifyEl from "./identify-el";
import AutomateCode from "./automate-code";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { motion } from "framer-motion";

export function DashboardNavbar({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleSignout = async () => {
    // Implement signout functionality
    router.push("/");
  };

  const [activeLink, setActiveLink] = useState("TestIdea");

  const links = [
    {
      label: "TestIdea",
      href: "#",
      icon: (
        <>
          <IconListCheck className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        </>
      ),
    },
    {
      label: "GenerateBDD",
      href: "#",
      icon: (
        <>
          <IconCode className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        </>
      ),
    },
    {
      label: "IdentifyEl",
      href: "#",
      icon: (
        <>
          <IconSearch className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        </>
      ),
    },
    {
      label: "AutomateCode",
      href: "#",
      icon: (
        <>
          <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        </>
      ),
    },
  ];

  const linkComponents = [
    {
      label: "TestIdea",
      component: <TestIdea />,
    },
    {
      label: "GenerateBDD",
      component: <GenerateBDD />,
    },
    {
      label: "IdentifyEl",
      component: <IdentifyEl />,
    },
    {
      label: "AutomateCode",
      component: <AutomateCode />,
    },
  ];

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className="rounded-md flex flex-col md:flex-row bg-gray-200 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen">
      <Sidebar>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-8 flex flex-col gap-2 justify-start items-start">
              {links.map((link, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleLinkClick(link.label)}
                  className="bg-transparent shadow-none border-none flex-shrink-0 p-0"
                  variant="outline"
                >
                  <SidebarLink link={link} />
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Button
              className="bg-transparent shadow-none border-none flex-shrink-0 p-0"
              onClick={handleSignout}
              variant="outline"
            >
              <SidebarLink
                link={{
                  label: "Signout",
                  href: "#",
                  icon: (
                    <Avatar className="size-6">
                      <AvatarImage src={user.image ?? ""} className="" />
                      <AvatarFallback>{user.name ?? "US"}</AvatarFallback>
                    </Avatar>
                  ),
                }}
              />
            </Button>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1">
        {linkComponents.find((link) => link.label === activeLink)?.component}
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src="/logo.png" width={24} height={24} alt="" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        WaiGenie
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
      <Image src="/logo.png" alt="" width={24} height={24} />
    </Link>
  );
};
