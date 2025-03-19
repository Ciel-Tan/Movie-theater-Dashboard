"use client";

import "./globals.css";
import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";
import Login from "./login/page";
import { AccountProvider } from "@/context/accountContext";
import UnauthorizedPage from "./403-forbidden/page";
import { getCookieToken } from "@/utils/cookie";
import ForgotPassword from "./forgot-password/page";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const pathOwner = [
    {path: '/login', component: <Login />},
    {path: '/403-forbidden', component: <UnauthorizedPage />},
    {path: '/forgot-password', component: <ForgotPassword />}
  ]

  const currentComponent = pathOwner.find(route => route.path === pathname)?.component;

  const token = getCookieToken();

  return (
    <html lang="en">
      <body>
        {currentComponent ? currentComponent :
          <AccountProvider>
            <Aside />

            {token &&
              <div className="container">
                <Header />
              </div>
            }

            <main>
              {children}
            </main>
          </AccountProvider>
        }
        <ToastContainer />
      </body>
    </html>
  );
}
