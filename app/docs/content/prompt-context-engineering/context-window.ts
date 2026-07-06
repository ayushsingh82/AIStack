import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "The model's working space" },
  {
    type: "p",
    text: "The context window is the maximum number of tokens the model can process in one request.",
  },
  { type: "p", text: "Everything counts:" },
  { type: "ul", items: ["prompt", "response", "documents", "conversation", "memory"] },
  { type: "p", text: "If the limit is exceeded, something must be removed." },
];

export default content;
