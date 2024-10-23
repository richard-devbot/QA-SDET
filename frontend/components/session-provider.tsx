import { auth } from "@/auth";
import Navbar from "@/components/navbar-page";
import Footer from "@/components/footer-page";
import { DashboardNavbar } from "@/components/dashboard-navbar";

export default async function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      {session?.user?.email ? (
        <DashboardNavbar>{children}</DashboardNavbar>
      ) : (
        <>
          <Navbar/>
          {children}
          <Footer />
        </>
      )}
    </>
  );
}
