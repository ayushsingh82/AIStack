import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "When context doesn't fit" },
  { type: "p", text: "When total tokens exceed the context window:" },
  {
    type: "ul",
    items: [
      "oldest messages may be removed",
      "retrieval results may be dropped",
      "requests may fail",
    ],
  },
  { type: "p", text: "Overflow reduces response quality." },
];

export default content;
