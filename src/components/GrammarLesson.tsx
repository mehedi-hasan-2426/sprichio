import type { GrammarLesson as Lesson, GrammarVisual } from "../lib/types.ts";
import { Marked } from "./Marked.tsx";
import { PrepositionScene } from "./PrepositionScene.tsx";

const KEY: [mark: "N" | "A" | "D", word: string, label: string][] = [
  ["N", "der", "Nominative: the subject"],
  ["A", "den", "Accusative: the direct object, or wohin?"],
  ["D", "dem", "Dative: the receiver, or wo?"],
];
const CLASS = { N: "mk mk-n", A: "mk mk-a", D: "mk mk-d" } as const;

function TableVisual({ visual }: { visual: Extract<GrammarVisual, { kind: "table" }> }) {
  const marked = new Set(visual.mark ?? []);
  const isFrame = marked.size > 0;
  const table = (
    <table className={isFrame ? "gv-table gv-frame" : `gv-table${visual.head.length >= 4 ? " gv-stack" : ""}`}>
      <thead><tr>{visual.head.map((cell, index) => <th key={index} scope="col" className={marked.has(index) ? "is-slot" : undefined}>{cell}</th>)}</tr></thead>
      <tbody>
        {visual.rows.map((row, rowIndex) => <tr key={rowIndex}>
          {row.map((cell, index) => !isFrame && index === 0
            ? <th key={index} scope="row"><Marked text={cell} /></th>
            : <td key={index} data-label={visual.head[index]} className={marked.has(index) ? "is-slot" : undefined}><span><Marked text={cell} /></span></td>)}
        </tr>)}
      </tbody>
    </table>
  );
  return (
    <figure className="gv">
      <figcaption>{visual.title}</figcaption>
      <div className="gv-scroll" role="region" aria-label={visual.title} tabIndex={0}>{table}</div>
      {visual.note ? <p className="gv-note">{visual.note}</p> : null}
    </figure>
  );
}

function Visual({ visual }: { visual: GrammarVisual }) {
  if (visual.kind === "scene") return <PrepositionScene visual={visual} />;
  if (visual.kind === "table") return <TableVisual visual={visual} />;
  return (
    <figure className="gv">
      <figcaption>{visual.title}</figcaption>
      <ol className="gv-steps">
        {visual.steps.map(([question, answer, example]) => <li key={question}>
          <span className="step-q">{question}</span>
          <span className="step-a">{answer}</span>
          <span className="step-ex" lang="de"><Marked text={example} /></span>
        </li>)}
      </ol>
    </figure>
  );
}

export function GrammarLesson({ lesson }: { lesson: Lesson }) {
  const text = JSON.stringify(lesson);
  const key = KEY.filter(([mark]) => text.includes(`{${mark}:`));
  return (
    <>
      {key.length ? <ul className="case-key" aria-label="Colour key">
        {key.map(([mark, word, label]) => <li key={mark}><span className={CLASS[mark]} lang="de">{word}</span> {label}</li>)}
      </ul> : null}
      {lesson.visuals.map((visual) => <Visual key={visual.title} visual={visual} />)}
      <section aria-labelledby="how-heading">
        <h2 id="how-heading" className="grammar-h2">How it works</h2>
        {lesson.points.map((point) => <div key={point.title} className="gpoint">
          <h3>{point.title}</h3>
          <p><Marked text={point.text} /></p>
          <ul className="gx">
            {point.examples.map(([de, en]) => <li key={de}>
              <span className="gx-de" lang="de"><Marked text={de} /></span>
              <span className="gx-en">{en}</span>
            </li>)}
          </ul>
        </div>)}
      </section>
      <section aria-labelledby="mistakes-heading">
        <h2 id="mistakes-heading" className="grammar-h2">Common mistakes</h2>
        <ul className="traps">
          {lesson.traps.map(([wrong, right, why]) => <li key={wrong}>
            <p className="trap-wrong"><span className="trap-icon" aria-hidden="true">✕</span><span className="sr-only">Not: </span><s lang="de"><Marked text={wrong} /></s></p>
            <p className="trap-right"><span className="trap-icon" aria-hidden="true">✓</span><span className="sr-only">Correct: </span><span lang="de"><Marked text={right} /></span></p>
            <p className="trap-why">{why}</p>
          </li>)}
        </ul>
      </section>
      {lesson.hook ? <p className="grammar-hook"><Marked text={lesson.hook} /></p> : null}
    </>
  );
}
