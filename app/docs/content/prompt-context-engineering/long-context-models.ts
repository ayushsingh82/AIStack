import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "When bigger windows help" },
  { type: "p", text: "Modern models support much larger context windows." },
  { type: "p", text: "Advantages:" },
  {
    type: "ul",
    items: [
      "analyze books",
      "process long documents",
      "large codebases",
      "legal contracts",
      "research papers",
    ],
  },
  { type: "p", text: "Challenges:" },
  { type: "ul", items: ["higher latency", "higher cost", "attention degradation"] },
];

export default content;
