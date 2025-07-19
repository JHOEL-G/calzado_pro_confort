import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const data = await req.json();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const product = await response.json();
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    const errorMessage = (error instanceof Error) ? error.message : String(error);
    return new NextResponse(`Error al crear el producto: ${errorMessage}`, { status: 500 });
  }
}