import type { Block, Category, Course, Item, Unit, VocabEntry } from "../lib/types.ts";
import { parseMarks } from "../lib/marks.ts";
import { TOPIC_GRAMMAR } from "./topic-grammar.ts";

type Choice = [prompt: string, answer: string, options: string[]];

const GRAMMAR_ROUND: Record<string, Choice[]> = {
  w1: [
    ["Um 7 Uhr ___ ich auf.", "stehe", ["stehe", "aufstehe", "stehst"]],
    ["Wann ___ der Kurs an?", "fängt", ["fängt", "anfängt", "fangt"]],
    ["Mein Bruder ___ jeden Tag die Zeitung.", "liest", ["liest", "lest", "lesen"]],
    ["___ du am Wochenende Zeit?", "Hast", ["Hast", "Hat", "Habt"]],
    ["Ich muss morgen früh ___.", "aufstehen", ["aufstehen", "stehe auf", "auf stehen"]],
    ["Which sentence is correct?", "Am Abend sehe ich fern.", ["Am Abend sehe ich fern.", "Am Abend ich sehe fern.", "Am Abend fernsehe ich."]],
  ],
  w2: [
    ["Ich kaufe ___ Kuchen.", "einen", ["ein", "einen", "einem"]],
    ["Wir haben ___ Milch mehr.", "keine", ["keine", "nicht", "kein"]],
    ["Ich esse den Fisch ___.", "nicht", ["nicht", "kein", "keinen"]],
    ["Ich möchte ein Kilo Äpfel ___.", "kaufen", ["kaufen", "kaufe", "gekauft"]],
    ["Hast du ___ Einkaufszettel?", "deinen", ["dein", "deinen", "deine"]],
    ["Which sentence is polite?", "Ich hätte gern ein Brot.", ["Ich hätte gern ein Brot.", "Ich will ein Brot.", "Gib mir ein Brot."]],
  ],
  w3: [
    ["Ich wohne bei ___ Eltern.", "meinen", ["meine", "meinen", "meiner"]],
    ["Die Wohnung gefällt ___.", "mir", ["mich", "mir", "ich"]],
    ["Ich helfe ___ Nachbarin.", "der", ["die", "der", "den"]],
    ["Wir fahren mit ___ Bus.", "dem", ["den", "dem", "der"]],
    ["Wem gehört das Fahrrad? ___ Hausmeister.", "Dem", ["Der", "Den", "Dem"]],
    ["Seit ___ Jahr wohne ich hier.", "einem", ["ein", "einen", "einem"]],
  ],
  w4: [
    ["Wir ___ an den See gefahren.", "sind", ["haben", "sind", "ist"]],
    ["Ich ___ lange geschlafen.", "habe", ["habe", "bin", "hat"]],
    ["Hast du das Buch schon ___?", "gelesen", ["gelest", "gelesen", "lesen"]],
    ["Am Samstag ___ das Wetter super.", "war", ["war", "ist gewesen", "hat"]],
    ["Wann bist du ___?", "aufgestanden", ["aufgestanden", "aufgestehen", "geaufstanden"]],
    ["Wir ___ viel Spaß.", "hatten", ["hatten", "waren", "hattet"]],
  ],
  w5: [
    ["___ die Tabletten nach dem Essen! (du)", "Nimm", ["Nimm", "Nimmst", "Nehmt"]],
    ["Mir ___ die Füße weh.", "tun", ["tut", "tun", "tust"]],
    ["Der Arzt sagt, ich ___ im Bett bleiben.", "soll", ["soll", "sollst", "sollen"]],
    ["___ Sie bitte den Mund auf.", "Machen", ["Machen", "Macht", "Mach"]],
    ["___ tut der Kopf weh. (ich)", "Mir", ["Ich", "Mich", "Mir"]],
    ["Wo tut es ___ weh? (Sie)", "Ihnen", ["Sie", "Ihnen", "Ihr"]],
  ],
  w6: [
    ["Ich gehe in ___ Supermarkt.", "den", ["dem", "den", "der"]],
    ["Wir treffen uns vor ___ Kino.", "dem", ["das", "dem", "den"]],
    ["Wie komme ich ___ Bahnhof?", "zum", ["zum", "nach", "zur"]],
    ["Das Fahrrad ___ vor der Tür.", "steht", ["stellt", "steht", "legt"]],
    ["Ich ___ das Fahrrad vor die Tür.", "stelle", ["stelle", "stehe", "liege"]],
    ["Die Apotheke ist neben ___ Post.", "der", ["die", "der", "den"]],
  ],
  w7: [
    ["Ich bin müde, weil ich viel gearbeitet ___.", "habe", ["habe", "bin", "hat"]],
    ["Es regnet, deshalb ___ ich den Bus.", "nehme", ["nehme", "ich nehme", "nehmen"]],
    ["Ich komme nicht, denn ich ___ krank.", "bin", ["bin", "sein", "ist"]],
    ["Sie hat Informatik ___.", "studiert", ["studiert", "gestudiert", "studieren"]],
    ["Er sucht einen neuen Job, ___ er mehr Geld verdienen möchte.", "weil", ["weil", "denn", "deshalb"]],
    ["Ich arbeite viel, ___ habe ich wenig Freizeit.", "deshalb", ["deshalb", "weil", "denn"]],
  ],
  w8: [
    ["Die Jacke ist billiger ___ der Mantel.", "als", ["als", "wie", "so"]],
    ["Ich suche einen ___ Pullover.", "warmen", ["warmer", "warmen", "warme"]],
    ["Das Hemd ist so teuer ___ die Hose.", "wie", ["als", "wie", "dann"]],
    ["Welche Schuhe gefallen dir am ___?", "besten", ["besten", "gutesten", "bester"]],
    ["Ich schenke ___ Schwester einen Schal.", "meiner", ["meine", "meinen", "meiner"]],
    ["Der Pullover passt ___ nicht.", "mir", ["mich", "mir", "ich"]],
  ],
  w9: [
    ["Ich finde, dass der Film toll ___.", "war", ["war", "waren", "sein"]],
    ["Wenn es regnet, ___ wir ins Museum.", "gehen", ["gehen", "wir gehen", "gehst"]],
    ["Ich freue ___ auf die Party.", "mich", ["mich", "mir", "sich"]],
    ["Wir treffen ___ um acht.", "uns", ["uns", "euch", "sich"]],
    ["Ich hoffe, ___ du kommst.", "dass", ["dass", "das", "wenn"]],
    ["Danke für die Einladung, ich komme ___!", "gern", ["gern", "gut", "viel"]],
  ],
  w10: [
    ["Wir ___ zwei Stunden warten.", "mussten", ["mussten", "musste", "musstet"]],
    ["Ich ___ keinen Platz finden.", "konnte", ["konnte", "konntest", "konnten"]],
    ["Ich warte ___ einer Stunde.", "seit", ["seit", "vor", "für"]],
    ["Ich war ___ zwei Jahren in Wien.", "vor", ["vor", "seit", "in"]],
    ["Der Zug fährt ___ 14:30 Uhr ab.", "um", ["um", "am", "im"]],
    ["Halb drei is ...", "2:30", ["2:30", "3:30", "3:00"]],
  ],
  w11: [
    ["___ Sie mir bitte helfen?", "Könnten", ["Könnten", "Könntest", "Könnt"]],
    ["Ich ___ gern einen Termin.", "hätte", ["hätte", "hatte", "habe"]],
    ["Können Sie mir sagen, wo das Bürgeramt ___?", "ist", ["ist", "sind", "sein"]],
    ["Wissen Sie, ___ die Bank heute offen hat?", "ob", ["ob", "wenn", "denn"]],
    ["Ich möchte wissen, wann die Post ___.", "aufmacht", ["aufmacht", "macht auf", "auf macht"]],
    ["___ Sie mir das Formular erklären?", "Würden", ["Würden", "Wurden", "Würdest"]],
  ],
  w12: [
    ["Gestern ___ ich lange gearbeitet.", "habe", ["habe", "bin", "war"]],
    ["Ich gehe mit ___ Kollegin in den Park.", "meiner", ["meine", "meiner", "meinen"]],
    ["Das Geschenk ist für ___ Bruder.", "meinen", ["meinem", "meinen", "mein"]],
    ["Ich bleibe zu Hause, weil ich krank ___.", "bin", ["bin", "sein", "ist"]],
    ["Wir ___ nach Italien geflogen.", "sind", ["sind", "haben", "hat"]],
    ["Morgen ___ ich nach Berlin.", "fahre", ["fahre", "ich fahre", "fahren"]],
  ],
};

