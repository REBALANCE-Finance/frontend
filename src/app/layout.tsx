import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "/public/assets/styles/index.scss";
import { Providers } from "@/utils/providers";

import { ModalContextController } from "../features/modals/ModalContextController";
import { ModalController } from "../features/modals/ModalController";
import { ToastContainer } from "react-toastify";
import { MainLayout } from "@/layout/MainLayout";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Rebalance",
  description: "Rebalance"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}  

            gtag('js', new Date());

            gtag('config', 'G-3F7178H2MV');
          `
          }}
        />
      </head>
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
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
