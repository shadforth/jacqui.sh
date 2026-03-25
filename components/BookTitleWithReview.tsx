"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import type { Book } from "@/lib/books";
import { formatReadDate, stars } from "@/lib/books";
import { quickLinkClassName } from "@/lib/quick-link";

export function BookTitleWithReview({ book }: { book: Book }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  if (!book.review) {
    return <span>{book.title}</span>;
  }

  const handleOpen = () => {
    dialogRef.current?.showModal();
  };

  const handleClose = () => {
    dialogRef.current?.close();
  };

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={`${quickLinkClassName} cursor-pointer border-0 bg-transparent p-0 text-left font-inherit text-inherit hover:text-[hsl(var(--accent))]`}
      >
        {book.title}
      </button>

      <dialog
        ref={dialogRef}
        className="reading-review-dialog fixed left-1/2 top-1/2 z-[200] m-0 max-h-[85vh] w-[min(32rem,calc(100vw-2rem))] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-0 text-[hsl(var(--foreground))] shadow-lg [&::backdrop]:bg-[rgb(0_0_0/0.45)]"
        onClick={handleDialogClick}
        aria-labelledby="book-review-title"
      >
        <div className="relative p-6 font-sans">
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-3 top-3 z-10 cursor-pointer rounded p-1.5 text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--border))] hover:text-[hsl(var(--foreground))]"
            aria-label="Close"
          >
            <X className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
          <div className="flex flex-col gap-4 pr-8">
          <div
            id="book-review-title"
            className="flex flex-wrap items-baseline"
            style={{ minWidth: 0 }}
          >
            <span className="font-medium decoration-border hover:decoration-border pr-1">{book.title}</span>
            <span style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.85rem" }}>
              by {book.author}
            </span>
          </div>
          <div className="flex flex-col gap-1.5 text-[0.95rem] leading-relaxed text-[hsl(var(--foreground))]">
            {book.review
              .split(/\n\n+/)
              .map((block) => block.trim())
              .filter(Boolean)
              .map((block, i) => (
                <p key={i} className="m-0 whitespace-pre-line">
                  {block}
                </p>
              ))}
          </div>
          <div className="flex flex-col gap-3 border-t border-[hsl(var(--border))] pt-4">
            <div className="flex flex-col gap-2">
              {book.myRating > 0 && (
                <div className="flex flex-wrap items-baseline gap-3">
                  <span
                    className="w-28 shrink-0 text-[0.875rem] text-[hsl(var(--muted-foreground))]"
                  >
                    Rating
                  </span>
                  <span
                    style={{
                      color: "hsl(var(--accent))",
                      fontSize: "0.7rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {stars(book.myRating)}
                  </span>
                </div>
              )}
              {book.dateRead && (
                <div className="flex flex-wrap items-baseline gap-3">
                  <span
                    className="w-28 shrink-0 text-[0.875rem] text-[hsl(var(--muted-foreground))]"
                  >
                    Read
                  </span>
                  <span
                    style={{
                      color: "hsl(var(--muted-foreground))",
                      fontSize: "0.875rem",
                    }}
                  >
                    {formatReadDate(book.dateRead)}
                  </span>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
