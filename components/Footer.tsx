'use client'

import { SignInButton, useUser } from "@clerk/nextjs";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { label: "Library", href: "/library", protected: true },
    { label: "Pricing", href: "/subscriptions" },
    { label: "Add Book", href: "/books/new", protected: true },
];



const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shahzaib-s-01595a250/" },
    { label: "GitHub", href: "https://github.com/Shahzaibdev355" },
    { label: "Twitter", href: "https://x.com/_Shahzaib_Dev" },
];

const Footer = () => {

    const pathName = usePathname();

    const { user, isSignedIn } = useUser();

    return (
        <footer className="bg-primary text-primary-foreground py-14">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 font-heading text-xl font-semibold">
                            <BookOpen className="w-6 h-6 text-gold" />
                            Bookified
                        </div>
                        <p className="text-primary-foreground/60 text-sm max-w-xs">
                            Transform any book into an interactive AI-powered conversation. Read smarter, learn faster.
                        </p>
                    </div>

                    <div className="flex gap-8">

                        {links.map(({ label, href, protected: isProtected }) => {


                            // if protected and NOT signed in -> open modal
                            if (isProtected && !isSignedIn) {
                                return (
                                    <SignInButton key={label} mode="modal">
                                        <button className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm cursor-pointer">
                                            {label}
                                        </button>
                                    </SignInButton>
                                );
                            }

                            return (
                                <Link
                                    key={label}
                                    href={href}

                                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                                >
                                    {label}
                                </Link>
                            );
                        })}

                    </div>
                </div>

                <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-primary-foreground/40 text-xs">
                        © {new Date().getFullYear()} Bookified. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {socialLinks.map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                target="_blank"
                                className="text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors text-xs"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;