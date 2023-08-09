import { SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

const Topbar = () => {
    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4">
                <Image src="/assets/img/logo.svg" alt="logo" height={28} width={28} />
                <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
            </Link>
            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer gap-x-2">
                                <Image src="/assets/img/logout.svg" alt="logout" width={24} height={24} />
                                <p className="text-light-1 font-medium hidden"> sign out </p>
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                <OrganizationSwitcher
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            organizationSwitcherTrigger: "py-2 px-4",
                        },
                    }}
                />
            </div>
        </nav>
    );
};

export default Topbar;
