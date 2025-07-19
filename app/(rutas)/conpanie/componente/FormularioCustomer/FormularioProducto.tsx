/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UploadButton } from "@/utils/uploadthing";

// 🧩 Schema con variantes
const varianteSchema = z.object({
    talla: z.string().min(1, { message: "La talla es obligatoria" }).max(10),
    color: z.string().min(1, { message: "El color es obligatorio" }).max(50),
    precio: z.number().min(0.01).max(9999.99),
    stock: z.number().int().min(0),
});

const formSchema = z.object({
    nombre: z.string().min(1).max(100),
    marca: z.string().min(1).max(50),
    descripcion: z.string().max(500).optional(),
    imagenUrl: z.string().url().optional().or(z.literal("")),
    variantes: z.array(varianteSchema).min(1),
});

export function FormularioProducto({ setOpen }: { setOpen: (v: boolean) => void }) {
    const [fotoUploader, setFotoUploader] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: "",
            marca: "",
            descripcion: "",
            imagenUrl: "",
            variantes: [{ talla: "", color: "", precio: 0, stock: 0 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "variantes",
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setFotoUploader(true);
            await axios.post("/api/products", values);
            toast.success("Producto creado correctamente");
            router.refresh();
            setOpen(false);
            form.reset();
        } catch (error: any) {
            const msg = error.response?.data || error.message;
            toast.error(`Error: ${msg}`);
        } finally {
            setFotoUploader(false);
        }
    };

    return (
        <div className="container space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre del producto" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="marca"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Marca</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccione una marca" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Nike">Nike</SelectItem>
                                            <SelectItem value="Adidas">Adidas</SelectItem>
                                            <SelectItem value="Puma">Puma</SelectItem>
                                            <SelectItem value="Reebok">Reebok</SelectItem>
                                            <SelectItem value="New Balance">New Balance</SelectItem>
                                            <SelectItem value="Asics">Asics</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="descripcion"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Descripción del producto" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imagenUrl"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Imagen</FormLabel>
                                    <FormControl>
                                        <UploadButton
                                            className="rounded-lg bg-slate-600/20 text-slate-800"
                                            endpoint="imagenUrl"
                                            onClientUploadComplete={(res) => {
                                                if (res?.[0]?.ufsUrl) {
                                                    form.setValue("imagenUrl", res[0].ufsUrl);
                                                    toast.success("Imagen subida correctamente");
                                                } else {
                                                    toast.error("No se obtuvo la URL de la imagen");
                                                }
                                            }}
                                            onUploadError={(error) => {
                                                toast.error(`Error: ${error.message}`);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Variantes</h3>
                        {fields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-5 gap-3 border p-3 rounded-lg">
                                <FormField
                                    control={form.control}
                                    name={`variantes.${index}.talla`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Talla" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`variantes.${index}.color`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Color" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`variantes.${index}.precio`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Precio"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`variantes.${index}.stock`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Stock"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => remove(index)}
                                    disabled={fields.length === 1}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={() => append({ talla: "", color: "", precio: 0, stock: 0 })}
                        >
                            Agregar Variante
                        </Button>
                    </div>

                    <Button type="submit" disabled={form.formState.isSubmitting || fotoUploader}>
                        {form.formState.isSubmitting || fotoUploader ? "Creando..." : "Crear Producto"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
