"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, ImageIcon, X, Loader2 } from "lucide-react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input";

// ── Zod schema ────────────────────────────────────────────────────────────────
const formSchema = z.object({
    pdfFile: z
        .instanceof(File, { message: "Please upload a PDF file." })
        .refine((f) => f.type === "application/pdf", "Only PDF files are allowed.")
        .refine((f) => f.size <= 50 * 1024 * 1024, "File must be under 50 MB."),
    coverImage: z.instanceof(File).optional(),
    title: z.string().min(1, "Title is required."),
    author: z.string().min(1, "Author name is required."),
    voice: z.string().min(1, "Please select a voice."),
});

type FormValues = z.infer<typeof formSchema>;

// ── Voice data ────────────────────────────────────────────────────────────────
const voices = {
    male: [
        { id: "dave", name: "Dave", desc: "Young male, British-Essex, casual & conversational" },
        { id: "daniel", name: "Daniel", desc: "Middle-aged male, British, authoritative but warm" },
        { id: "chris", name: "Chris", desc: "Male, casual & easy-going" },
    ],
    female: [
        { id: "rachel", name: "Rachel", desc: "Young female, American, calm & clear" },
        { id: "sarah", name: "Sarah", desc: "Young female, American, soft & approachable" },
    ],
};

// ── Loading overlay ───────────────────────────────────────────────────────────
const LoadingOverlay = () => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[#f5f0eb]/80 backdrop-blur-sm">
        <Loader2 className="h-10 w-10 animate-spin text-[#663820]" />
        <p className="font-serif text-lg text-[#663820]">Synthesising your book…</p>
    </div>
);

// ── Dropzone sub-component ────────────────────────────────────────────────────
interface DropzoneProps {
    accept: string;
    icon: React.ReactNode;
    label: string;
    hint: string;
    file?: File;
    onFile: (file: File) => void;
    onClear: () => void;
    error?: string;
}

const Dropzone = ({ accept, icon, label, hint, file, onFile, onClear, error }: DropzoneProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) onFile(dropped);
    };

    return (
        <div>
            <div
                onClick={() => !file && ref.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`upload-dropzone flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors
          ${dragging ? "border-[#663820] bg-[#663820]/5" : "border-[#c8b8a2] bg-[#faf7f4]"}
          ${!file ? "cursor-pointer hover:border-[#663820] hover:bg-[#663820]/5" : "cursor-default"}
          ${error ? "border-red-400" : ""}`}
            >
                {file ? (
                    <div className="flex w-full items-center justify-between gap-3 rounded-lg bg-white px-4 py-3 shadow-sm">
                        <span className="truncate text-sm font-medium text-[#3d2b1f]">{file.name}</span>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onClear(); }}
                            className="shrink-0 rounded-full p-1 text-[#8b6355] transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ede8e3] text-[#8b6355]">
                            {icon}
                        </div>
                        <p className="text-sm font-semibold text-[#3d2b1f]">{label}</p>
                        <p className="text-xs text-[#9e8575]">{hint}</p>
                    </>
                )}
            </div>
            <input
                ref={ref}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
            />
            {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
        </div>
    );
};

