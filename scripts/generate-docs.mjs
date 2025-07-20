import { generateFiles } from "fumadocs-openapi";

void generateFiles({
  // the OpenAPI schema
  // For Vercel users, we recommend a URL instead.
  input: ["https://services.waterbus.tech/api-doc/openapi.json"],
  output: "./content/openapi",
  // we recommend to enable it
  // make sure your endpoint description doesn't break MDX syntax.
  includeDescription: true,
  per: 'operation',
  groupBy: 'tag',
  name: (output, document) => {
    if (output.type === "operation") {
      const operation = document.paths[output.item.path][output.item.method];
      const operationId =
        operation.operationId || operation.summary || "unnamed";
      const lastPart = operationId.split(".").pop();
      return `${lastPart}`;
    }

    if (output.type === "webhook") {
      const hook = document.webhooks[output.item.name][output.item.method];
      const hookId = hook.operationId || hook.summary || "unnamed";
      const lastPart = hookId.split(".").pop();
      return `${lastPart}`;
    }

    return "unknown";
  },
});
