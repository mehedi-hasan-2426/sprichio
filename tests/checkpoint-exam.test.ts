import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import type { Course, Item } from "../src/lib/types.ts";
import { CHECKPOINT_EXAMS, commonFreeRows } from "../src/content/checkpoint-exams.ts";
import { passageText, wordCount } from "../src/content/exam-kit.ts";
import type { Question } from "../src/content/exam-kit.ts";
import { STAGES } from "../src/lib/weeks.ts";
import { gradeItem } from "../src/lib/grade.ts";

const course = JSON.parse(readFileSync(new URL("../content/generated/course.json", import.meta.url), "utf8")) as Course;
const ID = /^[a-z0-9-]{1,64}$/;
const flat = (s: string) => s.replace(/\s+/g, " ").trim();

test("each checkpoint covers exactly the four topics of its stage", () => {
  assert.equal(CHECKPOINT_EXAMS.length, 3);
  for (const stage of STAGES) {
    const exam = CHECKPOINT_EXAMS.find((e) => e.n === stage.checkpoint);
    assert.ok(exam, `checkpoint ${stage.checkpoint}`);
    assert.deepEqual(exam.topics, [...stage.topics]);
  }
});

test("reading follows the telc A2 skeleton: 5 a/b/c, 5 richtig/falsch, 8 ads for 5 situations with one x", () => {
  for (const exam of CHECKPOINT_EXAMS) {
    const [one, two, three] = exam.reading;
    assert.equal(exam.reading.length, 3);
    assert.equal(one?.questions.length, 5);
    assert.ok(one?.questions.every((q) => q.options?.length === 3), `cp${exam.n} Teil 1 options`);
    assert.equal(two?.questions.length, 5);
    assert.ok(two?.questions.every((q) => !q.options && (q.answer === "richtig" || q.answer === "falsch")), `cp${exam.n} Teil 2 richtig/falsch`);
    const answers = two?.questions.map((q) => q.answer) ?? [];
    assert.ok(answers.includes("richtig") && answers.includes("falsch"), `cp${exam.n} Teil 2 mixes richtig and falsch`);
    assert.equal(three?.passages.length, 8);
    assert.deepEqual(three?.passages.map((p) => p.title), ["a", "b", "c", "d", "e", "f", "g", "h"]);
    assert.equal(three?.questions.length, 5);
    for (const q of three?.questions ?? []) assert.deepEqual(q.options, ["a", "b", "c", "d", "e", "f", "g", "h", "x"]);
    const keys = three?.questions.map((q) => q.answer) ?? [];
    assert.equal(keys.filter((k) => k === "x").length, 1, `cp${exam.n} Teil 3 has exactly one x`);
    assert.equal(new Set(keys).size, keys.length, `cp${exam.n} Teil 3 answers are distinct`);
  }
});

test("every objective answer is backed by verbatim evidence and has one defensible key", () => {
  for (const exam of CHECKPOINT_EXAMS) {
    for (const [index, part] of exam.reading.entries()) {
      const whole = flat(part.passages.map(passageText).join(" "));
      for (const q of part.questions) {
        const where = `cp${exam.n} Teil ${index + 1}: ${q.prompt}`;
        assert.ok(q.why.trim().length > 20, `${where} explains the distractors`);
        if (q.answer === "x") {
          assert.ok(q.evidence.length > 0, where);
          continue;
        }
        const source = index === 2 ? flat(passageText(part.passages.find((p) => p.title === q.answer) ?? { title: "", paragraphs: [] })) : whole;
        assert.ok(source.includes(flat(q.evidence)), `${where}: evidence not found`);
        if (q.options) assert.ok(q.options.includes(q.answer) || ["a", "b", "c"].includes(q.answer), where);
      }
    }
  }
});

test("correct answers and statements are paraphrased, not copied from the text", () => {
  const check = (questions: Question[], text: string, label: string) => {
    for (const q of questions) {
      if (!q.options) assert.ok(!text.includes(flat(q.prompt)), `${label}: statement copied: ${q.prompt}`);
      const correct = q.options?.[["a", "b", "c", "d", "e", "f", "g", "h", "x"].indexOf(q.answer)];
      if (correct && correct.split(" ").length >= 4) assert.ok(!text.includes(flat(correct)), `${label}: answer copied: ${correct}`);
    }
  };
  for (const exam of CHECKPOINT_EXAMS) {
    for (const part of exam.reading) check(part.questions, flat(part.passages.map(passageText).join(" ")), `cp${exam.n}`);
  }
});

