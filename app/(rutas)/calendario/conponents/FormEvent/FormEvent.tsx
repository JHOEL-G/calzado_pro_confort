// app/rutas/calendario/components/FormEvent/index.tsx (o FormEvent.tsx)

"use client";

import z from "zod";
import { FormEventProps } from "./FormEvent.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    eventName: z.string().min(3, { message: "El nombre debe ser mayor a 3 caracteres" }),
    companySelected: z.object({
        name: z.string(),
        id: z.number(),
    }),
    description: z.string(), // CAMBIO CLAVE AQUÍ: description ahora es z.string() sin .optional()
});

export function FormEvent(props: FormEventProps) {
    const { companies, setNewEvent, setOnSaveNewEvent, setOpen } = props;
    console.log("Empresas recibidas:", companies);
    const [selectedCompany, setSelectedCompany] = useState({ name: "", id: 0 });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eventName: "",
            companySelected: { name: "", id: 0 },
            description: "", // Asegúrate de que el valor por defecto sea una cadena vacía
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // 'values' ahora siempre tendrá 'description' como string (incluso si está vacío)
        setNewEvent(values); // Esto ya no debería dar error
        setOnSaveNewEvent(true);
        setOpen(false);
    }

    const handleSelectCompany = (newValue: string) => {
        const company = companies.find((company) => company.nombre === newValue);
        if (company) {
            setSelectedCompany({
                name: company.nombre,
                id: company.id,
            });
            form.setValue("companySelected.name", company.nombre);
            form.setValue("companySelected.id", company.id);
        }
    };

    return (
        <Form {...form}>
            <form
                action=""
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="eventName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del evento</FormLabel>
                            <FormControl>
                                <Input placeholder="Evento ..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="companySelected.name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Empresa</FormLabel>
                            <Select
                                onValueChange={(newValue) => {
                                    field.onChange(newValue);
                                    handleSelectCompany(newValue);
                                }}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona una empresa" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {companies.map((company) => (
                                        <SelectItem key={company.id} value={company.nombre}>
                                            {company.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción (Opcional)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Detalles del evento..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Crear evento
                </Button>
            </form>
        </Form>
    );
}