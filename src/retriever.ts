import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import * as fs from "fs";
import * as path from "path";

export async function createLocalRetriever() {
  // 1. Initialize local embeddings pointing to LM Studio
  const embeddings = new OpenAIEmbeddings({
    modelName: "text-embedding-nomic-embed-text-v1.5",
    configuration: {
      baseURL: "http://127.0.0.1:1234/v1",
      apiKey: "not-needed",
    },
  });

  // 2. Load documents from the data directory
  const dataDir = path.join(process.cwd(), "data");
  const docs: Document[] = [];

  if (fs.existsSync(dataDir)) {
    const files = fs.readdirSync(dataDir);
    for (const file of files) {
      if (file.endsWith(".txt") || file.endsWith(".md")) {
        const filePath = path.join(dataDir, file);
        const content = fs.readFileSync(filePath, "utf-8");
        docs.push(new Document({ pageContent: content, metadata: { source: file } }));
      }
    }
  }

  // Fallback sample document if data folder is empty
  if (docs.length === 0) {
    docs.push(
      new Document({
        pageContent: "Local Research Agent: Designed for offline RAG processing using LangGraph and LM Studio.",
        metadata: { source: "default-intro.txt" },
      })
    );
  }

  // 3. Return a clean custom retriever interface
  return {
    async invoke(query: string) {
      // Simple text-matching / direct document return for local lightweight testing
      return docs;
    },
  };
}
