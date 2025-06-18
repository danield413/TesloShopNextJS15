import type { Metadata } from "next";
import { inter } from '../config/fonts';
import "./globals.css";
import { Provider } from "@/components";


export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: "Home -  Teslo | Shop",
  },
  description: "A Web Store of Products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <Provider>
           {children}
        </Provider>
      </body>
    </html>
  );
}
