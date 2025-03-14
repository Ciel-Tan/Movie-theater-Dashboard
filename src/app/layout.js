"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";
import Login from "./login/page";
import Cookies from "js-cookie";
import { decodeToken } from "@/utils/decodeToken";
import { accountContext } from "@/context/accountContext";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [account_id, setAccount_id] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      const token = Cookies.get("token");
      console.log("token in layout", token);

      if (token) {
        const decoded = await decodeToken(token);
        setAccount_id(decoded.account_id);
      }
    };

    fetchAccount();
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {pathname === "/login" ? <Login /> :
          <accountContext.Provider value={account_id}>
            <Aside />
            <div className="container">
              <Header />
            </div>
            <main>{children}</main>
          </accountContext.Provider>
        }
      </body>
    </html>
  );
}
