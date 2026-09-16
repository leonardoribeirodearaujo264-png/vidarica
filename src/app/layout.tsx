import type { Metadata } from "next";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";

export const metadata: Metadata = {
  metadataBase: new URL("https://vidarica.vercel.app"),
  title: "Sinapse Empresarial | Neurociência aplicada a negócios",
  description:
    "Método de Deyllane Lacerda que conecta comportamento, dinheiro e vendas. Finanças comportamentais para as suas decisões e neurovendas para as decisões do seu cliente.",
  keywords: [
    "neurociência aplicada a negócios",
    "finanças comportamentais",
    "neurovendas",
    "negociação",
    "mentalidade financeira",
    "Sinapse Empresarial",
    "Deyllane Lacerda",
    "decisão empresarial",
  ],
  openGraph: {
    title: "Sinapse Empresarial | O cérebro decide antes de você",
    description:
      "O mesmo mecanismo que faz você adiar uma decisão de dinheiro é o que faz seu cliente adiar o sim. Os dois lados da mesma sinapse.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Sinapse Empresarial" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sinapse Empresarial | O cérebro decide antes de você",
    description:
      "Neurociência aplicada a negócios: as suas decisões financeiras e as decisões de compra do seu cliente.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
