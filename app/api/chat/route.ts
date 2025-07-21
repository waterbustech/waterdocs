import { ProvideLinksToolSchema } from "../../../lib/chat/inkeep-qa-schema";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

// export const runtime = "edge";

const openai = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  const reqJson = await req.json();

  const result = streamText({
    model: openai("anthropic/claude-3-haiku"),
    tools: {
      provideLinks: {
        parameters: ProvideLinksToolSchema,
      },
    },
    messages: reqJson.messages.map((message: Record<string, unknown>) => ({
      role: message.role,
      content: message.content,
      name: "anthropic-qa-user-message",
      id: message.id,
    })),
    toolChoice: "auto",
  });

  return result.toDataStreamResponse();
}