test("the main reading text is long A2 stretch practice and the whole reading part is substantial", () => {
  for (const exam of CHECKPOINT_EXAMS) {
    const words = exam.reading.map((part) => part.passages.reduce((sum, p) => sum + wordCount(passageText(p)), 0));
    assert.ok((words[1] ?? 0) >= 330, `cp${exam.n} Teil 2 has ${words[1]} words`);
    assert.ok(words.reduce((a, b) => a + b, 0) >= 800, `cp${exam.n} reading has ${words.reduce((a, b) => a + b, 0)} words`);
    assert.equal(exam.reading[1]?.stretch, true);
  }
});

test("vocabulary is taught in the checkpoint topics and appears in the texts", () => {
  for (const exam of CHECKPOINT_EXAMS) {
    const text = flat([...exam.reading.flatMap((part) => part.passages.map(passageText)), passageText(exam.form.source)].join(" "));
    for (const [term, topic, form] of exam.words) {
      assert.ok(topic <= Math.max(...exam.topics), `cp${exam.n}: ${term} comes from a later topic`);
      assert.ok(course.vocab.some((v) => v.term === term && v.week === topic), `cp${exam.n}: ${term} is not taught in topic ${topic}`);
      assert.ok(text.includes(form), `cp${exam.n}: "${form}" is not used in the texts`);
    }
    for (const topic of exam.topics) {
      assert.ok(exam.words.filter(([, t]) => t === topic).length >= 4, `cp${exam.n} uses at least four words from topic ${topic}`);
    }
  }
});

test("Schreiben Teil 1 is a form with five gaps that accept their own answers", () => {
  for (const exam of CHECKPOINT_EXAMS) {
    const gaps = exam.form.fields.filter((f) => f.answers);
    assert.equal(gaps.length, 5, `cp${exam.n}`);
    const source = flat(passageText(exam.form.source));
    for (const field of gaps) {
      assert.ok(field.evidence && source.includes(flat(field.evidence)), `cp${exam.n} ${field.label}: evidence`);
      assert.ok((field.answers?.length ?? 0) > 0);
    }
  }
});

test("Schreiben Teil 2 offers four points, the model covers three of them in about 40 words", () => {
  for (const exam of CHECKPOINT_EXAMS) {
    assert.equal(exam.letter.points.length, 4);
    assert.equal(new Set(exam.letter.covers).size, 3);
    assert.ok(exam.letter.covers.every((k) => k >= 0 && k < 4));
    const words = wordCount(exam.letter.model);
    assert.ok(words >= 35 && words <= 60, `cp${exam.n} model has ${words} words`);
    assert.ok(exam.letter.min <= words && words <= exam.letter.max + 10);
  }
});

test("Sprechen has three telc parts and the planning task has exactly one shared free slot", () => {
  for (const exam of CHECKPOINT_EXAMS) {
    assert.equal(exam.speaking.length, 3);
    const [intro, talk, plan] = exam.speaking;
    assert.ok((intro?.cards.length ?? 0) >= 6);
    assert.equal(talk?.cards.length, 4);
    assert.ok(plan?.table, `cp${exam.n} Teil 3 table`);
    const free = commonFreeRows(plan?.table?.rows ?? []);
    assert.equal(free.length, 1, `cp${exam.n} shared slots: ${free.join(", ")}`);
    assert.ok(plan?.model?.some((line) => line.includes(free[0] ?? "?")), `cp${exam.n} model names the shared slot`);
  }
});

test("generated checkpoints carry the exam with valid, unique and new progress IDs", () => {
  const weekIds = new Set(course.weeks.flatMap((w) => Object.keys(w.items)));
  const seen = new Set<string>();
  assert.equal(course.checkpoints.length, 3);
  for (const cp of course.checkpoints) {
    const exam = cp.exam;
    assert.ok(exam, `cp${cp.n} exam`);
    const ids = [...exam.reading.flatMap((p) => p.itemIds), ...exam.form.fields.flatMap((f) => (f.itemId ? [f.itemId] : []))];
    assert.equal(ids.length, 20);
    for (const id of [...ids, exam.letter.task.id, exam.speakingKey]) {
      assert.match(id, ID);
      assert.ok(!seen.has(id) && !weekIds.has(id), id);
      seen.add(id);
    }
    assert.notEqual(exam.letter.task.id, `cp${cp.n}-wr-1`);
    assert.notEqual(exam.speakingKey, `cp${cp.n}`);
    for (const id of ids) {
      const item = cp.items?.[id] as Item | undefined;
      assert.ok(item, id);
      if (item.kind === "choice") assert.ok(item.options?.some((o) => o.key === item.correct), id);
      if (item.kind === "text") assert.ok(gradeItem(item, [item.answers[0]?.join(" ") ?? ""]).ok, `${id} rejects its own answer`);
    }
  }
});
