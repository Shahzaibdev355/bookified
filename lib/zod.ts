import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, ACCEPTED_PDF_TYPES } from "./constants";

const MAX_PDF_SIZE = 50 * 1024 * 1024;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const formSchema = z.object({
    pdfFile: z
        .any()
        .refine((file) => file instanceof File, "Book PDF is required.")
        .refine((file) => file?.size <= MAX_PDF_SIZE, "PDF must be under 50MB")
        .refine((file) => ACCEPTED_PDF_TYPES.includes(file?.type),
            "Only PDF files are allowed."
        ),
    // .instanceof(File, { message: "Please upload a PDF file." })
    // .refine((f) => f.type === "application/pdf", "Only PDF allowed")
    // .refine((f) => f.size <= MAX_PDF_SIZE, "PDF must be under 50MB"),

    coverImage: z
        .any()
        .optional()
        .refine((file) => {
            if (!file) return true;
            return file instanceof File;
        }, "Cover image must be a file")
        .refine((file) => {
            if (!file) return true;
            return file.size <= MAX_IMAGE_SIZE;
        }, "Image size must be less than 10MB.")
        .refine((file) => {
            if (!file) return true;
            return ACCEPTED_IMAGE_TYPES.includes(file.type);
        }, "Only .jpg, .jpeg, .png and .webp formats are supported."),

    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .min(2, "Title too short")
        .max(120, "Title too long"),

    author: z
        .string()
        .trim()
        .min(2, "Author required")
        .max(80, "Author name too long")
        .regex(/^[a-zA-Z\s.'-]+$/, "Invalid author name"),

    //   voice: z
    //     .string()
    //     .min(1, "Select voice")
    persona: z
        .string()
        .min(1, "Select voice")
});

export type FormValues = z.infer<typeof formSchema>;