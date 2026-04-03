'use client'

import { useEffect, useRef } from "react";
import { Mic } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface TranscriptProps {
    messages: Message[];
    currentMessage?: string;
    currentUserMessage?: string;
}

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

    return (
        <div className={`transcript-message ${isUser ? "transcript-message-user" : "transcript-message-assistant"} animate-fade-in`}>
            <div className={`transcript-bubble ${isUser ? "transcript-bubble-user" : "transcript-bubble-assistant"}`}>
                <span>{content}</span>
                {streaming && content.length > 0 && (
                    <span className="transcript-cursor" aria-hidden="true" />
                )}
            </div>
        </div>
    );
}

const Transcript = ({ messages, currentMessage, currentUserMessage }: TranscriptProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const hasContent = messages.length > 0 || currentMessage || currentUserMessage;

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, currentMessage, currentUserMessage]);

    return (
        <div className="transcript-container">
            {!hasContent ? (
                <div className="transcript-empty">
                    <Mic size={48} className="text-stone-300" />
                    <p className="transcript-empty-text">No conversation yet</p>
                    <p className="transcript-empty-hint">Click the mic button above to start talking</p>
                </div>
            ) : (
                <div className="transcript-messages">
                    {messages.map((msg, idx) => (
                        <Bubble key={idx} role={msg.role} content={msg.content} />
                    ))}
                    {currentUserMessage && (
                        <Bubble role="user" content={currentUserMessage} streaming />
                    )}
                    {currentMessage && (
                        <Bubble role="assistant" content={currentMessage} streaming />
                    )}
                    <div ref={bottomRef} />
                </div>
            )}
        </div>
    );
};

export default Transcript;