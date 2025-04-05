import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Prompt Hub",
    description: "Discover and share AI prompts",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="main">
                    <div className="gradient" />
                </div>


                <Provider>
                    <main className="app">
                        <Navbar />
                        {children}
                    </main>
                </Provider>

                
            </body>
        </html>
    );
}
