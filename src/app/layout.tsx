import type { Metadata } from "next";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";

export const metadata: Metadata = {
  title: "Vida Rica | Transforme sua relação com o dinheiro",
  description:
    "Treinamento online de finanças comportamentais e mentalidade financeira com Deyllane Lacerda. Transforme seus padrões financeiros e construa uma vida próspera.",
  keywords: [
    "finanças comportamentais",
    "mentalidade financeira",
    "educação financeira",
    "vida rica",
    "Deyllane Lacerda",
    "prosperidade",
    "dinheiro",
    "inteligência financeira",
  ],
  openGraph: {
    title: "Vida Rica | Transforme sua relação com o dinheiro",
    description:
      "Treinamento online de finanças comportamentais e mentalidade financeira. Sua Vida Rica começa na mente.",
    type: "website",
    locale: "pt_BR",
    images: ["/images/logo.png"],
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
