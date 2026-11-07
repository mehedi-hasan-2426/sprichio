import { useCallback, useEffect, useRef, useState } from "react";
import type { Dialogue, Mood, Speaker } from "../lib/types.ts";
import { Character } from "./Characters.tsx";
import { sceneLayers } from "./Scenes.tsx";

const NAMES: Record<Speaker, string> = { anna: "Anna", max: "Max" };

export function DialogueView({ dialogue }: { dialogue: Dialogue }) {
  const [shown, setShown] = useState(0);
  const [talking, setTalking] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [english, setEnglish] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const newest = useRef<HTMLLIElement | null>(null);
  const { lines } = dialogue;

  const say = useCallback((index: number) => {
    const line = lines[index];
    if (!line) return;
    window.clearTimeout(timer.current);
    const finish = () => setTalking((current) => (current === index ? null : current));
    setTalking(index);
    timer.current = window.setTimeout(finish, 1600 + line.de.length * 45);
  }, [lines]);

  useEffect(() => {
    if (!playing || talking !== null) return;
    const id = window.setTimeout(() => {
      if (shown >= lines.length) {
        setPlaying(false);
        return;
      }
      setShown(shown + 1);
      say(shown);
    }, 550);
    return () => window.clearTimeout(id);
  }, [playing, talking, shown, lines.length, say]);

  useEffect(() => {
    if (!shown) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    newest.current?.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
  }, [shown]);

  useEffect(() => {
    const pending = timer;
    return () => {
      window.clearTimeout(pending.current);
    };
  }, []);

  const stop = () => {
    setPlaying(false);
    window.clearTimeout(timer.current);
    setTalking(null);
  };
  const play = () => {
    const start = shown >= lines.length ? 0 : shown;
    setShown(start + 1);
    say(start);
    setPlaying(true);
  };
  const next = () => {
    if (playing || shown >= lines.length) return;
    setShown(shown + 1);
    say(shown);
  };
  const showAll = () => {
    if (shown >= lines.length) return;
    stop();
    setShown(lines.length);
  };

  const right: Speaker = dialogue.left === "anna" ? "max" : "anna";
  const moodOf = (who: Speaker): Mood => {
    const active = talking !== null ? lines[talking] : undefined;
    if (active?.who === who) return active.mood ?? "smile";
    const last = lines.slice(0, shown).filter((line) => line.who === who).at(-1);
    return last?.mood ?? "smile";
  };
  const speaking = talking !== null ? lines[talking]?.who : undefined;
  const { back, front } = sceneLayers(dialogue.scene);
  const playLabel = playing ? "Pause" : shown === 0 ? "Play conversation" : shown >= lines.length ? "Play again" : "Play from here";
  const latest = shown ? lines[shown - 1] : undefined;

  return (
    <div className="talk-view">
      <header className="talk-head">
        <h2 lang="de">{dialogue.title}</h2>
        <p className="muted">{dialogue.titleEn}</p>
        <p className="talk-situation"><strong>Situation:</strong> {dialogue.situation}</p>
        <p className="talk-note muted">Anna and Max appear in every topic, each time in a different role.</p>
      </header>
      <div className="talk-stage">
      <figure className="talk-scene">
        <svg viewBox="0 0 640 360" role="img" aria-label={`${dialogue.titleEn}: Anna as ${dialogue.roles.anna}, Max as ${dialogue.roles.max}`}>
          {back}
          <Character who={dialogue.left} mood={moodOf(dialogue.left)} talking={speaking === dialogue.left} x={78} mirrored={false} />
          <Character who={right} mood={moodOf(right)} talking={speaking === right} x={378} mirrored />
          {front}
        </svg>
        <figcaption className="talk-cast">
          <span className={`cast cast-${dialogue.left}`}><strong>{NAMES[dialogue.left]}</strong> <span lang="de">{dialogue.roles[dialogue.left]}</span></span>
          <span className={`cast cast-${right}`}><strong>{NAMES[right]}</strong> <span lang="de">{dialogue.roles[right]}</span></span>
        </figcaption>
      </figure>

      <div className="talk-transcript">
      <div className="talk-controls">
        <button type="button" onClick={playing ? stop : play}>{playLabel}</button>
        <button type="button" className="secondary" onClick={next} aria-disabled={playing || shown >= lines.length}>Next line</button>
        <button type="button" className="secondary" onClick={showAll} aria-disabled={shown >= lines.length}>Show all</button>
        <button type="button" className="secondary talk-toggle" aria-pressed={english} onClick={() => setEnglish(!english)}><span className="toggle-mark" aria-hidden="true" />English</button>
        <span className="talk-count">Line {shown} of {lines.length}</span>
      </div>
      <p className="sr-only" aria-live="polite">{latest ? `${NAMES[latest.who]}: ${latest.de}` : ""}</p>

      <ol className="talk" aria-label="Conversation">
        {lines.slice(0, shown).map((line, index) => (
          <li key={index} ref={index === shown - 1 ? newest : undefined} className={`bubble side-${line.who === dialogue.left ? "left" : "right"} who-${line.who}${talking === index ? " is-active" : ""}`}>
            <p className="bubble-who"><strong>{NAMES[line.who]}</strong> <span lang="de">{dialogue.roles[line.who]}</span>{talking === index ? <span className="bubble-live"> speaking</span> : null}</p>
            <p className="bubble-de" lang="de">{line.de}</p>
            {english ? <p className="bubble-en">{line.en}</p> : null}
          </li>
        ))}
      </ol>
      {shown === 0 ? <p className="talk-start muted">Press <strong>Play conversation</strong> to watch the scene, or go line by line with <strong>Next line</strong>.</p> : null}
      </div>
      </div>

      <div className="talk-notes">
        <section aria-labelledby="talk-phrases">
          <h2 id="talk-phrases" className="grammar-h2">Useful phrases</h2>
          <ul className="gx">
            {dialogue.phrases.map(([de, en]) => <li key={de}><span className="gx-de" lang="de">{de}</span><span className="gx-en">{en}</span></li>)}
          </ul>
        </section>
        <section aria-labelledby="talk-words">
          <h2 id="talk-words" className="grammar-h2">Words</h2>
          <ul className="gx">
            {dialogue.words.map(([de, en]) => <li key={de}><span className="gx-de" lang="de">{de}</span><span className="gx-en">{en}</span></li>)}
          </ul>
        </section>
      </div>
    </div>
  );
}
