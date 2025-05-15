import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";
import { createOpenAPI, attachFile } from "fumadocs-openapi/server";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  icon(icon) {
    if (!icon || !(icon in icons)) return;

    let color: string | undefined;
    switch (icon) {
      case "Building":
        color = "#dea584";
        break;
      case "Hammer":
        color = "#3b82f6";
        break;
      case "Repeat2":
        color = "#00ff22";
        break;
      default:
        color = "";
    }

    return createElement(icons[icon as keyof typeof icons], {
      stroke: color,
      color,
      size: 18,
      strokeWidth: 2,
    });
  },
  // it assigns a URL to your pages
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  pageTree: {
    attachFile,
  },
});

export const openapi = createOpenAPI({
  // options
});
