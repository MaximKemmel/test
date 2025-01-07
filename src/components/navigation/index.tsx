'use client';

import { usePopupRegistration } from "@/store/toggle-stores";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const registerPopup = usePopupRegistration.getState()

export function NavigatorComponent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    useEffect(()=>{
        if(searchParams.get("referralID")) registerPopup.open();
    },[searchParams]);
    return null;
}