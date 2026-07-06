import { notFound } from "next/navigation";
import { findSection, modules, sectionSlug, topicSlug } from "../../../data";
import { getTopicContent } from "../../../content";
import ContentBlocks from "../../../ContentBlocks";
import ScrollSpy from "../../../ScrollSpy";

export function generateStaticParams() {
  return modules.flatMap((module) =>
    (module.sections ?? []).map((section) => ({
      module: module.slug,
      section: sectionSlug(section.title),
    })),
  );
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ module: string; section: string }>;
}) {
  const { module: moduleSlug, section: sectionSlugParam } = await params;
  const result = findSection(moduleSlug, sectionSlugParam);

  if (!result) {
    notFound();
  }

  const { module, section } = result;
  const topicIds = section.topics.map((topic) => topicSlug(topic));

  return (
    <div className="max-w-2xl">
      <ScrollSpy moduleSlug={module.slug} topicIds={topicIds} />
      <div className="text-xs uppercase tracking-wider text-gray-500">
        Module {module.number} · {module.title}
      </div>
      <h1 className="mt-2 text-3xl font-semibold">{section.title}</h1>
      <p className="mt-3 text-sm text-gray-500">
        Scroll through all {section.topics.length} topics in this section.
      </p>

      {section.topics.map((topic, i) => {
        const blocks = getTopicContent(module.slug, topicSlug(topic));
        return (
          <section
            key={topic}
            id={topicSlug(topic)}
            className={`scroll-mt-24 ${i > 0 ? "mt-16 border-t border-dashed border-white/15 pt-12" : "mt-10"}`}
          >
            <h2 className="text-2xl font-semibold">{topic}</h2>
            {blocks ? (
              <ContentBlocks blocks={blocks} />
            ) : (
              <div className="mt-6 inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                Coming soon
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
