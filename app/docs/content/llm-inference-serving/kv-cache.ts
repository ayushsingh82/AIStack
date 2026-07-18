import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "The problem: recomputing the same information" },
  {
    type: "p",
    text: "LLMs generate text **one token at a time**. Ask for `Tell me a story about dragons` and the model produces its answer token by token:",
  },
  {
    type: "code",
    text: "Once\nOnce upon\nOnce upon a\nOnce upon a time\n...",
  },
  {
    type: "p",
    text: "Every new token depends on **all previous tokens**. Without a KV cache, the model would repeatedly recompute information for tokens it has already processed:",
  },
  {
    type: "code",
    text: "Step 1\nInput: \"Hello\"\n→ Compute attention over [Hello]\n\nStep 2\nInput: \"Hello world\"\n→ Compute attention over [Hello, world]\n→ \"Hello\" is computed again\n\nStep 3\nInput: \"Hello world today\"\n→ Compute attention over [Hello, world, today]\n→ \"Hello\" and \"world\" are computed again",
  },
  {
    type: "p",
    text: "Notice something? The word **\"Hello\" never changes**, yet we keep recomputing it every time a new token is generated. As the conversation grows longer, this repeated computation becomes increasingly expensive.",
  },

  { type: "h2", text: "What happens inside attention?" },
  {
    type: "p",
    text: "Every token is converted into **three vectors**: a **Query (Q)** — what information is this token looking for; a **Key (K)** — what information does this token provide; and a **Value (V)** — the actual information that will be used if another token attends to it.",
  },
  {
    type: "p",
    text: "Think of it like a library: **Query** is the question you're asking, **Key** is the labels on every book, and **Value** is the contents of each book. The model compares the Query with all the Keys to decide which Values are most relevant.",
  },

  { type: "h2", text: "The expensive part" },
  {
    type: "p",
    text: "For every token generated, the model must compute Q, K, and V. The problem is that **Keys and Values for old tokens never change** — so why recompute them?",
  },
  {
    type: "code",
    text: "Token 1 → K1, V1\nToken 2 → K2, V2\nToken 3 → K3, V3",
  },
  {
    type: "p",
    text: "Instead of recalculating these every decoding step, we simply save them.",
  },

  { type: "h2", text: "What gets cached?" },
  {
    type: "p",
    text: "The model stores all previously computed Keys and Values — this is called the **KV cache**.",
  },
  {
    type: "code",
    text: "Cache\n\nK = [K1, K2, K3]\nV = [V1, V2, V3]",
  },

  { type: "h2", text: "What happens when a new token arrives?" },
  {
    type: "p",
    text: "Suppose token 4 is generated. Instead of recomputing `K1, K2, K3` and `V1, V2, V3`, the model only computes `Q4`, `K4`, and `V4`, then appends the new Key and Value to the cache:",
  },
  {
    type: "code",
    text: "K = [K1, K2, K3, K4]\nV = [V1, V2, V3, V4]",
  },
  {
    type: "p",
    text: "Finally, **Q4 attends over every Key in the cache** — Q4 compares against K1..K4, retrieves the relevant Values, and predicts the next token. Notice that K1–K3 and V1–V3 were never recomputed.",
  },

  { type: "h2", text: "Why don't we cache Queries?" },
  {
    type: "p",
    text: "A common question: why do we only cache K and V — why not Q? Because the **Query belongs to the current token only**. When generating token 4, `Q4` is completely different from `Q3` — every newly generated token asks a **new question** about the previous context, so Queries must always be computed again. Keys and Values, however, describe **past tokens**, which never change once generated.",
  },

  { type: "h2", text: "Why is KV cache so fast?" },
  {
    type: "p",
    text: "Imagine reading a 500-page book.",
  },
  {
    type: "ul",
    items: [
      "**Without a KV cache** — every time you finish a new page, you start again from page 1: read page 1, page 2, restart, page 1, page 2, page 3, restart. You spend most of your time rereading old pages.",
      "**With a KV cache** — you remember everything you've already read: read pages 1–500, store them in memory, then read only page 501. No unnecessary rereading.",
    ],
  },
  {
    type: "p",
    text: "Exactly the same idea applies to LLM inference.",
  },

  { type: "h2", text: "Why this matters" },
  {
    type: "p",
    text: "Without a KV cache, every decoding step would repeat work for the entire sequence — as the prompt grows longer, there are more previous tokens, more repeated computation, and slower generation. With a KV cache, previous Keys and Values are reused, only the newest token requires fresh computation, and generation becomes dramatically faster.",
  },

  { type: "h2", text: "The trade-off" },
  {
    type: "p",
    text: "KV cache speeds up inference, but it isn't free. The cache grows with the number of generated tokens — more tokens means more Keys, more Values, and more GPU memory. If you're serving many users simultaneously, every request maintains its own KV cache, which can consume a significant amount of GPU memory.",
  },
  {
    type: "p",
    text: "Because of this, modern inference systems use techniques such as:",
  },
  {
    type: "ul",
    items: [
      "**PagedAttention** — stores the KV cache efficiently",
      "**KV cache eviction** — removes old entries when appropriate",
      "**KV cache compression/quantization** — reduces memory usage",
    ],
  },
  {
    type: "p",
    text: "These optimizations help maintain high throughput while keeping memory usage manageable.",
  },

  { type: "h2", text: "Quick summary" },
  {
    type: "ul",
    items: [
      "Every token creates Query (Q), Key (K), and Value (V) vectors.",
      "Queries are recomputed every decoding step because each new token asks a new question.",
      "Keys and Values never change once created, so they are stored in the KV Cache.",
      "When generating a new token, the model computes only the new Q, K, and V, then reuses all previously cached K and V.",
      "Benefit: Much faster text generation because redundant computations are avoided.",
      "Trade-off: KV Cache grows with sequence length and consumes GPU memory.",
    ],
  },
  {
    type: "p",
    text: "**One-line takeaway:** KV Cache trades GPU memory for speed—it stores previously computed Keys and Values so the model doesn't have to recompute them for every new token.",
  },
];

export default content;
