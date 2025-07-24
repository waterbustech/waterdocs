import { ProvideLinksToolSchema } from "../../../lib/chat/inkeep-qa-schema";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const openai = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  const reqJson = await req.json();

  // Fetch all docs content (llms-full.txt)
  const origin = req.headers.get("origin") || "http://localhost:3000";
  const docsResponse = await fetch(`${origin}/llms-full.txt`);
  const docsContext = await docsResponse.text();

  // Inject context into the first system message
  const systemMessage = {
    role: "system",
    content: `You are a helpful assistant for the Waterbus documentation.
Use the following documentation to answer questions:
${docsContext}`,
  };

  const result = streamText({
    model: openai("anthropic/claude-3-haiku"),
    // tools: {
    //   provideLinks: {
    //     parameters: ProvideLinksToolSchema,
    //   },
    // },
    messages: [
      systemMessage,
      ...reqJson.messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: "anthropic-qa-user-message",
        id: message.id,
      })),
    ],
    toolChoice: "auto",
  });

  return result.toDataStreamResponse();
}
