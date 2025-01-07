import React from "react";
import LanguageSelect from "@/components/header/language-select";
import { useAuthStore } from "@/store/auth-store";
import { usePathname, useRouter } from "next/navigation";
import { usePopupRegistration } from "@/store/toggle-stores";

const DrawerAuth = () => {
  const { isAuth: isAuthState, closeAuth } = useAuthStore();
  const router = useRouter();

  const pathname = usePathname();

  // const isAuth = isAuthState || pathname.includes('dashboard')
  const isAuth = isAuthState || !pathname.includes("home");

  const { open: openRegister } = usePopupRegistration();

  return (
    <div className="flex items-center gap-x-[10px]">
      <LanguageSelect lang={"ru"} />
      <span
        onClick={() => {
          if (isAuth) {
            closeAuth();
            router.push("/");
          } else {
            openRegister();
          }
        }}
        className="text-[16px]  "
      >
        Войти
      </span>
    </div>
  );
};

export default DrawerAuth;
