import React, {ReactNode} from 'react';
import DashboardArrow from "@/components/dashboard/DashboardArrow";
import clsx from "clsx";

interface ProgramBodyProps {
    children: ReactNode
    className?: string
    bodyClassName?: string
}

const ProgramBody = ({children, className, bodyClassName}: ProgramBodyProps) => {
    return (
        <div className={clsx("pb-[46px] xs:pb-0 select-none", bodyClassName)}>
            <div className="flex items-center mt-[30px] mb-[46px] xs:mt-[20px] xs:mb-0 w-full">
                <DashboardArrow className="mr-auto xs:hidden" position={'left'}/>
                <div
                    className={clsx(" p-[50px] w-[90%] xs:p-[20px] xs:justify-between cursor-pointer relative xs:space-y-3 xs:h-auto min-h-[375px] rounded-[11px] xs:w-full bg-dashboard-page border-[2px] border-solid border-main-gold flex flex-col",
                        className)}>
                {children}
                </div>
                <DashboardArrow className="ml-auto xs:hidden" position={'right'}/>
            </div>
        </div>
    );
};

export default ProgramBody;