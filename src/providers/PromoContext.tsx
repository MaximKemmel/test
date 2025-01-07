import React from "react";
import {Promo} from "@/lib/interfaces";

interface PromoContextProps {
    promos: Promo[]
}

const PromoContext = React.createContext<PromoContextProps | null>(null);

const PromoProvider = PromoContext.Provider

const usePromoContext = () => {
    const data = React.useContext(PromoContext)

    if (!data) {
        throw new Error(`Невозможно использовать usePromoContext вне PromoProvider`)
    }

    return data;
}

export {PromoProvider, usePromoContext}
