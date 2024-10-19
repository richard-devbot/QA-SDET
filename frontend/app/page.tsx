"use client";
import HomePage from "@/components/home-page";
import SessionProvider from "@/components/session-provider";

export default async function Home() {
  return (
    <>
    <SessionProvider>
      <HomePage />
      </SessionProvider>
    </>
  );
}
