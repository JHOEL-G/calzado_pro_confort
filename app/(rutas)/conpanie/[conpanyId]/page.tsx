import { auth } from "@clerk/nextjs/server"
import axios from "axios"
import { console } from "inspector"
import { redirect } from "next/navigation"
import Header from "./conponentes/Header/Header"
import Informacion from "./conponentes/Informacion/Informacion"

export default async function Page({ params }: { params: { conpanyId: string } }) {
    const { userId } = await auth()

    if (!userId) {
        return redirect("/conpanie")
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Products/${params.conpanyId}`)
    console.log("URL:", `${process.env.NEXT_PUBLIC_API_URL}/api/Products/${params.conpanyId}`)

    const conpany = response.data

    if (!conpany) {
        return redirect("/conpanie")
    }

    console.log(conpany)

    return (
        <div>
            <Header />
            <Informacion conpany={conpany} />
        </div>
    )
}
