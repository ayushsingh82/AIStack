import type { Block } from "../types";

const content: Block[] = [
  {
    type: "p",
    text: "**\"I built a PyTorch roofline profiler because I want to prove and understand intuitively why decode is memory bound and prefill is compute bound.\"** This one sentence packs a lot of systems and GPU performance concepts together — let's break it down.",
  },

  { type: "h2", text: "What is a roofline profiler?" },
  {
    type: "p",
    text: "A **profiler** is a tool that measures how a program uses hardware. A **roofline profiler** specifically tells you how many computations (FLOPs) your program performs, how much data it moves between memory and the GPU, and whether the bottleneck is **compute (math)** or **memory bandwidth**.",
  },
  {
    type: "p",
    text: "It's built on the **Roofline Model**, a performance model for CPUs and GPUs. Think of it as a report card that answers: **why isn't my model running faster?**",
  },

  { type: "h2", text: "Prefill: reading the whole prompt at once" },
  {
    type: "p",
    text: "Before generating any response, the model first reads your entire prompt. For `The quick brown fox jumps over the lazy dog`, it computes embeddings, attention, and feed-forward layers for **all input tokens at once** — this initial pass is called **prefill**.",
  },
  {
    type: "code",
    text: "Token1  Token2  Token3  ...  Token9\n\n→ attention computed among all of them, in parallel",
  },

  { type: "h2", text: "Why prefill is compute bound" },
  {
    type: "p",
    text: "During prefill, the GPU runs a huge amount of matrix multiplication: `Q × Kᵀ`, `Attention × V`, the feed-forward layers, layernorm. Modern GPUs (H100, RTX 4090) are extremely good at this kind of math, so the GPU spends most of its time **doing calculations**, not waiting for data. Compute > memory — this is **compute bound**.",
  },
  {
    type: "p",
    text: "**Analogy**: a teacher hands 100 students a math worksheet and everyone starts solving at once. The bottleneck is solving the problems, not fetching the paper.",
  },

  { type: "h2", text: "Decode: one token at a time" },
  {
    type: "p",
    text: "Once the prompt has been read, the model starts generating — one token per step (`Hello` → `Hello there` → `Hello there friend` → ...). This phase is called **decode**. For every new token the model loads the **KV cache**, computes attention against it, and predicts one token, then repeats.",
  },

  { type: "h2", text: "Why decode is memory bound" },
  {
    type: "p",
    text: "Say we've already generated `Hello there my wonderful friend` and want token 6. The model needs the cached `K1..K5` and `V1..V5` — all sitting in GPU memory. Reading them dominates the step; the actual math for one new token is small.",
  },
  {
    type: "code",
    text: "Compute bound:            Memory bound:\n  Math                       Read memory\n  Math                       Read memory\n  Math                       Read memory\n  Math                       Tiny computation",
  },
  {
    type: "p",
    text: "**Analogy**: prefill is 100 chefs cooking 100 meals at once — cooking is the bottleneck. Decode is one chef who walks to the pantry, grabs ingredients, cooks for 10 seconds, then walks again — the walking (memory access) dominates.",
  },

  { type: "h2", text: "Compute bound vs memory bound" },
  {
    type: "ul",
    items: [
      "**Compute bound** — the GPU is fully occupied doing calculations. A faster GPU helps; faster memory barely moves the needle.",
      "**Memory bound** — compute units sit idle waiting for data. More memory bandwidth helps far more than more compute power.",
    ],
  },
  {
    type: "p",
    text: "As context grows — say a 500-token prompt generating token 501 — the model must load `K1..K500` and `V1..V500` from the KV cache. That memory traffic grows linearly with context length while the new computation per step stays tiny, which is exactly why decode gets *more* memory bound the longer the conversation runs.",
  },

  { type: "h2", text: "Why build a roofline profiler" },
  {
    type: "p",
    text: "Rather than just asserting \"prefill is compute bound, decode is memory bound,\" a roofline profiler measures it: FLOPs performed, bytes read from memory, arithmetic intensity (FLOPs per byte), GPU utilization, and memory bandwidth usage.",
  },
  {
    type: "code",
    text: "Prefill → high FLOPs, medium memory  → compute bound\nDecode  → low FLOPs,  very high memory → memory bound",
  },

  { type: "h2", text: "In one sentence" },
  {
    type: "ul",
    items: [
      "**Prefill** processes the entire prompt in parallel with massive matrix multiplications, so GPU computation is the bottleneck — **compute bound**.",
      "**Decode** generates one token at a time and repeatedly reads the growing KV cache from memory, so memory bandwidth becomes the bottleneck — **memory bound**.",
    ],
  },
];

export default content;
