import { InferMetaType, InferPageType, loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";
import { attachFile, createOpenAPI } from "fumadocs-openapi/server";
import { docs } from "@/.source";
import { i18n } from "@/lib/i18n";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  i18n,
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
  },
  // it assigns a URL to your pages
  baseUrl: "/",
  source: docs.toFumadocsSource(),
  pageTree: {
    attachFile,
  },
});

export const openapi = createOpenAPI({
  proxyUrl: "/api/proxy",
  shikiOptions: {
    themes: {
      dark: "dracula",
      light: "vitesse-light",
    },
  },
});

export type Page = InferPageType<typeof source>;
export type Meta = InferMetaType<typeof source>;
