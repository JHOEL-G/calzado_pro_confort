/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, ReactNode } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteProductActionProps {
    productId: number;
    onProductDeleted?: () => void;
    children?: ReactNode;
}

export function DeleteProductAction({
    productId,
    onProductDeleted,
    children,
}: DeleteProductActionProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteProduct = async () => {
        setIsDeleting(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            if (!API_URL) {
                console.error("NEXT_PUBLIC_API_URL no está definida.");
                toast.error("Error de configuración: La URL del API no está disponible.");
                return;
            }

            const res = await axios.delete(`${API_URL}/api/Products/${productId}`);


            if (res.status === 204 || res.status === 200) {
                toast.success("Producto eliminado con éxito.");
                if (onProductDeleted) {
                    onProductDeleted();
                }
            } else {
                toast.warning(`La eliminación fue procesada, pero la respuesta fue inesperada: ${res.status}.`);
            }
        } catch (error: any) {
            console.error("Error al eliminar el producto:", error);
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Ocurrió un error desconocido al eliminar el producto.";
            toast.error(`Error al eliminar el producto: ${errorMessage}`);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente
                        este producto y todas sus variantes de tu base de datos.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteProduct} disabled={isDeleting}>
                        {isDeleting ? "Eliminando..." : "Sí, eliminar producto"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}