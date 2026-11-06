import { useEffect, useState } from "react";
import type { GrammarVisual } from "../lib/types.ts";
import { Marked } from "./Marked.tsx";

type Scene = Extract<GrammarVisual, { kind: "scene" }>;
type Mode = "wo" | "wohin";

const BEHIND = new Set(["hinter", "in"]);
const spotClass = (preposition: string) => `spot-${preposition.replace("ü", "ue")}`;

export function PrepositionScene({ visual }: { visual: Scene }) {
  const [mode, setMode] = useState<Mode>("wo");
  const [index, setIndex] = useState(1);
  const [launching, setLaunching] = useState(false);
  useEffect(() => {
    if (!launching) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => { inner = requestAnimationFrame(() => setLaunching(false)); });
    return () => { cancelAnimationFrame(outer); cancelAnimationFrame(inner); };
  }, [launching]);
  const spot = visual.spots[index] ?? visual.spots[0];
  if (!spot) return null;
  const [preposition, where, whereTo, whereEn, whereToEn] = spot;
  const position = launching ? "spot-start is-launch" : spotClass(preposition);
  const behind = BEHIND.has(preposition);
  const choose = (nextMode: Mode, nextIndex: number) => {
    setMode(nextMode);
    setIndex(nextIndex);
    if (nextMode === "wohin") setLaunching(true);
  };
  const modes: [Mode, string, string][] = [["wo", "Wo?", "where it is: dative"], ["wohin", "Wohin?", "where it goes: accusative"]];
  return (
    <figure className={`gv gv-scene is-${mode}`}>
      <figcaption>{visual.title}</figcaption>
      <div className="scene-modes" role="group" aria-label="Question">
        {modes.map(([value, label, help]) => <button key={value} type="button" className={`option scene-mode mode-${value}`} aria-pressed={mode === value} onClick={() => choose(value, index)}>
          <span lang="de">{label}</span><span className="scene-mode-help">{help}</span>
        </button>)}
      </div>
      <svg className="scene" viewBox="0 0 360 200" aria-hidden="true" focusable="false">
        <rect className="sc-floor" x="0" y="160" width="360" height="40" />
        <line className="sc-line" x1="0" y1="160" x2="360" y2="160" />
        <rect className="sc-wall" x="0" y="12" width="14" height="148" />
        <text className="sc-label" x="9" y="92" transform="rotate(-90 9 92)" textAnchor="middle">die Wand</text>
        <line className={`sc-string${preposition === "über" && mode === "wo" ? "" : " is-off"}`} x1="170" y1="0" x2="170" y2="29" />
        <rect className="sc-rim" x="290" y="111" width="50" height="9" rx="2" />
        <g className={`ball ${position}${behind ? "" : " is-off"}`}><circle r="11" /><path d="M -10 -3 Q 0 4 10 -3" /></g>
        <rect className="sc-obj" x="110" y="92" width="120" height="40" rx="3" />
        <rect className="sc-obj" x="120" y="132" width="6" height="28" />
        <rect className="sc-obj" x="214" y="132" width="6" height="28" />
        <text className="sc-label" x="170" y="117" textAnchor="middle">der Tisch</text>
        <rect className="sc-obj" x="284" y="118" width="62" height="42" rx="2" />
        <text className="sc-label" x="315" y="144" textAnchor="middle">die Kiste</text>
        <g className={`ball ${position}${behind ? " is-off" : ""}`}><circle r="11" /><path d="M -10 -3 Q 0 4 10 -3" /></g>
      </svg>
      <p className="scene-line" aria-live="polite">
        <span className="scene-cue" aria-hidden="true">{mode === "wo" ? "●" : "→"}</span>
        <span lang="de" className="gx-de"><Marked text={mode === "wo" ? where : whereTo} /></span>
        <span className="gx-en">{mode === "wo" ? whereEn : whereToEn}</span>
      </p>
      <div className="scene-preps" role="group" aria-label="Preposition">
        {visual.spots.map(([label], spotIndex) => <button key={label} type="button" lang="de" className="option" aria-pressed={spotIndex === index} onClick={() => choose(mode, spotIndex)}>{label}</button>)}
      </div>
    </figure>
  );
}
