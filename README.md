# 🧭 DeepLocal Agent

<p align="center">
  <b>An autonomous, privacy-first deep research engine powered by local open-source LLMs and advanced agentic workflows.</b>
</p>

<p align="center">
  <a href="#-overview"><b>Overview</b></a> &bull;
  <a href="#-core-capabilities"><b>Capabilities</b></a> &bull;
  <a href="#-technical-architecture"><b>Architecture</b></a> &bull;
  <a href="#-quick-start"><b>Quick Start</b></a> &bull;
  <a href="#-project-structure"><b>Structure</b></a>
</p>

---

## 💎 Overview

`DeepLocal Agent` is an enterprise-grade, fully autonomous research assistant designed to execute multi-step investigative workflows entirely on local infrastructure. By combining recursive query expansion, real-time web parsing, semantic vector indexing, and local inference engines (**Ollama** / **LMStudio**), it delivers deep, cited research briefs without exposing sensitive data to third-party endpoints.

---

## 🛠️ Core Capabilities

* **Autonomous Multi-Loop Reasoning:** Breaks down complex, ambiguous research topics into targeted sub-queries, iteratively refining the search scope based on intermediate findings.
* **Air-Gapped & Private Inference:** Seamlessly routes generation tasks through local models, ensuring complete data sovereignty and operational security.
* **Hybrid Search & Retrieval:** Employs parallel keyword extraction and semantic vector embeddings (via FAISS/Sentence Transformers) to eliminate redundancies and surface high-signal context.
* **Dynamic Citation & Source Tracking:** Automatically extracts URLs, calculates relevance scores, and formats structured inline citations for every insight gathered.
* **Interactive Streamlit Interface:** Provides a real-time observability dashboard to inspect agent thoughts, tool execution, search logs, and synthesis progress.
* **Flexible Export Pipelines:** Instantly compiles research reports into clean, publication-ready Markdown or structured JSON outputs.

---

## ⚙️ Technical Architecture

```text
       ┌────────────────────────┐
       │   Streamlit Web UI     │
       └───────────┬────────────┘
                   │ User Query
                   ▼
       ┌────────────────────────┐
       │  Agent Planner Loop    │ ◄───► [ Search Backends ]
       └───────────┬────────────┘       (DuckDuckGo / Tavily)
                   │ Raw Snippets
                   ▼
       ┌────────────────────────┐
       │   Vector Embeddings    │
       │  & FAISS Indexing Store│
       └───────────┬────────────┘
                   │ Context Chunking
                   ▼
       ┌────────────────────────┐
       │  Local LLM Inference   │
       │  (Ollama / LMStudio)   │
       └───────────┬────────────┘
                   │ Synthesized Insights
                   ▼
       ┌────────────────────────┐
       │ Final Cited Report Out │
       └────────────────────────┘
```

## 🚀 Quick Start
Prerequisites
Python 3.10+

Ollama or LMStudio running locally with an active model (e.g., llama3, mistral, or qwen2.5).

1. Clone Repository
```Bash
git clone github repository
cd local-research-agent
```

2. Set Up Virtual Environment
```Bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Dependencies
```Bash
pip install --upgrade pip
pip install -r requirements.txt
```

4. Configure Environment

Create a local .env file from the template and configure your parameters:

```Bash
cp .env.example .env
```

5. Launch the Application

```Bash
streamlit run app.py
Access the control panel locally at http://localhost:port number
```

---

## 📂 Project Structure
```Plaintext
local-research-agent/
│
├── app.py                 # Streamlit application entry point & UI layout
├── agent/                 # Core agentic logic and reasoning loops
│   ├── planner.py         # Sub-query decomposition & strategy formulation
│   ├── executor.py        # Tool execution and search orchestration
│   └── synthesizer.py     # Context synthesis and report generation
├── vector_store/          # Semantic embedding and FAISS index management
├── utils/                 # Configuration loaders, loggers, and parsers
├── .env.example           # Environment variable template
├── requirements.txt       # Project dependencies
└── README.md              # Project documentation
```

---

## 🤝 Contributing
Contributions, feature requests, and architectural discussions are highly encouraged. Please feel free to fork the repository, open an issue, or submit a pull request.

---

## 📄 License
This project is open-source software licensed under the MIT License.
