import { generateFiles } from "fumadocs-openapi";

void generateFiles({
  // the OpenAPI schema
  // For Vercel users, we recommend a URL instead.
  input: ["https://services.waterbus.tech/api-doc/openapi.json"],
  output: "./content/docs/openapi",
  // we recommend to enable it
  // make sure your endpoint description doesn't break MDX syntax.
  includeDescription: true,
});
