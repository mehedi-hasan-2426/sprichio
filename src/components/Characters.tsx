import type { Mood, Speaker } from "../lib/types.ts";

interface Props {
  who: Speaker;
  mood: Mood;
  talking: boolean;
  x: number;
  mirrored: boolean;
}

const BROWS: Record<Mood, [string, string]> = {
  smile: ["M60 84 Q67 80 74 83", "M86 83 Q93 80 100 84"],
  unsure: ["M60 85 Q67 82 74 84", "M86 80 Q93 74 100 79"],
  surprised: ["M60 79 Q67 74 74 78", "M86 78 Q93 74 100 79"],
};

function Face({ mood, talking, ink }: { mood: Mood; talking: boolean; ink: string }) {
  const [left, right] = BROWS[mood];
  return (
    <>
      <path className="char-brow" d={left} stroke={ink} />
      <path className="char-brow" d={right} stroke={ink} />
      <g className="char-eyes">
        <ellipse cx="70.5" cy="95" rx="3.4" ry="4.4" fill="#231915" />
        <ellipse cx="96.5" cy="95" rx="3.4" ry="4.4" fill="#231915" />
      </g>
      <circle cx="62" cy="108" r="6" fill="#e07a5f" opacity="0.22" />
      <circle cx="98" cy="108" r="6" fill="#e07a5f" opacity="0.22" />
      {talking ? null : mood === "surprised"
        ? <ellipse cx="80" cy="118" rx="4" ry="5" fill="#6d2b22" />
        : <path className="char-lips" d={mood === "unsure" ? "M72 118 Q76 115 80 118 Q84 121 88 118" : "M71 116 Q80 123 89 116"} stroke="#6d2b22" />}
      {talking ? <g className="char-mouth"><path d="M71 115 Q80 129 89 115 Z" fill="#6d2b22" /><path d="M75 121 Q80 126 85 121 Z" fill="#d9706a" /></g> : null}
    </>
  );
}

function Anna({ mood, talking }: { mood: Mood; talking: boolean }) {
  const skin = "#a86b4b";
  const shade = "#8b553a";
  const hair = "#2a1b14";
  const top = "#f2c230";
  return (
    <>
      <path d="M14 260 C14 205 30 170 62 162 L98 162 C130 170 146 205 146 260 Z" fill={top} />
      <path d="M118 176 C134 188 144 214 146 260 L132 260 C130 226 124 200 112 186 Z" fill="#d9a91c" />
      <rect x="67" y="136" width="26" height="32" rx="10" fill={skin} />
      <path d="M67 152 Q80 160 93 152 L93 144 Q80 152 67 144 Z" fill={shade} opacity="0.55" />
      <path d="M64 160 L80 182 L96 160 Z" fill={skin} />
      <g transform="translate(0 8)"><g className="char-head">
        <circle cx="80" cy="50" r="17" fill={hair} />
        <ellipse cx="47" cy="100" rx="6" ry="8" fill={skin} />
        <ellipse cx="113" cy="100" rx="6" ry="8" fill={skin} />
        <circle cx="47" cy="112" r="3.2" fill="#e0442e" />
        <circle cx="113" cy="112" r="3.2" fill="#e0442e" />
        <ellipse cx="80" cy="96" rx="33" ry="38" fill={skin} />
        <path d="M46 98 C42 62 60 52 80 52 C100 52 118 62 114 98 C110 80 100 70 80 70 C64 70 52 78 46 98 Z" fill={hair} />
        <path d="M80 70 C94 70 108 78 112 92 C104 82 92 76 78 76 Z" fill="#3b2820" />
        <path d="M81 99 Q78 106 82 108" stroke={shade} strokeWidth="2" fill="none" strokeLinecap="round" />
        <Face mood={mood} talking={talking} ink={hair} />
      </g></g>
    </>
  );
}

function Max({ mood, talking }: { mood: Mood; talking: boolean }) {
  const skin = "#f0c4a0";
  const shade = "#d49c78";
  const hair = "#8a4a2a";
  const shirt = "#2f6fb3";
  return (
    <>
      <path d="M12 260 C12 204 30 170 62 162 L98 162 C130 170 148 204 148 260 Z" fill={shirt} />
      <path d="M118 176 C134 188 146 214 148 260 L134 260 C132 226 126 200 112 186 Z" fill="#255c96" />
      <rect x="67" y="136" width="26" height="32" rx="10" fill={skin} />
      <path d="M67 152 Q80 160 93 152 L93 144 Q80 152 67 144 Z" fill={shade} opacity="0.55" />
      <path d="M64 160 Q80 178 96 160 L96 168 Q80 188 64 168 Z" fill="#f4f6f8" />
      <path d="M60 160 L72 186 L58 182 Z" fill="#255c96" />
      <path d="M100 160 L88 186 L102 182 Z" fill="#255c96" />
      <g transform="translate(0 8)"><g className="char-head">
        <ellipse cx="47" cy="100" rx="6" ry="8" fill={skin} />
        <ellipse cx="113" cy="100" rx="6" ry="8" fill={skin} />
        <ellipse cx="80" cy="96" rx="33" ry="38" fill={skin} />
        <path d="M52 110 Q80 142 108 110 Q102 131 80 134 Q58 131 52 110 Z" fill={hair} opacity="0.16" />
        <path d="M46 94 C42 60 60 50 82 50 C104 50 118 62 114 90 C108 76 96 70 84 68 C72 72 60 70 52 78 C49 82 47 88 46 94 Z" fill={hair} />
        <path d="M58 66 C70 54 94 52 106 64 C94 61 76 63 60 74 Z" fill="#a35a35" />
        <path d="M81 99 Q78 106 82 108" stroke={shade} strokeWidth="2" fill="none" strokeLinecap="round" />
        <Face mood={mood} talking={talking} ink={hair} />
        <g fill="none" stroke="#1f2328" strokeWidth="2.2">
          <circle cx="68" cy="95" r="9.5" fill="#ffffff" fillOpacity="0.12" />
          <circle cx="94" cy="95" r="9.5" fill="#ffffff" fillOpacity="0.12" />
          <path d="M77.5 94 Q81 91 84.5 94 M58.5 93 L48 96 M103.5 93 L112 96" strokeLinecap="round" />
        </g>
      </g></g>
    </>
  );
}

export function Character({ who, mood, talking, x, mirrored }: Props) {
  const placement = mirrored ? `translate(${x + 184} 60) scale(-1.15 1.15)` : `translate(${x} 60) scale(1.15)`;
  const sleeve = who === "anna" ? "#f2c230" : "#2f6fb3";
  const skin = who === "anna" ? "#a86b4b" : "#f0c4a0";
  return (
    <g className={`char char-${who}${talking ? " is-talking" : ""}`} transform={placement}>
      <g className="char-body">
        {who === "anna" ? <Anna mood={mood} talking={talking} /> : <Max mood={mood} talking={talking} />}
        <g className="char-hand">
          <path d="M124 262 C124 238 118 220 106 208 L120 198 C134 214 142 238 142 262 Z" fill={sleeve} />
          <ellipse cx="110" cy="198" rx="10.5" ry="12.5" fill={skin} transform="rotate(-14 110 198)" />
          <path d="M102 190 Q107 182 112 188" stroke={skin} strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
      </g>
    </g>
  );
}
