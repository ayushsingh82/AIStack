"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import SearchBar from "./SearchBar";

export default function DocsShell({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen w-full bg-black text-white lg:flex">
      <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-white/10 bg-black px-4 py-3 lg:hidden">
        <Link href="/" className="shrink-0 text-base font-semibold">
          AIStack Docs
        </Link>
        <div className="min-w-0 flex-1">
          <SearchBar />
        </div>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="shrink-0 rounded-md p-2 text-gray-300 hover:bg-white/5 hover:text-white"
        >
          {open ? (
            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div
          role="button"
          aria-label="Close navigation overlay"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-20 bg-black/70 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-14 bottom-0 z-20 w-72 transform overflow-y-auto border-r border-white/10 bg-black px-4 pb-6 pt-4 transition-transform duration-200 ease-out lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:translate-x-0 lg:py-6 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          href="/"
          className="mb-6 hidden px-2 text-lg font-semibold lg:block"
        >
          AIStack Docs
        </Link>
        {sidebar}
      </aside>

      <main className="min-w-0 flex-1">
        <div className="sticky top-0 z-10 hidden justify-end border-b border-white/10 bg-black/95 px-6 py-4 backdrop-blur lg:flex lg:px-10">
          <SearchBar />
        </div>
        <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</div>
      </main>
    </div>
  );
}
