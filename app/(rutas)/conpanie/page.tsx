import React from 'react'
import { HeaderCompanie } from './componente/HeaderCompanie'
import { ListarProducto } from './componente/ListarProducto'

export default function page() {
    return (
        <div>
            <HeaderCompanie />
            <ListarProducto />
        </div>
    )
}
