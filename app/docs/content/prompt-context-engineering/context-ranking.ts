import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Prioritizing information" },
  {
    type: "p",
    text: "Not every document is equally important. Ranking determines which information should appear first.",
  },
  { type: "p", text: "Ranking methods include:" },
  {
    type: "ul",
    items: ["similarity score", "recency", "importance", "user relevance"],
  },
  { type: "p", text: "Higher-ranked context usually improves responses." },
];

export default content;
