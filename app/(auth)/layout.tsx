import "../globals.css";
import {} from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
    title: "Threads",
    description: "A Nextjs 13 Meta Threads Application.",
};

const poppins = Poppins({
    subsets: ["latin", "latin-ext"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface IProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: IProps) {
    return (
        <ClerkProvider appearance={{}}>
            <html lang="en">
                <body className={`${poppins.className} bg-dark-1 grid place-content-center`}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
