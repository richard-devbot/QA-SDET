"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "./ui/sidebar";
import {
  IconListCheck,
  IconCode,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@prisma/client";
import TestIdea from "./test-idea";
import GenerateBDD from "./generate-bdd";
import IdentifyEl from "./identify-el";
import AutomateCode from "./automate-code";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "@/auth";

interface DashboardNavbarProps {
  user: User;
  children: React.ReactNode;
}

const menuItems = [
  {
    label: "Test Idea",
    icon: <IconListCheck className="h-4 w-4" />,
    component: <TestIdea />,
  },
  {
    label: "Generate BDD",
    icon: <IconCode className="h-4 w-4" />,
    component: <GenerateBDD />,
  },
  {
    label: "Identify Elements",
    icon: <IconSearch className="h-4 w-4" />,
    component: <IdentifyEl />,
  },
  {
    label: "Automate Code",
    icon: <IconSettings className="h-4 w-4" />,
    component: <AutomateCode />,
  },
];

export function DashboardNavbar({ user, children }: DashboardNavbarProps) {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(menuItems[0].label);

  const handleSignout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Signout failed:", error);
    }
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="border-b border-border px-2">
            <div className="flex h-16 items-center gap-2">
              <SidebarTrigger />
              <Image
                src="/logo.png"
                width={24}
                height={24}
                alt="WaiGenie Logo"
                priority
                className="h-6 w-6"
              />
              <span className="font-semibold">WaiGenie</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={activeItem === item.label}
                    onClick={() => setActiveItem(item.label)}
                    tooltip={item.label}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-border p-2">
            <SidebarMenuButton
              onClick={handleSignout}
              className="w-full justify-start"
            >
              <Avatar className="h-5 w-5">
                <AvatarImage src={user.image ?? ""} />
                <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
              </Avatar>
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto bg-background p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {menuItems.find((item) => item.label === activeItem)?.component}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </SidebarProvider>
  );
}
