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
import { useState } from "react";

export default function RootLayout({ children }) {
  const [isOpenAside, setIsOpenAside] = useState(true);

  const toggleAside = () => {
    setIsOpenAside(!isOpenAside);
  }

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
            <Aside isOpen={isOpenAside}/>

            {token &&
              <div className={`main ${isOpenAside ? 'container' : ''}`}>
                <Header onClick={toggleAside}/>
              </div>
            }

            <main className={`main ${isOpenAside ? 'container' : ''}`}>
              {children}
            </main>
          </AccountProvider>
        }
        <ToastContainer />
      </body>
    </html>
  );
}
