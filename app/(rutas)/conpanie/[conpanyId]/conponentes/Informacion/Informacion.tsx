import React from 'react'
import { InformacionProps } from './Informacion.type'
import { User } from 'lucide-react'
import EditProductForm from '../Formulario/EditarProducto'
import { DeleteProductAction } from '@/app/(rutas)/componentes/product/DeleteProductAction'
import { Contacto } from '../Contacto'
import { ListadoContacto } from '../ListadoContacto'


export default function Informacion(props: InformacionProps) {
    const { conpany } = props
    console.log("🧩 ID de la compañía recibido:", conpany?.id);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4">
            <div className="p-4 rounded-lg shadow-md bg-background hover:shadow-lg">
                <div>
                    <EditProductForm />
                    <DeleteProductAction productId={conpany.id} />
                </div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-background hover:shadow-lg h-min">
                <div className="flex items-center justify-between gap-x-2">
                    <div className="flex items-center gap-x-2">
                        <User className="w-5 h-5" />
                        Contacto
                    </div>
                    <div>
                        <Contacto />
                    </div>
                </div>

                <ListadoContacto />

            </div>
        </div>
    );
}
