"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu" // Asegúrate de importar DropdownMenuLabel y DropdownMenuSeparator
import { ArrowDown, MoreHorizontal, Pencil, Trash } from "lucide-react" // Asegúrate de ArrowDown y MoreHorizontal
import Image from "next/image"
import Link from "next/link"
import { DeleteProductAction } from "@/app/(rutas)/componentes/product/DeleteProductAction" // Asegúrate de que esta ruta sea correcta

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

export const columns = (onProductDeletedCallback: () => void): ColumnDef<Producto>[] => [
    {
        accessorKey: "imagenUrl",
        header: "Imagen",
        cell: ({ row }) => {
            const image = row.getValue("imagenUrl")
            return (
                <div className="px-3">
                    <Image
                        src={typeof image === 'string' ? image : "/logo.png"}
                        width={40}
                        height={40}
                        alt="Imagen"
                        className="h-auto w-auto rounded"
                    />
                </div>
            )
        },
    },
    {
        accessorKey: "nombre",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                NOMBRE DEL PRODUCTO
                <ArrowDown className="w-4 h-4 ml-4" />
            </Button>
        ),
    },
    {
        accessorKey: "marca",
        header: "Marca",
    },
    {
        accessorKey: "descripcion",
        header: "Descripción",
    },
    {
        accessorKey: "fechaCreacion",
        header: "Fecha de Creación",
    },
    {
        accessorKey: "variantes",
        header: "Variantes",
        cell: ({ row }) => {
            const variantes = row.getValue("variantes") as Variante[]
            return (
                <div className="text-xs">
                    {variantes.map((v, i) => (
                        <div key={i}>
                            <strong>{v.talla}</strong> - {v.color} - ${v.precio} - Stock: {v.stock}
                        </div>
                    ))}
                </div>
            )
        }
    },
    {
        id: "action",
        header: "Acciones",
        cell: ({ row }) => {
            const { id } = row.original
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
            )
        },
    },
];