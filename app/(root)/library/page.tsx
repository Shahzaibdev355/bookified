// 'use client'

import { BookOpen, Search, Clock, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
// import ScrollReveal from "@/components/ScrollReveal";
import { getAllBooks } from "@/lib/actions/book.action";
import BookCard from "@/components/BookCard";
import SearchBar from "@/components/SearchBar";

const placeholderBooks = [
    { title: "Meditations", author: "Marcus Aurelius", desc: "A timeless guide to Stoic philosophy and the art of inner peace.", date: "Jan 12, 2026", color: "bg-primary" },
    { title: "The Art of Thinking", author: "J. R. Morton", desc: "An exploration of critical reasoning and intellectual clarity.", date: "Feb 3, 2026", color: "bg-gold" },
    { title: "Deep Work", author: "Cal Newport", desc: "Rules for focused success in a distracted world.", date: "Mar 18, 2026", color: "bg-accent" },
    { title: "Letters from a Stoic", author: "Seneca", desc: "Philosophical letters on virtue, wealth, and the good life.", date: "Mar 22, 2026", color: "bg-primary/80" },
    { title: "The Republic", author: "Plato", desc: "A foundational text on justice, society, and the ideal state.", date: "Apr 1, 2026", color: "bg-gold/80" },
    { title: "Essays", author: "Michel de Montaigne", desc: "Personal reflections on human nature, knowledge, and experience.", date: "Apr 5, 2026", color: "bg-accent/80" },
    { title: "On Liberty", author: "John Stuart Mill", desc: "A classic defense of individual freedom and free expression.", date: "Apr 6, 2026", color: "bg-primary/70" },
    { title: "Walden", author: "Henry David Thoreau", desc: "A meditation on simple living and self-sufficiency in nature.", date: "Apr 6, 2026", color: "bg-gold/70" },
];

const recentBooks = placeholderBooks.slice(0, 4);

const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
    // const Page = async ({ searchParams }: { searchParams: { query?: string } }) => {

    const { query } = await searchParams;

    // const { query } = searchParams;

    const bookResults = await getAllBooks(query)
    const books = bookResults.success ? bookResults.data ?? [] : []

    return (
        <div className="min-h-screen bg-background bg-paper-texture">


            <main className="pt-28 pb-20 max-w-6xl mx-auto px-6">
                {/* Header */}
                {/* <ScrollReveal> */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-3">
                        Your Library
                    </h1>
                    <p className="text-muted-foreground font-body max-w-lg mx-auto">
                        Explore and interact with your uploaded books
                    </p>
                </div>

                {/* Search Bar */}
                <SearchBar />
                {/* <div className="max-w-xl mx-auto mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search books by title, author, or topic..."
                            className="pl-11 h-12 rounded-xl bg-card border-border shadow-warm text-sm"
                            // readOnly
                        />

                    </div>
                </div> */}

                <Separator className="max-w-2xl mx-auto mb-10" />
                {/* </ScrollReveal> */}

                {/* Book count */}
                {/* <ScrollReveal>
                    <p className="text-sm text-muted-foreground mb-6">
                        <span className="font-medium text-foreground">12 books</span> in your collection
                    </p>
                </ScrollReveal> */}

                {/* Recently Opened */}
                {/* <ScrollReveal> */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-gold" />
                        <h2 className="text-lg font-heading font-semibold text-foreground">Recent Books</h2>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {/* {recentBooks.map((book) => (
                            <div
                                key={book.title}
                                className="flex-shrink-0 w-56 bg-card rounded-xl p-4 border border-border shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                                style={{border: '3px solid red'}}
                            >
                                <div className={`w-full h-28 rounded-lg ${book.color} opacity-60 mb-3`} />
                                <p className="font-heading font-semibold text-foreground text-sm truncate">{book.title}</p>
                                <p className="text-muted-foreground text-xs">{book.author}</p>
                            </div>
                        ))} */}


                        {books.map((book) => (
                            <BookCard
                                key={book._id}
                                title={book.title}
                                author={book.author}
                                coverURL={book.coverURL}
                                slug={book.slug}
                            />
                        ))}

                    </div>
                </div>
                {/* </ScrollReveal> */}



                {/* Empty State (commented out for future use) */}
                {/*
        <div className="text-center py-20">
          <BookOpen className="w-16 h-16 text-gold/40 mx-auto mb-6" />
          <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">Your library is empty</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Upload your first book to start having AI-powered conversations.
          </p>
          <Button className="rounded-lg gap-2">
            <Upload className="w-4 h-4" />
            Upload Your First Book
          </Button>
        </div>
        */}
            </main>
        </div>
    );
}


export default Page;