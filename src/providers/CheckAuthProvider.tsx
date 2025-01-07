"use client";
import React, { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useBoolean } from "usehooks-ts";
import { useConnectionStatus, useWallet } from "@thirdweb-dev/react";
import { AuthProvider } from "@/providers/AuthContext";
import { useAuthStore } from "@/store/auth-store";
import { check } from "@/lib/api";
import { useTranslations } from "next-intl";

interface CheckAuthProviderProps {
  children: ReactNode;
}

//TODO Тестовые данные
const CheckAuthProvider = ({ children }: CheckAuthProviderProps) => {
  //const { value: isLoading, setValue } = useBoolean(true);
  const { value: isLoading, setValue } = useBoolean(false);
  const { value: isAuth, setValue: setValueAuth } = useBoolean(false);
  const { push } = useRouter();
  const { isAuth: isAuthStore, auth, setUser, isLogin, statusLogin } = useAuthStore();
  const pathname = usePathname();
  const t = useTranslations("Dashboard");

  const walletInstance = useWallet();
  const connectionStatus = useConnectionStatus();

  useEffect(() => {
    /*(async function () {
            if (connectionStatus === "connected" && walletInstance) {
                check().then(body => {
                    if (body?.result?.currentUser) {

                        setValue(false)
                        setValueAuth(true)
                        setUser(body.result)
                        auth()
                    } else {
                        if (!pathname.includes('home') && !pathname.includes('see')) {
                            push(`/ru/home`)
                        }
                        setTimeout(() => {
                            setValue(false)
                        }, 100)
                    }
                })
            } else if ((connectionStatus === "disconnected" || walletInstance) && !pathname.includes('home')) {
                if (pathname.includes('see')) {
                    setValue(false)
                } else {
                    push(`/ru/home`)
                    setTimeout(() => {
                        setValue(false)
                    }, 100)
                }
            }
        }())*/
  }, [connectionStatus, isAuthStore, isLogin]);

  if (isLoading && !pathname.includes("home")) {
    return <div className="p-10">{t("main.loading")}</div>;
  }

  return <AuthProvider value={{ auth: isAuth }}>{children}</AuthProvider>;
};

export default CheckAuthProvider;
