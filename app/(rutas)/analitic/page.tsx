import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { Chart } from "./components/Chart"; // Asegúrate de que esta ruta sea correcta

// Importa los tipos Company y Event definidos en tu frontend,
// que deben coincidir con la estructura JSON que tu backend envía.
// Asumo que están en "./components/Chart/Chart.types"
import { Company, Event } from "./components/Chart/Chart.types";

export default async function page() {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/analitic");
    }

    // *** PASO CLAVE: Define la URL base de tu backend .NET Core 8 ***
    // Es buena práctica usar variables de entorno para esto.
    // Asegúrate de que NEXT_PUBLIC_API_URL esté definido en tu archivo .env.local
    // Por ejemplo: NEXT_PUBLIC_API_URL=https://localhost:7001/api
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    // Puedes añadir una verificación básica si la URL no está configurada
    if (!API_BASE_URL) {
        console.error("NEXT_PUBLIC_API_URL no está definida en las variables de entorno.");
        // Podrías redirigir a una página de error o mostrar un mensaje
        return <div>Error: La configuración de la API no está completa.</div>;
    }

    let companies: Company[] = [];
    let events: Event[] = [];

    try {
        // --- 1. Obtener Empresas (Products) desde tu backend .NET Core ---
        // Asumo que tienes un controlador para tus "conpanies" (productos)
        // y que tiene un endpoint como /api/companies que puede filtrar por userId.
        const companiesResponse = await fetch(`${API_BASE_URL}/api/Products?userId=${userId}`); // Ajusta "/Companies" si tu controlador tiene otro nombre (ej. "/Products")

        if (!companiesResponse.ok) {
            console.error('Error al cargar empresas:', companiesResponse.status, companiesResponse.statusText);
            throw new Error('No se pudieron cargar las empresas');
        }
        companies = await companiesResponse.json();
        // Nota: Si el nombre de la propiedad en tu backend es diferente (ej. "Name" en lugar de "nombre"),
        // necesitarías mapear los datos aquí para que coincidan con tu tipo `Company`.
        // Ejemplo: companies = (await companiesResponse.json()).map(item => ({ ...item, nombre: item.Name }));

        // --- 2. Obtener Eventos desde tu backend .NET Core ---
        // Tu controlador EventsController tiene un endpoint /api/events
        // y un método GET que filtra por userId.
        const eventsResponse = await fetch(`${API_BASE_URL}/api/Events?userId=${userId}`);

        if (!eventsResponse.ok) {
            console.error('Error al cargar eventos:', eventsResponse.status, eventsResponse.statusText);
            throw new Error('No se pudieron cargar los eventos');
        }
        events = await eventsResponse.json();
        // Nota: Las fechas de C# (DateTime) se recibirán como strings en formato ISO 8601.
        // Tus tipos de Event ya manejan 'start' y 'end' como 'string', lo cual es correcto.

    } catch (error) {
        console.error('Error al obtener datos del backend:', error);
        // Aquí podrías renderizar un estado de error al usuario si la carga falla
        return <div>Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.</div>;
    }

    return (
        <div className="p-4 rounded-lg shadow-md bg-background">
            <h2 className="mb-4 text-2xl font-semibold">Calzado Pro-Comfort</h2>
            <div>
                {/* Las props 'companies' y 'events' ahora vienen de tu backend y deben
                    coincidir con los tipos esperados por el componente Chart. */}
                <Chart companies={companies} events={events} />
            </div>
        </div>
    );
}