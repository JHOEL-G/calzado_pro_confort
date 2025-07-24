import z from "zod";


export const formSchema = z.object ({
    Nombre: z.string().min(2).max(50),
    Apellido: z.string().min(2).max(50),
    Role: z.string(),
    Correo: z.string().email(),
    Telefono: z.string(),
})