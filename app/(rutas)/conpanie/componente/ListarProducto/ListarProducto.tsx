/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner"
import { TablaDatos } from "./data.tabla"
import { columns } from "./Columns"
import useSWR from 'swr'
import { SWRConfig } from 'swr'

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
            return;
        }
    }, [isSignedIn, isLoaded, router])

    useEffect(() => {
        if (error) {
            toast.error("No se ha podido mostrar los datos");
            console.error("Error fetching products:", error);
        }
    }, [error]);

    const formattedProductos = productos?.map((producto: Producto) => ({
        ...producto,
        fechaCreacion: new Date(producto.fechaCreacion).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
    })) || [];

    if (isLoading) {
        return <p>Cargando productos...</p>;
    }

    if (error) {
        return <p>Error al cargar los productos.</p>;
    }

    return (
        <div>
            <TablaDatos columns={columns(mutate)} data={formattedProductos} />
        </div>
    )
}