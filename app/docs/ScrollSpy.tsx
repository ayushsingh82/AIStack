"use client";

import { useEffect } from "react";

export const ACTIVE_TOPIC_EVENT = "docs:activetopic";

export default function ScrollSpy({
  moduleSlug,
  topicIds,
}: {
  moduleSlug: string;
  topicIds: string[];
}) {
  useEffect(() => {
    const headings = topicIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length === 0) return;

        const id = visible[0].target.id;
        window.history.replaceState(null, "", `#${id}`);
        window.dispatchEvent(
          new CustomEvent(ACTIVE_TOPIC_EVENT, {
            detail: `${moduleSlug}:${id}`,
          }),
        );
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [moduleSlug, topicIds]);

  return null;
}
