import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Parazone",
    template: "%s | Parazone",
  },
  description:
    "Parazone est votre comparateur en ligne de produits de parapharmacie. Découvrez et comparez une large gamme de produits de soins, de bien-être et de beauté pour trouver les meilleures offres et promotions disponibles sur les plus grands sites de parapharmacie.",
  robots: "noindex, nofollow",
  keywords:
    "parapharmacie, comparateur de prix, soins, beauté, bien-être, promotions, offres, produits de santé",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <main className="max-w10xl mx-auto font-sans">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
