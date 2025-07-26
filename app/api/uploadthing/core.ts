import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

async function Usuario(): Promise<{ userId: string }> {
  const { userId } = await auth();
  if (!userId) throw new Error("Usuario no encontrado");
  return { userId };
}

export const ourFileRouter = {
  imagenUrl: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
    .middleware(async () => await Usuario())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