// ── Main component ────────────────────────────────────────────────────────────
const UploadForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { title: "", author: "", voice: "rachel" },
    });

    const onSubmit = async (values: FormValues) => {
        setIsSubmitting(true);
        try {
            // TODO: replace with your actual API call
            console.log("Submitting:", values);
            await new Promise((r) => setTimeout(r, 2000)); // simulate network
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {isSubmitting && <LoadingOverlay />}

            <div className="new-book-wrapper">
                {/* <Field {...form}> */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* ── PDF upload ── */}
                    <Field>
                        <FieldLabel className="form-label">Book PDF File</FieldLabel>

                        <Dropzone
                            accept="application/pdf"
                            icon={<Upload className="h-6 w-6" />}
                            label="Click to upload PDF"
                            hint="PDF file (max 50MB)"
                            file={form.watch("pdfFile")}
                            onFile={(f) => form.setValue("pdfFile", f)}
                            onClear={() => form.setValue("pdfFile", undefined)}
                            error={form.formState.errors.pdfFile?.message}
                        />

                        {form.formState.errors.pdfFile && (
                            <FieldError>
                                {form.formState.errors.pdfFile.message}
                            </FieldError>
                        )}
                    </Field>

                    {/* ── Cover image upload ── */}
                    <Field>
                        <FieldLabel className="form-label">Cover Image (Optional)</FieldLabel>

                        <Dropzone
                            accept="image/*"
                            icon={<ImageIcon className="h-6 w-6" />}
                            label="Click to upload cover image"
                            hint="Leave empty to auto-generate from PDF"
                            file={form.watch("coverImage")}
                            onFile={(f) => form.setValue("coverImage", f)}
                            onClear={() => form.setValue("coverImage", undefined)}
                            error={form.formState.errors.coverImage?.message}
                        />

                        {form.formState.errors.coverImage && (
                            <FieldError>
                                {form.formState.errors.coverImage.message}
                            </FieldError>
                        )}
                    </Field>

                    {/* ── Title ── */}
                    <Field>
                        <FieldLabel className="form-label">Title</FieldLabel>
                        <Input
                            {...form.register("title")}
                            className="form-input"
                            placeholder="ex: Rich Dad Poor Dad"
                        />

                        {form.formState.errors.title && (
                            <FieldError>
                                {form.formState.errors.title.message}
                            </FieldError>
                        )}
                    </Field>

                    {/* ── Author ── */}
                    <Field>
                        <FieldLabel className="form-label">Author Name</FieldLabel>

                        <Input
                            {...form.register("author")}
                            className="form-input"
                            placeholder="ex: Robert Kiyosaki"
                        />

                        {form.formState.errors.author && (
                            <FieldError>
                                {form.formState.errors.author.message}
                            </FieldError>
                        )}
                    </Field>

                    {/* ── Voice selector ── */}
                    <Field>
                        <FieldLabel className="form-label">Choose Assistant Voice</FieldLabel>

                        <div className="space-y-5">
                            {/* Male voices */}
                            <div>
                                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9e8575]">
                                    Male Voices
                                </p>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                    {voices.male.map((v) => (
                                        <button
                                            key={v.id}
                                            type="button"
                                            onClick={() => form.setValue("voice", v.id)}
                                            className={`voice-selector-option rounded-xl border-2 px-4 py-3 text-left transition-all
              ${form.watch("voice") === v.id
                                                    ? "voice-selector-option-selected border-[#663820] bg-[#663820]/5 shadow-sm"
                                                    : "border-[#e2d8cf] bg-white hover:border-[#c8b8a2]"
                                                }`}
                                        >
                                            <div className="flex items-start gap-2">
                                                <span
                                                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors
                  ${form.watch("voice") === v.id ? "border-[#663820]" : "border-[#c8b8a2]"}`}
                                                >
                                                    {form.watch("voice") === v.id && (
                                                        <span className="h-2 w-2 rounded-full bg-[#663820]" />
                                                    )}
                                                </span>
                                                <div>
                                                    <p className="text-sm font-semibold text-[#3d2b1f]">{v.name}</p>
                                                    <p className="text-xs leading-snug text-[#9e8575]">{v.desc}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Female voices */}
                            <div>
                                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9e8575]">
                                    Female Voices
                                </p>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {voices.female.map((v) => (
                                        <button
                                            key={v.id}
                                            type="button"
                                            onClick={() => form.setValue("voice", v.id)}
                                            className={`voice-selector-option rounded-xl border-2 px-4 py-3 text-left transition-all
              ${form.watch("voice") === v.id
                                                    ? "voice-selector-option-selected border-[#663820] bg-[#663820]/5 shadow-sm"
                                                    : "border-[#e2d8cf] bg-white hover:border-[#c8b8a2]"
                                                }`}
                                        >
                                            <div className="flex items-start gap-2">
                                                <span
                                                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors
                  ${form.watch("voice") === v.id ? "border-[#663820]" : "border-[#c8b8a2]"}`}
                                                >
                                                    {form.watch("voice") === v.id && (
                                                        <span className="h-2 w-2 rounded-full bg-[#663820]" />
                                                    )}
                                                </span>
                                                <div>
                                                    <p className="text-sm font-semibold text-[#3d2b1f]">{v.name}</p>
                                                    <p className="text-xs leading-snug text-[#9e8575]">{v.desc}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {form.formState.errors.voice && (
                            <FieldError>
                                {form.formState.errors.voice.message}
                            </FieldError>
                        )}
                    </Field>

                    {/* ── Submit ── */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="form-btn w-full rounded-xl py-4 font-serif text-base font-semibold tracking-wide text-white transition-opacity disabled:opacity-70"
                        style={{ backgroundColor: "#663820" }}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Synthesising…
                            </span>
                        ) : (
                            "Begin Synthesis"
                        )}
                    </button>

                </form>
                {/* </Field> */}
            </div>
        </>
    );
};

export default UploadForm;