// components/product/DeleteProductAction.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Trash } from 'lucide-react';
// Importa tus componentes de Shadcn UI
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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
// import { toast } from 'react-hot-toast'; // Descomenta si usas react-hot-toast o similar

interface DeleteProductActionProps {
    productId: number; // El ID del producto a eliminar
    productName: string; // El nombre del producto para el mensaje de confirmación
    // Si necesitas un callback para refrescar datos en el componente padre
    // (aparte de router.refresh()), lo puedes añadir aquí.
    // onProductDeleted?: () => void;
}

const DeleteProductAction: React.FC<DeleteProductActionProps> = ({ productId, productName /*, onProductDeleted */ }) => {
    const router = useRouter();

    const handleDeleteProduct = async () => {
        try {
            const res = await fetch(`/api/productos/${productId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                toast.success(`Producto "${productName}" eliminado correctamente.`);
                console.log(`Producto "${productName}" (ID: ${productId}) eliminado.`);
                router.refresh(); // Refresca los datos en la página de la tabla
                // if (onProductDeleted) {
                //     onProductDeleted();
                // }
            } else {
                const errorData = await res.json();
                // toast.error(errorData.message || "Error al eliminar el producto.");
                console.error("Error al eliminar el producto:", errorData);
            }
        } catch (error) {
            console.error("Error de red o inesperado al eliminar el producto:", error);
            // toast.error("Hubo un error inesperado al eliminar el producto.");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {/* Este DropdownMenuItem es el que activará el AlertDialog */}
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()} // Importante: Evita que el Dropdown se cierre inmediatamente
                    className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                >
                    <Trash className="w-4 h-4 mr-2" />
                    Eliminar
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro de que quieres eliminar este producto?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Eliminará permanentemente el producto <strong>{productName}</strong>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteProduct}>
                        Sí, eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteProductAction;