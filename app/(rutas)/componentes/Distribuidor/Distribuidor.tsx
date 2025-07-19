import { CustonIcon } from "@/components/CustonIcon/CustonIcon";
import { BarChart } from "lucide-react";
import { Graficos } from "../Graficos";

export function Distribuidor() {
    return (
        <div className="p-6 xl: rounded-2xl ring-1 ring-indigo-500/30 hover:ring-indigo-500 bg-background dark:bg-zinc-900 h-full transition ">
            <div className="flex gap-x-3 items-center">
                <CustonIcon icon={BarChart} />
                <h2 className="text-lg font-bold text-text text-indigo-500">DISTRIBUIDOR</h2>
            </div>
            <div className="mt-1 p-2 bg-background dark:bg-transparent rounded-xl shadow-sm">
                <Graficos />
            </div>
        </div>
    )
}
