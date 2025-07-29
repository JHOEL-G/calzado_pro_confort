export type Event = {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
  userId: string;
};

type Variante = {
    talla: string;
    color: string;
    precio: number;
    stock: number;
};

export type Company = { 
    id: number;
    nombre: string;
    marca: string;
    descripcion: string;
    imagenUrl: string;
    fechaCreacion: string;
    variantes: Variante[];
};

export type ChartProps = {
  companies: Company[]; 
  events: Event[];
};