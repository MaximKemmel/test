'use client'
import {lazy, ReactNode, Suspense} from "react";
import {
    metamaskWallet,
    ThirdwebProvider, trustWallet, walletConnect,
} from "@thirdweb-dev/react";
import {NavigatorComponent} from "@/components/navigation";
import {usePopupConnect} from "@/store/toggle-stores";

const RegistrationPopup = lazy(() => import('@/components/registration'));
const ConnectionPopup = lazy(() => import('@/components/registration/connection'));
const AutoPopup = lazy(() => import('@/components/registration/auto'));


export default function SeeLayout({children}: { children: ReactNode, params: { locale: string } }) {

    const {isOpen} = usePopupConnect();

    return (
        <ThirdwebProvider
            activeChain={Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 97}
            clientId={'d7d3dcffc181adfae3f16986918e78ea'}
            supportedWallets={[
            metamaskWallet(),
            walletConnect(),
            trustWallet(),
        ]}
        >
                {children}
            <Suspense>
                <RegistrationPopup/>
            </Suspense>
            {isOpen ? <Suspense><ConnectionPopup/></Suspense> : null}
            <Suspense>
                <AutoPopup/>
            </Suspense>
            <NavigatorComponent/>
        </ThirdwebProvider>
    )
}
