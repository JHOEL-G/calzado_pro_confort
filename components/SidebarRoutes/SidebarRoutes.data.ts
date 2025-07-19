import { BarChart4, Building2, Calendar, CircleHelpIcon, PanelsTopLeft, Settings, ShieldCheck } from "lucide-react";

export const dataGeneralSidebar = [
    {
        icon: PanelsTopLeft,
        label: "PANEL",
        href: "/",
    },
     {
        icon: Building2,
        label: "PRODUCTO",
        href: "/conpanie",
    },
     {
        icon: Calendar,
        label: "CALENDARIO",
        href: "/task",
    },
]

export const dataToolsSidebar = [
    {
        icon: CircleHelpIcon,
        label: "RESUMEN",
        href: "/fasq",
    },
     {
        icon: BarChart4,
        label: "ANALISADOR",
        href: "/analitic",
    },
]

export const dataSuportSidebar = [
    {
        icon: Settings,
        label: "CONFIGURACION",
        href: "/configuracion",
    },
     {
        icon: ShieldCheck,
        label: "SEGURIDAD",
        href: "/seguridad",
    },
]