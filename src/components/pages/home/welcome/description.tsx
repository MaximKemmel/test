import Image from "next/image";
import { useTranslations } from "next-intl";
import { unbounded } from "@/styles/fonts";
import background from "/public/images/home/networking-back.png";

export default function WelcomeDescription() {
  const t = useTranslations("Home");

  return (
    <div className="container flex lg:flex-row flex-col xl:gap-12 gap-[16px] justify-center relative">
      <div className="flex shrink-0 lg:w-1/2 w-full lg:h-auto relative justify-center">
        <Image
          className="lg:w-auto md:w-1/2 relative"
          src={background}
          alt={"background"}
          style={{
            objectFit: "contain",
            objectPosition: "top",
          }}
        />
      </div>
      <div className="flex flex-col gap-6 xl:w-1/2 xl:mx-auto text-2xl lg:pt-8 grow">
        <p className={`md:text-5xl text-[24px] md:text-left text-center ${unbounded.className}`}>{t("home.description.title")}</p>
        <p
          className="md:text-lg text-base font-medium"
          dangerouslySetInnerHTML={{ __html: t.raw("home.description.description") }}
        ></p>
        <ul className="space-y-6">
          <li className="flex gap-2.5 font-medium md:text-lg text-base">
            <Image className="w-5 h-5" src={"/images/home/point.png"} width={13} height={18} alt="" />
            {t("home.description.paragraph1")}
          </li>
          <li className="flex gap-2.5 font-medium md:text-lg text-base">
            <Image className="w-5 h-5" src={"/images/home/point.png"} width={13} height={18} alt="" />
            {t("home.description.paragraph2")}
          </li>
        </ul>
      </div>
    </div>
  );
}
