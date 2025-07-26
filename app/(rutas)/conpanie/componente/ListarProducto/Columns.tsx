"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { ArrowDown, MoreHorizontal, Pencil, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { DeleteProductAction } from "@/app/(rutas)/componentes/product/DeleteProductAction"

// Importar los componentes de Select de shadcn/ui
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Variante = {
    talla: string
    color: string
    precio: string
    stock: string
}

type Producto = {
    id: number
    nombre: string
    marca: string
    descripcion: string
    imagenUrl: string
    fechaCreacion: string
    variantes: Variante[]
}

export const columns = (
    onProductDeletedCallback: () => void
): ColumnDef<Producto>[] => [
        {
            accessorKey: "imagenUrl",
            header: "Imagen",
            cell: ({ row }) => {
                const image = row.getValue("imagenUrl");
                return (
                    <div className="px-3">
                        <Image
                            src={typeof image === "string" ? image : "/logo.png"}
                            width={40}
                            height={40}
                            alt="Imagen"
                            className="h-auto w-auto rounded"
                        />
                    </div>
                );
            },
        },
        {
            accessorKey: "nombre",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    NOMBRE DEL PRODUCTO
                    <ArrowDown className="w-4 h-4 ml-4" />
                </Button>
            ),
        },
        {
            accessorKey: "marca",
            header: "MARCA",
        },
        {
            accessorKey: "descripcion",
            header: "DESCRIPCIÓN",
        },
        {
            accessorKey: "fechaCreacion",
            header: "FECHA DE CREACIÓN",
        },
        {
            accessorKey: "variantes",
            header: "VARIANTES",
            cell: ({ row }) => {
                const variantes = row.getValue("variantes") as Variante[];

                if (!variantes || variantes.length === 0) {
                    return <div className="text-xs text-gray-500">Sin variantes</div>;
                }

                return (
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={` ${variantes.length} Variante`} />
                        </SelectTrigger>
                        <SelectContent>
                            {variantes.map((v, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                    <div className="flex flex-col text-xs">
                                        <span>
                                            Talla: <strong>{v.talla}</strong>, Color: {v.color}
                                        </span>
                                        <span>
                                            Precio: ${v.precio}, Stock: {v.stock}
                                        </span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            },
        },
        {
            id: "action",
            header: "ACCION",
            cell: ({ row }) => {
                const { id } = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-8 h-4 p-0">
                                <span className="sr-only">MENU PRODUCTO</span>
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/conpanie/${id}`} className="flex items-center">
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Editar
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />

                            <DeleteProductAction
                                productId={id}
                                onProductDeleted={onProductDeletedCallback}
                            >
                                <DropdownMenuItem
                                    onSelect={(event) => {
                                        event.preventDefault();
                                        console.log("onSelect del DropdownMenuItem de Eliminar");
                                    }}
                                >
                                    <Trash className="w-4 h-4 mr-2" />
                                    Eliminar
                                </DropdownMenuItem>
                            </DeleteProductAction>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
