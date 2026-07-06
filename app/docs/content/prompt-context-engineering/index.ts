import type { TopicContent } from "../types";

import whatIsContext from "./what-is-context";
import promptVsContextEngineering from "./prompt-vs-context-engineering";
import componentsOfContext from "./components-of-context";
import contextLifecycle from "./context-lifecycle";
import contextPacking from "./context-packing";
import contextOrdering from "./context-ordering";
import contextPruning from "./context-pruning";
import contextCompression from "./context-compression";
import contextRanking from "./context-ranking";
import tokenBudgeting from "./token-budgeting";
import memoryVsContext from "./memory-vs-context";
import contextForAgents from "./context-for-agents";
import contextForRag from "./context-for-rag";
import tokenization from "./tokenization";
import contextWindow from "./context-window";
import tokenLimits from "./token-limits";
import promptLength from "./prompt-length";
import conversationHistory from "./conversation-history";
import tokenCounting from "./token-counting";
import contextOverflow from "./context-overflow";
import slidingWindow from "./sliding-window";
import summarization from "./summarization";
import longContextModels from "./long-context-models";
import lostInTheMiddle from "./lost-in-the-middle";
import costVsContextSize from "./cost-vs-context-size";
import latencyVsContextSize from "./latency-vs-context-size";

const content: TopicContent = {
  "what-is-context": whatIsContext,
  "prompt-vs-context-engineering": promptVsContextEngineering,
  "components-of-context": componentsOfContext,
  "context-lifecycle": contextLifecycle,
  "context-packing": contextPacking,
  "context-ordering": contextOrdering,
  "context-pruning": contextPruning,
  "context-compression": contextCompression,
  "context-ranking": contextRanking,
  "token-budgeting": tokenBudgeting,
  "memory-vs-context": memoryVsContext,
  "context-for-agents": contextForAgents,
  "context-for-rag": contextForRag,
  tokenization: tokenization,
  "context-window": contextWindow,
  "token-limits": tokenLimits,
  "prompt-length": promptLength,
  "conversation-history": conversationHistory,
  "token-counting": tokenCounting,
  "context-overflow": contextOverflow,
  "sliding-window": slidingWindow,
  summarization: summarization,
  "long-context-models": longContextModels,
  "lost-in-the-middle": lostInTheMiddle,
  "cost-vs-context-size": costVsContextSize,
  "latency-vs-context-size": latencyVsContextSize,
};

export default content;
