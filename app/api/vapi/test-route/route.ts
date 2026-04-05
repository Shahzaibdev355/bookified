import { NextResponse } from 'next/server';
import { searchBookSegments } from '@/lib/actions/book.action';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { bookId, query } = body;

        if (!bookId || !query) {
            return NextResponse.json({ error: 'bookId and query are required' }, { status: 400 });
        }

        console.log('Test search — bookId:', bookId, '| query:', query);

        const result = await searchBookSegments(bookId, query, 3);

        return NextResponse.json({
            success: result.success,
            totalFound: result.data?.length ?? 0,
            data: result.data,
            error: result.error ?? null,
        });
    } catch (error) {
        console.error('Test route error:', error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}