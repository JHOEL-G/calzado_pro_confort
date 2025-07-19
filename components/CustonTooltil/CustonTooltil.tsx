import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { CustonTooltilProps } from "./CustonTooltil.type";
import { Info } from "lucide-react";

export function CustonTooltil(props: CustonTooltilProps) {
    const { content } = props
    return (
        <Tooltip>
            <TooltipTrigger>
                <Info strokeWidth={1} className="h-5 w-5" />
            </TooltipTrigger>
            <TooltipContent>
                <p>{content}</p>
            </TooltipContent>
        </Tooltip>)
}
