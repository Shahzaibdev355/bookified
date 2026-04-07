'use-client'

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Circle, Mic, MicOff } from "lucide-react";
import { getBookBySlug } from "@/lib/actions/book.action";
import VapiControls from "@/components/VapiControls";

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

const BookDetailsPage = async ({ params }: BookPageProps) => {
  const { userId } = await auth();
  if (!userId) redirect("/"); 

  const { slug } = await params;
  const result = await getBookBySlug(slug);

  if (!result.success || !result.data) redirect("/");


  const book = result.data;

  return (
    <main className="book-page-container">
      {/* Floating Back Button */}
      <Link href="/library" className="back-btn-floating" aria-label="Go back">
        <ArrowLeft size={20} />
      </Link>

      {/* Centered content wrapper */}
      <div className="mx-auto w-full max-w-4xl px-4 py-8 flex flex-col gap-6">


        {/* ── 2. Transcript Area ── */}
       <VapiControls book={book}/>

      </div>
    </main>
  );
};

export default BookDetailsPage;