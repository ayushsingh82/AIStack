import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "Carrying the conversation forward" },
  { type: "p", text: "Chat models include previous messages as context." },
  { type: "p", text: "Example:" },
  {
    type: "code",
    text: "User\n↓\nAssistant\n↓\nUser\n↓\nAssistant\n↓\nCurrent Question",
  },
  { type: "p", text: "Long conversations consume tokens." },
];

export default content;
