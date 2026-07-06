import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Why order matters" },
  { type: "p", text: "The order of information matters." },
  { type: "p", text: "Good ordering:" },
  {
    type: "code",
    text: "System Instructions\n↓\nRelevant Documents\n↓\nConversation\n↓\nUser Question",
  },
  {
    type: "p",
    text: "Poor ordering may cause important information to be ignored.",
  },
];

export default content;
