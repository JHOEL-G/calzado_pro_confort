// components/Navbar.tsx
import { Menu, Search, ChevronsLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../ui/sheet";
import { Input } from "../ui/input";
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs"; // Importa estos
import { SidebarRoutes } from "../SidebarRoutes/SidebarRoutes";
import { Tema } from "../Tema";

export function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
    return (
        <nav className="flex items-center px-2 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-20">
            <div className="block xl:hidden">
                <Sheet>
                    <SheetTrigger className="flex items-center">
                        <Menu />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetTitle className="sr-only">Menú lateral</SheetTitle>
                        <SidebarRoutes />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="hidden xl:block">
                <button onClick={onToggleSidebar} className="p-1 text-muted-foreground hover:text-foreground">
                    <ChevronsLeft className="w-5 h-5" />
                </button>
            </div>

            <div className="relative w-[300px]">
                <Input placeholder="Busqueda ..." className="rounded-lg" />
                <Search strokeWidth={2} className="absolute top-[7px] right-2" />
            </div>

            <div className="flex gap-x-2 items-center">
                <div className="hidden xl:block p-2">
                    <Tema />
                </div>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="text-sm sm:text-base px-3 sm:px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                            Iniciar Sesión
                        </button>
                    </SignInButton>

                    <SignUpButton mode="modal">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base px-4 py-2 rounded-lg transition-colors shadow-sm">
                            Registrarse
                        </button>
                    </SignUpButton>

                </SignedOut>
            </div>
        </nav>
    );
}