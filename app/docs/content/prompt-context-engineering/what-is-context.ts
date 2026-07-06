import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Definition" },
  {
    type: "p",
    text: "Context is **all the information an AI model receives before generating its next response**.",
  },
  {
    type: "p",
    text: 'Think of context as the model\'s "working memory" for the current request. The quality of the context largely determines the quality of the output.',
  },
  {
    type: "p",
    text: "Unlike humans, an LLM does not permanently remember previous interactions. Every response is generated only from the tokens currently available inside its context window.",
  },
  { type: "h2", text: "Context may include" },
  {
    type: "ul",
    items: [
      "System instructions",
      "User prompt",
      "Previous conversation",
      "Retrieved documents",
      "API results",
      "Tool outputs",
      "Images",
      "PDFs",
      "Memory",
      "Code",
      "Metadata",
    ],
  },
  { type: "h2", text: "Example" },
  { type: "p", text: "Instead of:" },
  { type: "code", text: "Explain this." },
  { type: "p", text: "Provide context:" },
  {
    type: "code",
    text: "Explain this Python function and identify its time complexity.",
  },
  {
    type: "p",
    text: 'The second prompt contains enough context for the model to understand what "this" refers to.',
  },
];

export default content;
