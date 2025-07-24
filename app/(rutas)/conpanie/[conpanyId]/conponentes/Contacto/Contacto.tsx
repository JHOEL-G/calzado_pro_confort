"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { FormContacto } from "./FormContacto";
import { useState } from "react";

export function Contacto() {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>NEVO CONTACTO</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625pxl">
                <DialogHeader>
                    <DialogTitle>EL NUEVO CONTACTO</DialogTitle>
                    <DialogDescription>
                        CREAR UN NUEVO CONTACTO PARA PODER AGREGAR
                    </DialogDescription>
                </DialogHeader>
                <FormContacto setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}
