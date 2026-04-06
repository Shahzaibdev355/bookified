// 'use client'
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Show, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";


// const navItems = [
//     { label: "Library", href: "/" },
//     { label: "Add New", href: "/books/new", protected: true },
//     { label: "Pricing", href: "/subscriptions" },
// ]


// const Navbar = () => {

//     const pathName = usePathname();

//     const { user, isSignedIn } = useUser();


//     return (
//         <header className="w-full fixed z-50 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)]">
//             <div className="wrapper navbar-height py-4 flex justify-between items-center">

//                 <Link href="/" className="flex gap-0.5 items-center">
//                     <Image src="/assets/logo.png" alt="bookified"
//                         width={42}
//                         height={42}
//                     />
//                     <span className="logo-text">Bookified</span>
//                 </Link>

//                 <nav className="w-fit flex gap-7.5 items-center">
//                     {/* {navItems.map(({ label, href }) => { */}
//                     {navItems.map(({ label, href, protected: isProtected }) => {

//                         const isActive = pathName === href || (href !== "/" && pathName.startsWith(href));

//                         // Protected link — show SignInButton modal if not signed in
//                         if (isProtected && !isSignedIn) {
//                             return (
//                                 <SignInButton key={label} mode="modal">
//                                     <button className={cn('nav-link-base', 'text-black hover:opacity-70')}>
//                                         {label}
//                                     </button>
//                                 </SignInButton>
//                             );
//                         }

//                         return (
//                             <Link key={label} href={href}
//                                 className={cn('nav-link-base',
//                                     isActive ? 'nav-link-active' :
//                                         'text-black hover:opacity-70'
//                                 )}>
//                                 {label}
//                             </Link>
//                         )

//                     })}


//                     {/* <SignedOut>
//                     <SignInButton mode="modal"/>
//                 </SignedOut>

//                 <SignedIn>
//                     <UserButton/>
//                 </SignedIn> */}

//                     <div className="flex gap-7.5 items-center">
//                         <Show when="signed-out">
//                             <SignInButton mode="modal" />
//                             {/* <SignUpButton mode="modal" /> */}
//                         </Show>

//                         <Show when="signed-in">
//                             <div className="nav-user-link">
//                                 <UserButton />
//                                 {
//                                     user?.firstName && (
//                                         <h3
//                                             // href="/subscriptions"
//                                             className="nav-user-name"
//                                         >
//                                             {user.firstName}
//                                         </h3>
//                                     )
//                                 }
//                             </div>
//                         </Show>
//                     </div>

//                 </nav>

//             </div>
//         </header>
//     );
// }

// export default Navbar;

'use client'


import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Show, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";


const links = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Preview", href: "#preview" },
    { label: "Library", href: "/library", protected: true },
    { label: "Pricing", href: "/subscriptions" }
];

const Navbar = () => {

    const pathName = usePathname();

    const { user, isSignedIn } = useUser();

    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
                <Link href="/" className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
                    <BookOpen className="w-6 h-6 text-gold" />
                    Bookified
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {links.map(({ label, href, protected: isProtected }) => {

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

                            <Link
                                key={label}
                                href={href}
                                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                            >
                                {label}
                            </Link>
                        )
                    })}


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
                                            className="nav-user-name"
                                        >
                                            {user.firstName}
                                        </h3>
                                    )
                                }
                            </div>
                        </Show>
                    </div>

                    {/* <a
                        href="#cta"
                        className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                        Get Started
                    </a> */}
                </div>

                <button
                    className="md:hidden text-foreground"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {open && (
                <div className="md:hidden bg-background border-b border-border px-6 pb-4 space-y-3">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                        >
                            {l.label}
                        </a>
                    ))}





                    {/* <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="block bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium text-center"
          >
            Get Started
          </a> */}
                </div>
            )}
        </nav>
    );
}


export default Navbar;