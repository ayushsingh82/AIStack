import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Paying for what you send" },
  { type: "p", text: "More context means more information — but also:" },
  {
    type: "ul",
    items: ["higher API cost", "more processing", "longer responses", "increased latency"],
  },
  { type: "p", text: "More context is not always better." },
];

export default content;
