import { Logo } from "@/components/Logo/Logo";

export default function Disposicion({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-center h-full items-center">
            <Logo />
            <h1 className="text-3xl my-2">
                BIENVENIDO AL PANEL
            </h1>
            <h2 className="text-2xl mb-3">LOGIN</h2>
            {children}
        </div>
    )
}
