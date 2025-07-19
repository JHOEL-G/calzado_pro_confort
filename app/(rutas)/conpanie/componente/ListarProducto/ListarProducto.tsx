/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { TablaDatos } from "./data.tabla"
import { columns } from "./Columns"


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

export function ListarProducto() {
    const { isSignedIn, isLoaded } = useAuth()
    const router = useRouter();
    const [productos, setProductos] = useState<Producto[]>([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            router.push("/conpanie");
            return;
        }
        const fetchProductos = async () => {
            try {
                toast("SE HAN CARGADO LOS PRODUCTOS");
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Products`)
                setProductos(response.data)
            } catch (error) {
                toast.error("No se a podido mostrar los datos")
            } finally {
                setCargando(false)
            }
        }
        fetchProductos()

    }, [isSignedIn, isLoaded, router])


    return (
        <TablaDatos columns={columns} data={productos} />
    )
}
