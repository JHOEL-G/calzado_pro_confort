/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/formatDate";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from '@fullcalendar/daygrid';
import timegridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { DateSelectArg, EventContentArg, EventInput, EventClickArg } from '@fullcalendar/core';
import { useEffect, useState } from "react";
import { CalendarioProps } from "./Calendario.types";
import { ModalEvents } from "../ModalEvents";
import axios from "axios";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function Calendario(props: CalendarioProps) {
    const { companies, events } = props;
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [onSaveNewEvent, setOnSaveNewEvent] = useState(false);
    const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<EventClickArg | null>(null);
    const [newEvent, setNewEvent] = useState({
        eventName: "",
        companySelected: { name: "", id: 0 },
        description: "",
    });

    const calendarEvents: EventInput[] = events.map(event => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        description: event.description,
        location: event.location,
        allDay: event.allDay,
    }));

    const handleDateSelect = (e: DateSelectArg) => {
        setSelectedDate(e);
        setOpen(true);
    };

    const saveNewEvent = async () => {
        if (!selectedDate) return;

        if (!newEvent.eventName || !newEvent.companySelected.name) {
            toast("Por favor, complete todos los campos obligatorios");
            setOnSaveNewEvent(false);
            return;
        }

        const calendarApi = selectedDate.view.calendar;
        calendarApi.unselect();

        const newEventToSave = {
            location: newEvent.companySelected.name,
            title: newEvent.eventName,
            start: selectedDate.start.toISOString(),
            end: selectedDate.end.toISOString(),
            description: newEvent.description,
            allDay: selectedDate.allDay,
        };

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/Events`, newEventToSave);
            toast("Evento creado exitosamente");
            router.refresh();
            setOpen(false);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
            console.error("Error al crear el evento:", errorMessage);
            toast(`Error al crear el evento: ${errorMessage}`);
        } finally {
            setNewEvent({
                eventName: "",
                companySelected: { name: "", id: 0 },
                description: "",
            });
            setOnSaveNewEvent(false);
        }
    };

    useEffect(() => {
        if (onSaveNewEvent && selectedDate) {
            saveNewEvent();
        }
    }, [onSaveNewEvent, selectedDate]);

    const handleEventClick = (selected: EventClickArg) => {
        setEventToDelete(selected);
        setOpenDeleteDialog(true);
    };

    const confirmDelete = async () => {
        if (!eventToDelete) return;

        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/Events/${eventToDelete.event.id}`);
            toast("Evento eliminado exitosamente");
            router.refresh();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
            console.error("Error al eliminar el evento:", errorMessage);
            toast(`Error al eliminar el evento: ${errorMessage}`);
        } finally {
            setOpenDeleteDialog(false);
            setEventToDelete(null);
        }
    };

    return (
        <div className="p-4 flex flex-col min-h-screen">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Contenedor del listado de eventos */}
                <div className="w-full md:w-[300px] mb-4 md:mb-0 overflow-y-auto bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                    <p className="text-center text-2xl font-bold p-4 bg-gray-200 dark:bg-gray-700 dark:text-white sticky top-0 z-10">
                        LISTADO DE EVENTOS
                    </p>
                    <div className="p-4">
                        {events.length === 0 ? (
                            <p className="text-center text-gray-500 dark:text-gray-400">No hay eventos disponibles</p>
                        ) : (
                            events.map((currentEvent) => (
                                <div
                                    key={currentEvent.id}
                                    className="p-3 mb-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                    <p className="font-bold text-gray-800 dark:text-white">{currentEvent.title}</p>
                                    <p className="text-gray-600 dark:text-gray-300">{formatDate(new Date(currentEvent.start))}</p>
                                    {currentEvent.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{currentEvent.description}</p>
                                    )}
                                    {currentEvent.location && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Ubicación: {currentEvent.location}</p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Contenedor del Calendario */}
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <FullCalendar
                        plugins={[
                            daygridPlugin,
                            timegridPlugin,
                            interactionPlugin,
                            listPlugin,
                            multiMonthPlugin,
                        ]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth,multiMonthYear",
                        }}
                        locale="es"
                        buttonText={{
                            today: "Hoy",
                            month: "Mes",
                            week: "Semana",
                            day: "Día",
                            list: "Lista",
                            nextYear: "Año",
                            nextMonth: "Mes siguiente",
                            prevYear: "Año anterior",
                            prevMonth: "Mes anterior",
                            year: "Año",
                            monthYear: "Mes",
                        }}
                        weekends={true}
                        events={calendarEvents}
                        eventContent={renderEventContent}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        select={handleDateSelect}
                        eventClick={handleEventClick}
                        height="auto" // Altura adaptable
                        contentHeight="auto" // Ajusta al contenido
                        // Opcional: relación de aspecto para control responsivo
                        aspectRatio={1.5}
                    />
                </div>
            </div>
            <ModalEvents
                open={open}
                setOpen={setOpen}
                setOnSaveNewEvent={setOnSaveNewEvent}
                companies={companies}
                setNewEvent={setNewEvent}
            />
            <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Está absolutamente seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente
                            el evento <span className="font-bold">{eventToDelete?.event.title}</span>
                            de su calendario.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>Eliminar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

function renderEventContent(eventInfo: EventContentArg) {
    return (
        <div className="bg-slate-200 dark:bg-gray-700 p-1 rounded text-sm overflow-hidden whitespace-nowrap text-ellipsis">
            <p className="font-bold text-gray-800 dark:text-white">{eventInfo.event.title}</p>
            {eventInfo.event.extendedProps.location && (
                <p className="text-gray-600 dark:text-gray-300">@{eventInfo.event.extendedProps.location}</p>
            )}
        </div>
    );
}