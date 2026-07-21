import { createResearchGraph } from "./graph.js";

async function run() {
  console.log("Initializing Local Research Agent...");
  const app = await createResearchGraph();

  const question = "What is the Local Research Agent designed for?";
  console.log();

  const result = await app.invoke({ question });
  console.log("--- Answer ---");
  console.log(result.answer);
  console.log("--------------");
}

run().catch(console.error);
