import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Shrinking large information" },
  {
    type: "p",
    text: "Sometimes important information is too large. Instead of removing it, compress it.",
  },
  { type: "p", text: "Methods include:" },
  {
    type: "ul",
    items: ["summarization", "extracting key facts", "bullet points", "embeddings"],
  },
  { type: "h2", text: "Example" },
  { type: "p", text: "Original:" },
  { type: "code", text: "20-page PDF" },
  { type: "p", text: "Compressed:" },
  {
    type: "code",
    text: "Summary:\n• Revenue increased\n• Profit decreased\n• Main issue: logistics",
  },
];

export default content;
