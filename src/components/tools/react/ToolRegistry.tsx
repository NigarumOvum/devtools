import React from "react";
import { HeroUIProvider } from "@heroui/react";
import { getToolMeta } from "../../../lib/tools";

import JsonFormatter from "./JsonFormatter";
import Base64Tool from "./Base64Tool";
import UuidGenerator from "./UuidGenerator";
import RegexTester from "./RegexTester";
import MarkdownPreview from "./MarkdownPreview";
import DiffChecker from "./DiffChecker";
import QrCodeGenerator from "./QrCodeGenerator";
import JsonToTypescript from "./JsonToTypescript";
import PwaManifestGenerator from "./PwaManifestGenerator";
import HtmlEditor from "./HtmlEditor";
import HtmlConverter from "./HtmlConverter";
import JsMinifier from "./JsMinifier";
import AutoRegex from "./AutoRegex";
import CssConverter from "./CssConverter";
import LayoutGenerator from "./LayoutGenerator";
import A11yLab from "./A11yLab";
import PerformanceSuite from "./PerformanceSuite";
import HttpClient from "./HttpClient";

/** React tool id → component map. Single responsibility: resolve React tools only. */
const REACT_TOOLS: Record<string, React.ComponentType> = {
  "json-formatter": JsonFormatter,
  "base64-tool": Base64Tool,
  "uuid-generator": UuidGenerator,
  "regex-tester": RegexTester,
  "markdown-preview": MarkdownPreview,
  "diff-checker": DiffChecker,
  "qr-generator": QrCodeGenerator,
  "json-to-typescript": JsonToTypescript,
  "pwa-manifest": PwaManifestGenerator,
  "html-editor": HtmlEditor,
  "html-converter": HtmlConverter,
  "js-minifier": JsMinifier,
  "auto-regex": AutoRegex,
  "css-converter": CssConverter,
  "layout-generator": LayoutGenerator,
  "a11y-lab": A11yLab,
  "performance-lab": PerformanceSuite,
  "http-client": HttpClient,
};

export interface ReactToolLoaderProps {
  toolId: string;
}

/** Loads a React tool by id; depends on tool config (DIP). */
export function ReactToolLoader({ toolId }: ReactToolLoaderProps) {
  const meta = getToolMeta(toolId);
  const Component = meta?.type === "react" ? REACT_TOOLS[toolId] : undefined;

  if (!Component) {
    return (
      <div className="p-4 text-red-500" role="alert">
        Tool not found or not a React tool.
      </div>
    );
  }

  return (
    <HeroUIProvider>
      <Component />
    </HeroUIProvider>
  );
}
