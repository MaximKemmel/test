"use client";
import { Sprite } from "@/tags/sprite";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ArrowIcon from "@/components/icons/ArrowIcon";
import { useBoolean } from "usehooks-ts";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { UserInfo } from "@/lib/interfaces";
import robotIcon from "/public/images/profile/robot.png";
import dollarIcon from "/public/images/profile/dollar.png";
import dashboardIcon from "/public/images/profile/user-octagon.png";
import partnersIcon from "/public/images/profile/people.png";
import statisticIcon from "/public/images/profile/diagram.png";
import targetsIcon from "/public/images/profile/union.png";
import automationIcon from "/public/images/profile/notification-circle.png";
import additionalIcon from "/public/images/profile/wallet-money.png";
import knowledgeIcon from "/public/images/profile/monitor-recorder.png";
import hideMenuIcon from "/public/images/profile/receive-square.png";
import showMenuIcon from "/public/images/profile/request-square.png";
import useNavStore from "@/store/nav-store";

export function Menu({
  className,
  seeUser,
}: {
  className?: string;
  seeUser?: UserInfo;
}) {
  const t = useTranslations("Dashboard");

  const navLinks = useMemo(() => {
    return [
      {
        icon: dashboardIcon,
        name: t("main.menu.item1"),
        href: "dashboard",
      },
      {
        icon: partnersIcon,
        name: t("main.menu.item2"),
        href: "partners",
      },
      {
        icon: statisticIcon,
        name: t("main.menu.item3"),
        href: "statistic",
      },
      {
        icon: targetsIcon,
        name: t("main.menu.item4"),
        href: "targets",
      },
      {
        icon: automationIcon,
        name: t("main.menu.item5"),
        href: "automation",
        sprite: robotIcon,
      },
      {
        icon: additionalIcon,
        name: t("main.menu.item6"),
        href: "additional",
        sprite: dollarIcon,
      },
      {
        icon: knowledgeIcon,
        name: t("main.menu.item7"),
        href: "knowledge",
      },
    ];
  }, []);

  const pathname = usePathname();
  const { value, toggle } = useBoolean(false);
  const [isMenuShowed, setIsMenuShowed] = useState(true);
  const { isNavShow } = useNavStore();

  return (
    <>
      <nav
        className={clsx(
          `2xl:flex hidden ${
            isMenuShowed ? "w-[460px] pr-2.5 pt-10" : "w-[94px] pt-6"
          } h-auto border-solid border-r border-[#FFFFFF33] shrink-0`,
          className
        )}
      >
        <ul
          className={clsx(
            isMenuShowed ? "space-y-[17px] w-full" : "w-[94px]",
            "xs:hidden xs:mt-[16px]",
            value && "!block",
            seeUser && "opacity-50"
          )}
        >
          <li
            className="cursor-pointer"
            onClick={() => setIsMenuShowed(!isMenuShowed)}
          >
            <div
              className={`py-[15px] ${
                isMenuShowed ? "pl-[60px]" : "justify-center"
              } flex whitespace-nowrap gap-[15px] xs:text-[12px]`}
            >
              <Image
                src={isMenuShowed ? hideMenuIcon : showMenuIcon}
                alt={"icon"}
                className="w-6 h-6"
              />
              {isMenuShowed && (
                <div className="text-[#CB9E31]">{t("main.hideMenu")}</div>
              )}
            </div>
          </li>
          {navLinks.map((link) => (
            <li key={link.href + link.name}>
              <Link
                className={clsx(
                  pathname.includes(link.href) &&
                    isMenuShowed &&
                    "bg-gradientDashboard",
                  pathname.includes(link.href) &&
                    !isMenuShowed &&
                    "bg-[#21232F]",
                  `py-[15px] ${
                    isMenuShowed ? "pl-[60px] rounded-r-xl " : "justify-center"
                  } items-center flex whitespace-nowrap gap-[15px] xs:text-[12px]`,
                  seeUser && "pointer-events-none"
                )}
                href={link.href}
              >
                {link.icon && (
                  <Image src={link.icon} alt={"icon"} className="w-6 h-6" />
                )}
                {isMenuShowed && link.name}
                {link.sprite && (
                  <Image
                    src={link.sprite}
                    alt={"sprite"}
                    className="w-[20px]"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav
        className={`2xl:hidden ${
          isNavShow ? " flex " : " hidden "
        } w-full h-full p-2.5 h-auto bg-black absolute z-[10] fixed`}
      >
        <ul
          className="h-full w-full flex flex-col gap-[15px] overflow-y-auto"
        >
          {navLinks.map((link) => (
            <li key={link.href + link.name}>
              <Link
                className={clsx(
                  pathname.includes(link.href) &&
                    isMenuShowed &&
                    "bg-gradientDashboard",
                  pathname.includes(link.href) &&
                    !isMenuShowed &&
                    "bg-[#21232F]",
                  `py-[15px] ${
                    isMenuShowed ? "pl-[60px] rounded-r-xl " : "justify-center"
                  } items-center flex whitespace-nowrap gap-[15px] xs:text-[12px]`,
                  seeUser && "pointer-events-none"
                )}
                href={link.href}
              >
                {link.icon && (
                  <Image src={link.icon} alt={"icon"} className="w-6 h-6" />
                )}
                {isMenuShowed && link.name}
                {link.sprite && (
                  <Image
                    src={link.sprite}
                    alt={"sprite"}
                    className="w-[20px]"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
