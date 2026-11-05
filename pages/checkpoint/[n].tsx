import Link from "next/link";
import { protect } from "../../src/server/protect.ts";
import type { Checkpoint, CheckpointExam, ExamPassage, Item } from "../../src/lib/types.ts";
import { Layout } from "../../src/components/Layout.tsx";
import { ItemView } from "../../src/components/ItemView.tsx";
import { Recorder } from "../../src/components/Recorder.tsx";
import { Rubric, SPEAKING_CRITERIA } from "../../src/components/Rubric.tsx";
import { WritingTask } from "../../src/components/WritingTask.tsx";
import { loadCourse } from "../../src/server/load.ts";
import { groupScore } from "../../src/lib/progress.ts";
import { percent } from "../../src/lib/checkpoint.ts";
import { useProgress } from "../../src/state/ProgressContext.tsx";

interface Props {
  n: number;
  canDo: string[];
  exam: CheckpointExam;
  items: Record<string, Item>;
  criteria: string[];
  checklist: string[];
}

function Passage({ passage }: { passage: ExamPassage }) {
  return (
    <blockquote lang="de">
      <p>
        <strong>{passage.title}</strong>
      </p>
      {passage.paragraphs.map((line, k) => (
        <p key={k}>{line}</p>
      ))}
    </blockquote>
  );
}

function Score({ label, value }: { label: string; value: string | null }) {
  return <p className="exam-score">{label}: {value ?? "not finished yet"}</p>;
}

