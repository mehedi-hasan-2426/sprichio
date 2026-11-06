import { parseMarks } from "../lib/marks.ts";

const CLASS = { N: "mk mk-n", A: "mk mk-a", D: "mk mk-d", hl: "mk mk-hl" } as const;

export function Marked({ text }: { text: string }) {
  return <>{parseMarks(text).map((part, index) => part.mark ? <span key={index} className={CLASS[part.mark]}>{part.t}</span> : part.t)}</>;
}
