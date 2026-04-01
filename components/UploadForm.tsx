"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
    Field,
    FieldError,
    FieldLabel,

} from "@/components/ui/field"

import { Input } from "@/components/ui/input";
import FileUploader from "./FileUploader";
import VoiceSelector from "./VoiceSelector";

import { formSchema, FormValues } from "@/lib/zod";
import BookCoverImage from "./BookCoverImage";
import CoverImageUpload from "./CoverImageUpload";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { checkBookExists } from "@/lib/actions/book.action";
import { useRouter } from "next/navigation";
import { parsePDFFile } from "@/lib/utils";
import { upload } from "@vercel/blob/client";



// ── Loading overlay ───────────────────────────────────────────────────────────
const LoadingOverlay = () => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[#f5f0eb]/80 backdrop-blur-sm">
        <Loader2 className="h-10 w-10 animate-spin text-[#663820]" />
        <p className="font-serif text-lg text-[#663820]">Synthesising your book…</p>
    </div>
);


// ── Main component ────────────────────────────────────────────────────────────
const UploadForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const userId = useAuth()

    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { title: "", author: "", voice: "rachel" },
    });

    const onSubmit = async (data: FormValues) => {

        if (!userId) {
            return toast.error("You must be signed in to upload a book.");
        }

        setIsSubmitting(true);
        console.log("Form values:", data);

        try {

            const existsCheck = await checkBookExists(data.title);
            if (existsCheck.exists && existsCheck.book) {
                toast.info("A book with this title already exists. Please choose a different title.");
                form.reset()
                router.push(`/books/${existsCheck.book.slug}`);
                return;
            }

            const fileTitle = data.title.replace(/\s+/g, "_").toLowerCase();
            const pdfFile = data.pdfFile[0];

            const parsedPDF = await parsePDFFile(pdfFile);

            if (parsedPDF.content.length === 0) {
                toast.error("The uploaded PDF appears to be empty or could not be parsed. Please check the file and try again.");
                return;
            }

            const uploadedPdfBlob = await upload(fileTitle, pdfFile, {
                access: "public",
                handleUploadUrl: '/api/upload',
                contentType: 'application/pdf'
            });

            let coverUrl: string;

            if (data.coverImage && data.coverImage.length > 0) {
                const coverFile = data.coverImage[0];
                const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, coverFile, {
                    access: "public",
                    handleUploadUrl: '/api/upload',
                    contentType: coverFile.type
                })
                coverUrl = uploadedCoverBlob.url;
            } else {
                const response = await fetch(parsePDFFile.cover)
                const blob = await response.blob();

                const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, blob, {
                    access: "public",
                    handleUploadUrl: '/api/upload',
                    contentType: 'image/png'
                })

                coverUrl = uploadedCoverBlob.url;
            }











            // // TODO: replace with your actual API call
            // console.log("Submitting:", values);
            // await new Promise((r) => setTimeout(r, 2000)); // simulate network
        }
        catch (e) {
            console.error("Submission error:", e);
            toast.error("An error occurred while submitting the form. Please try again.");
        }

        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {isSubmitting && <LoadingOverlay />}

            <div className="new-book-wrapper">

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* ── PDF upload ── */}
                    <FileUploader form={form} />

                    {/* ── Cover image upload ── */}
                    {/* <BookCoverImage form={form} /> */}
                    <CoverImageUpload form={form} />

                    {/* ── Title ── */}
                    <Field>
                        <FieldLabel className="form-label">Title</FieldLabel>
                        <Input
                            {...form.register("title")}
                            className="form-input custom-form-input"
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
                            className="form-input custom-form-input"
                            placeholder="ex: Robert Kiyosaki"
                        />

                        {form.formState.errors.author && (
                            <FieldError>
                                {form.formState.errors.author.message}
                            </FieldError>
                        )}
                    </Field>

                    {/* ── Voice selector ── */}
                    <VoiceSelector form={form} />


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

            </div>
        </>
    );
};

export default UploadForm;