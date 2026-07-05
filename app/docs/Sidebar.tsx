"use client";

import Link from "next/link";
import { useState } from "react";
import { modules, topicSlug } from "./data";

export default function Sidebar() {
  const [openSlugs, setOpenSlugs] = useState<Set<string>>(
    () => new Set(modules.map((m) => m.slug)),
  );

  function toggle(slug: string) {
    setOpenSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }

  return (
    <nav>
      {modules.map((module) => {
        const isOpen = openSlugs.has(module.slug);
        return (
          <div key={module.slug} className="mb-2">
            <button
              type="button"
              onClick={() => toggle(module.slug)}
              className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-300"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className={`h-3 w-3 shrink-0 transition-transform duration-150 ${
                  isOpen ? "rotate-90" : "rotate-0"
                }`}
              >
                <path
                  d="M6 3.5L10.5 8L6 12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="truncate">
                Module {module.number} · {module.title}
              </span>
            </button>
            {isOpen && (
              <ul className="mt-1 space-y-0.5">
                {module.topics.map((topic) => (
                  <li key={topic}>
                    <Link
                      href={`/docs/${module.slug}/${topicSlug(topic)}`}
                      className="block rounded-md py-1 pl-7 pr-2 text-[13px] leading-5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {topic}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
