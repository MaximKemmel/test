import type { Metadata } from "next";
import "@/styles/globals.css";
import { ptsans } from "@/styles/fonts";
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider, useMessages } from "next-intl";

export const metadata: Metadata = {
  title: "100Х-Booster.io",
};

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const messages = useMessages();

  return (
    <html lang={params.locale}>
      <body className={ptsans.className}>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <NextTopLoader height={4} color="#fff" showSpinner={true} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
