'use client'

import useVapi from "@/hooks/useVapi";
import { IBook } from "@/types";
import { Circle, MicOff, Mic } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Transcript from "./Transcript";

const VapiControls = ({ book }: { book: IBook }) => {
    const [micActive, setMicActive] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const {
        status,
        isActive,
        messages,
        currentMessage,
        currentUserMessage,
        duration,
        start,
        stop,
        clearError,
        maxDurationSeconds
    } = useVapi(book);

    const handleMicClick = () => {
        if (micActive) {
            stop();
            setMicActive(false);
        } else {
            start();
            setMicActive(true);
        }
    };

    // Format duration as M:SS/15:00
    const formatDuration = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        const maxM = Math.floor(maxDurationSeconds / 60);
        const maxS = maxDurationSeconds % 60;
        return `${m}:${String(s).padStart(2, "0")}/${maxM}:${String(maxS).padStart(2, "0")}`;
    };

    // Status dot color
    const statusColor =
        status === "thinking"
            ? "fill-amber-400 text-amber-400"
            : status === "speaking"
                ? "fill-emerald-400 text-emerald-400"
                : "fill-stone-400 text-stone-400";

    // "Listening" when mic is active and agent is idle
    const statusLabel =
        status === "thinking"
            ? "Thinking…"
            : status === "speaking"
                ? "Speaking"
                : micActive   // ← mic is on but agent not speaking/thinking = listening
                    ? "Listening"
                    : "Ready";

    return (
        <>
            {/* ── Header Card ── */}
            <div className="vapi-header-card">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                    {/* Cover + Mic Button */}
                    <div className="relative flex-shrink-0 pb-5 pr-5">
                        <div className="relative w-[120px] h-[175px] rounded-xl overflow-hidden shadow-md">
                            <Image
                                src={book.coverURL}
                                alt={book.title}
                                fill
                                className="object-cover"
                                sizes="120px"
                                priority
                            />
                        </div>

                        {/* Mic button with hover + active state */}
                        <button
                            className={`vapi-mic-btn transition-all duration-200
                                ${isHovered && !micActive ? "bg-stone-900 text-white shadow-lg scale-105" : ""}
                                ${micActive ? "bg-[#663820] text-white shadow-lg scale-105 ring-2 ring-[#663820]/40" : ""}
                            `}
                            aria-label={micActive ? "Stop conversation" : "Start conversation"}
                            type="button"
                            onClick={handleMicClick}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            disabled={status === "connecting" || status === "thinking" || status === "speaking"}
                        >
                            {micActive ? <Mic size={22} /> : <MicOff size={22} />}
                        </button>
                    </div>

                    {/* Book Meta */}
                    <div className="flex flex-col gap-3 flex-1 min-w-0 text-center sm:text-left">
                        <div>
                            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-800 leading-snug truncate">
                                {book.title}
                            </h1>
                            <p className="text-stone-500 mt-1 text-base">by {book.author}</p>
                        </div>

                        {/* Status pills */}
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-1">
                            <span className="vapi-status-indicator">
                                <Circle
                                    size={8}
                                    className={`transition-colors duration-300 ${statusColor}`}
                                />
                                <span className="vapi-status-text">{statusLabel}</span>
                            </span>

                            <span className="vapi-status-indicator">
                                <span className="vapi-status-text">Voice: {book.persona}</span>
                            </span>

                            <span className="vapi-status-indicator">
                                <span className="vapi-status-text">
                                    {formatDuration(duration ?? 0)}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Transcript ── */}
            <div className="vapi-transcript-wrapper">
                <Transcript
                    messages={messages}
                    currentMessage={currentMessage}
                    currentUserMessage={currentUserMessage}
                />
            </div>
        </>
    );
};

export default VapiControls;