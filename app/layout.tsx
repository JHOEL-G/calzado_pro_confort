// app/layout.tsx
import { type Metadata } from 'next'
import {
  ClerkProvider,
  // Elimina SignInButton, SignUpButton, SignedIn, SignedOut de aquí
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Calzados Pro - Confort',
  description: '👟 ¡20 años caminando con ustedes! Con pasión y estilo, cada paso cuenta. Zapatillas con comodidad, calidad y diseño para que vivas con actitud. Gracias por confiar y ser parte de nuestra gran historia. ✨ ¡Tu par favorito te espera, descubrelo ahora! 🛒',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}