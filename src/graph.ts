import { StateGraph, Annotation } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createLocalRetriever } from "./retriever.js";

// Define the graph state schema
const GraphState = Annotation.Root({
  question: Annotation<string>,
  context: Annotation<string>,
  answer: Annotation<string>,
});

export async function createResearchGraph() {
  const retriever = await createLocalRetriever();

  // Configure local model via LM Studio
  const model = new ChatOpenAI({
    modelName: "smollm2-135m-instruct",
    temperature: 0,
    configuration: {
      baseURL: "http://127.0.0.1:1234/v1",
      apiKey: "not-needed",
    },
  });

  // Node 1: Retrieve relevant local docs
  async function retrieveNode(state: typeof GraphState.state) {
    const retrievedDocs = await retriever.invoke(state.question);
    const context = retrievedDocs.map((doc) => doc.pageContent).join("\n\n");
    return { context };
  }

  // Node 2: Generate answer using local LLM
  async function generateNode(state: typeof GraphState.state) {
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a precise research assistant. Answer the user's question using ONLY the provided context below:\n\n{context}"],
      ["user", "{question}"],
    ]);

    const chain = prompt.pipe(model).pipe(new StringOutputParser());
    const answer = await chain.invoke({
      context: state.context,
      question: state.question,
    });

    return { answer };
  }

  // Build the graph workflow
  const workflow = new StateGraph(GraphState)
    .addNode("retrieve", retrieveNode)
    .addNode("generate", generateNode)
    .addEdge("__start__", "retrieve")
    .addEdge("retrieve", "generate")
    .addEdge("generate", "__end__");

  return workflow.compile();
}
