/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner"; // Assuming you have sonner for toasts
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method

// Import Shadcn UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { UploadButton } from "@/utils/uploadthing"; // Assuming this path is correct
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DeleteProductAction } from "@/app/(rutas)/componentes/product/DeleteProductAction";
import { Calendar24 } from "@/components/ui/Calendar24";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Zod schemas for validation
const variantSchema = z.object({
    id: z.number().optional(), // ID of the variant in the DB (0 for new ones)
    talla: z.string().min(1, { message: "La talla es obligatoria" }).max(10),
    color: z.string().min(1, { message: "El color es obligatorio" }).max(50),
    precio: z.number().min(0.01, { message: "El precio debe ser al menos 0.01" }).max(9999.99),
    stock: z.number().int({ message: "El stock debe ser un número entero" }).min(0, { message: "El stock no puede ser negativo" }),
    productId: z.number().optional(), // Optional if your backend infers it or doesn't need it in variant payload
});

const productFormSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, { message: "El nombre es obligatorio" }).max(100),
    marca: z.string().min(1, { message: "La marca es obligatoria" }).max(50),
    descripcion: z.string().max(500).optional().or(z.literal("")),
    imagenUrl: z.string().url({ message: "URL de imagen inválida" }).optional().or(z.literal("")),
    fechaCreacion: z.string(), // Keeping as string to match ISO format from backend
    variantes: z.array(variantSchema).min(1, { message: "Debe haber al menos una variante" }),
});

