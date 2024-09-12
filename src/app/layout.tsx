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
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PTPS7F67');
          `
          }}
        />
      </head>
      <body id="App_visited">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PTPS7F67"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

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
