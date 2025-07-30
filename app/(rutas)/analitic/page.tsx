import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { Chart } from "./components/Chart";
import { Company, Event } from "./components/Chart/Chart.types";

export default async function page() {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/analitic");
    }

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!API_BASE_URL) {
        console.error("NEXT_PUBLIC_API_URL no está definida en las variables de entorno.");
        return <div>Error: La configuración de la API no está completa.</div>;
    }

    let companies: Company[] = [];
    let events: Event[] = [];

    try {
        const companiesResponse = await fetch(`${API_BASE_URL}/api/Products?userId=${userId}`); // Ajusta "/Companies" si tu controlador tiene otro nombre (ej. "/Products")

        if (!companiesResponse.ok) {
            console.error('Error al cargar empresas:', companiesResponse.status, companiesResponse.statusText);
            throw new Error('No se pudieron cargar las empresas');
        }
        companies = await companiesResponse.json();
        const eventsResponse = await fetch(`${API_BASE_URL}/api/Events?userId=${userId}`);

        if (!eventsResponse.ok) {
            console.error('Error al cargar eventos:', eventsResponse.status, eventsResponse.statusText);
            throw new Error('No se pudieron cargar los eventos');
        }
        events = await eventsResponse.json();

    } catch (error) {
        console.error('Error al obtener datos del backend:', error);
        return <div>Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.</div>;
    }

    return (
        <div className="p-4 rounded-lg shadow-md bg-background">
            <h2 className="mb-4 text-2xl font-semibold">Calzado Pro-Comfort</h2>
            <div>
                <Chart companies={companies} events={events} />
            </div>
        </div>
    );
}