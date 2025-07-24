import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Mail, Phone } from "lucide-react";

type Contacto = {
    id: number;
    nombre: string;
    apellido: string;
    role: string;
    correo: string;
    telefono: string;
};

export async function ListadoContacto() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Contacto`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        console.error("Error al cargar contactos. Estado HTTP:", res.status);
        const errorText = await res.text();
        console.error("Mensaje de error de la API:", errorText);
        return <div>Error al cargar contactos: {res.statusText || 'Error desconocido'}</div>;
    }

    const contactos: Contacto[] = await res.json();

    if (!Array.isArray(contactos) || contactos.length === 0) {
        return <div>No hay contactos disponibles.</div>;
    }

    return (
        <div className="mt-4">
            <div className="grid grid-cols-4 p-2 px-4 mb-2 rounded-lg gap-x-3 bg-slate-400/20">
                <p>Nombre</p>
                <p>Apellido</p>
                <p>Rol</p>
                <p className="text-right">Contacto</p>
            </div>

            {contactos.map((contacto) => (
                <div key={contacto.id} className="grid grid-cols-4 px-4 gap-x-3">
                    <p>{contacto.nombre}</p>
                    <p>{contacto.apellido}</p>
                    <p>{contacto.role}</p>
                    <div className="flex items-center justify-end gap-x-6">
                        <a href={`tel:${contacto.telefono}`}>
                            <Phone className="w-4 h-4" />
                        </a>
                        <a href={`mailto:${contacto.correo}`}>
                            <Mail className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}