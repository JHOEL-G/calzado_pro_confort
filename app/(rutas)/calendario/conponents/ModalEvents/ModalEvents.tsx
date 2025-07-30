"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ModalEventsProps } from "./ModalEvents.types";
import { FormEvent } from "../FormEvent";

export function ModalEvents(props: ModalEventsProps) {
    const { open, companies, setNewEvent, setOnSaveNewEvent, setOpen } = props
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-4 sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle>NUEVO EVENTO</DialogTitle>
                </DialogHeader>
                <FormEvent
                    companies={companies}
                    setNewEvent={setNewEvent}
                    setOnSaveNewEvent={setOnSaveNewEvent}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    );
}
