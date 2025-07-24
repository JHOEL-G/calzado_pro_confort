"use client"

import { useParams, useRouter } from "next/navigation"
import { FormContactoProps } from "./FormContacto.type"
import { useForm } from "react-hook-form"
import z from "zod"
import { formSchema } from "./FormContacto.form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectContent,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from "axios"

export function FormContacto(props: FormContactoProps) {
    const { setOpen } = props
    const params = useParams()
    const conpanyId = params?.conpanyId as string
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Nombre: "",
            Apellido: "",
            Role: "",
            Correo: "",
            Telefono: "",
        },
    })

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/contacto`,
                value
            )
            toast("GUARDADO CORRECTAMENTE")
            router.refresh()
            setOpen(false)
        } catch (error) {
            toast("HAY UN ERROR AL GUARDAR")
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="md:grid-cols-2 grid gap-4"
            >
                <FormField
                    control={form.control}
                    name="Nombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="Apellido"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Apellido</FormLabel>
                            <FormControl>
                                <Input placeholder=" Apellido" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Correo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Correo</FormLabel>
                            <FormControl>
                                <Input placeholder=" Correo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="Telefono"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefono</FormLabel>
                            <FormControl>
                                <Input placeholder="Telefono" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="Role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rol</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione un rol" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="agregar">Agregar</SelectItem>
                                    <SelectItem value="jefe">Jefe</SelectItem>
                                    <SelectItem value="otros">Otros</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="col-span-2">
                    <Button type="submit">GUARDAR CONTACTO</Button>
                </div>
            </form>
        </Form>
    );
}
