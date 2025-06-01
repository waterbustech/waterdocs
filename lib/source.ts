import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";
import { createOpenAPI, attachFile } from "fumadocs-openapi/server";
import { allDocs, allMetas } from "content-collections";
import { createMDXSource } from "@fumadocs/content-collections";
import { i18n } from '@/lib/i18n';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  i18n,
  icon(icon) {
    if (!icon || !(icon in icons)) return;

    let color: string | undefined;
    switch (icon) {
      case "Package":
        color = "#cba6f7";
        break;
      case "Puzzle":
        color = "#89b4fa"; 
        break;
      case "FileCode":
        color = "#a6e3a1";
        break;
      default:
        color = "#bac2de"; // Surface tone (fallback)
    }

    return createElement(icons[icon as keyof typeof icons], {
      stroke: color,
      color,
      size: 18,
      strokeWidth: 2,
    });
  },
  // it assigns a URL to your pages
  baseUrl: "/",
  source: createMDXSource(allDocs, allMetas),
  pageTree: {
    attachFile,
  }
});

export const openapi = createOpenAPI({
  // options
});
