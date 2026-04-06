import { BookOpen } from "lucide-react";

const links = [
  { label: "Library", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Add Book", href: "#" },
];

const Footer = () => {
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
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/40 text-xs">
            © {new Date().getFullYear()} Bookified. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Twitter", "LinkedIn", "GitHub"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors text-xs"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;