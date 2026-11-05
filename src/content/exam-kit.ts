import type { ExamPassage, Item } from "../lib/types.ts";

export type WordRef = [term: string, topic: number, form: string];

export interface Question {
  prompt: string;
  options?: string[];
  answer: string;
  evidence: string;
  why: string;
}

export interface AuthorPart {
  title: string;
  instruction: string;
  instructionEn: string;
  passages: ExamPassage[];
  questions: Question[];
  stretch?: boolean;
}

export const LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h", "x"];
const TRUE_FALSE = [{ key: "richtig", label: "richtig" }, { key: "falsch", label: "falsch" }];

export function passageText(passage: ExamPassage): string {
  return passage.paragraphs.join(" ");
}

export function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export function choiceItem(id: string, n: number, group: string, q: Question): Item {
  const options = q.options ? q.options.map((label, k) => ({ key: LETTERS[k] ?? String(k), label })) : TRUE_FALSE;
  const label = options.find((o) => o.key === q.answer)?.label ?? q.answer;
  return {
    id, n, group, prompt: q.prompt, kind: "choice", blanks: 0, capStart: true, options, correct: q.answer, answers: [],
    display: label, tag: "WS",
    hint: "Read the matching part of the text again. The text usually says it with other words.",
    rule: `Text: „${q.evidence}“ ${q.why}`,
  };
}
