"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { FormularioProducto } from "../FormularioCustomer";

export function HeaderCompanie() {
    const [open, setOpen] = useState(false)
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl">LISTADO DE PRODUCTO</h2>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>CREAR CALZADO</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>CREAR MODELO</DialogTitle>
                        <DialogDescription>Crea la configuracion del Calzado</DialogDescription>
                    </DialogHeader>

                    <FormularioProducto setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        </div>
    )
}
