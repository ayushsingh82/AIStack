import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "The misconception" },
  {
    type: "p",
    text: "Many people think AI performance depends only on writing better prompts.",
  },
  {
    type: "p",
    text: "Modern AI systems rely much more on **context engineering**.",
  },
  { type: "h2", text: "Prompt Engineering" },
  { type: "p", text: "Focuses on writing better instructions." },
  { type: "p", text: "Example:" },
  { type: "code", text: "Explain recursion like I'm five." },
  { type: "p", text: "Only the instruction changes." },
  { type: "h2", text: "Context Engineering" },
  {
    type: "p",
    text: "Focuses on **everything given to the model**. This includes:",
  },
  {
    type: "ul",
    items: [
      "prompt",
      "retrieved documents",
      "user profile",
      "previous chat",
      "tool outputs",
      "memory",
      "API responses",
    ],
  },
  { type: "p", text: "Example:" },
  {
    type: "code",
    text: "System Prompt\n+\nConversation History\n+\nGitHub Repository\n+\nDatabase Results\n+\nCurrent User Question",
  },
  { type: "p", text: "The model now has much richer information." },
  { type: "h2", text: "Analogy" },
  { type: "p", text: "Prompt Engineering is asking a better question." },
  {
    type: "p",
    text: "Context Engineering is bringing the right books into the room before asking the question.",
  },
];

export default content;
