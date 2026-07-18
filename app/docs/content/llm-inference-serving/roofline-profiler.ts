import type { Block } from "../types";

const content: Block[] = [
  {
    type: "p",
    text: "If you're building your own inference engineering notes, don't just copy explanations — write them so **future you** can understand them in six months. Here's a roofline profiler write-up structured that way: intuition first, each concept explained on its own, building up to the main idea, ending in a quick revision section.",
  },

  { type: "h2", text: "What is a roofline profiler?" },
  {
    type: "p",
    text: "A **roofline profiler** is a performance analysis tool that tells you **why a program is slow**. Instead of just measuring execution time, it answers questions like: is my GPU spending most of its time doing computations, or is it waiting for data from memory? What is preventing my model from running faster? Think of it as a **health report for your GPU workload**.",
  },

  { type: "h2", text: "Why do we need it?" },
  {
    type: "p",
    text: "When running LLMs, not every operation is limited by GPU computation. Some steps are slow because the GPU cores are busy doing math — **compute bound**. Others are slow because the GPU cores are idle, waiting for memory — **memory bound**. A roofline profiler helps identify which one is the bottleneck for a given workload.",
  },

  { type: "h2", text: "What does a roofline profiler measure?" },
  {
    type: "p",
    text: "It mainly measures four things: FLOPs, memory traffic, arithmetic intensity, and hardware limits.",
  },
  {
    type: "p",
    text: "**1. FLOPs (floating point operations)** — the total amount of mathematical work. 1000 matrix multiplications turn into millions or billions of FLOPs. More FLOPs means more computation.",
  },
  {
    type: "p",
    text: "**2. Memory traffic** — how much data moves between GPU memory and GPU cores: reading weights, reading the KV cache, writing output. Large data movement can become the bottleneck on its own.",
  },
  {
    type: "p",
    text: "**3. Arithmetic intensity** — one of the most important concepts here.",
  },
  {
    type: "code",
    text: "Arithmetic Intensity = FLOPs / Bytes Moved",
  },
  {
    type: "p",
    text: "It answers: how much computation is done for every byte read from memory? 100 FLOPs over 10 bytes gives an arithmetic intensity of 10 — high arithmetic intensity means lots of computation per byte, usually compute bound. 10 FLOPs over 100 bytes gives 0.1 — low arithmetic intensity means lots of memory movement relative to compute, usually memory bound.",
  },
  {
    type: "p",
    text: "**4. Hardware limits** — the profiler compares your workload against your GPU's ceilings, e.g. a maximum compute of 120 TFLOPS and a maximum memory bandwidth of 1.5 TB/s. It then tells you which limit you're hitting.",
  },

  { type: "h2", text: "The roofline model" },
  {
    type: "p",
    text: "Picture a graph of performance (FLOPs/sec) against arithmetic intensity. Low arithmetic intensity sits under a sloped memory-bandwidth line; past a certain point, performance flattens out under a horizontal compute roof.",
  },
  {
    type: "code",
    text: "Performance (FLOPs/sec)\n^\n|                     _____________ Compute Roof\n|                  /\n|               /\n|            /\n|__________/____________________________>\n      Arithmetic Intensity",
  },
  {
    type: "p",
    text: "**Left side — memory bound.** The GPU is waiting for memory and doing a small amount of math. The problem: memory is too slow, so the GPU has nothing to compute yet.",
  },
  {
    type: "p",
    text: "**Right side — compute bound.** The GPU is doing matrix multiplication, using tensor cores, running heavy computation. The problem: GPU compute is fully utilized — memory isn't the bottleneck anymore.",
  },

  { type: "h2", text: "What is prefill?" },
  {
    type: "p",
    text: "Prefill is the **first stage** of inference. The model processes the entire prompt before generating any output. For a prompt like `Explain blockchain in simple words`, the model reads every token — `Explain`, `blockchain`, `in`, `simple`, `words` — all together, computing embeddings, attention, feed-forward network, and layernorm for every token simultaneously.",
  },

  { type: "h2", text: "Why is prefill compute bound?" },
  {
    type: "p",
    text: "During prefill, almost all GPU cores are busy performing large matrix multiplications: `Q × Kᵀ`, `Attention × V`, and the feed-forward layers. These operations require a huge amount of computation. Since the GPU is constantly performing math, the bottleneck becomes GPU compute, not memory. This is **compute bound**.",
  },
  {
    type: "p",
    text: "**Analogy**: imagine 100 students solving math questions. Everyone already has the worksheet. The slow part is solving the problems, not picking up the paper.",
  },

  { type: "h2", text: "What is decode?" },
  {
    type: "p",
    text: "After the prompt has been processed, the model starts generating one token at a time: `Hello` → `Hello there` → `Hello there friend`. Every new token repeats the same process.",
  },
  {
    type: "p",
    text: "For every generated token, the model loads the KV cache, computes attention, and predicts one new token. Repeat, repeat, repeat.",
  },

  { type: "h2", text: "What is the KV cache?" },
  {
    type: "p",
    text: "Every token stores a Key (K) and Value (V) instead of recomputing them every generation step. For the prompt `Hello How Are You`, the model stores `K1 V1`, `K2 V2`, `K3 V3`, `K4 V4`. When generating the next word, instead of recalculating everything, the model simply loads `K1..K4` and `V1..V4`. This saves a huge amount of computation.",
  },

  { type: "h2", text: "Why is decode memory bound?" },
  {
    type: "p",
    text: "Although the KV cache saves computation, it must still be **read from GPU memory** every decoding step. For a 1000-token prompt generating token 1001, the GPU loads `K1..K1000` and `V1..V1000` — a large amount of memory traffic — while performing relatively little new computation. The GPU spends more time reading memory than doing math. This makes decode **memory bound**.",
  },
  {
    type: "p",
    text: "**Analogy**: imagine writing a book where each new sentence requires reading all previous notes before writing one more sentence. Writing one sentence is easy; finding and reading all your notes takes much longer. That's exactly what happens during decode.",
  },

  { type: "h2", text: "Prefill vs decode" },
  {
    type: "ul",
    items: [
      "**Processes** — Prefill: entire prompt. Decode: one token.",
      "**Parallel?** — Prefill: yes. Decode: no.",
      "**Main work** — Prefill: matrix multiplication. Decode: reading KV cache.",
      "**GPU bottleneck** — Prefill: compute. Decode: memory.",
      "**Hardware limited by** — Prefill: FLOPs. Decode: memory bandwidth.",
    ],
  },

  { type: "h2", text: "Why build a roofline profiler" },
  {
    type: "p",
    text: "Instead of guessing whether your model is compute-bound or memory-bound, a roofline profiler provides quantitative evidence. Prefill shows high FLOPs, moderate memory traffic, and high arithmetic intensity — compute bound. Decode shows lower FLOPs, heavy KV cache reads, and low arithmetic intensity — memory bound.",
  },
  {
    type: "code",
    text: "Prefill → high FLOPs, medium memory  → compute bound\nDecode  → low FLOPs,  very high memory → memory bound",
  },

  { type: "h2", text: "Quick revision (30 seconds)" },
  {
    type: "ul",
    items: [
      "**Roofline Profiler**: Tells you whether performance is limited by computation or memory.",
      "**FLOPs**: Amount of mathematical work performed.",
      "**Memory Traffic**: Amount of data moved between memory and the GPU.",
      "**Arithmetic Intensity**: FLOPs ÷ Bytes Moved.",
      "**High Arithmetic Intensity**: Usually compute bound.",
      "**Low Arithmetic Intensity**: Usually memory bound.",
      "**Prefill**: Processes the full prompt in parallel → compute bound.",
      "**Decode**: Generates one token at a time while repeatedly reading the KV cache → memory bound.",
      "**KV Cache**: Stores previously computed Keys and Values so they can be reused instead of recomputed during generation.",
    ],
  },
];

export default content;
