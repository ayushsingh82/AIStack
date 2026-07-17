import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "The problem: recomputing everything, every step" },
  {
    type: "p",
    text: "LLMs generate one token at a time. Ask for `Tell me a story about dragons` and the model produces its answer token by token:",
  },
  {
    type: "code",
    text: "Once\nOnce upon\nOnce upon a\nOnce upon a time\n...",
  },
  {
    type: "p",
    text: "Without a cache, every new token forces the model to recompute attention over **every previous token** — including ones it already processed a moment ago.",
  },
  {
    type: "code",
    text: "Step 1 — input: \"Hello\"\n  → compute attention over [Hello]\n\nStep 2 — input: \"Hello world\"\n  → compute attention over [Hello, world]  (Hello redone!)\n\nStep 3 — input: \"Hello world today\"\n  → compute attention over [Hello, world, today]  (Hello, world redone again!)",
  },
  { type: "p", text: "That's a lot of repeated work for tokens that never change." },

  { type: "h2", text: "What actually gets cached" },
  {
    type: "p",
    text: "Inside self-attention, every token produces three vectors: a **Query (Q)**, a **Key (K)**, and a **Value (V)**. The expensive part isn't Q — it's recomputing K and V for tokens that were already processed earlier.",
  },
  {
    type: "p",
    text: "So instead of recomputing them, the model saves them the first time and reuses them forever:",
  },
  {
    type: "code",
    text: "Token 1 → K1, V1\nToken 2 → K2, V2\nToken 3 → K3, V3\n\nCache:\n  K = [K1, K2, K3]\n  V = [V1, V2, V3]",
  },
  {
    type: "p",
    text: "When Token 4 arrives, the model computes **only** `Q4`, `K4`, and `V4` — then reuses the cached `K1, K2, K3` and `V1, V2, V3` instead of redoing that work:",
  },
  {
    type: "code",
    text: "New token 4 → compute Q4, K4, V4\nAppend to cache → K = [K1, K2, K3, K4], V = [V1, V2, V3, V4]\nAttend Q4 over the full cached K, V",
  },

  { type: "h2", text: "Why this is such a big speedup" },
  {
    type: "p",
    text: "Imagine reading a 500-page book one page at a time and reporting back after each page.",
  },
  {
    type: "ul",
    items: [
      "**Without a cache**: every time you reach page 501, you reread pages 1–500 first.",
      "**With a cache**: you remember pages 1–500 and only read the new page.",
    ],
  },
  {
    type: "p",
    text: "That's the difference KV caching makes for generation — it turns an operation that redoes quadratic work into one that does a small, constant amount of new work per token.",
  },

  { type: "h2", text: "The trade-off" },
  {
    type: "p",
    text: "The cache isn't free: it grows with sequence length (and with batch size, since every request in flight keeps its own K/V history), which is why serving systems care so much about **cache eviction** and layouts like **paged attention** to keep that memory under control without giving up the speedup.",
  },
];

export default content;
