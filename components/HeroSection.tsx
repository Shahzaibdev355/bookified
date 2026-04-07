'use client'

import Image from "next/image";
import Link from "next/link";

import { lazy, Suspense } from "react";
// import heroImg from "/assets/hero-girl-reading.png";
import ScrollReveal from "./ScrollReveal";
import { useUser, SignInButton } from "@clerk/nextjs";


const steps = [
  {
    number: 1,
    title: "Upload PDF",
    description: "Add your book file",
  },
  {
    number: 2,
    title: "AI Processing",
    description: "We analyze the content",
  },
  {
    number: 3,
    title: "Voice Chat",
    description: "Discuss with AI",
  },
];

const FloatingParticles = lazy(() => import("./FloatingParticles"));


const HeroSection = () => {

  const { isSignedIn } = useUser();

  return (

    <>

      <section className="relative min-h-screen flex items-center overflow-hidden bg-paper-texture">
        <Suspense fallback={null}>
          <FloatingParticles />
        </Suspense>

        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <ScrollReveal>
            <div className="space-y-6">
              <p className="text-gold font-medium text-sm tracking-widest uppercase">
                AI-Powered Reading
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                Turn Books Into{" "}
                <span className="text-gold italic">Conversations</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
                Upload any book and engage in intelligent AI conversations about its contents.
                A new way to read, learn, and explore knowledge.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">


                

                {isSignedIn ? (
                  <Link
                    href="/books/new"
                    className="bg-primary text-primary-foreground px-7 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-warm"
                  >
                    Start Your Library
                  </Link>
                ) : (
                  <SignInButton mode="modal">
                    <button
                      className="bg-primary text-primary-foreground px-7 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-warm"
                    >
                      Start Your Library
                    </button>
                  </SignInButton>
                )}



                <Link
                  href="#how-it-works"
                  className="border border-border text-foreground px-7 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
                >
                  See How It Works
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex justify-center">
              <Image
                src="/assets/hero-girl-reading.png"
                alt="Open book with golden light, globe, and oil lamp — scholarly illustration"
                width={800}
                height={800}
                className="w-full max-w-md animate-float" />

            </div>
          </ScrollReveal>
        </div>
      </section>




    </>

  );
};

export default HeroSection;