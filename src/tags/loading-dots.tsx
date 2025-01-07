import clsx from "clsx";

export function LoadingDots() {
    return(
        <div className={clsx("dots flex items-center space-x-1")}>
            <div className="dot-1 w-1 h-1 bg-white rounded-full"/>
            <div className="dot-2 w-1 h-1 bg-white rounded-full"/>
            <div className="dot-3 w-1 h-1 bg-white rounded-full"/>
        </div>
    )
}