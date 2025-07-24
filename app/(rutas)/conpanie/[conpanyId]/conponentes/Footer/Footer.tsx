"use client";

import { useRouter } from "next/navigation";
import { FooterProps } from "./Footer.type"; // Asegúrate de que FooterProps contenga conpanyId
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner"; // Asegúrate de que sonner esté configurado en tu proyecto
import axios from "axios";

export function Footer(props: FooterProps) {
    // conpanyId debe ser el ID del CONTACTO que quieres eliminar en este contexto.
    const { conpanyId } = props;
    const router = useRouter();

    const onDelete = async () => {
        // Opcional: Añadir una confirmación al usuario antes de eliminar
        if (!window.confirm("¿Estás seguro de que quieres eliminar este contacto? Esta acción no se puede deshacer.")) {
            return; // Si el usuario cancela, no hacemos nada
        }

        try {
            // *** IMPORTANTE: Verifica que 'conpanyId' sea el ID del Contacto y que sea un número válido ***
            const idContactoAEliminar = parseInt(String(conpanyId), 10); // Asegura que se parsea a entero

            if (isNaN(idContactoAEliminar)) {
                toast.error("ID de contacto inválido para eliminar.");
                return;
            }

            // *** La URL debe apuntar al endpoint DELETE de Contacto en tu API ***
            // Tu ContactoController.cs tiene: [HttpDelete("{id}")] y [Route("api/[controller]")]
            // Esto significa que la URL correcta es /api/Contacto/{id}
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Contacto/${idContactoAEliminar}`;

            console.log("Intentando eliminar contacto con ID:", idContactoAEliminar);
            console.log("URL de eliminación:", apiUrl);

            await axios.delete(apiUrl); // Usa await para que el try/catch funcione correctamente

            toast.success("Contacto eliminado correctamente.");
            // Después de eliminar, podrías redirigir a la página principal de contactos
            // o a la página de la compañía si 'conpany' es la lista de contactos.
            router.push("/conpany"); // Asumiendo que /conpany es la ruta donde se listan los contactos

        } catch (error) {
            console.error("Error al eliminar el contacto:", error); // Loguea el error para depuración
            if (axios.isAxiosError(error) && error.response) {
                // Si es un error de Axios y hay una respuesta del servidor
                console.error("Respuesta de error del servidor:", error.response.data);
                toast.error(`Error al eliminar el contacto: ${error.response.data?.title || error.message || error.response.statusText}`);
            } else {
                toast.error("Error al eliminar el contacto. Por favor, inténtalo de nuevo.");
            }
        }
    }

    return (
        <div className="flex justify-end mt-5">
            {/* El texto del botón ahora refleja que se elimina un contacto */}
            <Button variant={"destructive"} onClick={onDelete}>
                <Trash className="mr-2 h-4 w-4" />
                Eliminar Contacto
            </Button>
        </div>
    );
}