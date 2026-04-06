'use client'

import { MessageSquare, Search, Mic2, GraduationCap, Zap, BookOpen } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  { icon: MessageSquare, title: "AI Book Conversations", desc: "Have natural, intelligent dialogues about any book in your library." },
  { icon: Search, title: "Smart Search Inside Books", desc: "Find specific passages, themes, or ideas across all your uploaded books." },
  { icon: Mic2, title: "Voice Interaction", desc: "Speak to your books and listen to AI-powered summaries and answers." },
  { icon: GraduationCap, title: "Personalized Learning", desc: "Get tailored insights and study guides based on your reading goals." },
  { icon: Zap, title: "Fast Processing", desc: "Books are analyzed in seconds, ready for conversation almost instantly." },
  { icon: BookOpen, title: "Distraction-Free Reading", desc: "A clean, focused reading environment designed for deep comprehension." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-paper-texture">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">
              Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
              Features Built for Readers
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.1}>
              <div className="bg-card rounded-xl p-7 shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 group h-full">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5 group-hover:bg-gold/10 transition-colors">
                  <f.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}


export default FeaturesSection;