import { test } from "node:test";
import assert from "node:assert/strict";
import { createGrammarTopics } from "../src/content/grammar.ts";
import { parseMarks } from "../src/lib/marks.ts";
import { gradeItem } from "../src/lib/grade.ts";
import { emptyProgress, parseImport, recordAnswer } from "../src/lib/progress.ts";
import { step } from "../src/lib/grade.ts";

const topics = createGrammarTopics();
const plain = (text: string) => parseMarks(text).map((part) => part.t).join("");

const rank = { easy: 0, medium: 1, hard: 2 } as const;
const bySlug = (slug: string) => {
  const topic = topics.find((entry) => entry.slug === slug);
  assert.ok(topic, slug);
  return topic;
};

test("grammar catalogue has all requested topics and original graded practice", () => {
  assert.equal(topics.length, 35);
  assert.equal(topics.reduce((sum, topic) => sum + topic.items.length, 0), 525);
  const ids = topics.flatMap((topic) => topic.items.map((item) => item.id));
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.every((id) => /^[a-z0-9-]{1,64}$/.test(id)));
  const prompts = topics.flatMap((topic) => topic.items.map((item) => item.prompt));
  assert.equal(new Set(prompts).size, prompts.length, "duplicate grammar prompt");
  for (const topic of topics) {
    for (const level of ["easy", "medium", "hard"]) assert.equal(topic.items.filter((item) => item.difficulty === level).length, 5, `${topic.slug} ${level}`);
    assert.ok(topic.rule.length > 50);
    if (topic.group === "Passive voice" || topic.slug === "verbs/lassen") assert.equal(topic.level, "Extension");
    const order = topic.items.map((item) => rank[item.difficulty ?? "hard"]);
    assert.deepEqual(order, [...order].sort((a, b) => a - b), `${topic.slug} is not ordered easy to hard`);
    assert.deepEqual(topic.items.map((item) => item.n), topic.items.map((_, index) => index + 1));
  }
});

test("existing exercise ids keep their prompts so saved progress stays valid", () => {
  const item = (slug: string, id: string) => bySlug(slug).items.find((entry) => entry.id === id);
  assert.equal(item("cases/dative", "gr-cases-dative-1")?.prompt, "Ich fahre mit ___ Bus zur Arbeit.");
  assert.equal(item("cases/dative", "gr-cases-dative-9")?.prompt, "Schreiben Sie richtig: Das Fahrrad gehört / meine Schwester.");
  assert.equal(item("cases/dative", "gr-cases-dative-9")?.difficulty, "hard");
  assert.equal(item("requests/polite-advice", "gr-requests-polite-advice-4")?.difficulty, "medium");
  assert.equal(item("cases/dative", "gr-cases-dative-10")?.difficulty, "easy");
  const pronoun = item("cases/dative-pronouns", "gr-cases-dative-pronouns-9");
  assert.ok(pronoun && gradeItem(pronoun, ["Es schmeckt ihm."]).ok && gradeItem(pronoun, ["Das Essen schmeckt ihm."]).ok);
  assert.ok(pronoun && !gradeItem(pronoun, ["Es schmeckt ihn."]).ok);
});

test("every topic teaches with examples, a visual and common mistakes", () => {
  for (const topic of topics) {
    const lesson = topic.lesson;
    assert.ok(lesson, `${topic.slug} has no lesson`);
    assert.ok(lesson.visuals.length >= 1, `${topic.slug} visuals`);
    assert.ok(lesson.points.length >= 2, `${topic.slug} points`);
    assert.ok(lesson.traps.length >= 2, `${topic.slug} traps`);
    const examples = lesson.points.flatMap((point) => point.examples);
    assert.ok(examples.length >= 6, `${topic.slug} has only ${examples.length} examples`);
    for (const [de, en] of examples) {
      assert.ok(de.trim() && en.trim(), `${topic.slug} example without translation`);
      assert.notEqual(plain(de), en, `${topic.slug} translation repeats the German`);
    }
    for (const visual of lesson.visuals) {
      if (visual.kind === "table") assert.ok(visual.rows.every((row) => row.length === visual.head.length), `${topic.slug} table ${visual.title}`);
    }
  }
});

