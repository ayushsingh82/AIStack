import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "The building blocks" },
  {
    type: "p",
    text: "Context is usually made up of multiple pieces. Typical components include:",
  },
  {
    type: "ul",
    items: [
      "System Prompt",
      "User Prompt",
      "Conversation History",
      "Retrieved Documents",
      "Memory",
      "Tool Outputs",
      "Images",
      "Structured Data",
      "API Responses",
      "Metadata",
    ],
  },
  { type: "h2", text: "Example" },
  {
    type: "code",
    text: "System Prompt\n↓\nConversation\n↓\nRetrieved PDF\n↓\nSearch Results\n↓\nUser Question",
  },
  { type: "p", text: "All together become the model's context." },
];

export default content;
