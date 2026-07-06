import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Choosing what to include" },
  {
    type: "p",
    text: "Context packing is deciding **what information to include**.",
  },
  { type: "p", text: "Instead of sending" },
  { type: "ul", items: ["entire documentation"] },
  { type: "p", text: "send" },
  { type: "ul", items: ["only relevant sections"] },
  { type: "p", text: "Packing reduces cost and improves accuracy." },
];

export default content;
