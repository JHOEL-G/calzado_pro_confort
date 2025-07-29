
import { Dispatch, SetStateAction } from "react";



type Variante = {
  talla: string;

  color: string;

  precio: number;

  stock: number;

};



type Product = {

  id: number;

  nombre: string;

  marca: string;

  descripcion: string;

  imagenUrl: string;

  fechaCreacion: string;

  variantes: Variante[];

};



export type FormEventProps = {

  companies: Product[];

  setNewEvent: Dispatch<SetStateAction<{

    eventName: string;

    companySelected: { name: string; id: number }; // CORREGIDO: id ahora es number

    description: string; // AÑADIDO: la propiedad 'description'

  }>>;

  setOnSaveNewEvent: Dispatch<SetStateAction<boolean>>;

  setOpen: Dispatch<SetStateAction<boolean>>;
}