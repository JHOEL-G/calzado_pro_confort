"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { dataGraficos } from "./Graficos.data"

export function Graficos() {
    return (
        <div className="mt-5">
            <p className="text-3xl mb-3">24.290</p>
            <div className="flex gap-x-5 mb-5">
                <div className="flex items-center gap-2 px-3 text-md bg-[#16C8C7] text-white rounded-xl w-fit">
                    <TrendingUp strokeWidth={3} className="h-4 w-4" />
                </div>
                <p className="text-slate-500">439 incrementando</p>
            </div>
            <div className="h-[290px]">
                <ResponsiveContainer width="103%" height="100%">
                    <AreaChart width={730} height={250} data={dataGraficos} margin={{ top: 5, right: 20, left: -8, bottom: -6 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="3">
                                <stop offset="5%" stopColor="#887CFD" stopOpacity={1} />
                                <stop offset="95%" stopColor="#887CFD" stopOpacity={0.2} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={1} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="año" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="newCustomer" stroke="#887CFD" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="oldCustomer" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
