export type Mark = "N" | "A" | "D" | "hl";

export interface MarkedPart {
  t: string;
  mark?: Mark;
}

const PATTERN = /\{([NAD]):([^{}*]+)\}|\*([^{}*]+)\*/g;

export function parseMarks(text: string): MarkedPart[] {
  const parts: MarkedPart[] = [];
  let last = 0;
  for (const match of text.matchAll(PATTERN)) {
    const start = match.index;
    if (start > last) parts.push({ t: text.slice(last, start) });
    const caseMark = match[1] as Mark | undefined;
    parts.push(caseMark ? { t: match[2] ?? "", mark: caseMark } : { t: match[3] ?? "", mark: "hl" });
    last = start + match[0].length;
  }
  if (last < text.length) parts.push({ t: text.slice(last) });
  return parts;
}
