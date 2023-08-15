import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import RightSidebar from "@/components/shared/RightSidebar";
import LeftSidebar from "@/components/shared/LeftSidebar";

import { redirect } from "next/navigation";

import { ClerkProvider, currentUser } from "@clerk/nextjs";

import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUsers, fetchUser } from "@/lib/actions/user.actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Threads Next",
    description: "Best social media platform on the web built with Nextjs 13",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const communityResults = await fetchCommunities({
        pageSize: 4,
    });

    const userResults = await fetchUsers({
        userId: user.id,
        pageSize: 4,
    });

    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <Topbar />
                    <main className="flex flex-row">
                        <LeftSidebar />
                        <section className="main-container">
                            <div className="w-full max-w-4xl">{children}</div>
                        </section>
                        <RightSidebar communities={communityResults.communities} users={userResults.users} />
                    </main>
                    <Bottombar />
                </body>
            </html>
        </ClerkProvider>
    );
}
