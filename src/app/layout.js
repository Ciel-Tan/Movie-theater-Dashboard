"use client";

import "./globals.css";
import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";
import Login from "./login/page";
import Cookies from "js-cookie";
import { decodeToken } from "@/utils/decodeToken";
import { useEffect, useState } from "react";
import { AccountProvider } from "@/context/accountContext";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  // const [account_id, setAccount_id] = useState(null);

  // useEffect(() => {
  //   const fetchAccount = async () => {
  //     const token = Cookies.get("token");
  //     console.log("token in layout", token);

  //     if (token) {
  //       const decoded = await decodeToken(token);
  //       setAccount_id(decoded.account_id);
  //     }
  //   };

  //   fetchAccount();
  // }, []);

  return (
    <html lang="en">
      <body>
        {pathname === "/login" ? <Login /> :
          <AccountProvider>
            <Aside />
            <div className="container">
              <Header />
            </div>
            <main>{children}</main>
          </AccountProvider>
        }
      </body>
    </html>
  );
}
