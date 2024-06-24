import { Providers } from "./Providers";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Company hierarchy",
  description: "Employees of the company hierarchy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen min-w-screen bg-[linear-gradient(330deg,hsl(272,53%,50%)_0%,hsl(226,68%,56%)_100%)]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
