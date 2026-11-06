export type Category = "VP" | "KA" | "GE" | "PL" | "VF" | "PR" | "WS" | "AU" | "RS" | "HÖ";

export interface Inline {
  t: string;
  b?: boolean;
  i?: boolean;
  href?: string;
}

export type Block =
  | { kind: "h"; text: Inline[] }
  | { kind: "p"; text: Inline[] }
  | { kind: "list"; items: Inline[][]; checks?: boolean }
  | { kind: "table"; header: Inline[][]; rows: Inline[][][]; variant?: "vocabulary" }
  | { kind: "quote"; lines: Inline[][] }
  | { kind: "code"; text: string }
  | { kind: "item"; itemId: string };

export type ItemKind = "text" | "choice" | "open";

export interface Item {
  id: string;
  n: number;
  group: string;
  prompt: string;
  kind: ItemKind;
  blanks: number;
  capStart: boolean;
  options?: { key: string; label: string }[];
  correct?: string;
  answers: string[][];
  display: string;
  tag: Category;
  hint: string;
  rule: string;
  difficulty?: "easy" | "medium" | "hard";
}

export interface Section {
  id: string;
  title: string;
  role: SectionRole;
  blocks: Block[];
}

export type SectionRole =
  | "vocab"
  | "grammar"
  | "exercises"
  | "retrieval"
  | "reading"
  | "listening"
  | "speaking"
  | "pronunciation"
  | "writing"
  | "quiz"
  | "other";

export interface ScriptLine {
  speaker: string;
  text: string;
}

export interface ScriptPart {
  title: string;
  lines: ScriptLine[];
}

export interface WritingTask {
  id: string;
  prompt: Inline[];
  min: number;
  max: number;
  model: string;
}

export interface VocabEntry {
  id: string;
  week: number;
  term: string;
  forms: string;
  example: string;
  meaning?: string;
  exampleEn?: string;
  article?: "der" | "die" | "das";
  noun?: string;
  plural?: string;
}

export interface Unit {
  id: string;
  title: string;
  intro: Block[];
  sections: Section[];
  items: Record<string, Item>;
  script: ScriptPart[];
  writing: WritingTask[];
  notes: Record<string, Block[]>;
  shortDay: Inline[];
}

export interface ExamPassage {
  title: string;
  paragraphs: string[];
}

export interface ExamReadingPart {
  title: string;
  instruction: string;
  instructionEn: string;
  passages: ExamPassage[];
  itemIds: string[];
  stretch?: boolean;
}

export interface ExamSpeakingPart {
  title: string;
  instruction: string;
  instructionEn: string;
  cards: string[];
  table?: { header: string[]; rows: string[][] };
  model?: string[];
}

export interface CheckpointExam {
  topics: number[];
  reading: ExamReadingPart[];
  form: {
    title: string;
    instruction: string;
    instructionEn: string;
    source: ExamPassage;
    fields: { label: string; value?: string; itemId?: string }[];
  };
  letter: { task: WritingTask; points: string[]; instructionEn: string };
  speaking: ExamSpeakingPart[];
  speakingKey: string;
}

export interface Checkpoint {
  n: number;
  week: number;
  canDo: string[];
  exam?: CheckpointExam;
  items?: Record<string, Item>;
}

export interface Doc {
  slug: string;
  title: string;
  blocks: Block[];
}

export type GrammarExample = [de: string, en: string];

export type GrammarVisual =
  | { kind: "table"; title: string; head: string[]; rows: string[][]; mark?: number[]; note?: string }
  | { kind: "steps"; title: string; steps: [question: string, answer: string, example: string][] }
  | { kind: "scene"; title: string; spots: [preposition: string, where: string, whereTo: string, whereEn: string, whereToEn: string][] };

export interface GrammarPoint {
  title: string;
  text: string;
  examples: GrammarExample[];
}

export interface GrammarLesson {
  visuals: GrammarVisual[];
  points: GrammarPoint[];
  traps: [wrong: string, right: string, why: string][];
  hook?: string;
}

export interface GrammarTopic {
  slug: string;
  title: string;
  group: string;
  level: "A2" | "Extension";
  summary: string;
  rule: string;
  source: string | null;
  lesson: GrammarLesson | null;
  items: Item[];
}

export interface Course {
  placement: Unit;
  weeks: Unit[];
  vocab: VocabEntry[];
  checkpoints: Checkpoint[];
  docs: Doc[];
  rubric: { writing: string[]; checklist: string[] };
  grammar?: GrammarTopic[];
}
