export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "./conponentes/Header/Header";
import Informacion from "./conponentes/Informacion/Informacion";
import axios from "axios";
import { Footer } from "./conponentes/Footer";

type Props = {
    params: {
        conpanyId: string;
    };
};

export default async function Page({
    params,
}: {
    params: Promise<{ conpanyId: string }>;
}) {
    const { conpanyId } = await params;

    const { userId } = await auth();
    if (!userId) return redirect("/conpanie");

    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/Products/${conpanyId}`,
            {
                timeout: 20000, // ⏱️ Espera hasta 20 segundos por si el servidor tarda
            }
        );

        const conpany = res.data;

        if (!conpany) return redirect("/conpanie");

        return (
            <div>
                <Header />
                <Informacion conpany={conpany} />
                <Footer conpanyId={conpany} />
            </div>
        );
    } catch (error) {
        console.error("❌ Error al obtener el producto:", error);
        return redirect("/conpanie");
    }
}
