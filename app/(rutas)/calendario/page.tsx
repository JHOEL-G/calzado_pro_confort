import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
    const { userId, sessionId } = auth(); // Necesitas sessionId para obtener el token JWT

    if (!userId) {
        return redirect("/");
    }

    let authorizationHeader = {};

    // Si hay una sesión activa, obtenemos el token JWT de Clerk
    if (sessionId) {
        try {
            // Obtener la sesión completa para generar el JWT
            // 'auth().getSession()' es el método correcto en Server Components
            const session = await auth().getSession();

            // Generar un JWT. DEBES tener una plantilla JWT configurada en tu dashboard de Clerk
            // bajo "JWT Templates" para que tu backend pueda verificarlo.
            // Reemplaza 'your-backend-jwt-template' con el nombre de tu plantilla.
            const token = await session.getToken({ template: 'your-backend-jwt-template' });

            if (token) {
                authorizationHeader = { Authorization: `Bearer ${token}` };
            }
        } catch (error) {
            console.error("Error al obtener el token JWT de Clerk:", error);
            // Considera cómo quieres manejar este error (ej. redirigir, mostrar un mensaje)
        }
    }

    try {
        // Usamos la variable de entorno NEXT_PUBLIC_API_URL para la URL de tu backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/conpanie`, {
            method: 'GET', // O el método HTTP que uses (POST, PUT, etc.)
            headers: {
                "Content-Type": "application/json",
                ...authorizationHeader, // Incluimos el header de autorización con el JWT
            },
            // Si los datos cambian frecuentemente, considera deshabilitar el caché de Next.js:
            // cache: 'no-store' 
        });

        if (!response.ok) {
            // Manejo de errores de respuesta HTTP (ej. 401 Unauthorized, 403 Forbidden, 500 Internal Server Error)
            console.error(`Error al obtener la compañía: ${response.status} - ${response.statusText}`);
            if (response.status === 401 || response.status === 403) {
                // Redirigir a la página de inicio de sesión si no está autorizado
                return redirect("/sign-in");
            }
            // Para otros errores, lanzar una excepción para que sea capturada por el catch
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const conpanie = await response.json();

        return (
            <div>
                <h1>Información de la Compañía</h1>
                <pre>{JSON.stringify(conpanie, null, 2)}</pre>
            </div>
        );
    } catch (error) {
        console.error("Error en la solicitud a la API de la compañía:", error);
        // Puedes mostrar un mensaje de error al usuario
        return <div>Hubo un problema al cargar la información de la compañía.</div>;
    }
}