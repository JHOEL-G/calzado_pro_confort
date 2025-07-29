import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';
// Importa las interfaces directamente desde tu archivo de tipos
// Asegúrate de que la ruta sea correcta según la ubicación de Calendario.types.ts
import { Calendario } from './conponents/Calendario';
import { Event, Company } from "./conponents/Calendario/Calendario.types";
// ELIMINA ESTA INTERFAZ COMPANY DE AQUÍ EN page.tsx
// interface Company {
//     id: number;
//     nombre: string;
// }

// La interfaz Event ya la tienes definida en Calendario.types.ts, así que también la importamos.
// interface Event {
//     id: string;
//     title: string;
//     start: string;
//     end: string;
//     description?: string;
//     location?: string;
//     userId: string;
// }

export default async function TasksPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/');
        return null;
    }

    // --- 1. Carga los eventos ---
    const eventsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Events?userId=${userId}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        }
    );

    let events: Event[] = []; // <-- Usando la interfaz Event importada
    if (!eventsResponse.ok) {
        console.error('Error al obtener los eventos del calendario:', eventsResponse.status, eventsResponse.statusText);
    } else {
        events = await eventsResponse.json();
        console.log("Eventos cargados:", events);
    }

    // --- 2. Carga las empresas (que son tus productos en el backend) ---
    const companiesResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Products`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        }
    );

    let companies: Company[] = []; // <-- ¡Ahora tipado como Product[]!
    if (!companiesResponse.ok) {
        console.error('Error al obtener las empresas (productos):', companiesResponse.status, companiesResponse.statusText);
    } else {
        // No necesitas castear, el JSON ya debe tener la estructura de Product
        companies = await companiesResponse.json();
        console.log("Empresas (Productos) cargadas:", companies);
    }

    return (
        <div>
            <Calendario
                companies={companies} // Pasa el array de productos (ahora sí es Product[])
                events={events}       // Pasa el array de eventos
            />
        </div>
    );
}