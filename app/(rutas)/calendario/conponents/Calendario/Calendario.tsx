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
    console.log("Companies recibidas en Calendario:", companies);
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [onSaveNewEvent, setOnSaveNewEvent] = useState(false);
    const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<EventClickArg | null>(null);

    const [newEvent, setNewEvent] = useState({
        eventName: "",
        companySelected: { name: "", id: 0 }, // CORREGIDO: id inicializado como number
        description: "", // AÑADIDO: propiedad description
    });

    const calendarEvents: EventInput[] = events.map(event => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        description: event.description,
    }));

    const handleDateSelect = async (e: DateSelectArg) => {
        setSelectedDate(e);
        setOpen(true);
    };

    useEffect(() => {
        if (onSaveNewEvent && selectedDate?.view.calendar) {
            const calendarApi = selectedDate.view.calendar;
            calendarApi.unselect();

            const newEventToSave = {
                // Aquí debes asegurarte de que 'conpanyId' sea 'CompanyId' o 'Location'
                // según lo que tu API de C# espere.
                // Basado en tus interfaces, si Event tiene 'Location: string',
                // entonces deberías enviar 'location: newEvent.companySelected.name'.
                // Si espera un ID de la empresa, y 'id' en companySelected es el ID de la empresa,
                // entonces sería 'companyId: newEvent.companySelected.id'.
                // Por ejemplo, si tu modelo de C# para un Evento espera `Location` como el nombre de la empresa:
                location: newEvent.companySelected.name,
                // O si tu modelo de C# espera `CompanyId` como el ID de la empresa:
                // companyId: newEvent.companySelected.id,
                title: newEvent.eventName,
                start: selectedDate.startStr, // Usa startStr/endStr para formato ISO 8601
                end: selectedDate.endStr,
                description: newEvent.description,
                allDay: selectedDate.allDay,
                // Si 'userId' es necesario en el backend, asegúrate de pasarlo aquí:
                // userId: props.userId, // Tendrías que añadir 'userId: string;' a CalendarioProps
            };

            axios
                .post(`${process.env.NEXT_PUBLIC_API_URL}/api/Events`, newEventToSave)
                .then(() => {
                    toast("Evento creado exitosamente");
                    router.refresh();
                    setOpen(false); // Cierra el modal de creación
                })
                .catch((error) => {
                    console.error("Error al crear el evento:", error.response?.data || error.message);
                    toast("Error al crear el evento");
                });

            // Resetear el estado de newEvent después de guardar
            setNewEvent({
                eventName: "",
                companySelected: { name: "", id: 0 }, // Resetear id a 0 y name a ""
                description: "", // Resetear description
            });
            setOnSaveNewEvent(false);
        }
    }, [onSaveNewEvent, selectedDate, router, newEvent.eventName, newEvent.companySelected.name, newEvent.description, selectedDate?.allDay, selectedDate?.startStr, selectedDate?.endStr]);

    const handleEventClick = (selected: EventClickArg) => {
        setEventToDelete(selected);
        setOpenDeleteDialog(true);
    };

    const confirmDelete = async () => {
        if (!eventToDelete) return;

        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/api/Events/${eventToDelete.event.id}`
            );
            router.refresh();
            toast("Evento eliminado exitosamente");
        } catch (error) {
            console.error("Error al eliminar el evento:", error);
            toast("Error al eliminar el evento");
        } finally {
            setOpenDeleteDialog(false);
            setEventToDelete(null);
        }
    };

    return (
        <div>
            <div className="md:flex gap-x-3">
                <div className="w-[200px] relative">
                    <div className="absolute top-0 left-0 w-full h-full overflow-auto">
                        <p className="text-center dark:text-white text-2xl font-bold ">
                            LISTADO DE EVENTOS
                        </p>
                        {events.map((currentEvent) => (
                            <div
                                key={currentEvent.id}
                                className="p-4 rounded-lg shadow-md mb-2 bg-slate-200 dark:bg-background"
                            >
                                <p className="font-bold">{currentEvent.title}</p>
                                <p>{formatDate(new Date(currentEvent.start))}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 calendar-container">
                    <FullCalendar
                        plugins={[
                            daygridPlugin,
                            timegridPlugin,
                            interactionPlugin,
                            listPlugin,
                            multiMonthPlugin,
                        ]}
                        height="80vh"
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right:
                                "dayGridMonth,timeGridWeek,timeGridDay,listMonth,multiMonthYear",
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
                        weekends={false}
                        events={calendarEvents}
                        eventContent={renderEventContent}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        select={handleDateSelect}
                        eventClick={handleEventClick}
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
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Está absolutamente seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente
                            el evento <span className="font-bold">`{eventToDelete?.event.title}`</span>
                            de su calendario.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

function renderEventContent(eventInfo: EventContentArg) {
    return (
        <div className="bg-slate-200 dark:bg-background p-4 rounded-lg shadow-md">
            <i>{eventInfo.event.title}</i>
        </div>
    );
}