import { CustonIconProps } from "./CustonIcon.type";

export function CustonIcon(props: CustonIconProps) {
    const { icon: Icon } = props
    return (
        <div className="p-2 bg-white/10 dark:bg-zinc-800/40 rounded-lg">
            <Icon strokeWidth={1} className="w-4 h-4 " />
        </div>
    )
}
