import type { Block, Course } from "../lib/types.ts";

const heading = (block: Block) => block.kind === "h" ? block.text.map((segment) => segment.t).join("") : null;

function withoutPart(blocks: Block[], title: RegExp): Block[] {
  const start = blocks.findIndex((block) => title.test(heading(block) ?? ""));
  if (start < 0) return blocks;
  const end = blocks.findIndex((block, index) => index > start && heading(block) !== null);
  return [...blocks.slice(0, start), ...(end < 0 ? [] : blocks.slice(end))];
}

export function focusOnA2(course: Course): void {
  for (const unit of course.weeks) {
    const dropped = new Set(unit.sections.filter((s) => s.role === "pronunciation").flatMap((s) => s.blocks.flatMap((b) => b.kind === "item" ? [b.itemId] : [])));
    unit.items = Object.fromEntries(Object.entries(unit.items).filter(([id]) => !dropped.has(id)));
    unit.sections = unit.sections.filter((s) => s.role !== "pronunciation");
    unit.sections.forEach((section, index) => {
      section.title = section.title.replace(/^\d+\s+/, `${index + 1} `);
      if (section.role === "quiz") section.title = section.title.replace(/\s*\([^)]*\)\s*$/, "");
    });
  }
  const speaking = course.docs.find((doc) => doc.slug === "sprechen");
  if (speaking) {
    speaking.title = "Speaking";
    speaking.blocks = withoutPart(speaking.blocks, /pronunciation/i);
  }
}
