import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Two different things" },
  { type: "p", text: "Many people confuse these." },
  { type: "h2", text: "Context" },
  {
    type: "p",
    text: "Temporary. Exists only for the current request. After the request ends, it disappears.",
  },
  { type: "h2", text: "Memory" },
  { type: "p", text: "Persistent. Stored outside the model. Can be reused later." },
  { type: "p", text: "Example:" },
  { type: "code", text: "Memory:\nUser prefers Python." },
  {
    type: "p",
    text: "Later requests can include this memory inside the context. Memory becomes part of context during inference.",
  },
];

export default content;
