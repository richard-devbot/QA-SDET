import React from "react";
import DashboardPage from "@/components/dashboard-page";
import { auth } from "@/auth";
import { getUserByEmail } from "@/data/user";

export default async function page() {
  const session = await auth();
  const userMail = session?.user?.email as string;
  const user = await getUserByEmail(userMail);
  return <>{user && <DashboardPage user={user} />}</>;
}
