/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner"
import { TablaDatos } from "./data.tabla"
import { columns } from "./Columns"
import useSWR, { SWRConfig } from 'swr'

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

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function ListarProducto() {
    const { isSignedIn, isLoaded } = useAuth()
    const router = useRouter();

    const { data: productos, error, isLoading, mutate } = useSWR<Producto[]>(
        isSignedIn ? `${process.env.NEXT_PUBLIC_API_URL}/api/Products` : null,
        fetcher
    );

    useEffect(() => {
        if (!isLoaded) return;
        if (!isSignedIn) {
            router.push("/conpanie");
        }
    }, [isSignedIn, isLoaded, router]);

    useEffect(() => {
        if (error) {
            toast.error("Error al cargar los datos: " + error.message);
            console.error("Error fetching products:", error);
            return;
        }
        if (!isLoading) {
            if (!productos || productos.length === 0) {
                toast.info("No hay productos disponibles en la base de datos ¿Quieres agregar uno?");
                console.warn("No products found in the database.");
            } else {
                toast.success("Los productos se han cargado correctamente.");
            }
        }
    }, [error, isLoading, productos]);

    const formattedProductos = productos?.map((producto: Producto) => ({
        ...producto,
        fechaCreacion: new Date(producto.fechaCreacion).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }),
    })) || [];

    return (
        <div>
            {!isLoading && !error && (
                <TablaDatos columns={columns(mutate)} data={formattedProductos} />
            )}
        </div>
    )
}
