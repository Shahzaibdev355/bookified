'use client'

import { useEffect, useRef, useState } from "react";
import { Mic } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface TranscriptProps {
    messages: Message[];
    currentMessage?: string;       // streaming AI text
    currentUserMessage?: string;   // streaming user text
}

// ── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 18) {
    const [displayed, setDisplayed] = useState("");
    const prevText = useRef("");

    useEffect(() => {
        // If text grew (streaming), animate the new characters
        if (text.startsWith(prevText.current)) {
            const newChars = text.slice(prevText.current.length);
            let i = 0;
            const interval = setInterval(() => {
                if (i >= newChars.length) {
                    clearInterval(interval);
                    return;
                }
                setDisplayed((prev) => prev + newChars[i]);
                i++;
            }, speed);
            prevText.current = text;
            return () => clearInterval(interval);
        } else {
            // Text changed entirely (new message)
            setDisplayed("");
            prevText.current = "";
        }
    }, [text, speed]);

    return displayed;
}

// ── Bubble ───────────────────────────────────────────────────────────────────
function Bubble({
    role,
    content,
    streaming = false,
}: {
    role: "user" | "assistant";
    content: string;
    streaming?: boolean;
}) {
    const isUser = role === "user";
    const typedContent = useTypewriter(content);
    const shownContent = streaming ? typedContent : content;

    return (
        <div
            className={`transcript-message ${
                isUser ? "transcript-message-user" : "transcript-message-assistant"
            } animate-fade-in`}
        >
            <div
                className={`transcript-bubble ${
                    isUser
                        ? "transcript-bubble-user"
                        : "transcript-bubble-assistant"
                }`}
            >
                <span>{shownContent}</span>
                {streaming && shownContent.length > 0 && (
                    <span className="transcript-cursor" aria-hidden="true" />
                )}
            </div>
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────
const Transcript = ({
    messages,
    currentMessage,
    currentUserMessage,
}: TranscriptProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const hasContent =
        messages.length > 0 || currentMessage || currentUserMessage;

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, currentMessage, currentUserMessage]);

    if (!hasContent) {
        return (
            <div className="transcript-container">
                <div className="transcript-empty">
                    <Mic size={48} className="text-stone-300" />
                    <p className="transcript-empty-text">No conversation yet</p>
                    <p className="transcript-empty-hint">
                        Click the mic button above to start talking
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="transcript-container">
            <div className="transcript-messages">
                {/* Committed messages */}
                {messages.map((msg, idx) => (
                    <Bubble key={idx} role={msg.role} content={msg.content} />
                ))}

                {/* Streaming user message */}
                {currentUserMessage && (
                    <Bubble
                        role="user"
                        content={currentUserMessage}
                        streaming
                    />
                )}

                {/* Streaming assistant message */}
                {currentMessage && (
                    <Bubble
                        role="assistant"
                        content={currentMessage}
                        streaming
                    />
                )}

                <div ref={bottomRef} />
            </div>
        </div>
    );
};

export default Transcript;