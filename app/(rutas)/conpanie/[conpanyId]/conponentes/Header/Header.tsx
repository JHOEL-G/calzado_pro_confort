"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Header() {

    const router = useRouter()

    return (
        <div className="flex items-center text-xl pb-4 pl-3">
            <ArrowLeft
                className="w-5 h-5 mr-2 cursor-pointer"
                onClick={() => router.push("/conpanie")}
            />
            <h3 className="font-bold">Inventario</h3>
        </div>
    );
}
