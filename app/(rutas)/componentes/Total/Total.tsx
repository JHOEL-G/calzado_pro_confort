"use client";

import { CustonIcon } from "@/components/CustonIcon/CustonIcon"
import { Percent } from "lucide-react"
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { dataTotal } from "./Total.data"


export function Total() {
    return (
        <div className="mb-4 lg:mb-0 shadow-sm bg-background rounded-lg p-5 w-full xl:w-96 hover:shadow-lg transition">
            <div className="flex gap-x-3 items-center mb-4">
                <CustonIcon icon={Percent} />
                <h2 className="text-lg font-bold text-text text-indigo-500">DIAGRAMA CIRCULAR</h2>
            </div>
            <div className="w-full h-[200px] p-10 items-center justify-center">
                <ResponsiveContainer aspect={1} maxHeight={200}>
                    <PieChart className="transition hover:bg-transparent">
                        <Pie dataKey="value" data={dataTotal} outerRadius={90} labelLine={false} />
                        <Tooltip />
                        <Legend height={1} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
