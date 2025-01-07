import React from "react";
import {UserInfo} from "@/lib/interfaces";

interface SeeAddressContextProps {
    seeAddress?: string
    seeUser?: UserInfo
}

const SeeAddressContext = React.createContext<SeeAddressContextProps | null>(null);

const SeeAddressProvider = SeeAddressContext.Provider

const useSeeAddressContext = () => {
    const data = React.useContext(SeeAddressContext)

    if (!data) {
        throw new Error(`Невозможно использовать useSeeAddressContext вне SeeAddressProvider`)
    }

    return data;
}

export {SeeAddressProvider, useSeeAddressContext}
