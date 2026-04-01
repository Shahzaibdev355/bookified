import { z } from "zod";

const MAX_PDF_SIZE = 50 * 1024 * 1024;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const formSchema = z.object({
  pdfFile: z
    .instanceof(File, { message: "Please upload a PDF file." })
    .refine((f) => f.type === "application/pdf", "Only PDF allowed")
    .refine((f) => f.size <= MAX_PDF_SIZE, "PDF must be under 50MB"),

  coverImage: z
    .instanceof(File)
    .refine((f) => f.size <= MAX_IMAGE_SIZE, "Image must be under 5MB")
    .optional(),

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

  voice: z
    .string()
    .min(1, "Select voice")
});

export type FormValues = z.infer<typeof formSchema>;