import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Context from many sources" },
  { type: "p", text: "AI agents use context from many sources." },
  { type: "p", text: "Example:" },
  {
    type: "code",
    text: "System Prompt\n↓\nMemory\n↓\nTool Results\n↓\nSearch\n↓\nFiles\n↓\nUser Request",
  },
  {
    type: "p",
    text: "Every tool execution creates new context. Good agents constantly update context.",
  },
];

export default content;
