import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Where attention breaks down" },
  { type: "p", text: "Research shows models often remember:" },
  { type: "ul", items: ["beginning of context", "end of context"] },
  { type: "p", text: "Information placed in the middle is sometimes ignored." },
  { type: "p", text: "Example:" },
  { type: "code", text: "Important Info\n↓\nHuge Document\n↓\nUser Question" },
  {
    type: "p",
    text: "The important information may be overlooked if buried in the middle.",
  },
  { type: "p", text: "Solutions:" },
  {
    type: "ul",
    items: [
      "reorder context",
      "repeat critical facts",
      "use retrieval",
      "summarize documents",
    ],
  },
];

export default content;