export default function CheckpointPage({ n, canDo: statements, exam, items, criteria, checklist }: Props) {
  const { progress, update } = useProgress();
  const readingIds = exam.reading.flatMap((part) => part.itemIds);
  const formIds = exam.form.fields.flatMap((field) => (field.itemId ? [field.itemId] : []));
  const read = groupScore(progress, readingIds);
  const reading = read.done < read.total ? null : percent(read.correct, read.total);
  const form = groupScore(progress, formIds);
  const letter = progress.writing[exam.letter.task.id]?.score ?? [];
  const writingMax = formIds.length + criteria.length * 2;
  const writingPoints = form.correct + letter.reduce((a, b) => a + b, 0);
  const writing = form.done < form.total || letter.length !== criteria.length ? null : percent(writingPoints, writingMax);
  const spoken = progress.speaking[exam.speakingKey] ?? [];
  const speaking = spoken.length === SPEAKING_CRITERIA.length ? percent(spoken.reduce((a, b) => a + b, 0), SPEAKING_CRITERIA.length * 3) : null;
  const canDo = progress.canDo[`cp${n}`] ?? [];
  const first = exam.topics[0];
  const last = exam.topics[exam.topics.length - 1];
  const item = (id: string) => (items[id] ? <ItemView key={id} item={items[id]} /> : null);

  return (
    <Layout title={`Checkpoint ${n}`}>
      <h1>
        Checkpoint {n}: topics {first}–{last}
      </h1>
      <p className="muted">
        Exam timing for practice: reading and writing together take about 50 minutes, speaking about 15 minutes with a partner. Review first:{" "}
        {exam.topics.map((topic, k) => (
          <span key={topic}>
            {k ? " · " : ""}
            <Link href={`/woche/${topic}`}>Topic {topic}</Link>
          </span>
        ))}
      </p>

      <section className="card" aria-labelledby="lesen">
        <h2 id="lesen">Lesen (reading)</h2>
        <Score label="First-try score" value={reading === null ? null : `${read.correct} / ${read.total} (${reading} %)`} />
        {exam.reading.map((part, k) => (
          <div key={part.title} className="exam-part">
            <h3>{part.title}</h3>
            <p lang="de">{part.instruction}</p>
            <p className="muted">{part.instructionEn}</p>
            {part.stretch ? <p className="muted"><em>A2 stretch practice: this text is longer than a typical exam text. Read the statements first, then look for the matching part.</em></p> : null}
            {k === 2 ? (
              <ul className="ads" lang="de">
                {part.passages.map((ad) => (
                  <li key={ad.title}>
                    <strong className="ad-key">{ad.title}</strong>
                    {ad.paragraphs.map((line, j) => (
                      <p key={j}>{line}</p>
                    ))}
                  </li>
                ))}
              </ul>
            ) : (
              part.passages.map((p) => <Passage key={p.title} passage={p} />)
            )}
            <div lang="de">{part.itemIds.map(item)}</div>
          </div>
        ))}
      </section>

      <section className="card" aria-labelledby="schreiben">
        <h2 id="schreiben">Schreiben (writing)</h2>
        <Score label="Score" value={writing === null ? null : `${writingPoints} / ${writingMax} (${writing} %)`} />
        <p className="muted">Teil 1 counts first-try correct answers. Teil 2 uses your self-rating with the writing rubric.</p>
        <div className="exam-part">
          <h3>Schreiben, Teil 1: {exam.form.title}</h3>
          <p lang="de">{exam.form.instruction}</p>
          <p className="muted">{exam.form.instructionEn}</p>
          <Passage passage={exam.form.source} />
          <div className="exam-form" lang="de">
            {exam.form.fields.map((field) =>
              field.itemId ? (
                item(field.itemId)
              ) : (
                <p key={field.label} className="form-given">
                  <span className="muted">{field.label}:</span> {field.value}
                </p>
              ),
            )}
          </div>
        </div>
        <div className="exam-part">
          <h3>Schreiben, Teil 2</h3>
          <p className="muted">{exam.letter.instructionEn}</p>
          <ul className="prompt-cards" lang="de" aria-label="Points to choose from">
            {exam.letter.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <WritingTask task={exam.letter.task} criteria={criteria} max={2} checklist={checklist} />
        </div>
      </section>

      <section className="card" aria-labelledby="sprechen">
        <h2 id="sprechen">Sprechen (speaking)</h2>
        <Score label="Self-rating" value={speaking === null ? null : `${spoken.reduce((a, b) => a + b, 0)} / ${SPEAKING_CRITERIA.length * 3} (${speaking} %)`} />
        <p className="muted">Practise all three parts with a partner or tutor if you can. Alone, record yourself for each part and listen back before you rate.</p>
        {exam.speaking.map((part) => (
          <div key={part.title} className="exam-part">
            <h3>{part.title}</h3>
            <p lang="de">{part.instruction}</p>
            <p className="muted">{part.instructionEn}</p>
            <ul className="prompt-cards" lang="de">
              {part.cards.map((card) => (
                <li key={card}>{card}</li>
              ))}
            </ul>
            {part.table ? (
              <div className="table-wrap">
                <table lang="de">
                  <thead>
                    <tr>
                      {part.table.header.map((h) => (
                        <th key={h} scope="col">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {part.table.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, j) => (
                          <td key={j} data-label={part.table?.header[j]}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            {part.model ? (
              <details>
                <summary>Example answers</summary>
                <ul lang="de">
                  {part.model.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </details>
            ) : null}
          </div>
        ))}
        <Recorder />
        <Rubric
          title="Rate your speaking (all three parts)"
          criteria={SPEAKING_CRITERIA}
          max={3}
          value={spoken}
          onChange={(v) => update((p) => ({ ...p, speaking: { ...p.speaking, [exam.speakingKey]: v } }))}
        />
      </section>

      <section className="card">
        <h2>I can …</h2>
        <p className="muted">1 = not yet · 2 = with help · 3 = confidently</p>
        {statements.map((c, k) => (
          <div key={c} className="rubric-row">
            <span>… {c}</span>
            <div className="options" role="radiogroup" aria-label={c}>
              {[1, 2, 3].map((v) => (
                <button
                  key={v}
                  type="button"
                  role="radio"
                  aria-checked={canDo[k] === v}
                  className={canDo[k] === v ? "option selected" : "option"}
                  onClick={() => update((p) => ({ ...p, canDo: { ...p.canDo, [`cp${n}`]: statements.map((_, j) => (j === k ? v : canDo[j] ?? 0)) } }))}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

    </Layout>
  );
}

export const getServerSideProps = protect<Props>(({ params }) => {
  const course = loadCourse();
  const cp: Checkpoint | undefined = course.checkpoints.find((c) => c.n === Number(params?.n));
  if (!cp?.exam || !cp.items) return { notFound: true };
  return { props: { n: cp.n, canDo: cp.canDo, exam: cp.exam, items: cp.items, criteria: course.rubric.writing, checklist: course.rubric.checklist } };
});
