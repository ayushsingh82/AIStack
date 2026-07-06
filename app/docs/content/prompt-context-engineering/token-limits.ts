import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "How big is big enough?" },
  { type: "p", text: "Each model has its own maximum context size." },
  { type: "p", text: "Examples (illustrative):" },
  { type: "ul", items: ["8K", "32K", "128K", "200K+", "1M+ (some specialized models)"] },
  {
    type: "p",
    text: "Larger windows allow more information but increase computation.",
  },
];

export default content;
