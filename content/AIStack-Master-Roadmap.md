# 🗺️ AI Engineering Master Roadmap (Module-wise)

This roadmap is organized from **Fundamentals → Building AI Applications → Production AI Systems → AI Infrastructure**.

| **Module**    | **Focus Area**                    | **Submodules**                                                           | **Key Topics**                                                                                                                                                                                                                                                                                                                                                    |
| ------------- | --------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Module 1**  | **AI Foundations**                | Neural Networks, Transformers, Tokenization, Pre-training, Post-training | Neural Networks, Deep Learning, Embeddings, Positional Encoding, Self-Attention, Multi-Head Attention, FFN, LayerNorm, Residual Connections, Encoder vs Decoder, Transformer Architecture, BPE, SentencePiece, WordPiece, tiktoken, Context Windows, Scaling Laws, Chinchilla, Distributed Training, Data Pipelines, SFT, RLHF, DPO, Constitutional AI, Alignment |
| **Module 2**  | **LLM Inference & Serving**       | Text Generation, Inference, Optimization, Model Serving                  | Temperature, Top-k, Top-p, Beam Search, Sampling, Prefill, Decode, KV Cache, Cache Eviction, FlashAttention, Paged Attention, Continuous Batching, Speculative Decoding, Streaming, Parallel Decoding, Quantization (INT8, INT4, FP8), GPTQ, AWQ, Distillation, LoRA, PEFT, vLLM, TensorRT-LLM, SGLang, Ollama, Hugging Face TGI, LiteLLM                         |
| **Module 3**  | **Prompt & Context Engineering**  | Prompt Engineering, Context Engineering                                  | Zero-shot, Few-shot, Chain of Thought, Self-Consistency, Tree of Thoughts, ReAct, Prompt Templates, Context Engineering, Context Windows, Long Context, Memory, Context Compression, Semantic Compression, Context Ranking                                                                                                                                        |
| **Module 4**  | **Agentic AI**                    | Agent Fundamentals, Frameworks, Production Agents                        | Agent Architecture, Planning, Reflection, Tool Use, Function Calling, Structured Outputs, JSON Mode, LangGraph, CrewAI, AutoGen, OpenAI Agents SDK, MCP, Agent-to-Agent (A2A), Multi-Agent Systems, Human-in-the-Loop, Agent Guardrails, Loop Budgets, Tool Budgets, Termination Logic, Retry Logic, Idempotency                                                  |
| **Module 5**  | **Data & RAG**                    | Retrieval, Advanced Retrieval, Vector Databases                          | Embeddings, Chunking, Metadata, Sparse Retrieval, Dense Retrieval, BM25, Hybrid Search, Reranking, Cross Encoder, Query Rewriting, Multi-hop Retrieval, Grounding, Attribution, Knowledge Graphs, Freshness, Pinecone, Qdrant, Weaviate, Milvus, Chroma                                                                                                           |
| **Module 6**  | **AI Evaluation & Observability** | Evaluation, Observability                                                | Golden Datasets, Benchmarks, Regression Testing, Adversarial Testing, Human Evaluation, Pairwise Evaluation, LLM-as-a-Judge, Agent Evaluation, RAG Evaluation, Tracing, Metrics, Latency, Token Usage, Cost Attribution, Drift Detection, Hallucination Detection, Root Cause Analysis                                                                            |
| **Module 7**  | **AI Security**                   | LLM Security                                                             | Prompt Injection, Jailbreaks, Data Leakage Prevention, Runtime Guardrails, PII Detection, Output Filtering, Red Teaming, Policy Enforcement, Secure Tool Calling                                                                                                                                                                                                  |
| **Module 8**  | **AI Infrastructure**             | Hardware, Distributed Systems, Orchestration                             | GPUs, CUDA, GPU Memory, NVLink, InfiniBand, Kubernetes, Ray, Distributed Compute, DeepSpeed, FSDP, CXL, GPU Networking                                                                                                                                                                                                                                            |
| **Module 9**  | **AI FinOps**                     | Cost Optimization                                                        | GPU Utilization, Spot Instances, Autoscaling, Cost Attribution, Model Routing, Batch Inference, Caching Strategies, Load Balancing                                                                                                                                                                                                                                |
| **Module 10** | **Production AI Systems**         | Deployment & Operations                                                  | CI/CD for LLMs, Prompt Versioning, Model Versioning, Retrieval Index Versioning, Canary Deployments, A/B Testing, Rollbacks, Production Failure Modes, Incident Response, Debugging LLM Systems                                                                                                                                                                   |
| **Module 11** | **Capstone Projects**             | End-to-End AI Systems                                                    | Production RAG Assistant, AI Coding Agent, Research Agent, Customer Support Agent, AI Data Analyst, Resume Reviewer, Workflow Automation Agent, Browser Agent, Multi-Agent Platform, Production AI SaaS                                                                                                                                                           |

---

# 📊 Module Summary

| Module    | Title                                |  Approx. Topics |
| --------- | ------------------------------------ | --------------: |
| 1         | AI Foundations                       |              25 |
| 2         | LLM Inference & Serving              |              28 |
| 3         | Prompt & Context Engineering         |              14 |
| 4         | Agentic AI                           |              22 |
| 5         | Data & RAG                           |              20 |
| 6         | AI Evaluation & Observability        |              18 |
| 7         | AI Security                          |               9 |
| 8         | AI Infrastructure                    |              12 |
| 9         | AI FinOps                            |               8 |
| 10        | Production AI Systems                |              10 |
| 11        | Capstone Projects                    |              10 |
| **Total** | **AI Engineering Master Curriculum** | **≈176 Topics** |

## 🎯 Learning Order

```text
AI Foundations
        ↓
LLM Inference & Serving
        ↓
Prompt & Context Engineering
        ↓
Agentic AI
        ↓
Data & RAG
        ↓
AI Evaluation & Observability
        ↓
AI Security
        ↓
AI Infrastructure
        ↓
AI FinOps
        ↓
Production AI Systems
        ↓
Capstone Projects
```

This progression ensures that each module builds on the previous one, taking learners from core concepts through production-ready AI engineering practices.
