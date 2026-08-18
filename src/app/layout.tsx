import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { PIXEL_ID } from "@/lib/pixel";

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
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        {/* End Meta Pixel Code */}
        {children}
      </body>
    </html>
  );
}
