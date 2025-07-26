"use client";

import { useRouter } from "next/navigation";
import { CalendarioProps } from "./Calendario.types";
import { useState } from "react";

export function Calendario(props: CalendarioProps) {
    const { conpanies, events } = props;
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [onSaveNewEvent, setOnSaveNewEvent] = useState(false);
    //const [selectedDate, setSelectedDate] = useState<DateSelectArg>();


    return (
        <div>Calendario</div>
    )
}
