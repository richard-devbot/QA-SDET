import { auth } from "@/auth";
import Navbar from "@/components/navbar-page";
import Footer from "./footer-page";

export default async function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <Navbar
        isLoggedIn={!!session}
        userName={session?.user?.name}
        userImage={session?.user?.image}
      />
      {children}
      <Footer />
    </>
  );
}
