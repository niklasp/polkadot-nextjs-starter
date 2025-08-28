import { ChainInfo } from "@/components/chain/chain-info";
import { Footer } from "@/components/layout/footer";
import { NavBar } from "@/components/layout/nav-bar";
import { Toaster } from "@/components/ui/sonner";

export default function PapiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ChainInfo />
      <Toaster position="bottom-right" />
    </>
  );
}
