"use client";
import React from "react";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { incrementCredits, decrementCredits } from "@/actions/credits";

export default function DashboardPage({ user }: { user: User }) {
  const handleIncrement = () => {
    incrementCredits(user);
  };
  const handleDecrement = () => {
    decrementCredits(user);
  };
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <h1>Dashboard</h1>
        <div className="flex flex-col mt-8">
          <span>{user.name}</span>
          <span>{user.email}</span>
          <span>Credits: {user.credits}</span>
          <Button onClick={handleIncrement}>+1</Button>
          <Button onClick={handleDecrement}>-1</Button>
        </div>
      </div>
    </>
  );
}
