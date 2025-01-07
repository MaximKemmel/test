"use client";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const LanguageSelect = ({ lang }: { lang: string }) => {
  const pathName = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const handleChangeLang = (lang: string) => {
    router.push(pathName.replace(`/${locale}`, `/${lang}`));
  };

  function uppercaseFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="flex gap-4">
      {["en", "ru"].map((tmpLocale) => (
        <div
          className={`uppercase cursor-pointer ${tmpLocale === locale ? "text-main-yellow-3" : ""}`}
          key={tmpLocale}
          onClick={() => handleChangeLang(tmpLocale)}
        >
          {tmpLocale}
        </div>
      ))}
    </div>
    /*<Select defaultValue={lang} onValueChange={handleChangeLang}>
            <SelectTrigger  className={'bg-transparent border-0 w-[54px] xs:w-auto p-0 text-[20px] xs:text-[16px] xs:text-white xs:h-auto uppercase text-[#BCBCBC]'}>
                <SelectValue placeholder="Language"/>
            </SelectTrigger>
            <SelectContent>
                {['ru', 'en', 'de'].map(locale =>
                    <SelectItem value={locale} key={locale} className="uppercase">
                        {locale}
                    </SelectItem>
                )}
            </SelectContent>
        </Select>*/
  );
};

export default LanguageSelect;