export default function EditProductForm() {
    const { conpanyId: paramProductId } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [fotoUploader, setFotoUploader] = useState(false);


    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            id: 0,
            nombre: "",
            marca: "",
            descripcion: "",
            imagenUrl: "",
            fechaCreacion: new Date().toISOString(),
            variantes: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "variantes",
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!paramProductId) {
                setError("ID de producto no proporcionado en la URL");
                setLoading(false);
                return;
            }

            const id = parseInt(paramProductId as string);
            if (isNaN(id)) {
                setError(`ID de producto "${paramProductId}" no es un número válido`);
                setLoading(false);
                return;
            }

            try {
                const productResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/Products/${id}`
                );

                if (!productResponse.ok) {
                    const errorText = await productResponse.text();
                    throw new Error(
                        `Error al cargar el producto: ${productResponse.status} - ${errorText}`
                    );
                }
                const productData = await productResponse.json();


                form.reset({
                    id: productData.id,
                    nombre: productData.nombre || "",
                    marca: productData.marca || "",
                    descripcion: productData.descripcion || "",
                    imagenUrl: productData.imagenUrl || "",
                    fechaCreacion: productData.fechaCreacion
                        ? new Date(productData.fechaCreacion).toISOString()
                        : new Date().toISOString(),
                    variantes: productData.variantes.map((v: z.infer<typeof variantSchema>) => ({
                        id: v.id || 0,
                        talla: v.talla || "",
                        color: v.color || "",
                        precio: parseFloat(v.precio.toString()) || 0,
                        stock: parseInt(v.stock.toString()) || 0,
                        productId: v.productId || undefined,
                    })),
                });
            } catch (error) {
                console.error("Fetch error details:", error);
                setError(error instanceof Error ? error.message : "Error al conectar con la API");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [paramProductId, form]); // Added form to dependency array as it's used in reset


    const onSubmit = async (values: z.infer<typeof productFormSchema>) => {
        const id = parseInt(paramProductId as string);
        if (isNaN(id) || id !== values.id) {
            toast.error("El ID en la URL no coincide con el ID del formulario o es inválido.");
            return;
        }

        const dataToSend = {
            ...values,
            descripcion: values.descripcion || "", // Ensure description is not undefined if optional
            imagenUrl: values.imagenUrl || "", // Ensure imagenUrl is not undefined if optional
        };

        try {
            setFotoUploader(true); // Indicate submission in progress
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/api/Products/${id}`,
                dataToSend
            );

            toast.success("Producto y variantes actualizadas con éxito");
            router.push(`/conpanie`);
        } catch (error: any) {
            console.error("PUT error:", error);
            const msg = error.response?.data?.message || error.message || "Error desconocido";
            toast.error(`Error al actualizar el producto: ${msg}`);
            setError(`Error al actualizar: ${msg}`);
        } finally {
            setFotoUploader(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Alert className="w-fit">
                    <AlertTitle>Cargando...</AlertTitle>
                    <AlertDescription>Cargando datos del producto, por favor espere.</AlertDescription>
                </Alert>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Alert variant="destructive" className="w-fit">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container px-4 py-4 sm:px-6 lg:px-3 mx-auto max-w-3xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 ">
                    <CardHeader>
                        <CardTitle className="text-4xl font-bold text-gray-800 dark:text-gray-200 text-center">
                            Editar Producto
                        </CardTitle>
                    </CardHeader>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    <FormControl>
                                        {/* You can make this a Select as in the example if you have fixed brands */}
                                        <Input placeholder="Marca del producto" {...field} />
                                    </FormControl>
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
                                        <Textarea
                                            placeholder="Descripción del producto"
                                            {...field}
                                            rows={3}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Image Upload Field */}
                        <FormField
                            control={form.control}
                            name="imagenUrl"
                            render={({ field }) => {
                                const imageUrl = form.watch("imagenUrl");
                                return (
                                    <FormItem className="sm:col-span-2">
                                        <FormLabel>URL de Imagen</FormLabel>
                                        <FormControl>
                                            <div className="flex flex-col items-center space-y-4 p-4 w-full max-w-md mx-auto">
                                                <div className="flex flex-col items-center justify-center text-center w-full">
                                                    <UploadButton
                                                        endpoint="imagenUrl"
                                                        className="rounded-3xl bg-[#ef4444] text-white px-5 py-1 font-extrabold hover:bg-[#2ecc71] dark:bg-blue-500 dark:hover:bg-[#0EA5E9] w-full sm:w-auto"
                                                        content={{
                                                            button: () =>
                                                                imageUrl ? "Cambiar imagen" : "Subir imagen",
                                                            allowedContent: () =>
                                                                "Formatos permitidos: PNG, JPG, JPEG",
                                                        }}
                                                        appearance={{
                                                            container:
                                                                "flex flex-col items-center justify-center",
                                                            allowedContent:
                                                                "text-sm text-white dark:text-gray-400 font-bold mb-2",
                                                        }}
                                                        onClientUploadComplete={(res) => {
                                                            if (res?.[0]?.url) {
                                                                form.setValue("imagenUrl", res[0].url);
                                                                toast.success("Imagen subida correctamente");
                                                            } else {
                                                                toast.error(
                                                                    "No se obtuvo la URL de la imagen"
                                                                );
                                                            }
                                                        }}
                                                        onUploadError={(error: Error) => {
                                                            toast.error(`Error: ${error.message}`);
                                                        }}
                                                    />
                                                </div>

                                                {imageUrl && (
                                                    <div className="p-3 flex flex-col sm:flex-row w-full sm:items-center sm:justify-center sm:gap-4">
                                                        <Image
                                                            src={imageUrl}
                                                            alt="Previsualización de la imagen"
                                                            width={128}
                                                            height={128}
                                                            unoptimized
                                                            className="object-cover rounded-lg border border-gray-300 dark:border-gray-600 p-1 w-full sm:w-32"
                                                        />
                                                        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    window.open(imageUrl, "_blank")
                                                                }
                                                                className="text-blue-500 hover:underline w-full sm:w-auto"
                                                            >
                                                                Previsualizar Imagen
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => form.setValue("imagenUrl", "")}
                                                                className="text-red-500 hover:underline w-full sm:w-auto"
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
                        <FormField
                            control={form.control}
                            name="fechaCreacion"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="font-bold pb-1">Editar Fecha</FormLabel>
                                    <FormControl>
                                        <Calendar24
                                            value={field.value ? new Date(field.value) : undefined}
                                            onChange={(date) =>
                                                field.onChange(date ? date.toISOString() : undefined)
                                            }
                                        />
                                    </FormControl>
                                    <FormDescription className="font-bold">
                                        La fecha de creación del producto.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <h1 className="text-2xl font-bold mt-1 mb-4 text-gray-800 dark:text-gray-200">
                        Variantes
                    </h1>
                    {fields.length === 0 && (
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            No hay variantes para este producto. Agrega una nueva.
                        </p>
                    )}

                    {fields.map((field, index) => (
                        <Card key={field.id} className="mb-6">
                            <CardContent className="pt-4 grid gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {" "}
                                    {/* Adjusted for better spacing */}
                                    <FormField
                                        control={form.control}
                                        name={`variantes.${index}.talla`}
                                        render={({ field: variantField }) => (
                                            <FormItem>
                                                <FormLabel>Talla</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Talla" {...variantField} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`variantes.${index}.color`}
                                        render={({ field: variantField }) => (
                                            <FormItem>
                                                <FormLabel>Color</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Color" {...variantField} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`variantes.${index}.precio`}
                                        render={({ field: variantField }) => (
                                            <FormItem>
                                                <FormLabel>Precio</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Precio"
                                                        type="number"
                                                        step="0.01"
                                                        {...variantField}
                                                        onChange={(e) => {
                                                            variantField.onChange(
                                                                parseFloat(e.target.value) || 0
                                                            );
                                                        }}
                                                        value={variantField.value || ""} // Handle potential undefined value
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`variantes.${index}.stock`}
                                        render={({ field: variantField }) => (
                                            <FormItem>
                                                <FormLabel>Stock</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Stock"
                                                        type="number"
                                                        step="1"
                                                        {...variantField}
                                                        onChange={(e) => {
                                                            variantField.onChange(
                                                                parseInt(e.target.value) || 0
                                                            );
                                                        }}
                                                        value={variantField.value || ""} // Handle potential undefined value
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end pt-0">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button type="button" variant="destructive">
                                            Eliminar Variante
                                        </Button>
                                    </AlertDialogTrigger>

                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                ¿Estás absolutamente seguro?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta acción no se puede deshacer. Esto eliminará
                                                permanentemente esta variante de tu producto.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => remove(index)}>
                                                Sí, eliminar variante
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardFooter>
                        </Card>
                    ))}

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
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

                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting || fotoUploader}
                            className="w-full sm:w-auto"
                        >
                            {form.formState.isSubmitting || fotoUploader
                                ? "Modificando..."
                                : "Modificar Producto"}
                        </Button>

                        <DeleteProductAction
                            productId={form.watch("id")}
                            onProductDeleted={() => router.push(`/conpanie`)}
                        >
                            <Button type="button" variant="destructive">
                                Eliminar Producto
                            </Button>
                        </DeleteProductAction>
                    </div>
                </form>
            </Form>
        </div>
    );
}