'use client'

import { useEffect, useRef } from "react";
import { Mic } from "lucide-react";

import { Messages as Message } from "@/types";

// interface Message {
//     role: "user" | "assistant";
//     content: string;
// }

interface TranscriptProps {
    messages: Message[];
    currentMessage?: string;
    currentUserMessage?: string;
    isConnecting?: boolean;  // ← add this
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

// Narrow any incoming role value to the Bubble component's expected union
function toBubbleRole(role: string): "user" | "assistant" {
    return role === "user" ? "user" : "assistant";
}

// const Transcript = ({ messages, currentMessage, currentUserMessage }: TranscriptProps) => {
//     const bottomRef = useRef<HTMLDivElement>(null);
//     const hasContent = messages.length > 0 || currentMessage || currentUserMessage;

//     useEffect(() => {
//         bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages, currentMessage, currentUserMessage]);

//     return (
//         <div className="transcript-container">
//             {!hasContent ? (
//                 <div className="transcript-empty">
//                     <Mic size={48} className="text-stone-300" />
//                     <p className="transcript-empty-text">No conversation yet</p>
//                     <p className="transcript-empty-hint">Click the mic button above to start talking</p>
//                 </div>
//             ) : (
//                 <div className="transcript-messages">
//                     {messages.map((msg, idx) => {
//                         const role = toBubbleRole((msg as unknown as { role: string }).role);
//                         return <Bubble key={idx} role={role} content={msg.content} />;
//                     })}
//                     {currentUserMessage && (
//                         <Bubble role="user" content={currentUserMessage} streaming />
//                     )}
//                     {currentMessage && (
//                         <Bubble role="assistant" content={currentMessage} streaming />
//                     )}
//                     <div ref={bottomRef} />
//                 </div>
//             )}
//         </div>
//     );
// };



const Transcript = ({ messages, currentMessage, currentUserMessage, isConnecting }: TranscriptProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const hasContent = messages.length > 0 || currentMessage || currentUserMessage;

    // useEffect(() => {
    //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    // }, [messages, currentMessage, currentUserMessage]);

    return (
        <div className="transcript-container">
            {!hasContent ? (
                <div className="transcript-empty">
                    {isConnecting ? (
                        // ── Connecting state ──
                        <>
                            <div className="flex gap-1.5 items-center justify-center">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                            </div>
                            <p className="transcript-empty-text mt-3 text-amber-600">Connecting…</p>
                            <p className="transcript-empty-hint">Preparing your AI reading companion</p>
                        </>
                    ) : (
                        // ── Default empty state ──
                        <>
                            <Mic size={48} className="text-stone-300" />
                            <p className="transcript-empty-text">No conversation yet</p>
                            <p className="transcript-empty-hint">Click the mic button above to start talking</p>
                        </>
                    )}
                </div>
            ) : (
                <div className="transcript-messages">
                    {messages.map((msg, idx) => {
                        const role = toBubbleRole((msg as unknown as { role: string }).role);
                        return <Bubble key={idx} role={role} content={msg.content} />;
                    })}
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


