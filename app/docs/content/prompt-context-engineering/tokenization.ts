import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "What are tokens?" },
  { type: "p", text: "LLMs do not read words. They read **tokens**." },
  { type: "p", text: "A token may be:" },
  { type: "ul", items: ["word", "part of a word", "punctuation", "number", "emoji"] },
  { type: "p", text: "Example:" },
  { type: "code", text: "Artificial Intelligence" },
  { type: "p", text: "may become" },
  { type: "code", text: "Artificial\nIntelli\ngence" },
  { type: "p", text: "depending on the tokenizer." },
  { type: "h2", text: "Tokenization" },
  { type: "p", text: "Tokenization converts text into tokens." },
  { type: "p", text: "Example — sentence:" },
  { type: "code", text: "I love AI." },
  { type: "p", text: "Possible tokens:" },
  { type: "code", text: '"I"\n" love"\n" AI"\n"."' },
  { type: "p", text: "The tokenizer determines how the model interprets text." },
];

export default content;
