'use client'
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Show, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";


const navItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new", protected: true },
    { label: "Pricing", href: "/subscriptions" },
]


const Navbar = () => {

    const pathName = usePathname();

    const { user, isSignedIn } = useUser();


    return (
        <header className="w-full fixed z-50 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)]">
            <div className="wrapper navbar-height py-4 flex justify-between items-center">

                <Link href="/" className="flex gap-0.5 items-center">
                    <Image src="/assets/logo.png" alt="bookified"
                        width={42}
                        height={42}
                    />
                    <span className="logo-text">Bookified</span>
                </Link>

                <nav className="w-fit flex gap-7.5 items-center">
                    {/* {navItems.map(({ label, href }) => { */}
                    {navItems.map(({ label, href, protected: isProtected }) => {

                        const isActive = pathName === href || (href !== "/" && pathName.startsWith(href));

                        // Protected link — show SignInButton modal if not signed in
                        if (isProtected && !isSignedIn) {
                            return (
                                <SignInButton key={label} mode="modal">
                                    <button className={cn('nav-link-base', 'text-black hover:opacity-70')}>
                                        {label}
                                    </button>
                                </SignInButton>
                            );
                        }

                        return (
                            <Link key={label} href={href}
                                className={cn('nav-link-base',
                                    isActive ? 'nav-link-active' :
                                        'text-black hover:opacity-70'
                                )}>
                                {label}
                            </Link>
                        )

                    })}


                    {/* <SignedOut>
                    <SignInButton mode="modal"/>
                </SignedOut>

                <SignedIn>
                    <UserButton/>
                </SignedIn> */}

                    <div className="flex gap-7.5 items-center">
                        <Show when="signed-out">
                            <SignInButton mode="modal" />
                            {/* <SignUpButton mode="modal" /> */}
                        </Show>

                        <Show when="signed-in">
                            <div className="nav-user-link">
                                <UserButton />
                                {
                                    user?.firstName && (
                                        <h3
                                            // href="/subscriptions"
                                            className="nav-user-name"
                                        >
                                            {user.firstName}
                                        </h3>
                                    )
                                }
                            </div>
                        </Show>
                    </div>

                </nav>

            </div>
        </header>
    );
}

export default Navbar;