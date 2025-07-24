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
import { useState, useCallback } from "react";
import { useSWRConfig } from "swr";
import { FormularioProducto } from "../FormularioCustomer";



export function HeaderCompanie() {
    const [open, setOpen] = useState(false);
    const { mutate } = useSWRConfig();


    const handleProductCreated = useCallback(() => {
        const productsApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Products`;


        mutate(productsApiUrl);

        setOpen(false);
    }, [mutate]);

    return (
        <div className="flex items-center justify-between bg-scroll">
            <h2 className="text-2xl">LISTADO DE PRODUCTO</h2>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>CREAR CALZADO</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>CREAR MODELO</DialogTitle>
                        <DialogDescription>Crea la configuración del Calzado</DialogDescription>
                    </DialogHeader>

                    <FormularioProducto setOpen={setOpen} onProductCreated={handleProductCreated} />
                </DialogContent>
            </Dialog>
        </div>
    );
}