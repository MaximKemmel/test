import { unbounded } from "@/styles/fonts";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/api";
import { useTranslations } from "next-intl";

export default function HomeRoad() {
  const t = useTranslations("Home");

  const data = [
    {
      month: t("home.road.august.month") as any,
      info: [t("home.road.august.info.0"), t("home.road.august.info.1")],
    },
    {
      month: t("home.road.september.month") as any,
      info: [t("home.road.september.info.0")],
    },
    {
      month: t("home.road.november.month") as any,
      info: [
        t("home.road.november.info.0"),
        t("home.road.november.info.1"),
        t("home.road.november.info.2"),
      ],
    },
    {
      month: "",
      info: [],
    },
    {
      month: t("home.road.january.month") as any,
      info: [
        t("home.road.january.info.0"),
        t("home.road.january.info.1"),
        t("home.road.january.info.2"),
      ],
    },
    {
      month: t("home.road.february.month") as any,
      info: [t("home.road.february.info.0"), t("home.road.february.info.1")],
    },
    {
      month: t("home.road.may.month") as any,
      info: [
        t("home.road.may.info.0"),
        t("home.road.may.info.1"),
        t("home.road.may.info.2"),
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <p className="flex flex-col gap-5 justify-center items-center">
        <span className={`md:text-5xl text-2xl ${unbounded.className}`}>
          {t("home.road.title")}
        </span>
      </p>
      <div className={"4xl:block hidden"}>
        <DesktopRoad data={data} />
      </div>
      <div className={"4xl:hidden xl:block hidden"}>
        <TabletRoad data={data} />
      </div>
      <div className={"xl:hidden block"}>
        <MobileRoad data={data} />
      </div>
    </div>
  );
}

function DesktopRoad({ data }: { data: { month: string; info: string[] }[] }) {
  return (
    <div className="container grid grid-cols-7 relative py-64 relative">
      <Image
        src={"/images/home/roadmap-back.png"}
        alt=""
        className="absolute"
        fill
        style={{
          objectFit: "contain",
          zIndex: -1,
          objectPosition: "center, bottom",
        }}
      />
      {data.map((el, index) => (
        <>
          {index == 3 ? (
            <div className="w-full relative h-[150px] w-[150px] flex items-center justify-center bg-black">
              <p className="text-home-h3 z-1">2024-2025</p>
            </div>
          ) : (
            <div
              className="flex flex-col items-center relative"
              key={el.info[0] + index}
            >
              {index % 2 == 1 && (
                <div className=" w-full absolute gap-7 items-center left-1/2 -translate-x-1/2 bottom-[calc(100%-5px)] flex flex-col">
                  <ul
                    className={`space-y-2 text-base ${
                      el.info.length > 1 ? "w-[320px]" : ""
                    }`}
                  >
                    {el.info.map((list, index1) => (
                      <li
                        className="flex gap-4 items-center font-normal"
                        key={list + index1 + index}
                      >
                        {el.info.length > 1 ? (
                          <Image
                            src={"/images/home/ellips.png"}
                            className="w-4 h-4"
                            width={30}
                            height={30}
                            alt=""
                          />
                        ) : null}
                        {list}
                      </li>
                    ))}
                  </ul>
                  <Image
                    src={"/images/home/line.png"}
                    alt=""
                    width={9.5}
                    height={65}
                    className=" h-16"
                  />
                </div>
              )}
              <div className="relative h-[150px] w-[150px] flex items-center justify-center">
                <Image
                  src={"/images/home/step.png"}
                  alt=""
                  className="absolute bg-black rounded-full"
                  width={150}
                  height={150}
                  style={{
                    objectFit: "cover",
                    zIndex: -1,
                    objectPosition: "center",
                  }}
                />
                <p className="text-base z-1 p-[10px] text-center">{el.month}</p>
              </div>
              {index % 2 == 0 && (
                <div className="w-full flex gap-7 flex-col items-center absolute top-[calc(100%-5px)]">
                  <Image
                    src={"/images/home/line.png"}
                    alt=""
                    width={9.5}
                    height={65}
                    className=" rotate-180 h-16"
                  />
                  <ul
                    className={`space-y-2 text-base ${
                      el.info.length > 1 ? "w-[320px]" : ""
                    }`}
                  >
                    {el.info.map((list, index1) => (
                      <li
                        className="flex gap-4 items-center font-normal"
                        key={list + index1 + index}
                      >
                        {el.info.length > 1 ? (
                          <Image
                            src={"/images/home/ellips.png"}
                            className="w-4 h-4"
                            width={15}
                            height={15}
                            alt=""
                          />
                        ) : null}
                        {list}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      ))}
    </div>
  );
}

const TabletRoad = ({
  data,
}: {
  data: { month: string; info: string[] }[];
}) => (
  <div className="container grid grid-cols-1 space-y-[25px] relative py-[50px] relative overflow-hidden">
    {data.map((el, index) => (
      <>
        {index == 3 ? (
          <div className="w-full relative h-[150px] w-[150px] flex items-center justify-center bg-black">
            <p className="text-home-h3 z-1">2024-2025</p>
          </div>
        ) : (
          <div
            className="flex flex-col items-center relative"
            key={el.info[0] + index}
          >
            {index % 2 == 1 && (
              <div className="w-full flex flex-row items-center absolute left-[285px] top-1/2 -translate-y-1/2 justify-center gap-[15px]">
                <div className="w-[65px] flex justify-center">
                  <Image
                    src={"/images/home/line.png"}
                    alt=""
                    width={9.5}
                    height={65}
                    className="h-16 rotate-90"
                  />
                </div>
                <ul className={`space-y-2 text-base w-[350px]`}>
                  {el.info.map((list, index1) => (
                    <li
                      className="flex gap-4 items-center font-normal"
                      key={list + index1 + index}
                    >
                      {el.info.length > 1 ? (
                        <Image
                          src={"/images/home/ellips.png"}
                          className="w-4 h-4"
                          width={30}
                          height={30}
                          alt=""
                        />
                      ) : null}
                      {list}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="relative h-[150px] w-[150px] flex items-center justify-center">
              <Image
                src={"/images/home/step.png"}
                alt=""
                className="absolute bg-black rounded-full"
                width={150}
                height={150}
                style={{
                  objectFit: "cover",
                  zIndex: -1,
                  objectPosition: "center",
                }}
              />
              <p className="text-base z-1 p-[10px] text-center">{el.month}</p>
            </div>
            {index % 2 == 0 && (
              <div className="w-full flex flex-row items-center absolute right-[285px] top-1/2 -translate-y-1/2 justify-center gap-[15px]">
                <ul className={`space-y-2 text-base w-[350px]`}>
                  {el.info.map((list, index1) => (
                    <li
                      className="flex gap-4 items-center font-normal"
                      key={list + index1 + index}
                    >
                      {el.info.length > 1 ? (
                        <Image
                          src={"/images/home/ellips.png"}
                          className="w-4 h-4"
                          width={15}
                          height={15}
                          alt=""
                        />
                      ) : null}
                      {list}
                    </li>
                  ))}
                </ul>
                <div className="w-[65px] flex justify-center">
                  <Image
                    src={"/images/home/line.png"}
                    alt=""
                    width={9.5}
                    height={65}
                    className="rotate-[270deg] h-16"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </>
    ))}
  </div>
);

const MobileRoad = ({
  data,
}: {
  data: { month: string; info: string[] }[];
}) => (
  <div className="flex flex-col items-center gap-[15px] relative py-10 px-[15px]">
    {data.map((el, index) => (
      <>
        {index == 3 ? (
          <div className="w-full relative h-[150px] w-[150px] flex items-center justify-center bg-black">
            <p className="text-home-h3 z-1">2024-2025</p>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <div className="relative h-[150px] w-[150px] flex items-center justify-center">
              <Image
                src={"/images/home/step.png"}
                alt=""
                className="absolute bg-black rounded-full"
                width={150}
                height={150}
                style={{
                  objectFit: "cover",
                  zIndex: -1,
                  objectPosition: "center",
                }}
              />
              <p className="text-base z-1 p-[10px] text-center">{el.month}</p>
            </div>
            <Image
              src={"/images/home/line.png"}
              alt=""
              width={9.5}
              height={65}
              className="h-16 rotate-180"
            />
            <ul className={`space-y-2 text-base w-full overflow-hidden`}>
              {el.info.map((list, index1) => (
                <li
                  className={`flex gap-4 items-center font-normal ${el.info.length === 1 ? "justify-center" : ""}`}
                  key={list + index1 + index}
                >
                  {el.info.length > 1 ? (
                    <Image
                      src={"/images/home/ellips.png"}
                      className="w-4 h-4"
                      width={15}
                      height={15}
                      alt=""
                    />
                  ) : null}
                  {list}
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    ))}
  </div>
);
