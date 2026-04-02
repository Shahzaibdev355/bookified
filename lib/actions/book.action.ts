'use server'

import { connectDB } from "@/database/db";
import { CreateBook, TextSegment } from "@/types";
import { success } from "zod";
import { generateSlug, serializeData } from "../utils";
import { Book } from "@/database/models/book.model";
import { BookSegment } from "@/database/models/bool-segment.model";


export const getAllBooks = async () => {
    try {

        await connectDB();

        const books = await Book.find().sort({ createdAt: -1 }).lean();

        return{
            success: true,
            data: serializeData(books)
        }

    }
    catch (e) {
        console.error("Error connecting to database:", e);
        return {
            success: false,
            error: e
        }
    }
}


export const getBookBySlug = async (slug: string) => {
    try {
        await connectDB();

        const book = await Book.findOne({ slug }).lean();

        if (!book) {
            return { success: false, error: 'Book not found' };
        }

        return {
            success: true,
            data: serializeData(book)
        }
    } catch (e) {
        console.error('Error fetching book by slug', e);
        return {
            success: false, error: e
        }
    }
}


export const checkBookExists = async (title: string) => {

    try {

        await connectDB();

        const slug = generateSlug(title);

        const existingBook = await Book.findOne({ slug }).lean();

        if (existingBook) {
            return {
                exists: true,
                book: serializeData(existingBook)
            }
        }

        return {
            exists: false
        }

    } catch (error) {
        console.error("Error checking book existence:", error);
        return {
            success: false,
            error: error
        }
    }
}


export const createBook = async (data: CreateBook) => {
    try {

        await connectDB()

        const slug = generateSlug(data.title);

        const existingBook = await Book.findOne({ slug }).lean();

        if (existingBook) {
            return {
                success: true,
                data: serializeData(existingBook),
                alreadyExists: true
            }
        }

        // check subscription limit before creating a book

        const book = await Book.create({ ...data, slug, totalSegments: 0 });
        return {
            success: true,
            data: serializeData(book),
        }


    } catch (error) {
        console.error("Error creating book:", error);
        return {
            success: false,
            error: error
        }
    }
}


export const saveBookSegments = async (bookId: string, clerkId: string, segments: TextSegment[]) => {
    try {

        await connectDB();

        console.log("saving book segment...")

        const segmentsToInsert = segments.map(({ text, segmentIndex, pageNumber, wordCount }) => ({
            clerkId,
            bookId,
            content: text,
            segmentIndex,
            pageNumber,
            wordCount
        }))

        await BookSegment.insertMany(segmentsToInsert);

        await Book.findByIdAndUpdate(bookId, { totalSegments: segments.length });

        console.log("book segments saved successfully");

        return {
            success: true,
            data: { segmentsCreated: segments.length }
        }


    } catch (error) {
        console.error("Error saving book segments:", error);

        await BookSegment.deleteMany({ bookId });
        await Book.findByIdAndDelete(bookId);
        console.log("deleted book and segments due to failure in saving segments");
        return {
            success: false,
            error: error
        }
    }
}