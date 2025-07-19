import { CustonIcon } from "@/components/CustonIcon/CustonIcon";
import { Building } from "lucide-react";
import { CustomersTable } from "../CustomersTable";

export function LastCustomers() {
    return (
        <div className="p-6 rounded-2xl ring-1 ring-indigo-500/30 hover:ring-indigo-500 bg-transparent dark:bg-zinc-900 h-full transition">
            <div className="flex items-center gap-x-3">
                <CustonIcon icon={Building} />
                <h2 className="text-lg font-bold text-text text-indigo-500">LOS CLIENTES</h2>
            </div>
            <div className="">
                <CustomersTable />
            </div>
        </div>
    )
}
