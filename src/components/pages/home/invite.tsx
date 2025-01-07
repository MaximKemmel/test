import {aldrich} from '@/styles/fonts';
import InviteButton from "@/components/button/InviteButton";
import {useTranslations} from "next-intl";


export default function HomeInvite() {

    const t = useTranslations('Home');

    return (
        <div className=" mt-20 py-9 bg-[url('/images/home/back-result.jpg')] bg-cover">
            <div className="container flex flex-col items-center">
                <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-8">
                    <div className="text-center space-y-5">
                        <p className=" text-home-h4 font-semibold"
                           dangerouslySetInnerHTML={{__html: t.raw('home.invite.register_price')}}></p>
                        <p className={` ${aldrich.className} text-home-h2`}>40$, USDT</p>
                        <p className={` ${aldrich.className} text-home-h2`}>+ 10$ BNB</p>
                    </div>
                    <div className="text-center space-y-5">
                        <p className={` text-home-h4 font-semibold`}
                           dangerouslySetInnerHTML={{__html: t.raw('home.invite.total_income')}}></p>
                        <p className={` ${aldrich.className} text-home-h2`}>110$, USDT</p>
                    </div>
                </div>
                <InviteButton join={t('home.btn.join')}/>
            </div>
        </div>
    );
}
