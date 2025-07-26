import { Logo } from "../Logo/Logo";
import { SidebarRoutes } from "../SidebarRoutes/SidebarRoutes";

export function Sidebar({ collapsed }: { collapsed: boolean }) {
    return (
        <div className="h-screen flex flex-col border-r transition-all duration-300 bg-background">
            <div className="p-4">
                <Logo collapsed={collapsed} />
            </div>
            <SidebarRoutes collapsed={collapsed} />
        </div>
    );
}
