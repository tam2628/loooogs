import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "looogs",
  description: "Read awesome blogs from the best writers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="container mx-auto p-5 flex flex-col items-center">
          <div className="lg:w-5/6">{children}</div>
        </div>
      </body>
    </html>
  );
}
