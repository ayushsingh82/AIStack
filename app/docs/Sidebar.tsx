"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { modules, sectionSlug, topicSlug } from "./data";
import { ACTIVE_TOPIC_EVENT } from "./ScrollSpy";

function Arrow({ isOpen }: { isOpen: boolean }) {
  return (
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
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState<Set<string>>(() => new Set());
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    const sectionMatch = pathname.match(/^\/docs\/([^/]+)\/section\/([^/]+)/);
    if (sectionMatch) {
      const [, moduleSlug, sectionSlugParam] = sectionMatch;
      const module = modules.find((m) => m.slug === moduleSlug);
      const section = module?.sections?.find(
        (s) => sectionSlug(s.title) === sectionSlugParam,
      );
      if (!module || !section) return;
      setOpenKeys((prev) => {
        const next = new Set(prev);
        next.add(module.slug);
        next.add(`${module.slug}::${section.title}`);
        return next;
      });
      if (typeof window !== "undefined" && window.location.hash) {
        setActiveKey(`${module.slug}:${window.location.hash.slice(1)}`);
      }
      return;
    }

    const topicMatch = pathname.match(/^\/docs\/([^/]+)\/([^/]+)$/);
    if (topicMatch) {
      const [, moduleSlug, topicSlugParam] = topicMatch;
      const module = modules.find((m) => m.slug === moduleSlug);
      if (!module) return;
      setOpenKeys((prev) => {
        const next = new Set(prev);
        next.add(module.slug);
        return next;
      });
      setActiveKey(`${module.slug}:${topicSlugParam}`);
    }
  }, [pathname]);

  useEffect(() => {
    function onActiveTopic(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      setActiveKey(detail);
    }
    window.addEventListener(ACTIVE_TOPIC_EVENT, onActiveTopic);
    return () => window.removeEventListener(ACTIVE_TOPIC_EVENT, onActiveTopic);
  }, []);

  function toggle(key: string) {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <nav>
      {modules.map((module) => {
        const isOpen = openKeys.has(module.slug);
        const flatTopics = module.topics.filter(
          (topic) => !module.sections?.some((s) => s.topics.includes(topic)),
        );
        return (
          <div key={module.slug} className="mb-2">
            <button
              type="button"
              onClick={() => toggle(module.slug)}
              className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-300"
            >
              <Arrow isOpen={isOpen} />
              <span className="truncate">
                Module {module.number} · {module.title}
              </span>
            </button>
            {isOpen && (
              <div className="mt-1">
                {flatTopics.length > 0 && (
                  <ul className="space-y-0.5">
                    {flatTopics.map((topic) => {
                      const key = `${module.slug}:${topicSlug(topic)}`;
                      const isActive = activeKey === key;
                      return (
                        <li key={topic}>
                          <Link
                            href={`/docs/${module.slug}/${topicSlug(topic)}`}
                            className={`block rounded-md py-1 pl-7 pr-2 text-[13px] leading-5 transition-colors hover:bg-white/5 hover:text-white ${
                              isActive
                                ? "bg-white/10 text-white"
                                : "text-gray-400"
                            }`}
                          >
                            {topic}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {module.sections?.map((section) => {
                  const sectionSlugValue = sectionSlug(section.title);
                  const sectionKey = `${module.slug}::${section.title}`;
                  const isSectionOpen = openKeys.has(sectionKey);
                  return (
                    <div key={sectionKey}>
                      <button
                        type="button"
                        onClick={() => toggle(sectionKey)}
                        className="flex w-full items-center gap-1.5 rounded-md py-1 pl-5 pr-2 text-[13px] font-medium text-gray-300 hover:text-white"
                      >
                        <Arrow isOpen={isSectionOpen} />
                        <span className="truncate">{section.title}</span>
                      </button>
                      {isSectionOpen && (
                        <ul className="mt-0.5 space-y-0.5">
                          {section.topics.map((topic) => {
                            const key = `${module.slug}:${topicSlug(topic)}`;
                            const isActive = activeKey === key;
                            return (
                              <li key={topic}>
                                <Link
                                  href={`/docs/${module.slug}/section/${sectionSlugValue}#${topicSlug(topic)}`}
                                  className={`block rounded-md py-1 pl-11 pr-2 text-[13px] leading-5 transition-colors hover:bg-white/5 hover:text-white ${
                                    isActive
                                      ? "bg-white/10 text-white"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {topic}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
