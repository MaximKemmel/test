import React, { useMemo } from "react";
import { UserInfo } from "@/lib/interfaces";
import Image from "next/image";
import { useLocale } from "next-intl";
import { usePopupAvatarStore } from "@/store/toggle-stores";
import { useAuthStore } from "@/store/auth-store";
import { getImageUrl } from "@/lib/data";
import settingsIcon from "/public/images/profile/settings.png";

interface AvatarProps {
  seeUser?: UserInfo;
}

const Avatar = ({ seeUser }: AvatarProps) => {
  const locale = useLocale();
  const { userInfo } = useAuthStore();

  const { open } = usePopupAvatarStore();

  const onOpenModal = () => {
    if (!seeUser) {
      open();
    }
  };

  const hasAvatar = useMemo(() => {
    if (seeUser?.Profile?.avatar) {
      return getImageUrl(seeUser?.Profile?.avatar);
    } else if (userInfo?.currentUser?.Profile?.avatar) {
      return getImageUrl(userInfo?.currentUser?.Profile?.avatar);
    }
    return null;
  }, [seeUser, userInfo]);

  return (
    <div className="p-[2px] rounded-full bg-gradientDashboardRadial relative lg:w-[114px] w-[79px] lg:h-[114px] h-[79px]">
      {hasAvatar ? (
        <Image
          onClick={onOpenModal}
          src={hasAvatar}
          className="rounded-full lg:w-[110px] w-[75px] lg:h-[110px] h-[75px] relative object-cover"
          alt="img"
        />
      ) : (
        <div className="rounded-full lg:w-[110px] w-[75px] lg:h-[110px] h-[75px] relative bg-black" />
      )}
      <div
        className="absolute flex items-center justify-center w-6 h-6 rounded-full bg-black border-white border-[1px] border-solid z-1 lg:bottom-[6px] bottom-0 lg:right-[6px] right-0 cursor-pointer"
        onClick={onOpenModal}
      >
        <Image src={settingsIcon} alt={"log"} className="w-[19px] h-[19px]" />
      </div>
    </div>
  );
};

export default Avatar;
