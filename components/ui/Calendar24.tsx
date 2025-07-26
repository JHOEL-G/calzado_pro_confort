"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { format } from "date-fns" // Necesitamos format para el tiempo y display

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

// Definimos las props que Calendar24 aceptará
interface Calendar24Props {
    value?: Date; // El valor actual de la fecha y hora
    onChange: (date: Date | undefined) => void; // Función para notificar cambios
}

export function Calendar24({ value, onChange }: Calendar24Props) {
    const [open, setOpen] = React.useState(false);

    // Usa el 'value' de las props como estado inicial y para sincronización
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value);
    const [selectedTime, setSelectedTime] = React.useState<string>(
        value ? format(value, "HH:mm") : "00:00" // Formato HH:mm para el input de tiempo
    );

    // Sincroniza el estado interno con el 'value' de las props
    React.useEffect(() => {
        setSelectedDate(value);
        setSelectedTime(value ? format(value, "HH:mm") : "00:00");
    }, [value]);

    // Función para combinar la fecha y la hora y llamar a onChange
    const updateDateTime = (date: Date | undefined, time: string) => {
        if (!date) {
            onChange(undefined);
            return;
        }

        const [hours, minutes] = time.split(':').map(Number);
        const newDateTime = new Date(date);
        newDateTime.setHours(hours, minutes, 0, 0); // Establece horas, minutos, segundos y milisegundos

        onChange(newDateTime); // Notifica el cambio al formulario
    };

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date);
        setOpen(false); // Cierra el popover al seleccionar una fecha
        updateDateTime(date, selectedTime); // Actualiza la fecha y hora combinadas
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        setSelectedTime(newTime);
        updateDateTime(selectedDate, newTime); // Actualiza la fecha y hora combinadas
    };

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="justify-center font-bold text-sm">
                    Fecha
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker"
                            className="w-40 justify-between font-normal"
                        >
                            {selectedDate
                                ? format(selectedDate, "PPP")
                                : "Seleccionar fecha"}
                            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                    >
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            captionLayout="dropdown"
                            onSelect={handleDateSelect}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="justify-center font-bold text-sm">
                    Hora
                </Label>
                <Input
                    type="time"
                    id="time-picker"
                    step="60" // Paso de 1 minuto
                    value={selectedTime}
                    onChange={handleTimeChange}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div>
        </div>
    );
}
