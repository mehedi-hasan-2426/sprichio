import type { ReactNode } from "react";
import type { SceneName } from "../lib/types.ts";

interface Layers {
  back: ReactNode;
  front?: ReactNode;
}

const room = (
  <>
    <rect className="ill-wall" x="0" y="0" width="640" height="300" />
    <rect className="ill-floor" x="0" y="300" width="640" height="60" />
  </>
);

const plant = (x: number, y: number) => (
  <g>
    <ellipse className="ill-plant" cx={x + 6} cy={y - 18} rx="9" ry="22" transform={`rotate(-24 ${x + 6} ${y - 18})`} />
    <ellipse className="ill-plant2" cx={x + 24} cy={y - 20} rx="9" ry="24" transform={`rotate(20 ${x + 24} ${y - 20})`} />
    <ellipse className="ill-plant" cx={x + 15} cy={y - 26} rx="8" ry="26" />
    <path className="ill-red" d={`M${x} ${y} L${x + 30} ${y} L${x + 26} ${y + 38} L${x + 4} ${y + 38} Z`} />
  </g>
);

const windowFrame = (x: number, y: number, w: number, h: number) => (
  <g>
    <rect className="ill-glass" x={x} y={y} width={w} height={h} rx="3" />
    <rect className="ill-frame" x={x} y={y} width={w} height={h} rx="3" />
    <path className="ill-frame" d={`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`} />
  </g>
);

const counter = (width: number) => (
  <g>
    <rect className="ill-wood" x="0" y="302" width={width} height="58" />
    <rect className="ill-wood-dark" x="0" y="292" width={width + 12} height="12" rx="3" />
  </g>
);

const cafeBack = (
  <>
    {room}
    {windowFrame(470, 36, 140, 130)}
    <circle className="ill-plant2" cx="512" cy="128" r="24" />
    <rect className="ill-ink" x="22" y="12" width="184" height="90" rx="6" />
    <text className="ill-chalk" x="36" y="40">Kaffee 2,80</text>
    <text className="ill-chalk" x="36" y="66">Cappuccino 3,40</text>
    <text className="ill-chalk" x="36" y="92">Kuchen 4,40</text>
    <rect className="ill-wood-dark" x="260" y="92" width="170" height="6" />
    {[0, 1, 2, 3].map((k) => <g key={k}><rect className="ill-paper" x={272 + k * 40} y="70" width="20" height="22" rx="3" /><circle className="ill-frame-thin" cx={295 + k * 40} cy="80" r="5" /></g>)}
    <path className="ill-line" d="M300 0 V48 M400 0 V48" />
    <path className="ill-yellow" d="M282 66 Q300 40 318 66 Z" />
    <path className="ill-yellow" d="M382 66 Q400 40 418 66 Z" />
    {plant(588, 262)}
  </>
);

