'use client';

import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search, Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [query, setQuery] = useState(searchParams.get('query') || '');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);

            if (query) {
                params.set('query', query);
            } else {
                params.delete('query');
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, pathname, router]);

    return (
        // <div className="library-search-wrapper">
        //     <div className="pl-4">
        //         <SearchIcon
        //             size={20}
        //             className="text-[var(--text-muted)]"
        //         />
        //     </div>
        //     <Input
        //         type="text"
        //         placeholder="Search books by title or author"
        //         className="library-search-input border-none shadow-none focus-visible:ring-0"
        //         value={query}
        //         onChange={(e) => setQuery(e.target.value)}
        //     />
        // </div>


        <div className="max-w-xl mx-auto mb-6">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search books by title, author, or topic..."
                    className="pl-11 h-12 rounded-xl bg-card border-border shadow-warm text-sm"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

            </div>
        </div>
    );
};

export default SearchBar;