"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export function Logo({ collapsed = false }: { collapsed?: boolean }) {
    const router = useRouter()

    return (
        <div
            className={`min-h-20 h-20 flex items-center border-b cursor-pointer transition-all duration-300 ${collapsed ? "justify-center px-0" : "px-6 gap-2"}`}
            onClick={() => router.push("/")}
        >
            <Image src="/logo.png" alt="logo" width={30} height={20} priority />
            {!collapsed && <h1 className="font-bold text-xl">Pro Confort</h1>}
        </div>
    )
}
