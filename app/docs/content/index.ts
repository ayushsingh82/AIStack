import type { Block, TopicContent } from "./types";
import promptContextEngineering from "./prompt-context-engineering";

export type { Block, TopicContent } from "./types";

// Add a new entry here whenever a module folder gets content
// (e.g. "ai-foundations": aiFoundations once app/docs/content/ai-foundations/index.ts exists).
const registry: Record<string, TopicContent> = {
  "prompt-context-engineering": promptContextEngineering,
};

export function getTopicContent(
  moduleSlug: string,
  topicSlugValue: string,
): Block[] | undefined {
  return registry[moduleSlug]?.[topicSlugValue];
}
