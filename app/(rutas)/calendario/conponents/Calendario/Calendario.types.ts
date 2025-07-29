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

// ¡CORRECCIÓN AQUÍ! Cambiado de 'Conpany' a 'Company'
export type Company = { // <--- ¡Asegúrate de que esta sea 'Company' y no 'Conpany'!
    id: number;
    nombre: string;
    marca: string;
    descripcion: string;
    imagenUrl: string;
    fechaCreacion: string;
    variantes: Variante[];
};

export type CalendarioProps = {
  companies: Company[]; // <--- Ahora se refiere a la interfaz 'Company' correctamente nombrada
  events: Event[];
};