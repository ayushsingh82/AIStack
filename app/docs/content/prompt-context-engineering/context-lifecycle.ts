import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "How context evolves" },
  {
    type: "p",
    text: "Context changes during every interaction. Typical lifecycle:",
  },
  {
    type: "code",
    text: "User Query\n↓\nRetrieve Information\n↓\nAdd Memory\n↓\nAdd Tools\n↓\nPack Context\n↓\nSend to LLM\n↓\nGenerate Response\n↓\nUpdate Memory",
  },
  { type: "p", text: "Every new request repeats this process." },
];

export default content;
