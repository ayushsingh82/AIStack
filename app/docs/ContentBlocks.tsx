import type { ReactNode } from "react";
import type { Block } from "./content";

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[13px] text-gray-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default function ContentBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="mt-8">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-8 text-lg font-semibold text-white first:mt-0"
              >
                {block.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="mt-3 leading-7 text-gray-400">
                {renderInline(block.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mt-3 list-disc space-y-1.5 pl-5 text-gray-400">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre
                key={i}
                className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-lg border border-white/10 bg-white/5 p-4 font-mono text-[13px] leading-6 text-gray-300"
              >
                {block.text}
              </pre>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
