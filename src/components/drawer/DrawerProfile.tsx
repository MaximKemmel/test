import React, {useEffect, useRef} from 'react';
import {Drawer as DrawerFlowbite} from 'flowbite'
import {useBoolean} from "usehooks-ts";
import DrawerClose from "@/components/drawer/DrawerClose";
import {usePathname} from "next/navigation";
import Image from "next/image";
import {RightMenu} from "@/components/navigation/right-menu";

const DrawerProfile = () => {
    let ref = useRef<any>(null)
    const pathname = usePathname()
    const {value, toggle, setFalse} = useBoolean(false)

    useEffect(() => {
        const $targetEl = document.getElementById('drawer-profile');

        const options = {
            placement: 'right',
            backdrop: false,
            bodyScrolling: false,
            edge: false,
            edgeOffset: '',
        };

        ref.current = new DrawerFlowbite($targetEl, options)
    }, [])

    useEffect(() => {
        if (ref?.current) {
            ref?.current.hide();
            setFalse()
        }
    }, [pathname]);

    return (
        <div>
            {value ? <DrawerClose className="h-[30px] w-[30px]" onClick={() => {
                if (ref) {
                    ref?.current?.toggle()
                    toggle()
                }
            }}/> : <button onClick={() => {
                if (ref) {
                    ref?.current?.toggle()
                    toggle()
                }
            }} className="h-[30px] w-[30px] flex items-center justify-center" >
                <Image width={40} height={40} src={'/images/avatar.png'} alt={'avatar'}/>
            </button>}
            <div id="drawer-profile" style={{height: 'calc(100% - 90px)'}} data-drawer='false' className="overflow-y-auto fixed flex flex-col gap-y-[16px] top-[90px] bg-main-black-drawer right-0 z-40 h-screen pt-[15px] px-[27px] pb-[15px]
              transition-transform translate-x-full w-full items-start">
                <RightMenu className="hidden xs:flex"/>
            </div>
        </div>
    );
};

export default DrawerProfile;
