import { modules } from "./data";

export default function DocsIndexPage() {
  const totalTopics = modules.reduce((sum, m) => sum + m.topics.length, 0);

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-semibold">AIStack Docs</h1>
      <p className="mt-3 text-gray-400">
        {modules.length} modules · {totalTopics} topics. Pick a topic from the
        sidebar to get started.
      </p>
      <div className="mt-8 inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
        Content coming soon
      </div>
    </div>
  );
}
