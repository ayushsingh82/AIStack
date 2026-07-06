import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Keeping only what's recent" },
  {
    type: "p",
    text: "Instead of keeping the entire conversation, retain only the most recent messages.",
  },
  { type: "p", text: "Keep:" },
  { type: "code", text: "Last 10 messages" },
  { type: "p", text: "Remove:" },
  { type: "code", text: "Older messages" },
  { type: "p", text: "This technique is common in chatbots." },
];

export default content;
