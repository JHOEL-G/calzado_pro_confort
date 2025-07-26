"use client"

import Link from "next/link";
import { SidebarItemsProps } from "./SidebarItems.type";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function SidebarItems(props: SidebarItemsProps & { collapsed?: boolean }) {
    const { item, collapsed = false } = props;
    const { href, icon: Icon, label } = item;

    const pathname = usePathname();
    const activePath = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center mt-2 p-2 rounded-lg cursor-pointer transition-all text-sm hover:bg-slate-300/20 dark:text-white light:text-slate-700",
                collapsed ? "justify-center" : "gap-x-2",
                activePath && "bg-slate-400/20"
            )}
        >
            <Icon strokeWidth={1} className="w-5 h-5" />
            {!collapsed && <span>{label}</span>}
        </Link>
    );
}
