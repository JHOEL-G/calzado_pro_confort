"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar/Navbar";
import { Sidebar } from "@/components/Sidebar/Sidebar";

export default function Layout({ children }: { children: React.ReactElement }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex w-full h-full">
            <div
                className={`
                    hidden xl:block xl:fixed h-full 
                    transition-all duration-300 ease-in-out 
                    ${collapsed ? "w-20" : "w-60"}
                `}
            >
                <Sidebar collapsed={collapsed} />
            </div>

            <div
                className={`
                    w-full transition-all duration-300 ease-in-out 
                    ${collapsed ? "xl:ml-20" : "xl:ml-60"}
                `}
            >
                <Navbar onToggleSidebar={() => setCollapsed(!collapsed)} />
                <div className="p-6 bg-stone-100 dark:bg-stone-800 min-h-screen">
                    {children}
                </div>
            </div>
        </div>
    );
}
