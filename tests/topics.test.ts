import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import type { Course } from "../src/lib/types.ts";
import { parseMarks } from "../src/lib/marks.ts";

const course = JSON.parse(readFileSync(new URL("../content/generated/course.json", import.meta.url), "utf8")) as Course;
const plain = (text: string) => parseMarks(text).map((part) => part.t).join("");
const slugs = new Set((course.grammar ?? []).map((topic) => topic.slug));

test("every topic's grammar section has a full lesson with translated examples", () => {
  for (const unit of course.weeks) {
    const lesson = unit.grammarLesson;
    assert.ok(lesson, `${unit.id} has no grammar lesson`);
    const examples = lesson.points.flatMap((point) => point.examples);
    assert.ok(examples.length >= 8, `${unit.id} has only ${examples.length} examples`);
    assert.ok(lesson.traps.length >= 3, `${unit.id} traps`);
    assert.ok(lesson.visuals.length >= 1, `${unit.id} visuals`);
    for (const [de, en] of examples) assert.ok(de.trim() && en.trim() && plain(de) !== en, `${unit.id}: ${de}`);
    const strings = [...lesson.points.flatMap((p) => [p.text, ...p.examples.flat()]), ...lesson.traps.flat(), lesson.hook ?? "",
      ...lesson.visuals.flatMap((v) => v.kind === "table" ? [...v.head, ...v.rows.flat()] : v.kind === "steps" ? v.steps.flat() : v.spots.flat())];
    for (const text of strings) assert.ok(!/[{}*]/.test(plain(text)), `${unit.id} stray markup: ${text}`);
    assert.ok(unit.grammarLinks?.length && unit.grammarLinks.every((link) => slugs.has(link.slug)), `${unit.id} links`);
  }
});

test("every topic review has at least 40 mixed questions with one right option each", () => {
  for (const unit of course.weeks) {
    const quiz = unit.sections.find((s) => s.role === "quiz");
    assert.ok(quiz, unit.id);
    const items = quiz.blocks.flatMap((b) => {
      const item = b.kind === "item" ? unit.items[b.itemId] : undefined;
      return item ? [item] : [];
    });
    assert.ok(items.length >= 40, `${unit.id} review has ${items.length} questions`);
    const choices = items.filter((item) => item.kind === "choice");
    assert.ok(choices.filter((item) => item.display === "richtig" || item.display === "falsch").length >= 10, `${unit.id} richtig/falsch`);
    assert.ok(choices.filter((item) => item.tag === "GE").length >= 5, `${unit.id} articles`);
    for (const item of choices) {
      const labels = item.options?.map((o) => o.label) ?? [];
      assert.equal(new Set(labels).size, labels.length, item.id);
      assert.equal(item.options?.find((o) => o.key === item.correct)?.label, item.display, item.id);
    }
    assert.deepEqual(items.map((item) => item.n), items.map((_, k) => k + 1), `${unit.id} numbering`);
  }
});
