'use client'
import React from 'react';
import {metamaskWallet, ThirdwebProvider, trustWallet, walletConnect} from "@thirdweb-dev/react";
import CheckAuthProvider from "@/providers/CheckAuthProvider";

const HeaderWrapper = ({children}: {children: React.ReactNode}) => {
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
            <CheckAuthProvider >
                {children}
            </CheckAuthProvider>
        </ThirdwebProvider>
    );
};

export default HeaderWrapper;