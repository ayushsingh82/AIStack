import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Measuring what you spend" },
  { type: "p", text: "Every request consumes:" },
  { type: "code", text: "Input Tokens\n+\nOutput Tokens" },
  {
    type: "p",
    text: "Costs are usually calculated based on both. Many SDKs provide token counters before sending requests.",
  },
];

export default content;
