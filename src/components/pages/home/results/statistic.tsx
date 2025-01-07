import InviteButton from "@/components/button/InviteButton";
import { unbounded } from "@/styles/fonts";
import { useTranslations } from "next-intl";

export function HomeResultStatic({
  isShowed,
  isMob,
}: {
  isShowed?: boolean;
  isMob?: boolean;
}) {
  const t = useTranslations("Home");

  return isShowed ? (
    <div className="flex flex-col gap-10 items-center lg:pt-10">
      <div className="lg:container flex bg-white lg:rounded-3xl w-full rounded-b-[10px] grid grid-cols-1 shadow-resultsShadow lg:p-14 p-2 gap-[10px] text-black">
        <p className={`${unbounded.className} lg:text-[45px] hidden lg:flex`}>
          USDT
        </p>
        <div className="flex flex-row justify-between items-center text-center">
          <div className="flex items-center flex-col lg:gap-[50px] md:gap-[25px] gap-[15px] w-1/2">
            <div className="flex items-center flex-col lg:gap-[10px] gap-[5px]">
              <div className="flex flex-row">
                <span
                  className={`${unbounded.className} lg:text-[45px] md:text-[25px] text-[12px] mt-1`}
                >
                  1 800 661
                </span>
                <span className="ml-2 text-main-home-green lg:text-lg md:text-[12px] text-[10px]">
                  +998
                </span>
              </div>
              <p
                className={`lg:text-xl md:text-[17px] text-[10px] font-normal`}
              >
                {t("home.results.static.account_count")}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p
                className="font-semibold lg:text-[25px] md:text-[20px] text-[10px]"
                dangerouslySetInnerHTML={{
                  __html: t.raw("home.invite.register_price"),
                }}
              ></p>
              <p
                className={`${unbounded.className} lg:text-[45px] md:text-[25px] text-[12px]`}
              >
                70$, USD
              </p>
              <p
                className={`${unbounded.className} lg:text-[45px] md:text-[25px] text-[12px]`}
              >
                70 USDT
              </p>
            </div>
          </div>
          <div className={"w-[1px] h-[calc(100%-10px)] bg-[#D9DBE1] flex"} />
          <div className="flex items-center flex-col lg:gap-[50px] md:gap-[25px] gap-[15px] w-1/2">
            <div className="flex items-center flex-col lg:gap-[10px] gap-[5px]">
              <p
                className={`${unbounded.className} lg:text-[45px] md:text-[25px] text-[12px]  mt-1`}
              >
                2 197 678 355 $
              </p>
              <p
                className={`lg:text-xl md:text-[17px] text-[10px] font-normal`}
              >
                {t("home.results.static.sum_result")}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p
                className="font-semibold lg:text-[25px] md:text-[20px] text-[10px]"
                dangerouslySetInnerHTML={{
                  __html: t.raw("home.invite.total_income"),
                }}
              ></p>
              <p
                className={`${unbounded.className} lg:text-[45px] md:text-[25px] text-[12px]`}
              >
                320$, USD
              </p>
              <p
                className={`${unbounded.className} lg:text-[45px] md:text-[25px] text-[12px]`}
              >
                319 USDT
              </p>
            </div>
          </div>
        </div>
      </div>
      {!isMob ? <InviteButton join={t("home.btn.join")} /> : null}
    </div>
  ) : null;
}
