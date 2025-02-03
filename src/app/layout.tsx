import { Navbar } from "@/components/common/Navbar";
import SessionProvider from "@/components/common/SessionProvider";
import { ReactQueryClientProvider } from "@/components/query/ReactQueryClientProvider";
import { Metadata, Viewport } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calorie tracker",
  description: "App to track your health",
  appleWebApp: true,
};

export const viewport: Viewport = {
  userScalable: false,
  width: "device-width",
  viewportFit: "cover",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <SessionProvider session={session}>
      <ReactQueryClientProvider>
        <html lang="en">
          <body className={`${inter.className} overscroll-none overflow-hidden touch-none`}>
            <div className="flex flex-col w-full min-h-screen bg-background">
              <Navbar />
              {children}
            </div>
          </body>
        </html>
      </ReactQueryClientProvider>
    </SessionProvider>
  );
}
