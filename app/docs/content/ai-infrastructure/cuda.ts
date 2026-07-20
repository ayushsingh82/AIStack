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
    text: "CPU                  GPU\n         vs\n1+5                  Thread 1 → 1+5\n2+6                  Thread 2 → 2+6\n3+7                  Thread 3 → 3+7\n4+8                  Thread 4 → 4+8\n(one after other)    (all at once)",
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
    text: "void add(...)             // CPU function\n__global__ void add(...)  // CUDA kernel",
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
    text: "CUDA schedules **blocks**, not individual threads — much cheaper to manage. Scheduling every thread individually would be expensive, so CUDA schedules a whole 256-thread block onto an SM as a single unit instead.",
  },

  { type: "h2", text: "Blocks and Grids" },
  {
    type: "p",
    text: "Say a kernel needs 10,000 threads. The GPU doesn't track each one individually — that would be way too much bookkeeping. Instead, CUDA groups threads into **blocks**, and groups blocks into a **grid**.",
  },
  {
    type: "code",
    text: "Grid\n ├── Block 0\n │    ├── Thread 0\n │    ├── Thread 1\n │    └── Thread 2\n ├── Block 1\n │    ├── Thread 0\n │    └── Thread 1\n └── Block 2\n      └── Thread 0",
  },
  {
    type: "p",
    text: "Notice thread indices restart at 0 in every block — `threadIdx` is local to a block, not global. To get a unique index across the whole grid, a kernel computes it as `blockIdx.x * blockDim.x + threadIdx.x`.",
  },

  { type: "h2", text: "Warp" },
  {
    type: "p",
    text: "A **warp** is a group of 32 CUDA threads that execute the same instruction at the same time on an NVIDIA GPU. Instead of scheduling each thread individually, the GPU schedules one warp, making execution much more efficient. Think of a warp as the smallest execution unit the GPU scheduler works with.",
  },
  {
    type: "code",
    text: "Block\n │\n ├── Warp 0 (32 Threads)\n │    ├── Thread 0\n │    ├── Thread 1\n │    ├── ...\n │    └── Thread 31\n │\n ├── Warp 1 (32 Threads)\n │    ├── Thread 32\n │    ├── ...\n │    └── Thread 63\n │\n └── Warp 2 (32 Threads)",
  },
  {
    type: "p",
    text: "Warps are the basic scheduling unit of the GPU.",
  },

  { type: "h2", text: "Software vs Hardware" },
  {
    type: "code",
    text: "Software (CUDA)    Hardware (GPU)\n\nGrid           →   GPU\nBlocks         →   SMs (Streaming Multiprocessors)\nWarps          →   Scheduled by Warp Scheduler\nThreads        →   CUDA Cores execute instructions",
  },

  { type: "h2", text: "Global Block Scheduler" },
  {
    type: "p",
    text: "Say a kernel launches **100 blocks** on a GPU with only **8 SMs**. There aren't enough SMs to run every block at once, so a hardware scheduler assigns blocks to SMs as they free up.",
  },
  {
    type: "code",
    text: "SM 1 → Block 0\nSM 2 → Block 1\nSM 3 → Block 2\n  ...\nSM 8 → Block 7",
  },
  {
    type: "p",
    text: "The moment an SM finishes its block, the scheduler hands it the next one waiting in line — e.g. once SM 1 finishes Block 0, it picks up Block 18:",
  },
  {
    type: "code",
    text: "SM 1 finishes Block 0\n        ↓\n   SM 1 → Block 18",
  },
  {
    type: "p",
    text: "This repeats — assign, run, finish, reassign — until all 100 blocks have executed. It's why a grid isn't limited to one block per SM: the scheduler just keeps feeding the hardware until the whole grid is done.",
  },

  { type: "h2", text: "Architecture" },
  {
    type: "image",
    src: "/cuda.png",
    alt: "CUDA GPU architecture diagram showing the GPU, GPC, SM, and CUDA core hierarchy",
    width: 1612,
    height: 1456,
  },

  { type: "h2", text: "H100 Anatomy: GPU → GPC → SM (Size Comparison)" },
  {
    type: "p",
    text: "The H100 (Hopper architecture) is currently one of the most powerful GPUs for AI. Its compute is organized top-down: **GPU → GPC → SM**.",
  },
  {
    type: "code",
    text: "H100 GPU\n └── 8 GPCs\n       └── 132 SMs total  (~16-17 SMs per GPC)",
  },
  {
    type: "ul",
    items: [
      "**SM (Streaming Multiprocessor)** — a mini processor inside the GPU; the unit that actually executes a CUDA block",
      "**GPC (Graphics Processing Cluster)** — a larger unit containing multiple SMs; the H100 has 8 GPCs, each managing a group of SMs",
      "**HBM3 (High Bandwidth Memory)** — instead of ordinary VRAM, modern AI GPUs use HBM3 to feed data to the compute units fast enough to keep them busy",
    ],
  },
  {
    type: "p",
    text: "Put together: 1 GPU → 8 GPCs → 132 SMs, all fed by HBM3. Each SM is like a small, independent GPU capable of executing CUDA blocks on its own — 132 of them means 132x the parallel work compared to just one.",
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
    text: "malloc()                      // 1. allocate CPU memory\ncudaMalloc()                  // 2. allocate GPU memory\ncudaMemcpy()                  // 3. copy CPU → GPU\nkernel<<<blocks,threads>>>()  // 4. launch kernel\ncudaMemcpy()                  // 5. copy GPU → CPU\ncudaFree()                    // 6. free GPU memory",
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
  { type: "h2", text: "Why is CUDA Important for AI?" },
  {
    type: "p",
    text: "PyTorch, TensorFlow, and JAX all use CUDA under the hood — it's the layer that makes them fast on GPUs in the first place. The Python API just hides the mechanics already covered above (see \"CUDA in PyTorch\"): allocation, the CPU→GPU copy, and the kernel launch.",
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
      "**SM (Streaming Multiprocessor)** — the GPU unit that executes CUDA blocks",
      "**GPC (Graphics Processing Cluster)** — a higher-level grouping of multiple SMs",
      "**HBM3 (High Bandwidth Memory)** — extremely fast GPU memory that feeds data to the compute units",
      "**MNIST** — a simple handwritten-digit dataset used to learn and test neural networks",
      "**Benchmarking** — measure how fast a program runs",
      "**Profiling** — find where time is being spent and identify bottlenecks",
      "**Optimization** — improve performance based on profiling results",
      "**Warp** — a group of 32 threads that execute together",
      "**Memory Stall** — a warp pauses while waiting for data",
    ],
  },
  {
    type: "p",
    text: "**One-line summary:** CUDA lets you write one kernel that the GPU runs across thousands of threads in parallel — the backbone of modern deep learning and inference.",
  },
];

export default content;