test("case markup is well formed in every lesson string", () => {
  const strings = topics.flatMap((topic) => {
    const lesson = topic.lesson;
    if (!lesson) return [];
    return [
      ...lesson.points.flatMap((point) => [point.text, ...point.examples.flat()]),
      ...lesson.traps.flat(),
      ...lesson.visuals.flatMap((visual) => visual.kind === "table" ? [...visual.head, ...visual.rows.flat()] : visual.kind === "steps" ? visual.steps.flat() : visual.spots.flat()),
      lesson.hook ?? "",
    ];
  });
  for (const text of strings) {
    const left = plain(text);
    assert.ok(!/[{}*]/.test(left), `stray markup in: ${text}`);
  }
  assert.deepEqual(parseMarks("mit {D:dem} Bus und *ab*"), [{ t: "mit " }, { t: "dem", mark: "D" }, { t: " Bus und " }, { t: "ab", mark: "hl" }]);
});

test("prepositions are taught in depth with a where and where-to scene", () => {
  const group = topics.filter((topic) => topic.group === "Prepositions");
  assert.deepEqual(group.map((topic) => topic.slug), [
    "prepositions/accusative", "prepositions/dative", "prepositions/two-way", "prepositions/position-verbs",
    "prepositions/places", "prepositions/time", "prepositions/verbs",
  ]);
  const scene = bySlug("prepositions/two-way").lesson?.visuals.find((visual) => visual.kind === "scene");
  assert.ok(scene && scene.kind === "scene");
  assert.deepEqual(scene.spots.map(([preposition]) => preposition), ["an", "auf", "hinter", "in", "neben", "über", "unter", "vor", "zwischen"]);
  for (const [preposition, where, whereTo] of scene.spots) {
    assert.ok(where.includes("{D:") && !where.includes("{A:"), `${preposition} wo must be dative`);
    assert.ok(whereTo.includes("{A:") && !whereTo.includes("{D:"), `${preposition} wohin must be accusative`);
  }
  assert.ok(group.every((topic) => topic.source === null && topic.items.every((item) => item.tag === "PR")));
});

test("all grammar answer keys grade correctly and choices have one model option", () => {
  for (const topic of topics) {
    for (const item of topic.items) {
      if (item.kind === "choice") {
        const answer = item.options?.find((option) => option.key === item.correct);
        assert.equal(answer?.label, item.display, item.id);
        assert.ok(gradeItem(item, [item.correct ?? ""]).ok, item.id);
      } else {
        assert.ok(gradeItem(item, item.answers[0] ?? []).ok, `${item.id} rejects ${item.display}`);
        for (const answer of item.answers) assert.ok(gradeItem(item, item.blanks > 1 ? answer : [answer.join(" ")]).ok, `${item.id} rejects ${answer.join(" ")}`);
      }
    }
  }
});

test("source links match the 25 requested grammar subjects without shipping book assets", () => {
  const linked = topics.filter((topic) => topic.source !== null);
  assert.equal(linked.length, 25);
  assert.ok(linked.every((topic) => topic.source === `https://studygerman.io/exercises/grammar/${topic.slug}`));
  assert.ok(topics.some((topic) => topic.slug === "cases/dative-pronouns"));
  assert.ok(topics.some((topic) => topic.slug === "sentence-structure/dass-das"));
  assert.ok(topics.some((topic) => topic.slug === "conjunctions/als-wenn-wann"));
});

test("grammar completion uses the existing import and account-sync progress schema", () => {
  const item = topics[0]?.items[0];
  assert.ok(item);
  const initial = { status: "new" as const, attempts: 0, firstTry: null };
  const next = step(initial, true);
  const progress = recordAnswer(emptyProgress(), item.id, initial, next, item.tag, 1, [item.correct ?? ""]);
  const restored = parseImport(JSON.stringify(progress));
  assert.equal(restored.items[item.id]?.status, "solved");
  assert.deepEqual(restored.items[item.id]?.inputs, [item.correct]);
});