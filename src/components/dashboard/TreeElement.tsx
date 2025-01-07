import React, {memo} from 'react';
import {TreeType} from "@/components/dashboard/DashboardPage";
import TreeElementChild from "@/components/dashboard/TreeElementChild";

interface TreeElementProps {
    tree: TreeType[]
}

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

const TreeElement = ({tree}: TreeElementProps) => {

    return (
        <div className="flex w-full items-start justify-evenly mt-7.5 sm:mt-5 first:mt-0">
            <div className="relative flex w-full justify-evenly items-start">
                {tree?.length === 1 ? [...tree, {id: null, size: getNextSize(80), children: []}].map((element, idx) => {
                    return <TreeElementChild tree={element} key={idx}/>
                }) : tree?.length ? tree.map((element, idx) => {
                    return <TreeElementChild tree={element} key={idx}/>
                }) : [{id: null, size: getNextSize(80), children: []}, {id: null, size: getNextSize(80), children: []}].map((element, idx) => {
                    return <TreeElementChild tree={element} key={idx}/>
                })}
            </div>
        </div>
    );
};

export default memo(TreeElement);