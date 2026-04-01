"use client";

import { useRef, useState, useEffect } from "react";
import { ImageIcon, X } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface CoverImageUploadProps {
    form: any;
}

const CoverImageUpload = ({ form }: CoverImageUploadProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState<"idle" | "loading" | "done">("idle");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imageVisible, setImageVisible] = useState(false);

    const file: File | undefined = form.watch("coverImage");
    const error: string | undefined = form.formState.errors.coverImage?.message;

    // Cleanup object URL on unmount
    useEffect(() => {
        return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
    }, [previewUrl]);

    const handleFile = (f: File) => {
        if (!f.type.startsWith("image/")) return;

        // Reset state
        setImageVisible(false);
        setProgress(0);
        setStage("loading");

        const url = URL.createObjectURL(f);
        setPreviewUrl(url);
        form.setValue("coverImage", f);

        // Animate progress bar: quick ramp to 80%, then pause, then 100%
        let current = 0;
        const interval = setInterval(() => {
            current += Math.random() * 18 + 6;
            if (current >= 80) {
                current = 80;
                clearInterval(interval);

                // Simulate async "processing" then complete
                setTimeout(() => {
                    setProgress(100);
                    setTimeout(() => {
                        setStage("done");
                        // Small delay then fade image in
                        setTimeout(() => setImageVisible(true), 80);
                    }, 350);
                }, 400);
            }
            setProgress(Math.min(current, 80));
        }, 60);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        form.setValue("coverImage", undefined);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setStage("idle");
        setProgress(0);
        setImageVisible(false);
        if (ref.current) ref.current.value = "";
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) handleFile(dropped);
    };

    return (
        <Field>
            <FieldLabel className="form-label">Cover Image (Optional)</FieldLabel>

            <div
                onClick={() => stage === "idle" && ref.current?.click()}
                onDragOver={(e) => { e.preventDefault(); if (stage === "idle") setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={[
                    "upload-dropzone relative overflow-hidden rounded-xl border-2 border-dashed transition-colors",
                    stage === "idle"
                        ? dragging
                            ? "cursor-pointer border-[#663820] bg-[#663820]/5"
                            : "cursor-pointer border-[#c8b8a2] bg-[#faf7f4] hover:border-[#663820] hover:bg-[#663820]/5"
                        : "cursor-default border-[#c8b8a2] bg-[#faf7f4]",
                    error ? "border-red-400" : "",
                ].join(" ")}
            >
                {/* ── Idle state ── */}
                {stage === "idle" && (
                    <div className="flex flex-col items-center justify-center gap-2 px-6 py-10 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ede8e3] text-[#8b6355]">
                            <ImageIcon className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-semibold text-[#3d2b1f]">Click to upload cover image</p>
                        <p className="text-xs text-[#9e8575]">Leave empty to auto-generate from PDF</p>
                    </div>
                )}

                {/* ── Loading state — progress bar ── */}
                {stage === "loading" && (
                    <div className="flex flex-col items-center justify-center gap-4 px-8 py-10">
                        {/* Thumbnail skeleton shimmer */}
                        <div className="relative h-28 w-20 overflow-hidden rounded-lg bg-[#e8e0d8]">
                            <div
                                className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"
                                style={{ animationDuration: "1.2s", animationIterationCount: "infinite" }}
                            />
                        </div>

                        {/* File name */}
                        <p className="max-w-[200px] truncate text-xs font-medium text-[#3d2b1f]">
                            {file?.name}
                        </p>

                        {/* Progress bar */}
                        <div className="w-full space-y-1.5">
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e8e0d8]">
                                <div
                                    className="h-full rounded-full bg-[#663820] transition-all duration-200 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] text-[#9e8575]">
                                <span>Uploading…</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Done state — image reveal ── */}
                {stage === "done" && previewUrl && (
                    <div
                        className={[
                            "flex items-center gap-4 px-5 py-4 transition-all duration-500",
                            imageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                        ].join(" ")}
                        style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                    >
                        {/* Preview thumbnail */}
                        <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-lg shadow-md ring-1 ring-[#c8b8a2]">
                            <img
                                src={previewUrl}
                                alt="Cover preview"
                                className={[
                                    "h-full w-full object-cover transition-all duration-700",
                                    imageVisible ? "scale-100 blur-0" : "scale-110 blur-sm",
                                ].join(" ")}
                            />
                            {/* Subtle shine overlay */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                        </div>

                        {/* File info */}
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-[#3d2b1f]">{file?.name}</p>
                            <p className="mt-0.5 text-xs text-[#9e8575]">
                                {file ? `${(file.size / 1024).toFixed(1)} KB` : ""}
                            </p>
                            <div className="mt-2 flex items-center gap-1.5">
                                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100">
                                    <svg className="h-2.5 w-2.5 text-emerald-600" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <span className="text-xs font-medium text-emerald-600">Upload complete</span>
                            </div>
                        </div>

                        {/* Clear button */}
                        <button
                            type="button"
                            onClick={handleClear}
                            className="shrink-0 rounded-full p-1.5 text-[#8b6355] transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>

            <input
                ref={ref}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />

            {error && (
                <FieldError>{error}</FieldError>
            )}

          
        </Field>
    );
};

export default CoverImageUpload;