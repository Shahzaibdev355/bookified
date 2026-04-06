'use client'

import { lazy, Suspense } from "react";
import { BookOpen, Mic, Volume2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const FloatingParticles = lazy(() => import("./FloatingParticles"));

const mockBooks = [
    { title: "The Art of Thinking", author: "J. R. Morton", color: "bg-primary" },
    { title: "Meditations", author: "Marcus Aurelius", color: "bg-gold" },
    { title: "Deep Work", author: "Cal Newport", color: "bg-accent" },
];

const PreviewSection = () => {
    return (
        <section id="preview" className="py-24 bg-secondary/50 relative overflow-hidden">
            <Suspense fallback={null}>
                <FloatingParticles />
            </Suspense>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">
                            Preview
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
                            Your Digital Library
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <ScrollReveal>
                        <div className="bg-card rounded-2xl p-6 shadow-warm-lg">
                            <div className="flex items-center gap-2 mb-6">
                                <BookOpen className="w-5 h-5 text-gold" />
                                <span className="font-heading font-semibold text-foreground">My Library</span>
                            </div>
                            <div className="space-y-3">
                                {mockBooks.map((b) => (
                                    <div
                                        key={b.title}
                                        className="flex items-center gap-4 p-3 rounded-lg bg-secondary/70 hover:bg-secondary transition-colors cursor-pointer"
                                    >
                                        <div className={`w-10 h-14 rounded ${b.color} opacity-70 flex-shrink-0`} />
                                        <div>
                                            <p className="font-medium text-foreground text-sm">{b.title}</p>
                                            <p className="text-muted-foreground text-xs">{b.author}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                           
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <div className="bg-card rounded-2xl p-6 shadow-warm-lg">
                            <div className="flex items-center gap-2 mb-6">
                                <Mic className="w-5 h-5 text-gold" />
                                <span className="font-heading font-semibold text-foreground">Voice Chat</span>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-secondary/70 rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground italic">
                                        "What is the main argument in Chapter 3?"
                                    </p>
                                </div>
                                <div className="bg-primary/5 border border-gold/20 rounded-lg p-4">
                                    <p className="text-sm text-foreground leading-relaxed">
                                        The author argues that deep focus is a skill that must be deliberately
                                        cultivated, contrasting it with the modern tendency toward shallow work…
                                    </p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <Volume2 className="w-4 h-4 text-gold" />
                                        <div className="flex gap-0.5">
                                            {Array.from({ length: 20 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-0.5 bg-gold/50 rounded-full"
                                                    style={{ height: `${8 + Math.random() * 16}px` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}



export default PreviewSection;