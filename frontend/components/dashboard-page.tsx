"use client";
import React from "react";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { incrementCredits, decrementCredits } from "@/actions/credits";
import { DashboardNavbar } from "./dashboard-navbar";

export default function DashboardPage({ user }: { user: User }) {
  const handleIncrement = () => {
    incrementCredits(user);
  };
  const handleDecrement = () => {
    decrementCredits(user);
  };
  return (
    <>
      <DashboardNavbar>
      <div className="w-full h-screen flex items-center justify-center gap-5">
        <div className="bg-black h-[calc(100dvh-100px)] w-[calc(50vw-10rem)] rounded-lg text-white">
          this is configuration
        </div>
        <div className="bg-[#252525] h-[calc(100dvh-100px)] w-[calc(50vw-10rem)] rounded-lg text-white">
          <div>
            web pages
          </div>
        </div>
      </div>
      </DashboardNavbar>
    </>
  );
}
