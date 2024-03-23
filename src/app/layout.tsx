import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "/public/assets/styles/index.scss";
import { Providers } from "@/utils/providers";

import { ModalContextController } from "../features/modals/ModalContextController";
import { ModalController } from "../features/modals/ModalController";
import { ToastContainer } from "react-toastify";
import { MainLayout } from "@/layout/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rebalance",
  description: "Rebalance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <MainLayout>
            {children}
          </MainLayout>

          <ModalContextController />
          <ModalController />

          <ToastContainer
            position="top-right"
            autoClose={false}
            hideProgressBar
            closeOnClick
            pauseOnHover={false}
            draggable={false}
          />
        </Providers>
      </body>
    </html>
  );
}
