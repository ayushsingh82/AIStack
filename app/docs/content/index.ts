import type { Block, TopicContent } from "./types";
import promptContextEngineering from "./prompt-context-engineering";
import llmInferenceServing from "./llm-inference-serving";
import aiInfrastructure from "./ai-infrastructure";

export type { Block, TopicContent } from "./types";

// Add a new entry here whenever a module folder gets content
// (e.g. "ai-foundations": aiFoundations once app/docs/content/ai-foundations/index.ts exists).
const registry: Record<string, TopicContent> = {
  "prompt-context-engineering": promptContextEngineering,
  "llm-inference-serving": llmInferenceServing,
  "ai-infrastructure": aiInfrastructure,
};

export function getTopicContent(
  moduleSlug: string,
  topicSlugValue: string,
): Block[] | undefined {
  return registry[moduleSlug]?.[topicSlugValue];
}
