import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import type { Course } from "../src/lib/types.ts";
import { READINGS } from "../src/content/reading.ts";
import { PRACTICE_MESSAGES } from "../src/content/enrichment.ts";
import { passageText, wordCount } from "../src/content/exam-kit.ts";

const course = JSON.parse(readFileSync(new URL("../content/generated/course.json", import.meta.url), "utf8")) as Course;
const flat = (s: string) => s.replace(/\s+/g, " ").trim();
const LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h"];

test("every topic has one longer reading with objective questions", () => {
  assert.deepEqual(READINGS.map((r) => r.week), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  for (const reading of READINGS) {
    const words = reading.parts.reduce((sum, part) => sum + part.passages.reduce((s, p) => s + wordCount(passageText(p)), 0), 0);
    assert.ok(words >= 200, `w${reading.week} has only ${words} words`);
    const questions = reading.parts.flatMap((part) => part.questions);
    assert.equal(questions.length, reading.week === 12 ? 6 : 5, `w${reading.week}`);
    for (const q of questions) {
      if (q.options) {
        assert.ok(q.options.length >= 3, `w${reading.week}: ${q.prompt}`);
        assert.ok(LETTERS.slice(0, q.options.length).includes(q.answer), `w${reading.week}: ${q.prompt}`);
      } else {
        assert.ok(q.answer === "richtig" || q.answer === "falsch", `w${reading.week}: ${q.prompt}`);
      }
    }
  }
});

test("reading answers have verbatim evidence and paraphrased keys", () => {
  for (const reading of READINGS) {
    for (const part of reading.parts) {
      const text = flat(part.passages.map(passageText).join(" "));
      for (const q of part.questions) {
        const where = `w${reading.week}: ${q.prompt}`;
        assert.ok(text.includes(flat(q.evidence)), `${where}: evidence not found`);
        assert.ok(q.why.trim().length > 20, `${where}: explain the distractors`);
        if (!q.options) assert.ok(!text.includes(flat(q.prompt)), `${where}: statement copied`);
        const correct = q.options?.[LETTERS.indexOf(q.answer)];
        if (correct && correct.split(" ").length >= 4) assert.ok(!text.includes(flat(correct)), `${where}: answer copied`);
      }
    }
  }
});

test("reading vocabulary was taught in that topic or earlier", () => {
  for (const reading of READINGS) {
    const text = flat(reading.parts.flatMap((part) => part.passages.map(passageText)).join(" "));
    for (const [term, topic, form] of reading.words) {
      assert.ok(topic <= reading.week, `w${reading.week}: ${term} is from topic ${topic}`);
      assert.ok(course.vocab.some((v) => v.term === term && v.week === topic), `w${reading.week}: ${term} is not taught in topic ${topic}`);
      assert.ok(text.includes(form), `w${reading.week}: "${form}" not in text`);
    }
    assert.ok(reading.words.filter(([, topic]) => topic === reading.week).length >= 5, `w${reading.week} uses at least five words of its own topic`);
    assert.ok(reading.grammar.every(([, topic]) => topic <= reading.week), `w${reading.week} grammar`);
  }
});

test("generated reading sections use versioned item IDs and contain the new texts", () => {
  for (const reading of READINGS) {
    const unit = course.weeks[reading.week - 1];
    assert.ok(unit);
    const section = unit.sections.find((s) => s.role === "reading");
    assert.ok(section);
    const core = section.blocks.flatMap((b) => (b.kind === "item" && !unit.items[b.itemId]?.difficulty ? [b.itemId] : []));
    assert.deepEqual(core, reading.parts.flatMap((p) => p.questions).map((_, k) => `w${reading.week}-lesen-v2-${k + 1}`));
    assert.ok(!Object.keys(unit.items).some((id) => /^w\d+-lesen-\d+$/.test(id)), `w${reading.week} keeps an old reading ID`);
    const quoted = flat(section.blocks.flatMap((b) => (b.kind === "quote" ? b.lines.map((l) => l.map((s) => s.t).join("")) : [])).join(" "));
    for (const part of reading.parts) for (const p of part.passages) assert.ok(quoted.includes(flat(p.paragraphs[0] ?? "")), `w${reading.week} shows ${p.title}`);
  }
});

test("the extra message in every reading section is longer", () => {
  assert.equal(PRACTICE_MESSAGES.length, 12);
  for (const [k, message] of PRACTICE_MESSAGES.entries()) assert.ok(wordCount(message) >= 90, `w${k + 1} message has ${wordCount(message)} words`);
});
