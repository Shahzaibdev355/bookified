'use client'

import Image from "next/image";
import Link from "next/link";

import { lazy, Suspense } from "react";
// import heroImg from "/assets/hero-girl-reading.png";
import ScrollReveal from "./ScrollReveal";


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
                <a
                  href="#cta"
                  className="bg-primary text-primary-foreground px-7 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-warm"
                >
                  Start Your Library
                </a>
                <a
                  href="#how-it-works"
                  className="border border-border text-foreground px-7 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
                >
                  See How It Works
                </a>
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
            className="w-full max-w-md animate-float"/>
              {/* <img
                src={heroImg}
                alt="Open book with golden light, globe, and oil lamp — scholarly illustration"
                width={800}
                height={800}
                className="w-full max-w-md animate-float"
              /> */}
            </div>
          </ScrollReveal>
        </div>
      </section>


      <section className="w-full pt-8 pb-15" style={{ marginTop: '' }}>
        <div
          className="mx-auto rounded-2xl overflow-hidden pt-5 pb-5"
          style={{ backgroundColor: "#F3E3C5" }}
        >
          <div className="flex flex-col md:flex-row items-center gap-0 min-h-[240px]">

            {/* LEFT – Heading, description, CTA */}
            <div className="flex-1 px-6 md:px-10 py-6 md:py-10 flex flex-col justify-center gap-5 w-full">
              <div>
                <h1
                  className="text-3xl md:text-4xl font-bold tracking-tight mb-3 font-serif"
                  style={{ color: "#1a1208" }}
                >
                  Your Library
                </h1>
                <p
                  className="text-sm leading-relaxed w-full"
                  style={{ color: "#6b5a42" }}
                >
                  Convert your books into interactive AI conversations.
                  <br />
                  Listen, learn, and discuss your favorite reads.
                </p>
              </div>

              <Link
                href="/books/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-150 w-fit"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#d4c4a8",
                  color: "#1a1208",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#f0e8d8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#ffffff";
                }}
              >
                <span className="text-lg leading-none">+</span>
                Add new book
              </Link>
            </div>

            {/* CENTER – Illustration */}
            <div className="flex-1 flex items-end justify-center order-first md:order-none">
              <Image src="/assets/hero-illustration.png" alt="Hero Illustration" width={360} height={260} />
            </div>

            {/* RIGHT – Steps card */}
            <div className="flex-shrink-0 px-6 md:pr-8 md:pl-4 py-6 md:py-8 flex items-center w-full md:w-auto">
              <div
                className="rounded-xl px-5 py-5 flex flex-col gap-4 shadow-sm w-full md:w-auto"
                style={{
                  backgroundColor: "#ffffff",
                  minWidth: "210px",
                }}
              >
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-start gap-3">
                    {/* Number badge */}
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5"
                      style={{
                        backgroundColor: "#f5ead8",
                        color: "#6b5a42",
                      }}
                    >
                      {step.number}
                    </div>

                    {/* Text */}
                    <div>
                      <p
                        className="text-sm font-semibold leading-tight"
                        style={{ color: "#1a1208" }}
                      >
                        {step.title}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#8b7a62" }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </>

  );
};

export default HeroSection;