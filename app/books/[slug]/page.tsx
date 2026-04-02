import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Circle, Mic, MicOff } from "lucide-react";
import { getBookBySlug } from "@/lib/actions/book.action";

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

const BookDetailsPage = async ({ params }: BookPageProps) => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { slug } = await params;
  const result = await getBookBySlug(slug);

  if (!result.success || !result.data) redirect("/");

  const { title, author, coverURL, persona } = result.data;

  return (
    <main className="book-page-container">
      {/* Floating Back Button */}
      <Link href="/" className="back-btn-floating" aria-label="Go back">
        <ArrowLeft size={20} />
      </Link>

      {/* Centered content wrapper */}
      <div className="mx-auto w-full max-w-4xl px-4 py-8 flex flex-col gap-6">

        {/* ── 1. Header Card ── */}
        <div className="vapi-header-card">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

            {/* Cover + Mic Button */}
            {/* pb-5 pr-5 creates space so the mic button (which hangs outside) isn't clipped */}
            <div className="relative flex-shrink-0 pb-5 pr-5">
              <div className="relative w-[120px] h-[175px] rounded-xl overflow-hidden shadow-md">
                <Image
                  src={coverURL}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="120px"
                  priority
                />
              </div>

              {/* Mic button — half on image, half off (bottom-right) */}
              <button
                className="vapi-mic-btn"
                aria-label="Start conversation"
                type="button"
              >
                <MicOff size={22} />
              </button>
            </div>

            {/* Book Meta */}
            <div className="flex flex-col gap-3 flex-1 min-w-0 text-center sm:text-left">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-800 leading-snug">
                  {title}
                </h1>
                <p className="text-stone-500 mt-1 text-base">by {author}</p>
              </div>

              {/* Status pills */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-1">
                <span className="vapi-status-indicator">
                  <Circle size={8} className="fill-stone-400 text-stone-400" />
                  <span className="vapi-status-text">Ready</span>
                </span>

                <span className="vapi-status-indicator">
                  <span className="vapi-status-text">Voice: {persona}</span>
                </span>

                <span className="vapi-status-indicator">
                  <span className="vapi-status-text">0:00/15:00</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. Transcript Area ── */}
        <div className="transcript-container">
          <div className="transcript-empty">
            <Mic size={48} className="text-stone-300" />
            <p className="transcript-empty-text">No conversation yet</p>
            <p className="transcript-empty-hint">
              Click the mic button above to start talking
            </p>
          </div>
        </div>

      </div>
    </main>
  );
};

export default BookDetailsPage;