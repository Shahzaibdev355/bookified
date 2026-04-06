'use client'

import { Upload, Cpu, Mic } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
    {
        icon: Upload,
        title: "Upload Your Book",
        description: "Simply upload a PDF or EPUB file from your personal library.",
        step: "01",
    },
    {
        icon: Cpu,
        title: "AI Processing",
        description: "Our AI reads, indexes, and deeply understands every page of your book.",
        step: "02",
    },
    {
        icon: Mic,
        title: "Start Conversing",
        description: "Ask questions, explore themes, and discuss the book through voice or text.",
        step: "03",
    },
];

const HowItWorksSection = () => {
    return (
        <section id="how-it-works" className="py-24 bg-secondary/50 bg-paper-texture">
            <div className="max-w-6xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">
                            Simple Process
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
                            How It Works
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((s, i) => (
                        <ScrollReveal key={s.step} delay={i * 0.15}>
                            <div className="bg-card rounded-xl p-8 shadow-warm hover:shadow-warm-lg transition-shadow duration-300 group text-center">
                                <span className="text-gold-muted font-heading text-5xl font-bold opacity-30 group-hover:opacity-50 transition-opacity">
                                    {s.step}
                                </span>
                                <div className="mt-4 mb-4 flex justify-center">
                                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                                        <s.icon className="w-6 h-6 text-gold" />
                                    </div>
                                </div>
                                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                                    {s.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {s.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}


export default HowItWorksSection;