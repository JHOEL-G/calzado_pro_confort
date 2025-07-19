import { CustonIcon } from "@/components/CustonIcon/CustonIcon";
import { List } from "lucide-react";
import { TablaIntegraciones } from "../TablaIntegraciones";

export function Integraciones() {
    return (
        <div className="shadow-sm bg-background rounded-lg p-5 flex-1">
            <div className="flex gap-x-2 items-center">
                <CustonIcon icon={List} />
                <h2 className="text-lg font-bold">Integraciones</h2>
            </div>
            <TablaIntegraciones />
        </div>
    )
}
