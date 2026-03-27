'use client'

import Image from "next/image";
import Link from "next/link";

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

const BookIllustration = () => (
  <svg
    viewBox="0 0 340 260"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    aria-hidden="true"
  >
    {/* Open book (bottom center) */}
    <g transform="translate(80, 155)">
      {/* Left page */}
      <path
        d="M10 0 Q80 -8 90 0 L90 75 Q80 68 10 75 Z"
        fill="#e8dcc8"
        stroke="#b8a898"
        strokeWidth="1"
      />
      {/* Right page */}
      <path
        d="M90 0 Q100 -8 170 0 L170 75 Q100 68 90 75 Z"
        fill="#f0e8d8"
        stroke="#b8a898"
        strokeWidth="1"
      />
      {/* Spine */}
      <line x1="90" y1="0" x2="90" y2="75" stroke="#a09080" strokeWidth="1.5" />
      {/* Left page lines */}
      <line x1="25" y1="15" x2="80" y2="12" stroke="#c8b8a8" strokeWidth="0.8" />
      <line x1="25" y1="23" x2="80" y2="20" stroke="#c8b8a8" strokeWidth="0.8" />
      <line x1="25" y1="31" x2="80" y2="28" stroke="#c8b8a8" strokeWidth="0.8" />
      <line x1="25" y1="39" x2="80" y2="36" stroke="#c8b8a8" strokeWidth="0.8" />
      <line x1="25" y1="47" x2="80" y2="44" stroke="#c8b8a8" strokeWidth="0.8" />
      {/* Right page lines */}
      <line x1="100" y1="12" x2="155" y2="15" stroke="#c8b8a8" strokeWidth="0.8" />
      <line x1="100" y1="20" x2="155" y2="23" stroke="#c8b8a8" strokeWidth="0.8" />
      <line x1="100" y1="28" x2="155" y2="31" stroke="#c8b8a8" strokeWidth="0.8" />
      <line x1="100" y1="36" x2="155" y2="39" stroke="#c8b8a8" strokeWidth="0.8" />
      <line x1="100" y1="44" x2="155" y2="47" stroke="#c8b8a8" strokeWidth="0.8" />
    </g>

    {/* Stack of closed books (left side) */}
    {/* Bottom book - large dark brown */}
    <g transform="translate(75, 188)">
      <rect x="0" y="0" width="85" height="16" rx="1" fill="#6b4f3a" />
      <rect x="0" y="0" width="8" height="16" rx="1" fill="#5a3f2a" />
      <rect x="8" y="1" width="77" height="14" rx="0.5" fill="#7a5a42" />
      <line x1="15" y1="0" x2="15" y2="16" stroke="#6b4f3a" strokeWidth="0.5" />
    </g>

    {/* Middle book - medium brown */}
    <g transform="translate(82, 174)">
      <rect x="0" y="0" width="72" height="16" rx="1" fill="#8b6a4a" />
      <rect x="0" y="0" width="7" height="16" rx="1" fill="#7a5a3a" />
      <rect x="7" y="1" width="65" height="14" rx="0.5" fill="#9a7a58" />
    </g>

    {/* Top book - lighter tan */}
    <g transform="translate(85, 160)">
      <rect x="0" y="0" width="65" height="16" rx="1" fill="#a08060" />
      <rect x="0" y="0" width="7" height="16" rx="1" fill="#8a6a50" />
      <rect x="7" y="1" width="58" height="14" rx="0.5" fill="#b09070" />
    </g>

    {/* Upright books group (right side) */}
    {/* Book 1 - dark teal/green */}
    <g transform="translate(195, 100)">
      <rect x="0" y="0" width="22" height="130" rx="1.5" fill="#4a6b5a" />
      <rect x="0" y="0" width="5" height="130" rx="1" fill="#3a5a4a" />
      <rect x="5" y="2" width="17" height="126" fill="#5a7b6a" />
      <rect x="8" y="35" width="11" height="1.5" fill="#3a5a4a" opacity="0.5" />
      <rect x="8" y="55" width="11" height="1" fill="#3a5a4a" opacity="0.5" />
      <rect x="8" y="75" width="11" height="1" fill="#3a5a4a" opacity="0.5" />
    </g>

    {/* Book 2 - warm brown */}
    <g transform="translate(217, 90)">
      <rect x="0" y="0" width="24" height="140" rx="1.5" fill="#8b5e3c" />
      <rect x="0" y="0" width="5" height="140" rx="1" fill="#7a4e2c" />
      <rect x="5" y="2" width="19" height="136" fill="#9b6e4c" />
      <rect x="8" y="40" width="13" height="1.5" fill="#6a3e1c" opacity="0.4" />
      <rect x="8" y="60" width="13" height="1" fill="#6a3e1c" opacity="0.4" />
      <rect x="8" y="80" width="13" height="1" fill="#6a3e1c" opacity="0.4" />
      <rect x="8" y="100" width="13" height="1" fill="#6a3e1c" opacity="0.4" />
    </g>

    {/* Book 3 - olive/dark green */}
    <g transform="translate(241, 108)">
      <rect x="0" y="0" width="20" height="122" rx="1.5" fill="#5a6b3a" />
      <rect x="0" y="0" width="5" height="122" rx="1" fill="#4a5a2a" />
      <rect x="5" y="2" width="15" height="118" fill="#6a7b4a" />
    </g>

    {/* Globe */}
    <g transform="translate(148, 55)">
      {/* Globe base/stand */}
      <rect x="28" y="118" width="4" height="20" fill="#c8a870" />
      <ellipse cx="30" cy="140" rx="18" ry="6" fill="#b89858" />
      <ellipse cx="30" cy="138" rx="15" ry="5" fill="#c8a870" />

      {/* Arc support */}
      <path d="M10 60 Q-5 30 30 20 Q65 10 50 60" stroke="#c8a870" strokeWidth="3" fill="none" />
      <rect x="27" y="55" width="6" height="10" fill="#c8a870" />

      {/* Globe sphere */}
      <circle cx="30" cy="65" r="50" fill="#7aa8c8" opacity="0.3" />
      <circle cx="30" cy="65" r="48" fill="#c8d8e8" />

      {/* Globe land masses (simplified continents) */}
      <ellipse cx="15" cy="58" rx="14" ry="10" fill="#b8c8a0" opacity="0.8" />
      <ellipse cx="12" cy="72" rx="10" ry="12" fill="#a8b890" opacity="0.8" />
      <ellipse cx="38" cy="55" rx="18" ry="8" fill="#b8c8a0" opacity="0.8" />
      <ellipse cx="48" cy="68" rx="12" ry="9" fill="#a8b890" opacity="0.8" />
      <ellipse cx="35" cy="80" rx="8" ry="6" fill="#b0c098" opacity="0.8" />

      {/* Globe latitude/longitude lines */}
      <circle cx="30" cy="65" r="48" fill="none" stroke="#a0b8c8" strokeWidth="0.8" opacity="0.5" />
      <ellipse cx="30" cy="65" rx="48" ry="20" fill="none" stroke="#a0b8c8" strokeWidth="0.8" opacity="0.5" />
      <ellipse cx="30" cy="65" rx="35" ry="48" fill="none" stroke="#a0b8c8" strokeWidth="0.8" opacity="0.5" />
      <line x1="-18" y1="65" x2="78" y2="65" stroke="#a0b8c8" strokeWidth="0.8" opacity="0.5" />
      <line x1="30" y1="17" x2="30" y2="113" stroke="#a0b8c8" strokeWidth="0.8" opacity="0.5" />
    </g>

    {/* Desk lamp */}
    <g transform="translate(222, 42)">
      {/* Lamp base */}
      <ellipse cx="30" cy="132" rx="20" ry="5" fill="#b8a060" />
      <rect x="27" y="95" width="6" height="40" rx="2" fill="#c8b070" />

      {/* Lamp arm - curved */}
      <path d="M30 95 Q35 65 55 50" stroke="#c8b070" strokeWidth="5" fill="none" strokeLinecap="round" />

      {/* Lamp head */}
      <path d="M42 40 Q55 30 68 40 Q60 65 50 65 Q40 65 42 40 Z" fill="#d4a830" />
      <path d="M44 42 Q55 33 66 42 Q60 60 50 60 Q42 60 44 42 Z" fill="#c89820" />

      {/* Light effect */}
      <ellipse cx="55" cy="68" rx="12" ry="5" fill="#f5e090" opacity="0.3" />
    </g>
  </svg>
);

const HeroSection = () => {
  return (
    <section className="w-full pt-8 pb-15" style={{marginTop: ''}}>
      <div
        className="mx-auto rounded-2xl overflow-hidden pt-5 pb-5"
        style={{ backgroundColor: "#F3E3C5" }}
      >
        <div className="flex items-center gap-0 min-h-[240px]">

          {/* LEFT – Heading, description, CTA */}
          <div className="flex-1 px-10 py-10 flex flex-col justify-center gap-5">
            <div>
              <h1
                className="text-4xl font-bold tracking-tight mb-3 font-serif"
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
          <div
            className="flex-1 flex items-end justify-center"
            // style={{ width: "320px", height: "240px" }}
          >
            {/* <BookIllustration /> */}
            <Image src="/assets/hero-illustration.png" alt="Hero Illustration" width={360} height={260} />
          </div>

          {/* RIGHT – Steps card */}
          <div className="flex-shrink-0 pr-8 pl-4 py-8 flex items-center">
            <div
              className="rounded-xl px-5 py-5 flex flex-col gap-4 shadow-sm"
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
  );
};

export default HeroSection;