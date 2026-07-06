import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Removing the unnecessary" },
  { type: "p", text: "Pruning means removing unnecessary information." },
  { type: "p", text: "Examples:" },
  {
    type: "ul",
    items: [
      "irrelevant conversation",
      "duplicate documents",
      "old tool outputs",
      "repeated instructions",
    ],
  },
  { type: "p", text: "Benefits:" },
  { type: "ul", items: ["lower cost", "faster responses", "better accuracy"] },
];

export default content;