const GRAMMATICAL_ANYWAY = new Set(["Ich will einen Kaffee.", "Ich könnte nicht kommen.", "Ich gehe im Park."]);
const KEYS = ["a", "b", "c", "d"];
const plain = (text: string) => parseMarks(text).map((part) => part.t).join("");

function seed(text: string): number {
  let value = 2166136261;
  for (const char of text) value = Math.imul(value ^ char.charCodeAt(0), 16777619) >>> 0;
  return value;
}

function shuffled<T>(values: T[], key: string): T[] {
  const result = [...values];
  let state = seed(key);
  for (let index = result.length - 1; index > 0; index--) {
    state = Math.imul(state ^ (state >>> 15), 2246822507) >>> 0;
    const other = state % (index + 1);
    [result[index], result[other]] = [result[other] as T, result[index] as T];
  }
  return result;
}

function pick<T>(values: T[], count: number, key: string): T[] {
  return shuffled(values, key).slice(0, count);
}

interface Quiz {
  unit: Unit;
  blocks: Block[];
  next: number;
  n: number;
}

function add(quiz: Quiz, prompt: string, answer: string, options: string[], tag: Category, hint: string, rule: string, order = true): void {
  const id = `${quiz.unit.id}-review-${quiz.next++}`;
  const labels = order ? shuffled(options, id) : options;
  if (new Set(labels).size !== labels.length || !labels.includes(answer)) throw new Error(`Invalid review options for ${id}`);
  const item: Item = {
    id, n: quiz.n++, group: "Review", prompt, kind: "choice", blanks: 0, capStart: false,
    options: labels.map((label, index) => ({ key: KEYS[index] ?? String(index), label })),
    correct: KEYS[labels.indexOf(answer)], answers: [[answer]], display: answer, tag, hint, rule,
  };
  quiz.unit.items[id] = item;
  quiz.blocks.push({ kind: "item", itemId: id });
}

