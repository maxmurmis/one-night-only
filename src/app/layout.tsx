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
  title: "Movie Match · Cinemark × One Night Only",
  description:
    "Una noche al año. Una sala llena de solteros. Descubrí con quién sos compatible en términos cinematográficos y desbloqueen beneficios juntos.",
  openGraph: {
    title: "Movie Match · Cinemark × One Night Only",
    description:
      "Contestá 14 preguntas de cine y descubrí tu compatibilidad con cualquiera. 27 de agosto, función exclusiva para solteros.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08050a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
