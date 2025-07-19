"use client"

import { SidebarItems } from "../SidebarItems/SidebarItems";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { dataGeneralSidebar, dataSuportSidebar, dataToolsSidebar } from "./SidebarRoutes.data";

export function SidebarRoutes() {
    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <div className="p-2 md:p-6">
                    <p className="text-slate-500 mb-2">HOME GENERAL</p>
                    {dataGeneralSidebar.map((item) => (
                        <SidebarItems key={item.label} item={item} />
                    ))}
                </div>

                <Separator />
                <div className="p-2 md:p-6">
                    <p className="text-slate-500 mb-2">AGREGAR PRODUCTO</p>
                    {dataToolsSidebar.map((item) => (
                        <SidebarItems key={item.label} item={item} />
                    ))}
                </div>

                <Separator />

                <div className="p-2 md:p-6">
                    <p className="text-slate-500 mb-2">CONFIGURACION</p>
                    {dataSuportSidebar.map((item) => (
                        <SidebarItems key={item.label} item={item} />
                    ))}
                </div>

            </div>
            <div className="">
                <div className="text-center p-6">
                    <Button variant="outline" className="w-full" >
                        LOS PLANES
                    </Button>
                </div>

                <Separator />

                <footer className="mt-3 p-3 text-center">
                    2025 los derechos reservados
                </footer>
            </div>
        </div>
    )
}