const SCENES: Record<SceneName, Layers> = {
  cafe: {
    back: cafeBack,
    front: (
      <>
        {counter(330)}
        <ellipse className="ill-paper" cx="250" cy="292" rx="20" ry="4" />
        <rect className="ill-paper" x="238" y="270" width="24" height="22" rx="4" />
        <path className="ill-steam" d="M246 262 q-4 -8 0 -16 M254 262 q4 -8 0 -16" />
        <ellipse className="ill-paper" cx="60" cy="292" rx="34" ry="5" />
        <path className="ill-yellow" d="M40 288 L80 288 L68 270 Z" />
      </>
    ),
  },
  "cafe-table": {
    back: cafeBack,
    front: (
      <>
        <rect className="ill-wood-dark" x="170" y="296" width="300" height="12" rx="4" />
        <rect className="ill-wood" x="306" y="308" width="28" height="52" />
        <rect className="ill-paper" x="220" y="274" width="24" height="22" rx="4" />
        <rect className="ill-paper" x="396" y="274" width="24" height="22" rx="4" />
        <path className="ill-steam" d="M228 266 q-4 -8 0 -16 M404 266 q4 -8 0 -16" />
      </>
    ),
  },
  apartment: {
    back: (
      <>
        <rect className="ill-wall" x="0" y="0" width="640" height="300" />
        <rect className="ill-wood" x="0" y="300" width="640" height="60" />
        <path className="ill-floorline" d="M0 320 H640 M0 340 H640" />
        {windowFrame(60, 40, 120, 170)}
        {windowFrame(460, 40, 120, 170)}
        <rect className="ill-metal" x="70" y="230" width="100" height="40" rx="4" />
        <rect className="ill-metal" x="470" y="230" width="100" height="40" rx="4" />
        <path className="ill-line" d="M320 0 V40" />
        <circle className="ill-yellow" cx="320" cy="52" r="14" />
        <rect className="ill-wood" x="280" y="296" width="70" height="44" rx="2" />
        <path className="ill-floorline" d="M280 314 H350" />
        {plant(600, 262)}
      </>
    ),
  },
  bakery: {
    back: (
      <>
        {room}
        <rect className="ill-ink" x="410" y="36" width="180" height="46" rx="6" />
        <text className="ill-chalk ill-sign" x="500" y="66" textAnchor="middle">Bäckerei</text>
        {[64, 118].map((y) => <rect key={y} className="ill-wood-dark" x="40" y={y} width="300" height="6" />)}
        {[60, 108, 156, 204, 252, 300].map((x) => <ellipse key={x} className="ill-wood" cx={x} cy="52" rx="20" ry="12" />)}
        {[70, 150, 230].map((x) => <rect key={x} className="ill-wood" x={x} y="98" width="70" height="18" rx="9" />)}
        {windowFrame(440, 110, 150, 120)}
      </>
    ),
    front: (
      <>
        <rect className="ill-wall2" x="0" y="300" width="360" height="60" />
        <rect className="ill-glass ill-see" x="0" y="270" width="360" height="36" />
        {[40, 90, 140, 190, 240, 290].map((x, k) => <circle key={x} className={k % 2 ? "ill-yellow" : "ill-wood"} cx={x} cy="326" r="15" />)}
        <rect className="ill-wood-dark" x="0" y="294" width="372" height="8" rx="3" />
      </>
    ),
  },
  doctor: {
    back: (
      <>
        {room}
        <rect className="ill-paper" x="500" y="40" width="80" height="110" rx="3" />
        {["E", "F P", "T O Z", "L P E D"].map((row, k) => <text key={row} className="ill-chart" x="540" y={66 + k * 22} textAnchor="middle">{row}</text>)}
        {windowFrame(60, 40, 140, 120)}
        <path className="ill-blinds" d="M60 60 H200 M60 80 H200 M60 100 H200 M60 120 H200 M60 140 H200" />
        <rect className="ill-paper" x="250" y="56" width="60" height="44" rx="2" />
        <rect className="ill-frame" x="250" y="56" width="60" height="44" rx="2" />
        <path className="ill-cross" d="M280 66 V90 M268 78 H292" />
        {plant(594, 262)}
      </>
    ),
    front: (
      <>
        {counter(330)}
        <rect className="ill-ink" x="220" y="248" width="76" height="46" rx="4" />
        <rect className="ill-glass" x="226" y="253" width="64" height="36" rx="2" />
        <rect className="ill-paper" x="20" y="282" width="70" height="10" rx="2" />
      </>
    ),
  },
  street: {
    back: (
      <>
        <rect className="ill-sky" x="0" y="0" width="640" height="300" />
        <rect className="ill-wall2" x="0" y="50" width="220" height="250" />
        {[30, 90, 150].flatMap((x) => [80, 150].map((y) => <rect key={`${x}-${y}`} className="ill-glass" x={x} y={y} width="40" height="46" rx="2" />))}
        <rect className="ill-wood-dark" x="86" y="222" width="48" height="78" rx="3" />
        <rect className="ill-house" x="430" y="30" width="210" height="270" />
        {[460, 530, 600].flatMap((x) => [60, 130, 200].map((y) => <rect key={`${x}-${y}`} className="ill-glass" x={x - 10} y={y} width="36" height="44" rx="2" />))}
        <rect className="ill-floor" x="0" y="300" width="640" height="60" />
        <rect className="ill-wood-dark" x="316" y="140" width="8" height="160" />
        <circle className="ill-plant" cx="320" cy="122" r="44" />
        <circle className="ill-plant2" cx="300" cy="140" r="26" />
        <rect className="ill-blue" x="212" y="230" width="92" height="28" rx="4" />
        <text className="ill-sign-light" x="258" y="250" textAnchor="middle">Bahnhof</text>
        <path className="ill-blue" d="M304 230 L318 244 L304 258 Z" />
      </>
    ),
  },
  office: {
    back: (
      <>
        {room}
        {windowFrame(440, 40, 170, 140)}
        <path className="ill-skyline" d="M440 180 V140 H470 V120 H500 V150 H530 V110 H560 V145 H590 V128 H610 V180 Z" />
        <rect className="ill-paper" x="60" y="44" width="200" height="120" rx="4" />
        <rect className="ill-frame" x="60" y="44" width="200" height="120" rx="4" />
        {[["ill-yellow", 80, 62], ["ill-blue-soft", 120, 70], ["ill-yellow", 170, 60], ["ill-red-soft", 210, 76], ["ill-blue-soft", 96, 110]].map(([tone, x, y]) => <rect key={`${x}-${y}`} className={String(tone)} x={Number(x)} y={Number(y)} width="28" height="28" rx="2" />)}
        {plant(592, 262)}
      </>
    ),
    front: (
      <>
        {counter(300)}
        <rect className="ill-ink" x="10" y="230" width="86" height="62" rx="4" />
        <rect className="ill-glass" x="16" y="236" width="74" height="48" rx="2" />
        <rect className="ill-paper" x="240" y="270" width="20" height="22" rx="4" />
      </>
    ),
  },
  shop: {
    back: (
      <>
        {room}
        <path className="ill-rail" d="M40 70 H330" />
        {[["ill-yellow", 60], ["ill-blue", 120], ["ill-red", 180], ["ill-plant2", 240], ["ill-blue", 300]].map(([tone, x]) => (
          <g key={`${tone}-${x}`}>
            <path className="ill-line" d={`M${Number(x)} 70 V80`} />
            <path className={String(tone)} d={`M${Number(x) - 22} 86 L${Number(x)} 78 L${Number(x) + 22} 86 L${Number(x) + 18} 150 L${Number(x) - 18} 150 Z`} />
          </g>
        ))}
        <rect className="ill-glass" x="500" y="40" width="90" height="220" rx="45" />
        <rect className="ill-frame" x="500" y="40" width="90" height="220" rx="45" />
        <rect className="ill-wood-dark" x="380" y="120" width="90" height="6" />
        <rect className="ill-blue" x="388" y="100" width="34" height="20" rx="2" />
        <rect className="ill-yellow" x="428" y="104" width="34" height="16" rx="2" />
      </>
    ),
    front: (
      <>
        {counter(300)}
        <rect className="ill-blue" x="20" y="278" width="60" height="14" rx="2" />
        <rect className="ill-yellow" x="24" y="266" width="52" height="12" rx="2" />
        <rect className="ill-red" x="230" y="280" width="60" height="12" rx="2" />
      </>
    ),
  },
  park: {
    back: (
      <>
        <rect className="ill-sky" x="0" y="0" width="640" height="260" />
        <rect className="ill-grass" x="0" y="250" width="640" height="110" />
        {[[60, 120, 56], [330, 110, 48], [590, 130, 52]].map(([x, y, r]) => (
          <g key={x}>
            <rect className="ill-wood-dark" x={Number(x) - 6} y={Number(y)} width="12" height={262 - Number(y)} />
            <circle className="ill-plant" cx={x} cy={y} r={r} />
            <circle className="ill-plant2" cx={Number(x) - 18} cy={Number(y) + 14} r={Number(r) / 2} />
          </g>
        ))}
        <rect className="ill-wood" x="250" y="250" width="150" height="12" rx="3" />
        <rect className="ill-wood-dark" x="262" y="262" width="8" height="26" />
        <rect className="ill-wood-dark" x="380" y="262" width="8" height="26" />
        <path className="ill-line" d="M392 250 Q404 200 420 170 M392 250 Q420 214 448 186 M392 250 Q392 208 396 178" />
        <ellipse className="ill-red" cx="420" cy="158" rx="13" ry="16" />
        <ellipse className="ill-yellow" cx="450" cy="174" rx="13" ry="16" />
        <ellipse className="ill-blue" cx="396" cy="164" rx="13" ry="16" />
      </>
    ),
  },
  station: {
    back: (
      <>
        <rect className="ill-wall2" x="0" y="0" width="640" height="300" />
        <rect className="ill-floor" x="0" y="300" width="640" height="60" />
        <rect className="ill-ink" x="30" y="24" width="300" height="110" rx="6" />
        {[["14:30", "Hamburg", "7", 60], ["15:10", "Hamburg", "12", 92], ["15:25", "Köln", "3", 124]].map(([time, to, track, y]) => (
          <g key={String(time)}>
            <text className="ill-board" x="46" y={Number(y)}>{time}</text>
            <text className="ill-board" x="118" y={Number(y)}>{to}</text>
            <text className="ill-board" x="312" y={Number(y)} textAnchor="end">{track}</text>
          </g>
        ))}
        <circle className="ill-paper" cx="470" cy="76" r="30" />
        <circle className="ill-frame" cx="470" cy="76" r="30" />
        <path className="ill-hands" d="M470 76 V56 M470 76 L484 82" />
        <rect className="ill-blue" x="520" y="150" width="90" height="40" rx="4" />
        <text className="ill-sign-light" x="565" y="177" textAnchor="middle">Gleis 7</text>
      </>
    ),
    front: (
      <>
        {counter(320)}
        <rect className="ill-paper" x="230" y="278" width="60" height="14" rx="2" />
      </>
    ),
  },
  counter: {
    back: (
      <>
        {room}
        <rect className="ill-ink" x="50" y="40" width="170" height="70" rx="6" />
        <text className="ill-board ill-big" x="135" y="86" textAnchor="middle">Nr. 47</text>
        <text className="ill-label" x="135" y="132" textAnchor="middle">Bürgeramt</text>
        {[520, 566].map((x) => (
          <g key={x}>
            <rect className="ill-blue" x={x} y="246" width="38" height="12" rx="3" />
            <rect className="ill-blue" x={x} y="210" width="10" height="40" rx="3" />
            <rect className="ill-metal" x={x + 4} y="258" width="4" height="42" />
            <rect className="ill-metal" x={x + 30} y="258" width="4" height="42" />
          </g>
        ))}
        {plant(460, 262)}
      </>
    ),
    front: (
      <>
        {counter(320)}
        <rect className="ill-paper" x="236" y="276" width="58" height="16" rx="1" />
        <path className="ill-line" d="M298 288 L316 274" />
        <rect className="ill-ink" x="10" y="254" width="96" height="38" rx="3" />
        <text className="ill-sign-light" x="58" y="280" textAnchor="middle">Platz 3</text>
      </>
    ),
  },
};

export function sceneLayers(scene: SceneName): Layers {
  return SCENES[scene];
}
