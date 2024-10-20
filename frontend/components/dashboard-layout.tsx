import React from "react";
import { DashboardNavbar } from "./dashboard-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNavbar>{children}</DashboardNavbar>
    </>
  );
}
