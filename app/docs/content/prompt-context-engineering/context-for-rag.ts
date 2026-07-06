import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Retrieval-Augmented Generation" },
  {
    type: "p",
    text: "RAG (Retrieval-Augmented Generation) retrieves relevant information before generating responses.",
  },
  { type: "p", text: "Workflow:" },
  {
    type: "code",
    text: "Question\n↓\nEmbedding\n↓\nVector Search\n↓\nTop Documents\n↓\nContext\n↓\nLLM",
  },
  {
    type: "p",
    text: "Instead of relying only on training data, the model receives external knowledge.",
  },
];

export default content;
