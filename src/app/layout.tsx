import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "./providers/session-provider";
import Footer from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sistema MedPet",
  description: "Sistema financeiro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex flex-col h-[100vh]">
          <div className="flex-1">
            <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
