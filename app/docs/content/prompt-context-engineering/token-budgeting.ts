import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Planning your token spend" },
  {
    type: "p",
    text: "LLMs have a limited number of tokens available for the whole request, so every part of the context has to share the budget.",
  },
  { type: "p", text: "Example:" },
  {
    type: "code",
    text: "Context Window\n100,000 tokens\n↓\nSystem Prompt        3,000\nMemory               5,000\nRetrieved Docs      25,000\nConversation        10,000\nUser Prompt            500\nRemaining           56,500",
  },
  { type: "p", text: "Planning token usage is called token budgeting." },
];

export default content;
