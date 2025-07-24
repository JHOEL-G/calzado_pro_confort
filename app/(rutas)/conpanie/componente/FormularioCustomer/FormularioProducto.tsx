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
import Image from "next/image";

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

interface FormularioProductoProps {
    setOpen: (v: boolean) => void;
    // Añadimos una nueva prop: una función que se llamará cuando el producto sea creado exitosamente
    onProductCreated?: () => void;
}

export function FormularioProducto({ setOpen, onProductCreated }: FormularioProductoProps) {
    const [fotoUploader, setFotoUploader] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: "",
            marca: "",
            descripcion: "",
            imagenUrl: "",
            variantes: [{ talla: "", color: "", precio: undefined, stock: undefined }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "variantes",
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setFotoUploader(true);
            await axios.post("/api/products", values); // Asegúrate de que esta URL sea correcta para tu API
            toast.success("Producto creado correctamente");

            // Si hay una función onProductCreated proporcionada, la llamamos
            if (onProductCreated) {
                onProductCreated();
            }

            // router.refresh(); // Descomenta si aún necesitas la recarga completa de la ruta
            // router.push("/conpanie"); // Esto ya es una redirección después de crear
            setOpen(false); // Cierra el modal/dialogo
            form.reset(); // Resetea el formulario
        } catch (error: any) {
            const msg = error.response?.data?.message || error.message || "Error desconocido al crear el producto.";
            toast.error(`Error: ${msg}`);
        } finally {
            setFotoUploader(false);
        }
    };

    return (
        <div className="container px-4 py-8 sm:px-6 lg:px-8 mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre del Modelo</FormLabel>
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
                                    <FormLabel>Marca del Calzado</FormLabel>
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
                                <FormItem className="sm:col-span-2">
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
                            render={({ field }) => {
                                const imageUrl = form.watch("imagenUrl");

                                return (
                                    <FormItem className="sm:col-span-2">
                                        <FormLabel>Imagen del Calzado</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                <div className="flex flex-col items-center justify-center text-center w-full">
                                                    <UploadButton
                                                        endpoint="imagenUrl"
                                                        className="rounded-2xl bg-[#ef4444] text-white px-5 py-1 font-extrabold hover:bg-[#2ecc71] dark:bg-blue-500 dark:hover:bg-[#0EA5E9]"
                                                        content={{
                                                            button: ({ ready }) => (imageUrl ? "Cambiar imagen" : "Subir imagen"),
                                                            allowedContent: () => "Formatos permitidos: PNG, JPG, JPEG",
                                                        }}
                                                        appearance={{
                                                            container: "flex flex-col items-center justify-center",
                                                            allowedContent: "text-sm text-white dark:text-gray-400 mt-1 font-bold ",
                                                        }}
                                                        onClientUploadComplete={(res) => {
                                                            if (res?.[0]?.url) { // Corregido de ufsUrl a url si es lo que devuelve uploadthing
                                                                form.setValue("imagenUrl", res[0].url);
                                                                toast.success("Imagen subida correctamente");
                                                            } else {
                                                                toast.error("No se obtuvo la URL de la imagen");
                                                            }
                                                        }}
                                                        onUploadError={(error) => {
                                                            toast.error(`Error: ${error.message}`);
                                                        }}
                                                    />
                                                </div>

                                                {imageUrl && (
                                                    <div className="flex flex-col sm:flex-row w-full items-center justify-between pr-5 gap-4">
                                                        <Image
                                                            src={imageUrl}
                                                            alt="Imagen subida"
                                                            width={128}
                                                            height={128}
                                                            unoptimized
                                                            className="object-cover rounded-lg border border-gray-300 dark:border-gray-600 p-1"
                                                        />
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => window.open(imageUrl, "_blank")}
                                                                className="text-blue-500 hover:underline"
                                                            >
                                                                Previsualizar Imagen
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => form.setValue("imagenUrl", "")}
                                                                className="text-red-500 hover:underline"
                                                            >
                                                                Quitar imagen
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Variantes</h3>
                        {fields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-1 sm:grid-cols-5 gap-3 border p-3 rounded-lg">
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
                                                    placeholder="Precio"
                                                    type="number"
                                                    step="0.01" // Cambiado a 0.01 para permitir decimales en precio
                                                    min={0}
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
                                                    min={0}
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
                                    className="w-full sm:w-auto"
                                >
                                    Eliminar
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-4">
                        <Button
                            type="button"
                            onClick={() => {
                                if (fields.length >= 4) {
                                    toast.warning("Máximo 4 variantes permitidas");
                                    return;
                                }
                                append({ talla: "", color: "", precio: 0, stock: 0 });
                            }}
                            className="w-full sm:w-auto"
                        >
                            Agregar Variante
                        </Button>

                        <Button type="submit" disabled={form.formState.isSubmitting || fotoUploader} className="w-full sm:w-auto">
                            {form.formState.isSubmitting || fotoUploader ? "Creando..." : "Crear Producto"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}