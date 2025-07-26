"use client"

import { SidebarItems } from "../SidebarItems/SidebarItems";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { dataGeneralSidebar, dataSuportSidebar, dataToolsSidebar } from "./SidebarRoutes.data";

export function SidebarRoutes({ collapsed = false }: { collapsed?: boolean }) {
    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                {/* HOME */}
                <div className={`p-2 ${collapsed ? "px-1" : "md:p-5"}`}>
                    {!collapsed && <p className="text-slate-500 mb-2">HOME GENERAL</p>}
                    {dataGeneralSidebar.map((item) => (
                        <SidebarItems key={item.label} item={item} collapsed={collapsed} />
                    ))}
                </div>

                <Separator />
                {/* TOOLS */}
                <div className={`p-2 ${collapsed ? "px-1" : "md:p-6"}`}>
                    {!collapsed && <p className="text-slate-500 mb-2">AGREGAR PRODUCTO</p>}
                    {dataToolsSidebar.map((item) => (
                        <SidebarItems key={item.label} item={item} collapsed={collapsed} />
                    ))}
                </div>

                <Separator />
                {/* CONFIG */}
                <div className={`p-2 ${collapsed ? "px-1" : "md:p-6"}`}>
                    {!collapsed && <p className="text-slate-500 mb-2">CONFIGURACION</p>}
                    {dataSuportSidebar.map((item) => (
                        <SidebarItems key={item.label} item={item} collapsed={collapsed} />
                    ))}
                </div>
            </div>

            <div>
                <div className={`text-center ${collapsed ? "p-2" : "p-6"}`}>
                    {!collapsed && (
                        <Button variant="outline" className="w-full">
                            LOS PLANES
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
