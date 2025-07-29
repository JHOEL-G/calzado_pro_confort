"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartProps } from "./Chart.types";
import { da } from "date-fns/locale";

export function Chart(props: ChartProps) {
    const { companies, events } = props;

    const data = companies.map((company) => ({
        name:
            company.nombre.length > 10
                ? company.nombre.slice(0, 10) + "..."
                : company.nombre,
        eventsByCompany: events.filter((event) => event.location === company.nombre)
            .length,
    }));

    return (
        <div className="h-[550px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="eventsByCompany" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
