import React from 'react'
import { InformacionProps } from './Informacion.type'
import Image from 'next/image'
import { User } from 'lucide-react'

export default function Informacion(props: InformacionProps) {
    const { conpany } = props
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4">
            <div className="p-4 rounded-lg shadow-md bg-background hover:shadow-lg">
                <div>
                    <Image src={conpany.imagenUrl} alt="imagenUrl" width={50} height={50} className="mb-3 rounded-lg" />


                </div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-background hover:shadow-lg h-min">
                <div className="flex items-center justify-between gap-x-2">
                    <div className="flex items-center gap-x-2">
                        <User className='w-5 h-5' />
                        Contacto
                    </div>
                    <div>
                        <p>new contacto</p>
                    </div>
                </div>
                <p>list contact</p>
            </div>
        </div>
    )
}
