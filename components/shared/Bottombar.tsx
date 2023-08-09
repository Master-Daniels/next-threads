"use client";

import { sidebarLinks } from "@/constants";

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";

const Bottombar = () => {
    const pathname = usePathname();
    return (
        <section className="bottombar">
            <div className="bottombar_container">
                {sidebarLinks.map((link) => {
                    const activeLink =
                        (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                    return (
                        <Link
                            key={link.label}
                            href={link.route}
                            className={`${
                                activeLink && "bg-primary-500"
                            } bottombar_link hover:bg-primary-500/20 transition-all duration-1000`}
                        >
                            <Image src={link.imgURL} alt={link.label} width={24} height={24} />
                            <p className="text-subtle-medium text-light-1 max-sm:hidden">{link.label.split(" ")[0]}</p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default Bottombar;
