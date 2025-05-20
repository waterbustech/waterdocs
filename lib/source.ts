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
        color = "#ffb3d1";
        break;
      case "Hammer":
        color = "#a8c5f7";
        break;
      case "Repeat2":
        color = "#a8f7b1";
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
