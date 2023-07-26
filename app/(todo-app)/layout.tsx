import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import ClientOnly from "../client/ClientOnly";
import ReduxProvider from "../redux/provider";
import ToastProvider from "../provider/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "Firebase - Todo App using Next Js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
        <link rel="icon" type="image/png" href="/images/AppLogo.avif"></link>
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <Navbar />
          <ClientOnly>
            <ToastProvider />
            {children}
          </ClientOnly>
        </ReduxProvider>
      </body>
    </html>
  );
}
