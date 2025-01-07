type IconProps = {
    name: string
    className: string
    onClick?: any
}

export function Sprite({
    name,
    className,
    onClick
}: IconProps): JSX.Element {
    return (
        <svg onClick={onClick} className={`${className} ${onClick && 'cursor-pointer'}`}>
            <use className=" pointer-events-none" xlinkHref={`/sprite.svg#${name}`} />
        </svg>
    )
}