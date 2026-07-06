import { notFound } from "next/navigation";
import { findTopic, modules, topicSlug } from "../../data";
import { getTopicContent } from "../../content";
import ContentBlocks from "../../ContentBlocks";

export function generateStaticParams() {
  return modules.flatMap((module) =>
    module.topics.map((topic) => ({
      module: module.slug,
      topic: topicSlug(topic),
    })),
  );
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ module: string; topic: string }>;
}) {
  const { module: moduleSlug, topic: topicSlugParam } = await params;
  const result = findTopic(moduleSlug, topicSlugParam);

  if (!result) {
    notFound();
  }

  const { module, topic } = result;
  const blocks = getTopicContent(module.slug, topicSlug(topic));

  return (
    <div className="max-w-2xl">
      <div className="text-xs uppercase tracking-wider text-gray-500">
        Module {module.number} · {module.title}
      </div>
      <h1 className="mt-2 text-3xl font-semibold">{topic}</h1>
      {blocks ? (
        <ContentBlocks blocks={blocks} />
      ) : (
        <div className="mt-8 inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
          Coming soon
        </div>
      )}
    </div>
  );
}
