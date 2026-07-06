import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Compressing history instead of deleting it" },
  { type: "p", text: "Instead of deleting old conversations, summarize them." },
  { type: "p", text: "Original:" },
  { type: "code", text: "100 messages" },
  { type: "p", text: "Summary:" },
  {
    type: "code",
    text: "The user is building an AI coding assistant focused on React applications.",
  },
  {
    type: "p",
    text: "The summary preserves important information while saving tokens.",
  },
];

export default content;
