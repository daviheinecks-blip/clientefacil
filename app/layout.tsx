import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClienteFácil — Gestão de clientes",
  description: "Organize clientes, acompanhe vendas e nunca perca um retorno."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
