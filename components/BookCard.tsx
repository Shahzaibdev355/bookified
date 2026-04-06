import { BookCardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";


const BookCard = ({ title, author, coverURL, slug }: BookCardProps) => {
    return (
        <Link href={`/books/${slug}`}>
            {/* <article className="book-card">
                <figure className="book-card-figure">
                    <div className="book-card-cover-wrapper">
                        <Image
                        src={coverURL}
                        alt = {title}
                        width={133}
                        height={200}
                        className="book-card-cover"
                        />
                    </div>
                </figure>

                <figcaption className="book-card-meta">
                    <h3 className="book-card-title">{title}</h3>
                    <p className="book-card-author">{author}</p>
                </figcaption>
            </article> */}


            <div
                key={title}
                className="flex-shrink-0 w-56 bg-card rounded-xl p-4 border border-border shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                style={{ border: '' }}
            >
                <div className={`w-full rounded-lg opacity- mb-3`}>
                    <figure className="book-card-figure">
                        <div className="book-card-cover-wrapper">
                            <Image
                                src={coverURL}
                                alt={title}
                                width={133}
                                height={200}
                                className="book-card-cover"
                            />
                        </div>
                    </figure>
                </div>
                <p className="font-heading font-semibold text-foreground text-sm truncate">{title}</p>
                <p className="text-muted-foreground text-xs">{author}</p>
            </div>


        </Link>
    );
}

export default BookCard;