import React from 'react';
import {TreeType} from "@/components/dashboard/DashboardPage";
import {clsx} from "clsx";
import {Tooltip} from "flowbite-react";

const getNextSize = (val: number) => {
    switch (val) {
        case 80: {
            return 75
        }
        case 75: {
            return 50
        }
        case 50: {
            return 26
        }
        case 26: {
            return 0
        }
        default: {
            return 26
        }
    }
}

const TreeElementChild = ({tree}: {
    tree: TreeType
}) => {

    return <div className="flex flex-col justify-around items-center  w-full">
        <div
            className={clsx("rounded-full border-solid border-[2.5px]  flex justify-center items-center", !tree.id ? 'bg-main-gray-2 border-[#FF1F00]' : 'bg-white border-[#171ED6]')}
            style={{height: tree.size, width: tree.size}}>
            {(tree.id) ? <Tooltip content={tree.id} placement="bottom">
                <div style={{fontSize: tree.size / 4}}
                     className="max-w-[80%] overflow-hidden text-ellipsis !font-[550] text-[#191919]">{tree.id}</div>
            </Tooltip> : null}
        </div>
        {Boolean(tree?.children?.length === 1 && tree.size > 26) ?
            <div className="flex w-full items-start justify-evenly mt-7.5 sm:mt-5 first:mt-0">
                <div className="relative flex w-full justify-evenly items-start">
                    {[{id: null, size: getNextSize(tree.size), children: []}, ...tree?.children]?.map((el, idx) => {
                        return <TreeElementChild key={idx} tree={el}/>
                    })}
                </div>
            </div> : null}
        {(tree?.children?.length && tree.size > 26 && tree?.children?.length !== 1) ?
            <div className="flex w-full items-start justify-evenly mt-7.5 sm:mt-5 first:mt-0">
                <div className="relative flex w-full justify-evenly items-start">
                    {tree?.children?.map((el, idx) => {
                        return <TreeElementChild key={idx} tree={el}/>
                    })}
                </div>
            </div> : null}
        {Boolean(!tree?.children?.length && tree.size > 26) ?
            <div className="flex w-full items-start justify-evenly mt-7.5 sm:mt-5 first:mt-0">
                <div className="relative flex w-full justify-evenly items-start">
                    {[{id: null, size: getNextSize(tree.size), children: []}, {id: null, size: getNextSize(tree.size), children: []}]?.map((el, idx) => {
                        return <TreeElementChild key={idx} tree={el}/>
                    })}
                </div>
            </div> : null}
    </div>
}

export default TreeElementChild;