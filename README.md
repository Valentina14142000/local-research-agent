# Local Research Agent 

A privacy-first, local Retrieval-Augmented Generation (RAG) agent built using **LangGraph**, **LangChain**, and **LM Studio**. Designed to perform local document search and reasoning completely offline without leaking data to third-party APIs.

---

## Features

* **100% Offline & Private:** Runs entirely on your local machine using LM Studio as the local model provider.
* **LangGraph Orchestration:** Modular workflow separating retrieval and generation nodes for robust execution.
* **Lightweight Document Ingestion:** Automatically reads and indexes markdown (`.md`) and text (`.txt`) files from a local data directory.

---

## Tech Stack

* **Orchestration:** LangGraph / LangChain (`@langchain/langgraph`, `@langchain/openai`)
* **Runtime:** Node.js / TypeScript (`tsx`)
* **Local Inference:** LM Studio (compatible with OpenAI-spec local endpoints)

---

### Usage
Add your research notes or text files into the directory, and then start the agent.
