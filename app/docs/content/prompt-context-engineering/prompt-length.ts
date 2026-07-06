import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Longer isn't always better" },
  { type: "p", text: "Long prompts are not always better." },
  { type: "p", text: "Good prompts are:" },
  { type: "ul", items: ["clear", "specific", "concise"] },
  { type: "p", text: "Avoid unnecessary instructions." },
];

export default content;
