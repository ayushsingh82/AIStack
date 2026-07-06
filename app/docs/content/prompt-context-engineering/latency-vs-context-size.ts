import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Paying for it in time" },
  { type: "p", text: "Larger context windows require more computation." },
  { type: "p", text: "Result:" },
  {
    type: "ul",
    items: ["slower inference", "increased response time", "higher infrastructure costs"],
  },
  { type: "p", text: "Efficient context engineering balances:" },
  { type: "ul", items: ["accuracy", "speed", "cost"] },
];

export default content;
