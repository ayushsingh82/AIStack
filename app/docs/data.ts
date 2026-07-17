export type Section = {
  title: string;
  topics: string[];
};

export type Module = {
  number: number;
  title: string;
  slug: string;
  topics: string[];
  sections?: Section[];
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const rawModules: Omit<Module, "slug">[] = [
  {
    number: 1,
    title: "AI Foundations",
    topics: [
      "Neural Networks",
      "Deep Learning",
      "Embeddings",
      "Positional Encoding",
      "Self-Attention",
      "Multi-Head Attention",
      "Feed Forward Networks",
      "LayerNorm",
      "Residual Connections",
      "Encoder vs Decoder",
      "Transformer Architecture",
      "BPE",
      "SentencePiece",
      "WordPiece",
      "tiktoken",
      "Context Windows",
      "Scaling Laws",
      "Chinchilla",
      "Distributed Training",
      "Data Pipelines",
      "Supervised Fine-Tuning (SFT)",
      "RLHF",
      "DPO",
      "Constitutional AI",
      "Alignment",
    ],
  },
  {
    number: 2,
    title: "LLM Inference & Serving",
    topics: [
      "Temperature",
      "Top-k",
      "Top-p",
      "Beam Search",
      "Sampling Strategies",
      "Prefill",
      "Decode",
      "KV Cache",
      "Roofline Profiler",
      "Cache Eviction",
      "FlashAttention",
      "Paged Attention",
      "Continuous Batching",
      "Speculative Decoding",
      "Streaming",
      "Parallel Decoding",
      "Quantization",
      "GPTQ",
      "AWQ",
      "FP8",
      "Distillation",
      "LoRA",
      "PEFT",
      "vLLM",
      "TensorRT-LLM",
      "SGLang",
      "Ollama",
      "Hugging Face TGI",
      "LiteLLM",
    ],
  },
  {
    number: 3,
    title: "Prompt & Context Engineering",
    topics: [
      "Zero-shot",
      "Few-shot",
      "Chain of Thought",
      "Self-Consistency",
      "Tree of Thoughts",
      "ReAct",
      "Prompt Templates",
    ],
    sections: [
      {
        title: "Context Engineering",
        topics: [
          "What is Context?",
          "Prompt vs Context Engineering",
          "Components of Context",
          "Context Lifecycle",
          "Context Packing",
          "Context Ordering",
          "Context Pruning",
          "Context Compression",
          "Context Ranking",
          "Token Budgeting",
          "Memory vs Context",
          "Context for Agents",
          "Context for RAG",
        ],
      },
      {
        title: "Context Window & Tokens",
        topics: [
          "Tokenization",
          "Context Window",
          "Token Limits",
          "Prompt Length",
          "Conversation History",
          "Token Counting",
          "Context Overflow",
          "Sliding Window",
          "Summarization",
          "Long Context Models",
          "Lost in the Middle",
          "Cost vs Context Size",
          "Latency vs Context Size",
        ],
      },
    ],
  },
  {
    number: 4,
    title: "Agentic AI",
    topics: [
      "Agent Architecture",
      "Planning",
      "Reflection",
      "Tool Use",
      "Function Calling",
      "Structured Outputs",
      "JSON Mode",
      "LangGraph",
      "CrewAI",
      "AutoGen",
      "OpenAI Agents SDK",
      "Model Context Protocol (MCP)",
      "Agent-to-Agent (A2A)",
      "Multi-Agent Systems",
      "Human-in-the-Loop",
      "Agent Guardrails",
      "Loop Budgets",
      "Tool Budgets",
      "Termination Logic",
      "Retry Logic",
      "Idempotency",
    ],
  },
  {
    number: 5,
    title: "Data & RAG",
    topics: [
      "Embeddings",
      "Chunking",
      "Metadata",
      "Sparse Retrieval",
      "Dense Retrieval",
      "BM25",
      "Hybrid Search",
      "Reranking",
      "Cross Encoder",
      "Query Rewriting",
      "Multi-hop Retrieval",
      "Grounding",
      "Attribution",
      "Knowledge Graphs",
      "Freshness",
      "Pinecone",
      "Qdrant",
      "Weaviate",
      "Milvus",
      "Chroma",
    ],
  },
  {
    number: 6,
    title: "AI Evaluation & Observability",
    topics: [
      "Golden Datasets",
      "Benchmarks",
      "Regression Testing",
      "Adversarial Testing",
      "Human Evaluation",
      "Pairwise Evaluation",
      "LLM-as-a-Judge",
      "Agent Evaluation",
      "RAG Evaluation",
      "Tracing",
      "Metrics",
      "Latency",
      "Token Usage",
      "Cost Attribution",
      "Drift Detection",
      "Hallucination Detection",
      "Root Cause Analysis",
    ],
  },
  {
    number: 7,
    title: "AI Security",
    topics: [
      "Prompt Injection",
      "Jailbreaks",
      "Data Leakage Prevention",
      "Runtime Guardrails",
      "PII Detection",
      "Output Filtering",
      "Red Teaming",
      "Policy Enforcement",
      "Secure Tool Calling",
    ],
  },
  {
    number: 8,
    title: "AI Infrastructure",
    topics: [
      "GPUs",
      "CUDA",
      "GPU Memory",
      "NVLink",
      "InfiniBand",
      "Kubernetes",
      "Ray",
      "Distributed Compute",
      "DeepSpeed",
      "FSDP",
      "CXL",
      "GPU Networking",
    ],
  },
  {
    number: 9,
    title: "AI FinOps",
    topics: [
      "GPU Utilization",
      "Spot Instances",
      "Autoscaling",
      "Cost Attribution",
      "Model Routing",
      "Batch Inference",
      "Caching Strategies",
      "Load Balancing",
    ],
  },
  {
    number: 10,
    title: "Production AI Systems",
    topics: [
      "CI/CD for LLMs",
      "Prompt Versioning",
      "Model Versioning",
      "Retrieval Index Versioning",
      "Canary Deployments",
      "A/B Testing",
      "Rollbacks",
      "Production Failure Modes",
      "Incident Response",
      "Debugging LLM Systems",
    ],
  },
  {
    number: 11,
    title: "Capstone Projects",
    topics: [
      "Production RAG Assistant",
      "AI Coding Agent",
      "Research Agent",
      "Customer Support Agent",
      "AI Data Analyst",
      "Resume Reviewer",
      "Workflow Automation Agent",
      "Browser Agent",
      "Multi-Agent Platform",
      "Production AI SaaS",
    ],
  },
];

export const modules: Module[] = rawModules.map((m) => ({
  ...m,
  slug: slugify(m.title),
  topics: m.sections
    ? [...m.topics, ...m.sections.flatMap((s) => s.topics)]
    : m.topics,
}));

export function topicSlug(topic: string): string {
  return slugify(topic);
}

export function sectionSlug(title: string): string {
  return slugify(title);
}

export function findModule(moduleSlug: string): Module | undefined {
  return modules.find((m) => m.slug === moduleSlug);
}

export function findTopic(moduleSlug: string, topicSlugValue: string) {
  const module = findModule(moduleSlug);
  if (!module) return undefined;
  const topic = module.topics.find((t) => topicSlug(t) === topicSlugValue);
  if (!topic) return undefined;
  return { module, topic };
}

export function findSection(moduleSlug: string, sectionSlugValue: string) {
  const module = findModule(moduleSlug);
  if (!module) return undefined;
  const section = module.sections?.find(
    (s) => sectionSlug(s.title) === sectionSlugValue,
  );
  if (!section) return undefined;
  return { module, section };
}
