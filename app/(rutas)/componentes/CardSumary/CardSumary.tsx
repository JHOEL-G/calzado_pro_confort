import { CustonIcon } from "@/components/CustonIcon/CustonIcon";
import { CardSumaryProps } from "./CardSumary.type";
import { CustonTooltil } from "@/components/CustonTooltil/CustonTooltil";
import { cn } from "@/lib/utils";
import { MoveDownRight, MoveUpRight, TrendingUp } from "lucide-react";

export function CardSumary(props: CardSumaryProps) {
    const { average, icon: Icon, title, tooltipText, total } = props

    return (
        <div className="shadow-sm bg-background rounded-lg p-5 py-3 hover:shadow-lg transition">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <CustonIcon icon={Icon} />
                    {title}
                </div>
                <CustonTooltil
                    content={tooltipText} />
            </div>
            <div className="flex gap-4 mt-2 md:mt-4">
                <p className="text-2xl">{total}</p>
                <div className={cn(`flex items-center gap-1 px-2 text-xs text-white rounded-lg h-[20px] bg-black dark:bg-secondary`)}>
                    {average}%

                    {average < 20 && (
                        <MoveDownRight strokeWidth={2} className="h-4 w-4" />
                    )}

                    {average > 20 && average < 70 && (
                        <MoveUpRight strokeWidth={2} className="h-4 w-4" />
                    )}

                    {average > 70 && average < 100 && (
                        <TrendingUp strokeWidth={2} className="h-4 w-4" />
                    )}
                </div>
            </div>
        </div>
    )
}
