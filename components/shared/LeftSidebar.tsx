"use client";

import { sidebarLinks } from "@/constants";

import { SignedIn, SignOutButton } from "@clerk/nextjs";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const LeftSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-2 px-6">
                {sidebarLinks.map((link) => {
                    const activeLink =
                        (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                    return (
                        <Link
                            key={link.label}
                            href={link.route}
                            className={`${
                                activeLink && "bg-primary-500"
                            } leftsidebar_link hover:bg-primary-500/20 transition-all duration-1000`}
                        >
                            <Image src={link.imgURL} alt={link.label} width={24} height={24} />
                            <p className="text-light-1 max-lg:hidden">{link.label}</p>
                        </Link>
                    );
                })}
            </div>
            <div className="mt-10 px-6">
                <SignedIn>
                    <SignOutButton signOutCallback={() => router.push("/sign-in")}>
                        <div className="flex cursor-pointer gap-x-4 p-4  hover:bg-primary-500/20 transition-all duration-1000 rounded-md">
                            <Image src="/assets/img/logout.svg" alt="logout" width={24} height={24} />
                            <p className="text-light-2 max-lg:hidden"> Logout </p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    );
};

export default LeftSidebar;
