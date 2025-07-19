type Variante = {
  talla: string
  color: string
  precio: string
  stock: string
}

export type Company = {
  id: number
  nombre: string
  marca: string
  descripcion: string
  imagenUrl: string
  fechaCreacion: string
  variantes?: Variante[] 
}
export type FormularioProps = {
    conpany : Company
}