const round = (quiz: Quiz, title: string, text: string) => quiz.blocks.push({ kind: "h", text: [{ t: title }] }, { kind: "p", text: [{ t: text }] });
const norm = (text: string) => text.toLowerCase().replace(/^(to|the|a|an) /, "").trim();

function distinctMeanings(words: VocabEntry[]): VocabEntry[] {
  const seen = new Set<string>();
  return words.filter((word) => {
    const key = norm(word.meaning ?? "");
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function vocabularyRounds(quiz: Quiz, pool: VocabEntry[]): void {
  const words = distinctMeanings(pool);
  const meaning = (word: VocabEntry) => word.meaning ?? "";
  round(quiz, "Round 1: What does it mean?", "Pick the English meaning. Quick, no peeking.");
  for (const word of pick(words, 8, `${quiz.unit.id}-r1`)) {
    const others = pick(words.filter((other) => other !== word), 3, `${word.id}-r1`).map(meaning);
    add(quiz, `What does **${word.term}** mean?`, meaning(word), [meaning(word), ...others], "WS", "Think of the example sentence from the vocabulary list.", `${word.term}: ${meaning(word)}`);
  }

  const nouns = words.filter((word) => word.article && word.noun && word.plural && word.plural !== word.noun);
  round(quiz, "Round 2: der, die or das?", "Each noun has one article. Say it aloud with the article before you tap.");
  for (const word of pick(nouns, 6, `${quiz.unit.id}-r2`)) {
    add(quiz, `___ **${word.noun}** (${meaning(word)})`, word.article ?? "", ["der", "die", "das"], "GE", "Learn every noun together with its article.", word.term, false);
  }

  const cloze = nouns.filter((word) => new RegExp(`(?<![\\p{L}])${word.noun}(?![\\p{L}])`, "u").test(word.example) && word.exampleEn);
  round(quiz, "Round 3: Which word fits?", "The English sentence tells you which word is missing.");
  for (const word of pick(cloze, 6, `${quiz.unit.id}-r3`)) {
    const others = pick(nouns.filter((other) => other !== word && other.noun !== word.noun), 2, `${word.id}-r3`).map((other) => other.noun ?? "");
    const prompt = `${word.example.replace(new RegExp(`(?<![\\p{L}])${word.noun}(?![\\p{L}])`, "u"), "___")} *(${word.exampleEn})*`;
    add(quiz, prompt, word.noun ?? "", [word.noun ?? "", ...others], "WS", "Read the English sentence, then find the German noun.", `${word.term}: ${meaning(word)}`);
  }

  round(quiz, "Round 4: Richtig oder falsch? Words", "Does the German word match the English meaning?");
  pick(words, 6, `${quiz.unit.id}-r4`).forEach((word, index) => {
    const truth = index % 2 === 0;
    const shown = truth ? meaning(word) : meaning(pick(words.filter((other) => other !== word), 1, `${word.id}-r4`)[0] ?? word);
    add(quiz, `**${word.term}** = ${shown}`, truth ? "richtig" : "falsch", ["richtig", "falsch"], "WS", "Picture the word in its example sentence.", `${word.term}: ${meaning(word)}`, false);
  });
}

function grammarRounds(quiz: Quiz): void {
  const traps = (TOPIC_GRAMMAR[quiz.unit.id]?.lesson.traps ?? []).filter(([wrong]) => !GRAMMATICAL_ANYWAY.has(wrong));
  round(quiz, "Round 5: Richtig oder falsch? Grammar", "Each sentence is either correct German or a typical mistake.");
  traps.forEach(([wrong, right, why], index) => {
    const pair: [string, string][] = [[plain(wrong), "falsch"], [plain(right), "richtig"]];
    for (const [sentence, answer] of index % 2 ? pair.reverse() : pair) {
      add(quiz, `*${sentence}*`, answer, ["richtig", "falsch"], "VP", "Check the verb position, the case and the verb form.", why, false);
    }
  });
  round(quiz, "Round 6: Grammar", "One answer fits. The rest are the mistakes learners make most.");
  for (const [prompt, answer, options] of GRAMMAR_ROUND[quiz.unit.id] ?? []) {
    add(quiz, prompt, answer, options, "VF", "Look at the words around the gap.", `Correct: ${answer}`);
  }
}

export function addReviewRounds(course: Course): void {
  course.weeks.forEach((unit, index) => {
    const section = unit.sections.find((s) => s.role === "quiz");
    if (!section) throw new Error(`Missing review quiz in ${unit.id}`);
    const warmUp = section.blocks.filter((block) => block.kind === "item").length;
    const quiz: Quiz = { unit, blocks: [], next: 1, n: warmUp + 1 };
    const pool = index === course.weeks.length - 1 ? course.vocab : course.vocab.filter((entry) => entry.week === index + 1);
    vocabularyRounds(quiz, pool);
    grammarRounds(quiz);
    section.blocks = [
      { kind: "h", text: [{ t: "Warm-up" }] },
      { kind: "p", text: [{ t: `${quiz.n - 1} questions in seven rounds, all from this topic. Try to get as many as you can right on the first try.` }] },
      ...section.blocks,
      ...quiz.blocks,
    ];
  });
}
