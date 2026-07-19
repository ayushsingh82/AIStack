import type { Block } from "../types";

const content: Block[] = [
  { type: "h2", text: "What is CUDA?" },
  {
    type: "p",
    text: "**CUDA (Compute Unified Device Architecture)** is NVIDIA's platform for running general-purpose code on the **GPU** instead of just the CPU. It's the layer PyTorch, TensorFlow, and JAX use under the hood. **Think of it as the bridge between your program and the GPU.**",
  },

  { type: "h2", text: "Why CUDA?" },
  {
    type: "p",
    text: "GPUs were built for graphics, but they turned out to be great at doing **the same operation on thousands of data points at once** — perfect for AI, simulations, and image/video processing.",
  },

  { type: "h2", text: "CPU vs GPU" },
  {
    type: "ul",
    items: [
      "CPU: few powerful cores, sequential, low latency, good for logic-heavy code",
      "GPU: thousands of lightweight cores, massively parallel, high throughput, good for matrix/vector math",
    ],
  },
  {
    type: "code",
    text: "CPU              GPU\n1+5              Thread 1 → 1+5\n2+6      vs       Thread 2 → 2+6\n3+7               Thread 3 → 3+7\n4+8               Thread 4 → 4+8\n(one after other) (all at once)",
  },
  {
    type: "p",
    text: "GPUs aren't universally faster — only for highly parallel workloads.",
  },

  { type: "h2", text: "Host (CPU) vs Device (GPU)" },
  {
    type: "p",
    text: "Host = manager: allocates memory, launches kernels, collects results. Device = worker: runs the kernel across thousands of threads.",
  },
  {
    type: "code",
    text: "Host (CPU) → Launch Kernel → Device (GPU) → Return Result → Host",
  },

  { type: "h2", text: "Memory: separate spaces" },
  {
    type: "p",
    text: "CPU RAM and GPU VRAM are separate — the GPU can't touch CPU RAM directly, so data moves via `cudaMemcpy()`. PCIe transfers are slow, so minimizing them is a key optimization.",
  },
  {
    type: "code",
    text: "CPU RAM → cudaMemcpy() → GPU VRAM → run kernel → cudaMemcpy() → CPU RAM",
  },

  { type: "h2", text: "CUDA Kernel" },
  {
    type: "p",
    text: "A **kernel** is a function that runs on the GPU. `__global__` marks it as GPU-executable, launched from the CPU.",
  },
  {
    type: "code",
    text: "void add(...)           // CPU function\n__global__ void add(...) // CUDA kernel",
  },
  {
    type: "p",
    text: "One kernel, thousands of threads run it simultaneously — this is the **SIMT (Single Instruction, Multiple Threads)** model. You write the logic for *one* thread; CUDA replicates it across the grid.",
  },
  {
    type: "code",
    text: "for(i=0;i<1000000;i++) C[i]=A[i]+B[i];   // CPU loop\n\nThread 0 → C[0]\nThread 1 → C[1]\n...\nThread 999999 → C[999999]                 // GPU: one thread per element",
  },

  { type: "h2", text: "Execution Hierarchy: Grid → Block → Thread" },
  {
    type: "code",
    text: "Grid\n └── Block\n       ├── Thread\n       ├── Thread\n       └── Thread",
  },
  {
    type: "ul",
    items: [
      "**Thread** — smallest unit, runs one copy of the kernel",
      "**Block** — group of threads scheduled onto one SM; can share memory and sync",
      "**Grid** — all blocks in one kernel launch",
    ],
  },
  {
    type: "p",
    text: "CUDA schedules **blocks**, not individual threads — much cheaper to manage.",
  },

  { type: "h2", text: "Memory Hierarchy" },
  {
    type: "code",
    text: "Registers (fastest, per-thread)\n  ↓\nShared Memory (fast, per-block)\n  ↓\nL1 / L2 Cache\n  ↓\nGlobal Memory / VRAM (largest, slowest, all threads)",
  },
  {
    type: "p",
    text: "Use shared memory when multiple threads in the same block need the same data — going through global memory every time is far slower. This is why kernels like FlashAttention lean on it heavily.",
  },

  { type: "h2", text: "Synchronization: __syncthreads()" },
  {
    type: "p",
    text: "A barrier — every thread in the block must reach it before any thread continues. Needed whenever one thread writes shared memory that another thread reads.",
  },
  {
    type: "code",
    text: "Thread A: write shared memory\n            ↓\n        __syncthreads()  // wait for everyone\n            ↓\nThread B: read shared memory  // safe now",
  },

  { type: "h2", text: "Typical CUDA Workflow" },
  {
    type: "code",
    text: "malloc()                  // 1. allocate CPU memory\ncudaMalloc()               // 2. allocate GPU memory\ncudaMemcpy()               // 3. copy CPU → GPU\nkernel<<<blocks,threads>>>() // 4. launch kernel\ncudaMemcpy()               // 5. copy GPU → CPU\ncudaFree()                 // 6. free GPU memory",
  },
  {
    type: "p",
    text: "Internally, a launch fans out: grid → split into blocks → scheduler assigns blocks to SMs → each SM runs its threads → memory accessed → results written back.",
  },

  { type: "h2", text: "CUDA in PyTorch" },
  {
    type: "p",
    text: "`x = x.cuda()` triggers `cudaMalloc()`, `cudaMemcpy()`, a kernel launch, and synchronization — all automatically. Nearly every PyTorch op compiles down to one or more CUDA kernel launches.",
  },

  { type: "h2", text: "Why It Matters for Inference" },
  {
    type: "p",
    text: "Every LLM op — GEMM, self-attention, FlashAttention, LayerNorm, softmax, embedding lookup, activations — is a CUDA kernel. Knowing CUDA is what turns FlashAttention, Tensor Cores, fused kernels, CUDA graphs, and KV cache tricks from magic into mechanics.",
  },

  { type: "h2", text: "Quick Revision" },
  {
    type: "ul",
    items: [
      "**CUDA** — NVIDIA's GPU programming platform",
      "**Host / Device** — CPU / GPU",
      "**Kernel** — GPU function, run by thousands of threads at once (`__global__`)",
      "**SIMT** — one kernel written, executed across many threads",
      "**Grid → Block → Thread** — execution hierarchy; CUDA schedules blocks",
      "**Registers → Shared → L1/L2 → Global** — memory hierarchy, fastest to slowest",
      "**`cudaMemcpy()`** — moves data between CPU and GPU (separate memory spaces)",
      "**`__syncthreads()`** — barrier for threads within a block",
    ],
  },
  {
    type: "p",
    text: "**One-line summary:** CUDA lets you write one kernel that the GPU runs across thousands of threads in parallel — the backbone of modern deep learning and inference.",
  },
];

export default content;
