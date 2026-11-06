import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Movie Match · Cinemark",
  description:
    "Descubrí con quién compartís tus gustos de cine.",
  openGraph: {
    title: "Movie Match · Cinemark",
    description:
      "Contestá preguntas de cine y descubrí tu compatibilidad.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f5",
  width: "device-width",
  initialScale: 1,
  // Sin maximumScale: bloquear el pinch-zoom deja afuera a quien lo necesita
  // para leer, y no arregla nada que el layout no resuelva ya.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${bebas.variable} ${inter.variable}`}>
      <body>
        <div id="app">{children}</div>
      </body>
    </html>
  );
}
