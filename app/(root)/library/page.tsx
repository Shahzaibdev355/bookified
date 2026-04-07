// 'use client'

import { BookOpen, Search, Clock, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getAllBooks } from "@/lib/actions/book.action";
import BookCard from "@/components/BookCard";
import SearchBar from "@/components/SearchBar";



const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {

    const { query } = await searchParams;


    const bookResults = await getAllBooks(query)
    const books = bookResults.success ? bookResults.data ?? [] : []

    return (
        <div className="min-h-screen bg-background bg-paper-texture">


            <main className="pt-28 pb-20 max-w-6xl mx-auto px-6">


                {/* Header */}
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


                <Separator className="max-w-2xl mx-auto mb-10" />

                {/* Book count */}
                {/* <ScrollReveal>
                    <p className="text-sm text-muted-foreground mb-6">
                        <span className="font-medium text-foreground">12 books</span> in your collection
                    </p>
                </ScrollReveal> */}


                {/* Recently Opened */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-gold" />
                        <h2 className="text-lg font-heading font-semibold text-foreground">Recent Books</h2>
                    </div>

                    {books.length > 0 ? (
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide books-show-row">
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
                    ) : (
                        /* Empty State */
                        <div className="text-center py-20">
                            <BookOpen className="w-16 h-16 text-gold/40 mx-auto mb-6" />
                            <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
                                {query ? `No books found for "${query}"` : "Your library is empty"}
                            </h3>
                            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                                {query
                                    ? "Try a different search term or browse all books."
                                    : "Upload your first book to start having AI-powered conversations."}
                            </p>
                            {!query && (
                                <Button className="rounded-lg gap-2">
                                    <Upload className="w-4 h-4" />
                                    Upload Your First Book
                                </Button>
                            )}
                        </div>
                    )}
                </div>


            </main>
        </div>
    );
}


export default Page;