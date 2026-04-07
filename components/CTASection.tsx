'use client'

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { useUser, SignInButton } from "@clerk/nextjs";

const CTASection = () => {


    const { isSignedIn } = useUser()



    return (
        <section id="cta" className="py-24 bg-paper-texture relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent pointer-events-none" />
            <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                <ScrollReveal>
                    <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">
                        Get Started Today
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
                        Your Personal AI Reading Companion
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
                        Join thousands of readers who have transformed how they engage with books.
                    </p>



                    {isSignedIn ? (
                        <Link
                            href="/books/new"
                            style={{cursor: 'pointer'}}
                            className="inline-block bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity shadow-warm-lg"
                        >
                            Upload Your First Book
                        </Link>
                    ) : (
                        <SignInButton mode="modal">
                            <button
                             style={{cursor: 'pointer'}}
                                className="inline-block bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity shadow-warm-lg"
                            >
                                Upload Your First Book
                            </button>
                        </SignInButton>
                    )}

                </ScrollReveal>
            </div>
        </section>
    );
}


export default CTASection;