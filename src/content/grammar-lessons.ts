import type { GrammarLesson, GrammarVisual } from "../lib/types.ts";

const genders = ["", "Masculine", "Neuter", "Feminine", "Plural"];
const persons = ["ich", "du", "er / sie / es", "wir", "ihr", "sie / Sie"];
const frameHead = ["Position 1", "Verb", "Middle", "End"];
const frame = (title: string, rows: string[][], note?: string): GrammarVisual => ({ kind: "table", title, head: frameHead, rows, mark: [1, 3], ...(note ? { note } : {}) });

export const LESSONS: Record<string, GrammarLesson> = {
  "cases/dative": {
    visuals: [{
      kind: "table", title: "Dative articles", head: genders,
      rows: [
        ["Nominative", "{N:der} Mann", "{N:das} Kind", "{N:die} Frau", "{N:die} Kinder"],
        ["Dative", "{D:dem} Mann", "{D:dem} Kind", "{D:der} Frau", "{D:den} Kinder*n*"],
        ["Dative with ein / mein", "{D:einem} Mann", "{D:einem} Kind", "{D:einer} Frau", "{D:meinen} Kinder*n*"],
      ],
      note: "Masculine and neuter look the same: dem, einem. In the plural the noun adds -n, unless it already ends in -n or -s.",
    }],
    points: [
      { title: "Who gets something? Dative.", text: "The dative marks the person who receives something or who something belongs to. The question word is wem? (to whom?).", examples: [
        ["Ich gebe {D:dem} Kind einen Apfel.", "I give the child an apple."],
        ["Sie schreibt {D:ihrer} Mutter eine Karte.", "She's writing her mother a card."],
        ["Wem gehört die Tasche? {D:Der} Lehrerin.", "Who does the bag belong to? The teacher."],
      ] },
      { title: "Some verbs always take the dative", text: "Helfen, danken, gehören, gefallen, gratulieren, antworten, schmecken and passen take a dative object, even when there is no second object. In English these verbs look normal, so learn them with mir: hilf mir, das gefällt mir.", examples: [
        ["Kannst du {D:mir} helfen?", "Can you help me?"],
        ["Der Pullover gefällt {D:meinem} Bruder.", "My brother likes the sweater."],
        ["Wir danken {D:dem} Team.", "We thank the team."],
      ] },
      { title: "Some prepositions always take the dative", text: "Aus, bei, mit, nach, seit, von and zu. The full list is in the topic Dative prepositions.", examples: [
        ["Ich fahre mit {D:dem} Zug.", "I'm going by train."],
        ["Er wohnt bei {D:seinen} Eltern.", "He lives with his parents."],
        ["Seit {D:einem} Jahr lerne ich Deutsch.", "I've been learning German for a year."],
      ] },
    ],
    traps: [
      ["Ich helfe dich.", "Ich helfe {D:dir}.", "Helfen takes the dative, never the accusative."],
      ["mit die Kinder", "mit {D:den} Kinder*n*", "Dative plural: den, and the noun adds -n."],
      ["Das gefällt ich.", "Das gefällt {D:mir}.", "The thing you like is the subject. You are the dative."],
    ],
    hook: "Wem? means dative: to whom, with whom.",
  },

  "cases/accusative-dative": {
    visuals: [
      { kind: "steps", title: "Accusative or dative? Ask in this order", steps: [
        ["Is there a fixed preposition such as mit, für, bei or ohne?", "The preposition decides", "mit {D:dem} Bus, für {A:den} Bus"],
        ["Is it a two-way preposition such as in, an or auf?", "Ask wo? or wohin?", "Wo? {D:im} Park. Wohin? In {A:den} Park."],
        ["Is it the person who receives or is helped?", "Dative", "Ich gebe {D:dem} Hund Wasser."],
        ["Is the verb fragen, anrufen, besuchen or einladen?", "Accusative, even for a person", "Ich frage {A:den} Lehrer."],
        ["Is it what the action is done to?", "Accusative", "Ich sehe {A:den} Hund."],
      ] },
      { kind: "table", title: "Where you can see the difference", head: genders,
        rows: [
          ["Accusative", "{A:den} / {A:einen}", "{A:das} / {A:ein}", "{A:die} / {A:eine}", "{A:die}"],
          ["Dative", "{D:dem} / {D:einem}", "{D:dem} / {D:einem}", "{D:der} / {D:einer}", "{D:den} + noun -n"],
        ] },
    ],
    points: [
      { title: "Two objects: the thing is accusative, the person is dative", text: "With geben, schenken, zeigen, bringen and erklären you often have both. The person usually comes first.", examples: [
        ["Ich gebe {D:dem} Mann {A:den} Schlüssel.", "I give the man the key."],
        ["Sie zeigt {D:der} Kundin {A:das} Kleid.", "She shows the customer the dress."],
        ["Wir schenken {D:unserem} Lehrer {A:einen} Kalender.", "We're giving our teacher a calendar."],
      ] },
      { title: "Two-way prepositions: place or goal", text: "Where something is: dative. Where something goes: accusative. Moving around inside one place is still a place.", examples: [
        ["Ich gehe in {A:den} Park.", "I'm going to the park."],
        ["Ich jogge {D:im} Park.", "I jog in the park."],
        ["Er legt das Buch auf {A:den} Tisch.", "He puts the book on the table."],
        ["Das Buch liegt auf {D:dem} Tisch.", "The book is on the table."],
      ] },
    ],
    traps: [
      ["Ich gehe im Kino.", "Ich gehe {A:ins} Kino.", "Going to the cinema is a goal, so it's accusative: in das = ins."],
      ["Ich gebe den Mann das Geld.", "Ich gebe {D:dem} Mann das Geld.", "The person who receives is dative."],
      ["Ich frage dem Lehrer.", "Ich frage {A:den} Lehrer.", "Fragen takes the accusative, even though you're talking to someone."],
    ],
    hook: "Wohin? Accusative: it moves to a new place. Wo? Dative: it is already there.",
  },

  "cases/nominative-accusative-dative": {
    visuals: [
      { kind: "table", title: "Three cases with der and ein", head: ["Case", "Question", "Masculine", "Neuter", "Feminine", "Plural"],
        rows: [
          ["Nominative", "wer? was?", "{N:der} / {N:ein}", "{N:das} / {N:ein}", "{N:die} / {N:eine}", "{N:die}"],
          ["Accusative", "wen? was?", "{A:den} / {A:einen}", "{A:das} / {A:ein}", "{A:die} / {A:eine}", "{A:die}"],
          ["Dative", "wem?", "{D:dem} / {D:einem}", "{D:dem} / {D:einem}", "{D:der} / {D:einer}", "{D:den} + noun -n"],
        ],
        note: "Masculine has three different articles: der, den, dem. The others only change in the dative." },
      { kind: "table", title: "One sentence, three jobs", head: ["Who does it?", "Verb", "To whom?", "What?"],
        rows: [
          ["{N:Der} Mann", "gibt", "{D:dem} Kind", "{A:einen} Ball."],
          ["{N:Die} Ärztin", "erklärt", "{D:der} Patientin", "{A:das} Medikament."],
          ["{N:Ich}", "zeige", "{D:dir}", "{A:den} Weg."],
        ] },
    ],
    points: [
      { title: "Nominative: the subject", text: "The person or thing doing the action. The verb agrees with it. After sein and werden you also use the nominative.", examples: [
        ["{N:Der} Bus kommt gleich.", "The bus is coming soon."],
        ["{N:Mein} Bruder arbeitet in Köln.", "My brother works in Cologne."],
        ["Das ist {N:ein} guter Plan.", "That's a good plan."],
      ] },
      { title: "Accusative: the direct object", text: "What the action is done to. Haben, brauchen, kaufen, sehen, suchen, besuchen and es gibt all take the accusative.", examples: [
        ["Ich brauche {A:einen} Termin.", "I need an appointment."],
        ["Es gibt hier {A:keinen} Supermarkt.", "There's no supermarket here."],
        ["Wir besuchen {A:unseren} Onkel.", "We're visiting our uncle."],
      ] },
      { title: "Dative: the receiver", text: "The person who gets something, is helped or is told something.", examples: [
        ["Ich schreibe {D:meinem} Chef eine E-Mail.", "I'm writing my boss an email."],
        ["Hilfst du {D:der} Nachbarin?", "Are you helping the neighbour?"],
        ["Das Restaurant gefällt {D:den} Gäste*n*.", "The guests like the restaurant."],
      ] },
      { title: "A few nouns for people add -n", text: "Some masculine nouns for people add -n everywhere except the nominative: der Nachbar, den Nachbarn, dem Nachbarn. Others: der Kollege, der Junge, der Kunde, der Student.", examples: [
        ["{N:Der} Junge spielt Fußball.", "The boy is playing football."],
        ["Ich frage {A:den} Kollege*n*.", "I'll ask my colleague."],
        ["Wir helfen {D:dem} Nachbar*n*.", "We're helping the neighbour."],
      ] },
    ],
    traps: [
      ["Ich habe ein Bruder.", "Ich habe {A:einen} Bruder.", "Haben takes the accusative: masculine ein becomes einen."],
      ["Es gibt ein Park.", "Es gibt {A:einen} Park.", "Es gibt always takes the accusative."],
      ["Das ist den Chef.", "Das ist {N:der} Chef.", "After sein, use the nominative."],
    ],
    hook: "Wer? Nominative. Wen or was? Accusative. Wem? Dative.",
  },

  "cases/dative-pronouns": {
    visuals: [{
      kind: "table", title: "Personal pronouns", head: ["Nominative", "Accusative", "Dative"],
      rows: [
        ["ich", "{A:mich}", "{D:mir}"], ["du", "{A:dich}", "{D:dir}"], ["er", "{A:ihn}", "{D:ihm}"], ["sie", "{A:sie}", "{D:ihr}"], ["es", "{A:es}", "{D:ihm}"],
        ["wir", "{A:uns}", "{D:uns}"], ["ihr", "{A:euch}", "{D:euch}"], ["sie", "{A:sie}", "{D:ihnen}"], ["Sie", "{A:Sie}", "{D:Ihnen}"],
      ],
      note: "Wir and ihr have one form for both objects: uns, euch.",
    }],
    points: [
      { title: "A pronoun replaces the whole dative noun", text: "Dem Mann becomes ihm, der Frau becomes ihr, den Leuten becomes ihnen.", examples: [
        ["Ich helfe {D:der} Frau. Ich helfe {D:ihr}.", "I'm helping the woman. I'm helping her."],
        ["Wir danken {D:unseren} Freunde*n*. Wir danken {D:ihnen}.", "We thank our friends. We thank them."],
        ["Das Rad gehört {D:dem} Jungen. Es gehört {D:ihm}.", "The bike belongs to the boy. It belongs to him."],
      ] },
      { title: "Everyday phrases", text: "Many fixed phrases use a dative pronoun. Learn them as chunks.", examples: [
        ["Wie geht es {D:dir}?", "How are you?"],
        ["{D:Mir} ist kalt.", "I'm cold."],
        ["Das tut {D:mir} leid.", "I'm sorry."],
        ["Das steht {D:dir} gut.", "That suits you."],
      ] },
      { title: "Two pronouns: accusative first", text: "When both objects are pronouns, the accusative one comes first.", examples: [
        ["Ich gebe {A:es} {D:dir}.", "I'll give it to you."],
        ["Kannst du {A:ihn} {D:mir} zeigen?", "Can you show it to me?"],
      ] },
    ],
    traps: [
      ["Kannst du mich helfen?", "Kannst du {D:mir} helfen?", "Helfen takes the dative."],
      ["Ich bin kalt.", "{D:Mir} ist kalt.", "Ich bin kalt means you are a cold person. Feeling cold uses mir."],
      ["Ich gebe dir es.", "Ich gebe {A:es} {D:dir}.", "Two pronouns: accusative before dative."],
    ],
  },

  "prepositions/accusative": {
    visuals: [
      { kind: "table", title: "Always accusative", head: ["Preposition", "Meaning", "Example"],
        rows: [
          ["durch", "through", "durch {A:den} Park"],
          ["für", "for", "für {A:meinen} Sohn"],
          ["gegen", "against; around (a time)", "gegen {A:den} Wind, gegen acht Uhr"],
          ["ohne", "without", "ohne {A:einen} Cent"],
          ["um", "around; at (a clock time)", "um {A:den} See, um acht Uhr"],
        ],
        note: "Bis usually has no article: bis Montag, bis Köln. With an article it becomes bis zum or bis zur, which is dative." },
      { kind: "table", title: "Only the masculine changes", head: genders,
        rows: [
          ["Normal (nominative)", "der / ein Tisch", "das / ein Bett", "die / eine Lampe", "die Stühle"],
          ["After für, durch, ohne ...", "{A:den} / {A:einen} Tisch", "{A:das} / {A:ein} Bett", "{A:die} / {A:eine} Lampe", "{A:die} Stühle"],
        ] },
    ],
    points: [
      { title: "Five prepositions, one case", text: "After durch, ohne, gegen, für and um the noun is accusative. You see it with masculine nouns: der becomes den, ein becomes einen.", examples: [
        ["Wir gehen durch {A:den} Wald.", "We're walking through the forest."],
        ["Das ist für {A:meinen} Vater.", "This is for my father."],
        ["Ich bin gegen {A:den} Plan.", "I'm against the plan."],
        ["Ohne {A:meinen} Schlüssel komme ich nicht rein.", "I can't get in without my key."],
      ] },
      { title: "Pronouns after these prepositions", text: "Use the accusative pronoun: mich, dich, ihn, sie, es, uns, euch, sie, Sie.", examples: [
        ["Das Geschenk ist für {A:dich}.", "The present is for you."],
        ["Ohne {A:euch} macht es keinen Spaß.", "It's no fun without you."],
        ["Hast du etwas gegen {A:ihn}?", "Do you have something against him?"],
      ] },
      { title: "Time: um, gegen, für", text: "Um gives an exact time, gegen an approximate one. Für gives a planned length of time.", examples: [
        ["Der Zug fährt um acht Uhr.", "The train leaves at eight."],
        ["Ich komme gegen sieben.", "I'll come at around seven."],
        ["Ich bleibe für {A:einen} Monat.", "I'm staying for a month."],
        ["Bis morgen!", "See you tomorrow!"],
      ] },
    ],
    traps: [
      ["für meinem Bruder", "für {A:meinen} Bruder", "Für takes the accusative, never the dative."],
      ["ohne ein Regenschirm", "ohne {A:einen} Regenschirm", "Masculine after ohne: einen."],
      ["für den Nachbar", "für {A:den} Nachbar*n*", "A few masculine nouns for people add -n after the nominative: Nachbar, Kollege, Junge, Kunde."],
      ["Ich wohne hier für zwei Jahre.", "Ich wohne hier *seit* zwei Jahre*n*.", "If it's still true now, use seit + dative, not für."],
    ],
    hook: "DOGFU: durch, ohne, gegen, für, um. Always accusative.",
  },

  "prepositions/dative": {
    visuals: [
      { kind: "table", title: "Always dative", head: ["Preposition", "Meaning", "Example"],
        rows: [
          ["aus", "out of; from (origin)", "aus {D:der} Türkei, aus {D:dem} Haus"],
          ["bei", "at someone's place; at work", "bei {D:meiner} Tante, {D:beim} Arzt"],
          ["mit", "with; by (transport)", "mit {D:dem} Bus, mit {D:meinen} Freunde*n*"],
          ["nach", "after; to (cities, countries)", "nach {D:dem} Essen, nach Berlin"],
          ["seit", "since; for (still true)", "seit {D:einem} Jahr"],
          ["von", "from; of; by", "von {D:meinem} Bruder, {D:vom} Bahnhof"],
          ["zu", "to (people, places)", "{D:zum} Arzt, {D:zur} Schule"],
          ["gegenüber", "opposite", "gegenüber {D:dem} Bahnhof"],
        ] },
      { kind: "table", title: "Short forms", head: ["Long", "Short", "Example"],
        rows: [
          ["zu dem", "{D:zum}", "Ich gehe {D:zum} Bäcker."],
          ["zu der", "{D:zur}", "Sie fährt {D:zur} Arbeit."],
          ["bei dem", "{D:beim}", "Er ist {D:beim} Friseur."],
          ["von dem", "{D:vom}", "Ich komme {D:vom} Sport."],
        ] },
    ],
    points: [
      { title: "You can see the case in every gender", text: "Dem for der and das, der for die, den for the plural, and the plural noun adds -n.", examples: [
        ["Ich komme aus {D:dem} Büro.", "I'm coming from the office."],
        ["Er spricht mit {D:der} Lehrerin.", "He's talking to the teacher."],
        ["Sie spielt mit {D:den} Kinder*n*.", "She's playing with the children."],
      ] },
      { title: "People and doctors: zu, bei, von", text: "Going there, being there, coming back. The topic Places: wo, wohin, woher has the full picture.", examples: [
        ["Ich gehe {D:zum} Arzt.", "I'm going to the doctor's."],
        ["Ich bin {D:beim} Arzt.", "I'm at the doctor's."],
        ["Ich komme {D:vom} Arzt.", "I'm coming from the doctor's."],
      ] },
      { title: "Time: seit and nach", text: "Seit is for something that started in the past and is still true. Nach means after.", examples: [
        ["Seit {D:einer} Woche bin ich krank.", "I've been ill for a week."],
        ["Nach {D:der} Arbeit gehe ich einkaufen.", "After work I go shopping."],
      ] },
      { title: "Mit for transport and tools", text: "In English you go by bus. In German you go with the bus.", examples: [
        ["Wir fahren mit {D:der} S-Bahn.", "We're going by S-Bahn."],
        ["Ich bezahle mit {D:der} Karte.", "I'll pay by card."],
        ["Er isst mit Stäbchen.", "He eats with chopsticks."],
      ] },
    ],
    traps: [
      ["Ich fahre mit das Auto.", "Ich fahre mit {D:dem} Auto.", "Mit always takes the dative."],
      ["mit meinen Freunde", "mit {D:meinen} Freunde*n*", "Dative plural: the noun adds -n."],
      ["Ich gehe zu Hause.", "Ich gehe *nach* Hause.", "Going home is nach Hause. Being at home is zu Hause."],
    ],
    hook: "Seven words, always dative: aus, bei, mit, nach, seit, von, zu. Say them as one line until they stick.",
  },

  "prepositions/two-way": {
    visuals: [
      { kind: "scene", title: "Pick wo or wohin, then a preposition", spots: [
        ["an", "Der Ball liegt an {D:der} Wand.", "Der Ball rollt an {A:die} Wand.", "The ball is against the wall.", "The ball rolls up to the wall."],
        ["auf", "Der Ball liegt auf {D:dem} Tisch.", "Ich lege den Ball auf {A:den} Tisch.", "The ball is on the table.", "I put the ball on the table."],
        ["hinter", "Der Ball liegt hinter {D:dem} Tisch.", "Der Ball rollt hinter {A:den} Tisch.", "The ball is behind the table.", "The ball rolls behind the table."],
        ["in", "Der Ball liegt in {D:der} Kiste.", "Ich lege den Ball in {A:die} Kiste.", "The ball is in the box.", "I put the ball in the box."],
        ["neben", "Der Ball liegt neben {D:dem} Tisch.", "Ich lege den Ball neben {A:den} Tisch.", "The ball is next to the table.", "I put the ball next to the table."],
        ["über", "Der Ball hängt über {D:dem} Tisch.", "Ich werfe den Ball über {A:den} Tisch.", "The ball is hanging above the table.", "I throw the ball over the table."],
        ["unter", "Der Ball liegt unter {D:dem} Tisch.", "Der Ball rollt unter {A:den} Tisch.", "The ball is under the table.", "The ball rolls under the table."],
        ["vor", "Der Ball liegt vor {D:dem} Tisch.", "Der Ball rollt vor {A:den} Tisch.", "The ball is in front of the table.", "The ball rolls in front of the table."],
        ["zwischen", "Der Ball liegt zwischen {D:dem} Tisch und {D:der} Kiste.", "Der Ball rollt zwischen {A:den} Tisch und {A:die} Kiste.", "The ball is between the table and the box.", "The ball rolls between the table and the box."],
      ] },
      { kind: "table", title: "Same preposition, two cases", head: ["Noun", "Wo? Dative", "Wohin? Accusative"],
        rows: [
          ["der Garten", "{D:im} Garten", "in {A:den} Garten"],
          ["das Kino", "{D:im} Kino", "{A:ins} Kino"],
          ["die Küche", "in {D:der} Küche", "in {A:die} Küche"],
          ["die Zimmer", "in {D:den} Zimmer*n*", "in {A:die} Zimmer"],
        ] },
    ],
    points: [
      { title: "Nine prepositions with two cases", text: "An, auf, hinter, in, neben, über, unter, vor and zwischen. Ask a question first. Wo? (where is it?) gives the dative. Wohin? (where is it going?) gives the accusative.", examples: [
        ["Wo ist die Katze? Auf {D:dem} Sofa.", "Where's the cat? On the sofa."],
        ["Wohin springt die Katze? Auf {A:das} Sofa.", "Where's the cat jumping? Onto the sofa."],
        ["Wir sitzen in {D:der} Küche.", "We're sitting in the kitchen."],
        ["Wir gehen in {A:die} Küche.", "We're going into the kitchen."],
      ] },
      { title: "Moving inside one place is still wo", text: "Wohin needs a goal, a change of place. Running around in the park has no new goal.", examples: [
        ["Die Kinder laufen {D:im} Park.", "The children are running around in the park."],
        ["Die Kinder laufen in {A:den} Park.", "The children are running into the park."],
        ["Wir schwimmen {D:im} See.", "We're swimming in the lake."],
      ] },
      { title: "Short forms", text: "In dem becomes im, in das becomes ins, an dem becomes am, an das becomes ans.", examples: [
        ["Ich bin {D:im} Büro.", "I'm in the office."],
        ["Ich gehe {A:ins} Büro.", "I'm going to the office."],
        ["Wir fahren {A:ans} Meer.", "We're going to the seaside."],
        ["Wir sind {D:am} Meer.", "We're at the seaside."],
      ] },
      { title: "For time, an, in, vor and zwischen take the dative", text: "There is no movement in time, so these four take the dative.", examples: [
        ["{D:Am} Montag habe ich frei.", "I'm off on Monday."],
        ["Vor {D:dem} Essen wasche ich mir die Hände.", "I wash my hands before eating."],
        ["{D:Im} Sommer fahren wir weg.", "We're going away in the summer."],
      ] },
    ],
    traps: [
      ["Ich gehe im Kino.", "Ich gehe {A:ins} Kino.", "Going to the cinema is a goal: accusative."],
      ["Das Bild hängt an die Wand.", "Das Bild hängt an {D:der} Wand.", "Hängen without an object describes where something is: dative."],
      ["vor einen Monat", "vor {D:einem} Monat", "For time, vor takes the dative."],
    ],
    hook: "Arrow: it moves to a new place, accusative. Dot: it is there, dative.",
  },

  "prepositions/position-verbs": {
    visuals: [
      { kind: "table", title: "Put it there, then it is there", head: ["Put (wohin? accusative)", "Be (wo? dative)", "How"],
        rows: [
          ["Ich *stelle* die Flasche auf {A:den} Tisch.", "Die Flasche *steht* auf {D:dem} Tisch.", "upright"],
          ["Ich *lege* das Buch auf {A:das} Regal.", "Das Buch *liegt* auf {D:dem} Regal.", "flat"],
          ["Ich *setze* das Kind auf {A:den} Stuhl.", "Das Kind *sitzt* auf {D:dem} Stuhl.", "sitting"],
          ["Ich *hänge* die Jacke an {A:den} Haken.", "Die Jacke *hängt* {D:am} Haken.", "hanging"],
        ] },
      { kind: "table", title: "Perfekt", head: ["Put (regular)", "Be (irregular)"],
        rows: [["hat gestellt", "hat gestanden"], ["hat gelegt", "hat gelegen"], ["hat gesetzt", "hat gesessen"], ["hat gehängt", "hat gehangen"]] },
    ],
    points: [
      { title: "Put: an action with an object", text: "Stellen, legen, setzen and hängen need an object. Someone moves it to a place, so ask wohin? and use the accusative.", examples: [
        ["Wohin stellst du die Blumen? Auf {A:den} Tisch.", "Where are you putting the flowers? On the table."],
        ["Ich lege mein Handy auf {A:das} Sofa.", "I put my phone on the sofa."],
        ["Sie hängt das Bild an {A:die} Wand.", "She hangs the picture on the wall."],
      ] },
      { title: "Be: a state, no object", text: "Stehen, liegen, sitzen and hängen say where something is. Ask wo? and use the dative.", examples: [
        ["Die Blumen stehen auf {D:dem} Tisch.", "The flowers are on the table."],
        ["Mein Handy liegt auf {D:dem} Sofa.", "My phone is on the sofa."],
        ["Das Bild hängt an {D:der} Wand.", "The picture is on the wall."],
      ] },
      { title: "Upright or flat?", text: "German says how a thing is placed. Bottles, glasses and shoes usually stand. Books, phones and keys usually lie.", examples: [
        ["Die Schuhe stehen vor {D:der} Tür.", "The shoes are in front of the door."],
        ["Der Schlüssel liegt neben {D:dem} Laptop.", "The key is next to the laptop."],
        ["Die Milch steht {D:im} Kühlschrank.", "The milk is in the fridge."],
      ] },
      { title: "Hängen does both jobs", text: "With an object it means put: hat gehängt. Without an object it means be: hat gehangen.", examples: [
        ["Ich hänge die Jacke an {A:den} Haken.", "I hang the jacket on the hook."],
        ["Die Jacke hängt {D:am} Haken.", "The jacket is on the hook."],
      ] },
      { title: "Putting yourself somewhere: sich setzen, sich legen", text: "You are the object, so you need a reflexive pronoun.", examples: [
        ["Ich setze mich auf {A:den} Stuhl.", "I sit down on the chair."],
        ["Jetzt sitze ich auf {D:dem} Stuhl.", "Now I'm sitting on the chair."],
        ["Er legt sich {A:ins} Bett.", "He gets into bed."],
      ] },
    ],
    traps: [
      ["Ich stehe die Flasche in den Kühlschrank.", "Ich *stelle* die Flasche in {A:den} Kühlschrank.", "Putting something somewhere: stellen."],
      ["Das Buch legt auf dem Tisch.", "Das Buch *liegt* auf {D:dem} Tisch.", "Saying where something is: liegen."],
      ["Ich setze auf den Stuhl.", "Ich *setze mich* auf {A:den} Stuhl.", "You put yourself there: sich setzen."],
    ],
  },

  "prepositions/places": {
    visuals: [{
      kind: "table", title: "Wohin, wo, woher", head: ["Kind of place", "Wohin? (to)", "Wo? (at, in)", "Woher? (from)"],
      rows: [
        ["Cities, most countries", "*nach* Berlin", "*in* Berlin", "*aus* Berlin"],
        ["Countries with an article", "in {A:die} Schweiz", "in {D:der} Schweiz", "aus {D:der} Schweiz"],
        ["People, doctors", "{D:zum} Arzt, zu Anna", "{D:beim} Arzt, bei Anna", "{D:vom} Arzt, von Anna"],
        ["Buildings and rooms", "{A:ins} Kino", "{D:im} Kino", "aus {D:dem} Kino"],
        ["Stations, stops, meeting points", "{D:zum} Bahnhof", "{D:am} Bahnhof", "{D:vom} Bahnhof"],
        ["Markets, events", "auf {A:den} Markt", "auf {D:dem} Markt", "{D:vom} Markt"],
        ["Water and the sea", "{A:ans} Meer", "{D:am} Meer", "{D:vom} Meer"],
        ["Home", "*nach* Hause", "*zu* Hause", "von zu Hause"],
      ],
      note: "Zu, bei, von and aus always take the dative. In, an and auf switch: accusative for wohin, dative for wo.",
    }],
    points: [
      { title: "Cities and countries: nach, in, aus", text: "No article, no case to worry about.", examples: [
        ["Ich fliege *nach* Spanien.", "I'm flying to Spain."],
        ["Wir wohnen *in* Köln.", "We live in Cologne."],
        ["Sie kommt *aus* Brasilien.", "She's from Brazil."],
      ] },
      { title: "Countries with an article: in, in, aus", text: "Die Schweiz, die Türkei, der Iran, die USA, die Niederlande. These use in + accusative to say where you are going.", examples: [
        ["Wir fahren in {A:die} Schweiz.", "We're going to Switzerland."],
        ["Er lebt in {D:der} Türkei.", "He lives in Turkey."],
        ["Meine Kollegin kommt aus {D:dem} Iran.", "My colleague is from Iran."],
        ["Sie fliegt in {A:die} USA.", "She's flying to the USA."],
      ] },
      { title: "People and doctors: zu, bei, von", text: "Use these for a person's home, a doctor, a hairdresser, a company.", examples: [
        ["Ich gehe heute {D:zur} Ärztin.", "I'm going to the doctor today."],
        ["Wir essen bei {D:meiner} Oma.", "We're eating at my grandma's."],
        ["Er kommt gerade {D:vom} Friseur.", "He's just come from the hairdresser's."],
      ] },
      { title: "Home is special", text: "Nach Hause when you are on the way. Zu Hause when you are there.", examples: [
        ["Ich gehe jetzt *nach* Hause.", "I'm going home now."],
        ["Ich bin *zu* Hause.", "I'm at home."],
        ["Ich arbeite heute von zu Hause aus.", "I'm working from home today."],
      ] },
      { title: "Zu or in, von or aus?", text: "Zu means you go there to do something. In means you go inside. Von is where you were; aus means out of a building.", examples: [
        ["Ich gehe {D:zum} Supermarkt.", "I'm going to the supermarket."],
        ["Ich gehe in {A:den} Supermarkt.", "I'm going into the supermarket."],
        ["Ich hole die Kinder von {D:der} Schule ab.", "I pick the children up from school."],
        ["Die Kinder kommen aus {D:der} Schule.", "The children are coming out of the school."],
      ] },
    ],
    traps: [
      ["Ich fahre zu Berlin.", "Ich fahre *nach* Berlin.", "Cities: nach."],
      ["Ich gehe nach dem Arzt.", "Ich gehe {D:zum} Arzt.", "People and doctors: zu. Nach dem Arzt means after the doctor."],
      ["Ich bin nach Hause.", "Ich bin *zu* Hause.", "At home is zu Hause."],
      ["Ich fahre nach die Schweiz.", "Ich fahre in {A:die} Schweiz.", "A country with an article takes in + accusative."],
    ],
  },

  "prepositions/time": {
    visuals: [
      { kind: "table", title: "When?", head: ["Preposition", "Use it for", "Example"],
        rows: [
          ["um", "clock times", "*um* 8 Uhr, *um* halb neun"],
          ["am", "days, dates, parts of the day", "*am* Montag, *am* 3. Mai, *am* Abend"],
          ["im", "months, seasons", "*im* Mai, *im* Winter"],
          ["in", "a time from now", "in {D:einer} Stunde, in zwei Wochen"],
          ["vor", "ago; before", "vor drei Jahre*n*, vor {D:dem} Essen"],
          ["seit", "since; for (still true)", "seit {D:einem} Monat"],
          ["nach", "after", "nach {D:dem} Kurs"],
          ["ab", "from ... on", "ab Montag"],
          ["bis", "until", "bis Freitag"],
          ["von ... bis", "from ... to", "von 9 bis 17 Uhr"],
          ["für", "a planned length of time", "für {A:eine} Woche"],
        ] },
      { kind: "table", title: "Vor, seit and in on one timeline", head: ["Past", "Past until now", "Future"],
        rows: [["*vor* zwei Jahren: I came here", "*seit* zwei Jahren: I've been here", "*in* zwei Jahren: I'll be finished"]] },
    ],
    points: [
      { title: "Um, am, im", text: "Um for the clock, am for the day, im for the month or season.", examples: [
        ["Wir treffen uns *um* sieben.", "We're meeting at seven."],
        ["*Am* Wochenende schlafe ich lange.", "On weekends I sleep late."],
        ["*Im* Dezember ist es früh dunkel.", "In December it gets dark early."],
      ] },
      { title: "Vor, seit, in", text: "Vor looks back to a point in the past. Seit runs from the past up to now, and the verb stays in the present. In looks forward from now.", examples: [
        ["Ich bin *vor* drei Jahren nach Deutschland gekommen.", "I came to Germany three years ago."],
        ["Ich wohne *seit* drei Jahren hier.", "I've lived here for three years."],
        ["*In* drei Jahren mache ich meinen Abschluss.", "I'll graduate in three years."],
      ] },
      { title: "From, until, how long", text: "Ab and bis mark the start and end. Für gives a planned length.", examples: [
        ["Der Laden hat *von* 9 *bis* 20 Uhr offen.", "The shop is open from 9 am to 8 pm."],
        ["*Ab* Montag arbeite ich Vollzeit.", "From Monday I'm working full-time."],
        ["Wir fahren *für* zwei Wochen nach Italien.", "We're going to Italy for two weeks."],
        ["*Nach* dem Essen machen wir einen Spaziergang.", "After the meal we go for a walk."],
      ] },
    ],
    traps: [
      ["Ich lerne Deutsch für zwei Jahre.", "Ich lerne *seit* zwei Jahren Deutsch.", "If it's still going on, use seit and the present tense."],
      ["am Mai, im Montag", "*im* Mai, *am* Montag", "Months take im. Days take am."],
      ["am Nacht", "*in der* Nacht", "Night is the exception: in der Nacht, or nachts."],
      ["vor zwei Jahre", "vor zwei Jahre*n*", "Vor and seit take the dative, so the plural noun adds -n."],
    ],
  },

  "prepositions/verbs": {
    visuals: [
      { kind: "table", title: "Common verbs with prepositions", head: ["Verb", "Preposition and case", "Example"],
        rows: [
          ["warten", "auf + accusative", "Ich warte auf {A:den} Bus."],
          ["sich freuen (coming up)", "auf + accusative", "Ich freue mich auf {A:den} Urlaub."],
          ["sich freuen (now or past)", "über + accusative", "Ich freue mich über {A:das} Geschenk."],
          ["denken", "an + accusative", "Ich denke an {A:dich}."],
          ["sich interessieren", "für + accusative", "Er interessiert sich für {A:den} Job."],
          ["sich ärgern", "über + accusative", "Sie ärgert sich über {A:den} Lärm."],
          ["sich kümmern", "um + accusative", "Wer kümmert sich um {A:den} Hund?"],
          ["sprechen", "mit + dative, über + accusative", "Ich spreche mit {D:dem} Chef über {A:das} Problem."],
          ["Angst haben", "vor + dative", "Das Kind hat Angst vor {D:dem} Hund."],
          ["teilnehmen", "an + dative", "Ich nehme an {D:dem} Kurs teil."],
          ["fragen", "nach + dative", "Er fragt nach {D:dem} Weg."],
          ["träumen", "von + dative", "Sie träumt von {D:einem} Haus."],
        ] },
      { kind: "steps", title: "Asking and answering", steps: [
        ["Is it a person?", "Preposition + wen or wem", "Auf *wen* wartest du? Auf meinen Bruder."],
        ["Is it a thing or an idea?", "Wo + preposition", "*Worauf* wartest du? Auf den Bus."],
        ["Do you want to answer without repeating the thing?", "Da + preposition", "Ich warte *darauf*."],
      ] },
    ],
    points: [
      { title: "Learn the verb with its preposition", text: "The preposition often doesn't match English. Learn them together, like one long word.", examples: [
        ["Wir warten auf {A:den} Zug.", "We're waiting for the train."],
        ["Ich denke oft an {A:meine} Familie.", "I often think of my family."],
        ["Hast du Angst vor {D:der} Prüfung?", "Are you afraid of the exam?"],
      ] },
      { title: "Auf or über with sich freuen", text: "Auf for something still to come. Über for something you already have.", examples: [
        ["Ich freue mich auf {A:das} Wochenende.", "I'm looking forward to the weekend."],
        ["Ich freue mich über {A:deine} Nachricht.", "I'm happy about your message."],
      ] },
      { title: "Questions and short answers", text: "If the preposition starts with a vowel, add r: wo + auf = worauf, da + über = darüber. Otherwise no r: womit, damit.", examples: [
        ["*Worüber* sprecht ihr? Über {A:den} Film.", "What are you talking about? The film."],
        ["Mit *wem* sprichst du? Mit {D:meiner} Schwester.", "Who are you talking to? My sister."],
        ["Denkst du an den Termin? Ja, ich denke *daran*.", "Will you remember the appointment? Yes, I will."],
      ] },
      { title: "Phrases for letters and e-mails", text: "These come up in almost every exam letter. Learn them whole.", examples: [
        ["Ich freue mich auf {A:Ihre} Antwort.", "I look forward to your reply."],
        ["Ich interessiere mich für {A:Ihr} Angebot.", "I'm interested in your offer."],
        ["Vielen Dank für {A:Ihre} Hilfe.", "Thank you very much for your help."],
        ["Ich möchte mich über {A:den} Lärm beschweren.", "I'd like to complain about the noise."],
      ] },
    ],
    traps: [
      ["Ich warte für den Bus.", "Ich warte auf {A:den} Bus.", "Warten auf, not für."],
      ["Danke! Ich freue mich auf das Geschenk.", "Danke! Ich freue mich über {A:das} Geschenk.", "You already have it, so it's über. Auf is for something still to come."],
      ["Worauf wartest du? Auf meine Mutter.", "Auf *wen* wartest du? Auf meine Mutter.", "For people, ask auf wen, not worauf."],
    ],
  },

  "verbs/reflexive": {
    visuals: [{
      kind: "table", title: "Reflexive pronouns", head: ["Person", "Accusative", "Dative"],
      rows: [["ich", "{A:mich}", "{D:mir}"], ["du", "{A:dich}", "{D:dir}"], ["er / sie / es", "{A:sich}", "{D:sich}"], ["wir", "{A:uns}", "{D:uns}"], ["ihr", "{A:euch}", "{D:euch}"], ["sie / Sie", "{A:sich}", "{D:sich}"]],
      note: "Only ich and du have two different forms. In the third person it is always sich.",
    }],
    points: [
      { title: "The action goes back to the subject", text: "Ich wasche das Auto: the car gets washed. Ich wasche mich: I get washed.", examples: [
        ["Ich wasche {A:mich}.", "I'm having a wash."],
        ["Er zieht {A:sich} an.", "He's getting dressed."],
        ["Wir treffen {A:uns} um acht.", "We're meeting at eight."],
      ] },
      { title: "Some verbs are always reflexive", text: "German uses a reflexive pronoun where English doesn't: sich freuen, sich beeilen, sich erinnern, sich ausruhen, sich bedanken.", examples: [
        ["Ich freue {A:mich} auf das Wochenende.", "I'm looking forward to the weekend."],
        ["Beeil {A:dich}!", "Hurry up!"],
        ["Erinnerst du {A:dich} an mich?", "Do you remember me?"],
      ] },
      { title: "Body and clothes: dative", text: "If the sentence has another object, the reflexive pronoun becomes dative.", examples: [
        ["Ich putze {D:mir} die Zähne.", "I'm brushing my teeth."],
        ["Wasch {D:dir} die Hände!", "Wash your hands!"],
        ["Sie zieht {D:sich} eine Jacke an.", "She's putting a jacket on."],
      ] },
    ],
    traps: [
      ["Ich freue auf den Urlaub.", "Ich freue {A:mich} auf den Urlaub.", "Sich freuen needs its pronoun."],
      ["Ich putze mich die Zähne.", "Ich putze {D:mir} die Zähne.", "With a second object, the pronoun is dative."],
      ["Setzen Sie bitte!", "Setzen Sie {A:sich} bitte!", "Formal Sie still needs sich."],
    ],
  },

  "verbs/separable": {
    visuals: [
      frame("Where the prefix goes", [
        ["Ich", "*rufe*", "dich morgen", "*an*."],
        ["Wann", "*kommst*", "du", "*zurück*?"],
        ["Ich", "*muss*", "dich morgen", "*anrufen*."],
      ], "The two highlighted columns are the verb positions. The middle can be long; the prefix waits at the end."),
      { kind: "table", title: "After weil, dass or wenn, the verb joins up again", head: ["Main clause", "After weil, dass, wenn"],
        rows: [
          ["Ich *rufe* dich *an*.", "..., weil ich dich *anrufe*."],
          ["Der Zug *fährt* um acht *ab*.", "..., dass der Zug um acht *abfährt*."],
          ["Wir *kaufen* heute *ein*.", "..., wenn wir heute *einkaufen*."],
        ] },
    ],
    points: [
      { title: "Main clause: split", text: "The verb goes to position 2. The prefix goes to the very end.", examples: [
        ["Ich *stehe* um sieben *auf*.", "I get up at seven."],
        ["Der Kurs *fängt* am Montag *an*.", "The course starts on Monday."],
        ["*Kaufst* du heute *ein*?", "Are you doing the shopping today?"],
      ] },
      { title: "With a modal verb: one piece at the end", text: "Müssen, können, wollen take position 2. The separable verb stays whole at the end.", examples: [
        ["Ich *muss* morgen früh *aufstehen*.", "I have to get up early tomorrow."],
        ["*Kannst* du mich *abholen*?", "Can you pick me up?"],
      ] },
      { title: "After weil, dass, wenn, and in the Perfekt", text: "After weil, dass or wenn the whole verb goes last, in one piece. In the Perfekt, ge sits between the prefix and the verb.", examples: [
        ["Ich komme später, weil ich noch *einkaufe*.", "I'll come later because I still have to do the shopping."],
        ["Hast du sie *angerufen*?", "Did you call her?"],
        ["Der Zug ist pünktlich *abgefahren*.", "The train left on time."],
      ] },
      { title: "Separable or not?", text: "Separable prefixes carry the stress: ANrufen, AUFstehen, EINkaufen. Be-, ver-, er-, ent-, ge- and zer- are never stressed and never split off: verSTEHen, beSUchen.", examples: [
        ["Ich *verstehe* das nicht.", "I don't understand that."],
        ["Wir *besuchen* unsere Oma.", "We're visiting our grandma."],
      ] },
    ],
    traps: [
      ["Ich anrufe dich morgen.", "Ich *rufe* dich morgen *an*.", "In a main clause the prefix goes to the end."],
      ["Ich muss heute kaufen ein.", "Ich muss heute *einkaufen*.", "After a modal verb, keep it in one piece."],
      ["Wann anfängt der Kurs?", "Wann *fängt* der Kurs *an*?", "In a question too, the prefix goes to the end."],
    ],
  },

  "verbs/irregular": {
    visuals: [{
      kind: "table", title: "Vowel changes with du and er / sie / es", head: ["Change", "Infinitive", "du", "er / sie / es"],
      rows: [
        ["a → ä", "fahren", "f*ä*hrst", "f*ä*hrt"],
        ["a → ä", "schlafen", "schl*ä*fst", "schl*ä*ft"],
        ["au → äu", "laufen", "l*äu*fst", "l*äu*ft"],
        ["e → i", "sprechen", "spr*i*chst", "spr*i*cht"],
        ["e → i", "essen", "*i*sst", "*i*sst"],
        ["e → i", "nehmen", "n*imm*st", "n*imm*t"],
        ["e → ie", "lesen", "l*ie*st", "l*ie*st"],
        ["e → ie", "sehen", "s*ie*hst", "s*ie*ht"],
      ],
      note: "Ich, wir, ihr and sie keep the normal vowel: ich fahre, wir fahren, ihr fahrt.",
    }],
    points: [
      { title: "Only two forms change", text: "Ich and wir are regular. Only du and er / sie / es get the new vowel.", examples: [
        ["Ich fahre mit dem Rad, aber mein Mann *fährt* mit dem Auto.", "I cycle, but my husband drives."],
        ["Wir lesen viel. Du *liest* nur Nachrichten.", "We read a lot. You only read the news."],
        ["Was *isst* du gern?", "What do you like to eat?"],
      ] },
      { title: "Some change more than the vowel", text: "Nehmen becomes nimmst and nimmt. Learn these as whole words.", examples: [
        ["*Nimmst* du den Bus?", "Are you taking the bus?"],
        ["Er *nimmt* einen Kaffee.", "He'll have a coffee."],
      ] },
      { title: "Haben and wissen", text: "Two very common verbs are irregular in their own way: du hast, er hat; ich weiß, du weißt, er weiß.", examples: [
        ["*Hast* du Zeit?", "Do you have time?"],
        ["Er *weiß* es nicht.", "He doesn't know."],
      ] },
    ],
    traps: [
      ["Er fahrt nach Bonn.", "Er *fährt* nach Bonn.", "Er / sie / es gets the umlaut."],
      ["Ihr fährt zusammen.", "Ihr *fahrt* zusammen.", "Ihr keeps the normal vowel."],
      ["Du esst zu schnell.", "Du *isst* zu schnell.", "Essen: du isst, er isst."],
    ],
  },

  "verbs/werden": {
    visuals: [
      { kind: "table", title: "Werden in the present", head: ["Person", "werden", "Example"],
        rows: [["ich", "*werde*", "Ich werde müde."], ["du", "*wirst*", "Du wirst nass."], ["er / sie / es", "*wird*", "Es wird kalt."], ["wir", "*werden*", "Wir werden Eltern."], ["ihr", "*werdet*", "Ihr werdet besser."], ["sie / Sie", "*werden*", "Sie werden 30."]] },
      { kind: "table", title: "Three jobs of werden", head: ["Job", "Pattern", "Example"],
        rows: [["become", "werden + noun or adjective", "Sie *wird* Ärztin."], ["future", "werden + infinitive", "Sie *wird* morgen *kommen*."], ["passive", "werden + participle", "Das Haus *wird* *gebaut*."]] },
    ],
    points: [
      { title: "Werden means become", text: "Use it for jobs, age, weather and feelings that change. No article before a job.", examples: [
        ["Mein Sohn *wird* Koch.", "My son is going to be a chef."],
        ["Im Oktober *werde* ich 40.", "I'll turn 40 in October."],
        ["Es *wird* dunkel.", "It's getting dark."],
        ["Sie *wird* schnell nervös.", "She gets nervous quickly."],
      ] },
      { title: "Past forms", text: "One-word past (Präteritum): wurde. Perfekt: ist geworden, with sein.", examples: [
        ["Er *wurde* Lehrer.", "He became a teacher."],
        ["Es *ist* kalt *geworden*.", "It's turned cold."],
      ] },
    ],
    traps: [
      ["Ich werde ein Paket.", "Ich *bekomme* ein Paket.", "Bekommen means get or receive. It does not mean become."],
      ["Du werdest müde.", "Du *wirst* müde.", "Du wirst and er wird are irregular. Learn them by heart."],
      ["Es hat kalt geworden.", "Es *ist* kalt *geworden*.", "Werden uses sein in the Perfekt."],
    ],
  },

  "verbs/lassen": {
    visuals: [
      { kind: "table", title: "Lassen in the present", head: ["Person", "lassen"], rows: [["ich", "lasse"], ["du", "l*ä*sst"], ["er / sie / es", "l*ä*sst"], ["wir", "lassen"], ["ihr", "lasst"], ["sie / Sie", "lassen"]] },
      frame("Lassen + infinitive", [
        ["Ich", "*lasse*", "mein Auto", "*reparieren*."],
        ["Sie", "*lässt*", "die Kinder im Garten", "*spielen*."],
        ["Wir", "*lassen*", "uns die Pizza", "*liefern*."],
      ]),
    ],
    points: [
      { title: "Have something done", text: "Someone else does the job for you. Lassen in position 2, the infinitive at the end, no zu.", examples: [
        ["Ich *lasse* meine Haare *schneiden*.", "I'm getting my hair cut."],
        ["Wir *lassen* das Auto *waschen*.", "We're having the car washed."],
        ["Er *lässt* die Heizung *reparieren*.", "He's having the heating repaired."],
      ] },
      { title: "Allow or let", text: "Lassen can also mean allow.", examples: [
        ["Meine Eltern *lassen* mich lange *schlafen*.", "My parents let me sleep late."],
        ["*Lass* mich *helfen*!", "Let me help!"],
      ] },
      { title: "Leave something", text: "Without an infinitive, lassen means leave.", examples: [
        ["Ich *lasse* den Schirm im Auto.", "I'll leave the umbrella in the car."],
        ["*Lass* das Licht an.", "Leave the light on."],
      ] },
    ],
    traps: [
      ["Ich lasse das Auto zu reparieren.", "Ich *lasse* das Auto *reparieren*.", "No zu after lassen."],
      ["Er lasst mich schlafen.", "Er *lässt* mich schlafen.", "Du lässt and er lässt have an umlaut."],
    ],
  },

  "tenses/simple-past": {
    visuals: [{
      kind: "table", title: "The forms you need most", head: ["Person", "sein", "haben", "können", "müssen"],
      rows: [["ich", "war", "hatte", "konnte", "musste"], ["du", "warst", "hattest", "konntest", "musstest"], ["er / sie / es", "war", "hatte", "konnte", "musste"], ["wir", "waren", "hatten", "konnten", "mussten"], ["ihr", "wart", "hattet", "konntet", "musstet"], ["sie / Sie", "waren", "hatten", "konnten", "mussten"]],
      note: "Ich and er / sie / es are the same. Modal verbs lose their umlaut: können becomes konnte.",
    }],
    points: [
      { title: "In speech: war and hatte", text: "Germans tell most past stories in the Perfekt (ich habe gemacht). But for sein, haben and the modal verbs they use the one-word past, the Präteritum: war, hatte, konnte.", examples: [
        ["Gestern *war* ich beim Arzt.", "I was at the doctor's yesterday."],
        ["Wir *hatten* keine Zeit.", "We didn't have time."],
        ["*Warst* du schon mal in Wien?", "Have you ever been to Vienna?"],
      ] },
      { title: "Modal verbs: no umlaut, -te", text: "Können becomes konnte, müssen musste, wollen wollte, dürfen durfte, sollen sollte. The other verb goes to the end.", examples: [
        ["Ich *konnte* nicht *schlafen*.", "I couldn't sleep."],
        ["Sie *musste* lange *warten*.", "She had to wait a long time."],
        ["Wir *wollten* ins Kino *gehen*.", "We wanted to go to the cinema."],
      ] },
    ],
    traps: [
      ["Ich könnte gestern nicht kommen.", "Ich *konnte* gestern nicht kommen.", "Könnte with an umlaut means could (polite or possible). The past is konnte."],
      ["Er warst krank.", "Er *war* krank.", "Er / sie / es has no ending: war, hatte, konnte."],
    ],
  },

  "tenses/future": {
    visuals: [
      frame("Werden + infinitive (Futur I)", [
        ["Ich", "*werde*", "dich morgen", "*anrufen*."],
        ["Morgen", "*wird*", "es", "*regnen*."],
        ["Wir", "*werden*", "bald", "*umziehen*."],
      ]),
      { kind: "table", title: "Two ways to talk about the future", head: ["Present + time word", "Futur I"],
        rows: [["Morgen *fahre* ich nach Bonn.", "Ich *werde* morgen nach Bonn *fahren*."], ["Nächste Woche *habe* ich Urlaub.", "Ich *werde* nächste Woche Urlaub *haben*."]],
        note: "For plans, Germans usually use the present with a time word. Futur I sounds more like a promise or a prediction." },
    ],
    points: [
      { title: "Werden in position 2, infinitive at the end", text: "Same frame as a modal verb.", examples: [
        ["Ich *werde* dir *helfen*.", "I'll help you."],
        ["Es *wird* bald *regnen*.", "It's going to rain soon."],
        ["*Wirst* du *kommen*?", "Will you come?"],
      ] },
      { title: "Promises and predictions", text: "With wohl, werden also makes a guess about now.", examples: [
        ["Ich *werde* pünktlich *sein*, versprochen.", "I'll be on time, I promise."],
        ["Er *wird* wohl krank *sein*.", "He's probably ill."],
      ] },
      { title: "Plans: the present is enough", text: "With morgen, nächste Woche or im Sommer you don't need werden.", examples: [
        ["Am Samstag *besuche* ich meine Eltern.", "I'm visiting my parents on Saturday."],
        ["Im Juli *machen* wir Urlaub.", "We're going on holiday in July."],
      ] },
    ],
    traps: [
      ["Ich will morgen kommen.", "Ich *werde* morgen kommen.", "Ich will means I want to. For I will, use werde."],
      ["Ich werde morgen gehe.", "Ich *werde* morgen *gehen*.", "The second verb is an infinitive."],
    ],
  },

  "tenses/present-perfect": {
    visuals: [
      frame("A sentence frame", [
        ["Ich", "*habe*", "gestern Pizza", "*gegessen*."],
        ["Wir", "*sind*", "nach Hamburg", "*gefahren*."],
        ["Gestern", "*hat*", "er lange", "*gearbeitet*."],
      ]),
      { kind: "steps", title: "Haben or sein?", steps: [
        ["Is there an accusative object (what? whom?)?", "haben", "Ich *habe* einen Kuchen *gebacken*."],
        ["Is it moving or travelling: gehen, fahren, laufen, fliegen, schwimmen?", "sein", "Ich *bin* nach Hause *gegangen*."],
        ["Does it show a change of state: einschlafen, aufwachen, werden?", "sein", "Er *ist* *eingeschlafen*."],
        ["Is it sein, bleiben or passieren?", "sein", "Sie *ist* hier *geblieben*."],
        ["None of these?", "haben", "Ich *habe* lange *geschlafen*."],
      ] },
    ],
    points: [
      { title: "Two parts, two places", text: "Haben or sein in position 2. The participle at the very end.", examples: [
        ["Ich *habe* Deutsch *gelernt*.", "I learned German."],
        ["*Hast* du schon *gegessen*?", "Have you eaten yet?"],
        ["Wir *sind* spät *angekommen*.", "We arrived late."],
      ] },
      { title: "The normal past in speech", text: "The Perfekt covers both I did and I have done. Use it when you talk about what you did.", examples: [
        ["Am Wochenende *haben* wir Freunde *besucht*.", "We visited friends on the weekend."],
        ["Ich *habe* lange *geschlafen*.", "I slept late."],
        ["Sie *ist* 2019 nach Deutschland *gekommen*.", "She came to Germany in 2019."],
      ] },
    ],
    traps: [
      ["Ich habe gestern gegessen Pizza.", "Ich *habe* gestern Pizza *gegessen*.", "The participle goes last."],
      ["Ich habe nach Berlin gefahren.", "Ich *bin* nach Berlin *gefahren*.", "Travelling to a place: sein."],
    ],
  },

  "tenses/perfect-sein": {
    visuals: [
      { kind: "table", title: "Verbs that take sein", head: ["Type", "Verbs"],
        rows: [
          ["Moving or travelling", "gehen: *ist gegangen*; fahren: *ist gefahren*; fliegen: *ist geflogen*; laufen: *ist gelaufen*; schwimmen: *ist geschwommen*"],
          ["Change of state", "aufstehen: *ist aufgestanden*; einschlafen: *ist eingeschlafen*; aufwachen: *ist aufgewacht*; werden: *ist geworden*"],
          ["Learn these too", "sein: *ist gewesen*; bleiben: *ist geblieben*; passieren: *ist passiert*"],
        ] },
      { kind: "table", title: "Sein in the present", head: persons, rows: [["bin", "bist", "ist", "sind", "seid", "sind"]] },
    ],
    points: [
      { title: "Moving or travelling", text: "Verbs of moving your body or travelling take sein, even without a destination.", examples: [
        ["Ich *bin* zur Arbeit *gefahren*.", "I drove to work."],
        ["Wir *sind* im See *geschwommen*.", "We swam in the lake."],
        ["*Bist* du zu Fuß *gegangen*?", "Did you walk?"],
      ] },
      { title: "Change of state", text: "Something becomes different: you wake up, fall asleep, become something.", examples: [
        ["Das Baby *ist* *eingeschlafen*.", "The baby has fallen asleep."],
        ["Wann *bist* du *aufgestanden*?", "When did you get up?"],
        ["Was *ist* *passiert*?", "What happened?"],
      ] },
      { title: "Sein and bleiben", text: "Nothing moves, but these still take sein.", examples: [
        ["Wir *sind* im Urlaub in Polen *gewesen*.", "We've been to Poland on holiday."],
        ["Ich *bin* zu Hause *geblieben*.", "I stayed at home."],
      ] },
    ],
    traps: [
      ["Ich habe aufgestanden.", "Ich *bin* *aufgestanden*.", "Getting up is a change of state: sein."],
      ["Er hat geblieben.", "Er *ist* *geblieben*.", "Bleiben takes sein, although nothing moves."],
    ],
  },

  "tenses/perfect-haben": {
    visuals: [
      { kind: "table", title: "Haben in the present", head: persons, rows: [["habe", "hast", "hat", "haben", "habt", "haben"]] },
      { kind: "table", title: "Haben, even when something happens", head: ["Verb", "Perfekt", "Why haben?"],
        rows: [
          ["schlafen", "hat geschlafen", "no change of place or state"],
          ["warten", "hat gewartet", "you stay where you are"],
          ["sich freuen", "hat sich gefreut", "reflexive verbs take haben"],
          ["fahren + object", "hat das Auto gefahren", "it has an object (das Auto)"],
        ] },
    ],
    points: [
      { title: "Most verbs take haben", text: "Especially verbs with a direct object.", examples: [
        ["Ich *habe* eine Wohnung *gefunden*.", "I found an apartment."],
        ["Wir *haben* zusammen *gekocht*.", "We cooked together."],
        ["Er *hat* den ganzen Tag *gearbeitet*.", "He worked all day."],
      ] },
      { title: "Reflexive verbs always take haben", text: "Sich freuen, sich beeilen, sich waschen.", examples: [
        ["Ich *habe* mich *gefreut*.", "I was pleased."],
        ["Sie *hat* sich *beeilt*.", "She hurried."],
      ] },
      { title: "Staying put takes haben", text: "Schlafen, sitzen, warten, wohnen: no movement and no change.", examples: [
        ["Wir *haben* eine Stunde *gewartet*.", "We waited for an hour."],
        ["Er *hat* in Berlin *gewohnt*.", "He lived in Berlin."],
      ] },
    ],
    traps: [
      ["Ich bin gut geschlafen.", "Ich *habe* gut *geschlafen*.", "Sleeping is not a change. Falling asleep is: ich bin eingeschlafen."],
      ["Ich bin mich gefreut.", "Ich *habe* mich *gefreut*.", "Reflexive verbs take haben."],
      ["Er ist das Auto gefahren.", "Er *hat* das Auto *gefahren*.", "With a direct object, fahren takes haben."],
    ],
  },

  "tenses/past-participle": {
    visuals: [{
      kind: "table", title: "Building the participle", head: ["Verb type", "Pattern", "Examples"],
      rows: [
        ["regular", "ge- ... -t", "machen: *ge*mach*t*; kaufen: *ge*kauf*t*; arbeiten: *ge*arbeit*et*"],
        ["irregular", "ge- ... -en, often a new vowel", "schreiben: *ge*schrieb*en*; trinken: *ge*trunk*en*; gehen: *ge*gang*en*"],
        ["separable", "prefix + ge + verb", "einkaufen: ein*ge*kauft; aufstehen: auf*ge*standen"],
        ["prefixes that never split off: be-, ver-, er-, ent-, ge-, zer-", "no ge-", "besuchen: besucht; verstehen: verstanden; erklären: erklärt"],
        ["-ieren", "no ge-, ends in -t", "telefonieren: telefoniert; studieren: studiert"],
      ],
    }],
    points: [
      { title: "Regular verbs: ge- ... -t", text: "Most verbs. If the verb without -en ends in -t or -d, add -et: arbeit-en, gearbeitet; red-en, geredet.", examples: [
        ["Ich habe Brot *gekauft*.", "I bought bread."],
        ["Wir haben viel *gelacht*.", "We laughed a lot."],
        ["Sie hat lange *gewartet*.", "She waited a long time."],
      ] },
      { title: "Irregular verbs: learn them in pairs", text: "They end in -en and often change the vowel. Learn infinitive and participle together: trinken, getrunken.", examples: [
        ["Er hat viel Wasser *getrunken*.", "He drank a lot of water."],
        ["Wir sind nach Hause *gegangen*.", "We went home."],
        ["Hast du das Buch *gelesen*?", "Have you read the book?"],
      ] },
      { title: "Prefixes", text: "Prefixes that split off (ein-, auf-, an-) take ge in the middle. Prefixes that never split off (be-, ver-, er-) and -ieren verbs take no ge.", examples: [
        ["Ich habe schon *eingekauft*.", "I've already done the shopping."],
        ["Hast du das *verstanden*?", "Did you understand that?"],
        ["Er hat mir alles *erklärt*.", "He explained everything to me."],
        ["Sie hat Medizin *studiert*.", "She studied medicine."],
      ] },
    ],
    traps: [
      ["Ich habe meine Oma gebesucht.", "Ich habe meine Oma *besucht*.", "Be- verbs take no ge."],
      ["Er hat getelefoniert.", "Er hat *telefoniert*.", "-ieren verbs take no ge."],
      ["Wir haben geeinkauft.", "Wir haben ein*ge*kauft.", "Ge goes between the prefix and the verb."],
    ],
  },

  "sentence-structure/dass-das": {
    visuals: [{ kind: "steps", title: "Dass or das?", steps: [
      ["Does it stand right before a noun?", "das (article)", "*Das* Auto ist neu."],
      ["Does it come after a comma and point back to a das-noun? You could say welches.", "das", "Das Buch, *das* ich lese, ist gut."],
      ["Does it start a whole clause after sagen, denken, hoffen or wissen?", "dass", "Ich hoffe, *dass* du kommst."],
    ] }],
    points: [
      { title: "Dass joins a clause", text: "It means that. The verb of its clause goes to the end. English often drops that; German never drops dass.", examples: [
        ["Ich weiß, *dass* du müde bist.", "I know you're tired."],
        ["Er sagt, *dass* er später kommt.", "He says he's coming later."],
        ["Gut, *dass* du anrufst.", "It's good that you're calling."],
      ] },
      { title: "Das is an article or a pronoun", text: "It points to a thing or refers back to a das-noun.", examples: [
        ["*Das* Wetter ist schön.", "The weather is nice."],
        ["*Das* stimmt nicht.", "That's not true."],
        ["Das ist das Haus, *das* ich kaufen möchte.", "That's the house I'd like to buy."],
      ] },
    ],
    traps: [
      ["Ich glaube, das er recht hat.", "Ich glaube, *dass* er recht hat.", "After glauben, sagen or hoffen: dass."],
      ["Das Kind, dass dort spielt, ...", "Das Kind, *das* dort spielt, ...", "It refers back to das Kind, so it is das (welches)."],
    ],
    hook: "After a comma, can you say welches? Then it's das.",
  },

  "sentence-structure/answering-questions": {
    visuals: [
      { kind: "table", title: "Question words", head: ["Question", "Asks for", "Short answer"],
        rows: [
          ["Wer?", "a person (subject)", "{N:Meine} Schwester."],
          ["Wen?", "a person (object)", "{A:Meinen} Chef."],
          ["Wem?", "a person (receiver)", "{D:Meiner} Mutter."],
          ["Was?", "a thing", "{A:Einen} Kaffee."],
          ["Wann?", "a time", "Um neun Uhr."],
          ["Wo?", "a place", "In Bonn."],
          ["Wohin?", "a destination", "Nach Bonn."],
          ["Woher?", "an origin", "Aus Bonn."],
          ["Warum?", "a reason", "Weil ich krank bin."],
          ["Wie lange?", "a length of time", "Zwei Stunden."],
          ["Wie viel?", "an amount", "Zehn Euro."],
        ] },
      { kind: "table", title: "Ja, nein, doch", head: ["Question", "Yes", "No"],
        rows: [["Kommst du?", "*Ja*, ich komme.", "*Nein*, ich komme nicht."], ["Kommst du nicht?", "*Doch*, ich komme.", "*Nein*, ich komme nicht."]] },
    ],
    points: [
      { title: "Short answer or full sentence", text: "In conversation a short answer is fine. In a full answer the verb is in position 2.", examples: [
        ["Wann beginnt der Film? Um acht.", "When does the film start? At eight."],
        ["Um acht *beginnt* der Film.", "The film starts at eight."],
        ["Wohin fährst du? Ich *fahre* nach Hamburg.", "Where are you going? I'm going to Hamburg."],
      ] },
      { title: "Doch says yes to a negative question", text: "If the question has nicht or kein and you want to say yes, use doch.", examples: [
        ["Hast du keinen Hunger? *Doch*!", "Aren't you hungry? Yes, I am!"],
        ["Du kommst nicht mit? *Doch*, ich komme mit.", "You're not coming? Yes, I am."],
        ["Ist das nicht teuer? *Nein*, gar nicht.", "Isn't that expensive? No, not at all."],
      ] },
    ],
    traps: [
      ["Hast du keine Zeit? Ja, ich habe Zeit.", "Hast du keine Zeit? *Doch*, ich habe Zeit.", "To contradict a negative question, use doch."],
      ["Wo fährst du? Nach Berlin.", "*Wohin* fährst du? Nach Berlin.", "For a destination, ask wohin."],
    ],
  },

  "conjunctions/subordinate": {
    visuals: [
      { kind: "table", title: "The verb goes to the end", head: ["Main clause", "Conjunction", "Middle", "Verb"], mark: [3],
        rows: [
          ["Ich bleibe zu Hause,", "*weil*", "ich krank", "*bin*."],
          ["Ich glaube,", "*dass*", "er heute", "*kommt*."],
          ["Ich frage,", "*ob*", "du morgen Zeit", "*hast*."],
          ["Ich lerne,", "*wenn*", "ich Zeit", "*habe*."],
        ] },
      { kind: "table", title: "Subordinate clause first: verb, comma, verb", head: ["Subordinate clause", "Verb", "Rest"], mark: [1],
        rows: [
          ["Wenn ich Zeit *habe*,", "*komme*", "ich."],
          ["Weil es *regnet*,", "*bleiben*", "wir zu Hause."],
          ["Als ich klein *war*,", "*wohnte*", "ich in Polen."],
        ],
        note: "The whole subordinate clause counts as position 1, so the main verb comes straight after the comma." },
    ],
    points: [
      { title: "The verb goes last", text: "After weil, dass, wenn, ob and als, the verb with the person ending (ich bin, du hast) moves to the end of its clause.", examples: [
        ["Ich komme nicht, weil ich keine Zeit *habe*.", "I'm not coming because I don't have time."],
        ["Sie sagt, dass der Zug Verspätung *hat*.", "She says the train is delayed."],
        ["Ich frage, ob du mitkommen *willst*.", "I'm asking whether you want to come along."],
      ] },
      { title: "Modal verbs and the Perfekt", text: "The verb with the person ending is the very last word.", examples: [
        ["Ich bleibe hier, weil ich arbeiten *muss*.", "I'm staying here because I have to work."],
        ["Ich glaube, dass er schon gegangen *ist*.", "I think he's already left."],
      ] },
      { title: "Starting with the subordinate clause", text: "Then the main clause starts with its verb.", examples: [
        ["Wenn du Hilfe brauchst, *ruf* mich an.", "If you need help, call me."],
        ["Weil ich müde war, *bin* ich früh ins Bett gegangen.", "I was tired, so I went to bed early."],
      ] },
    ],
    traps: [
      ["..., weil ich bin krank.", "..., weil ich krank *bin*.", "After weil the verb goes to the end."],
      ["Wenn ich Zeit habe, ich komme.", "Wenn ich Zeit habe, *komme* ich.", "After the comma, the verb comes first."],
      ["..., denn ich krank bin.", "..., denn ich *bin* krank.", "Denn keeps normal word order. Weil sends the verb to the end."],
    ],
  },

  "conjunctions/dass-weil": {
    visuals: [{ kind: "steps", title: "Dass or weil?", steps: [
      ["Does the clause answer warum? (why?)", "weil", "Ich bleibe zu Hause, *weil* ich krank bin."],
      ["Does it say what someone says, thinks, hopes or knows?", "dass", "Ich hoffe, *dass* es dir gut geht."],
    ] }],
    points: [
      { title: "Weil gives a reason", text: "It answers warum? and means because.", examples: [
        ["Ich lerne Deutsch, *weil* ich hier arbeite.", "I'm learning German because I work here."],
        ["Sie ist müde, *weil* sie viel gearbeitet hat.", "She's tired because she's worked a lot."],
        ["*Weil* es regnet, nehmen wir den Bus.", "Because it's raining, we're taking the bus."],
      ] },
      { title: "Dass gives the content", text: "It follows verbs like sagen, denken, finden, hoffen, wissen and means that.", examples: [
        ["Ich finde, *dass* der Film zu lang ist.", "I think the film is too long."],
        ["Es ist gut, *dass* du da bist.", "It's good that you're here."],
        ["Er weiß, *dass* ich morgen frei habe.", "He knows I'm off tomorrow."],
      ] },
    ],
    traps: [
      ["Ich denke, weil er krank ist.", "Ich denke, *dass* er krank ist.", "What you think: dass."],
      ["Ich komme nicht, dass ich keine Zeit habe.", "Ich komme nicht, *weil* ich keine Zeit habe.", "A reason: weil."],
    ],
    hook: "Warum? Weil. Was? Dass.",
  },

  "conjunctions/dass-ob": {
    visuals: [{ kind: "steps", title: "Dass, ob or a W-word?", steps: [
      ["Is it a fact or a statement?", "dass", "Ich weiß, *dass* er kommt."],
      ["Is it a yes or no question inside the sentence?", "ob", "Ich weiß nicht, *ob* er kommt."],
      ["Is it a W-question inside the sentence?", "keep the W-word", "Ich weiß nicht, *wann* er kommt."],
    ] }],
    points: [
      { title: "Ob means whether, or if", text: "Ob turns a yes or no question into part of a sentence. Typical starts: Ich weiß nicht, ob ... Kannst du mir sagen, ob ... Ich frage mich, ob ...", examples: [
        ["Ist er zu Hause? Ich weiß nicht, *ob* er zu Hause ist.", "Is he at home? I don't know if he's at home."],
        ["Weißt du, *ob* der Supermarkt offen hat?", "Do you know if the supermarket is open?"],
        ["Sie fragt, *ob* sie mitkommen kann.", "She's asking if she can come along."],
      ] },
      { title: "Dass means that", text: "Use it for what you know or say.", examples: [
        ["Ich weiß, *dass* er zu Hause ist.", "I know he's at home."],
        ["Ich glaube, *dass* es morgen regnet.", "I think it'll rain tomorrow."],
      ] },
      { title: "W-questions keep their W-word", text: "No ob before wo, wann, wie or warum.", examples: [
        ["Wo wohnt sie? Weißt du, *wo* sie wohnt?", "Where does she live? Do you know where she lives?"],
        ["Wann kommt der Bus? Ich frage, *wann* der Bus kommt.", "When does the bus come? I'm asking when the bus comes."],
      ] },
    ],
    traps: [
      ["Ich weiß nicht, wenn er kommt.", "Ich weiß nicht, *ob* er kommt.", "This English if is ob, not wenn."],
      ["Kannst du mir sagen, wo ist der Bahnhof?", "Kannst du mir sagen, wo der Bahnhof *ist*?", "Inside a sentence, the verb goes to the end."],
    ],
  },

  "conjunctions/als-wenn-wann": {
    visuals: [
      { kind: "steps", title: "Als, wenn or wann?", steps: [
        ["Is it a question about time, direct or indirect?", "wann", "*Wann* kommst du? Ich weiß nicht, *wann* er kommt."],
        ["Is it one event or one period in the past?", "als", "*Als* ich jung war, ..."],
        ["Anything else: repeated, now, future or a condition?", "wenn", "*Wenn* ich Zeit habe, ..."],
      ] },
      { kind: "table", title: "Once or again and again", head: ["", "Once", "Again and again"],
        rows: [["Past", "*als*: Als ich 18 war, ...", "*wenn*: Immer wenn ich krank war, ..."], ["Now or future", "*wenn*: Wenn ich morgen ankomme, ...", "*wenn*: Wenn ich Zeit habe, ..."]] },
    ],
    points: [
      { title: "Als: once, in the past", text: "One event or one period of life.", examples: [
        ["*Als* ich ein Kind war, hatte ich einen Hund.", "When I was a child, I had a dog."],
        ["*Als* wir in Berlin ankamen, regnete es.", "When we arrived in Berlin, it was raining."],
        ["Ich war 25, *als* ich nach Deutschland kam.", "I was 25 when I came to Germany."],
      ] },
      { title: "Wenn: every time, or if", text: "Repeated events, the present, the future and conditions.", examples: [
        ["*Wenn* ich müde bin, trinke ich Kaffee.", "When I'm tired, I drink coffee."],
        ["Immer *wenn* er kam, brachte er Blumen mit.", "Every time he came, he brought flowers."],
        ["*Wenn* es morgen regnet, bleiben wir zu Hause.", "If it rains tomorrow, we'll stay at home."],
      ] },
      { title: "Wann: a question about time", text: "Direct or inside a sentence.", examples: [
        ["*Wann* fängt der Kurs an?", "When does the course start?"],
        ["Weißt du, *wann* der Laden zumacht?", "Do you know when the shop closes?"],
      ] },
    ],
    traps: [
      ["Wenn ich klein war, wohnte ich in Polen.", "*Als* ich klein war, wohnte ich in Polen.", "One period in the past: als."],
      ["Ruf mich an, wann du ankommst.", "Ruf mich an, *wenn* du ankommst.", "Not a question: wenn."],
      ["Ich weiß nicht, wenn der Zug fährt.", "Ich weiß nicht, *wann* der Zug fährt.", "An indirect question about time: wann."],
    ],
  },

  "passive-voice/present": {
    visuals: [
      { kind: "table", title: "From active to passive", head: ["Active: who does it?", "Passive: what happens?"],
        rows: [
          ["Der Koch macht {A:den} Salat.", "{N:Der} Salat *wird* *gemacht*."],
          ["Der Mechaniker repariert {A:das} Auto.", "{N:Das} Auto *wird* *repariert*."],
          ["Man spricht hier Deutsch.", "Hier *wird* Deutsch *gesprochen*."],
        ],
        note: "The accusative object becomes the subject, so den becomes der." },
      frame("Werden + participle", [["Das Auto", "*wird*", "heute", "*repariert*."], ["Hier", "*wird*", "Deutsch", "*gesprochen*."]]),
    ],
    points: [
      { title: "When the action matters more than the person", text: "Notices, instructions and processes often use the passive.", examples: [
        ["Die Tür *wird* um acht *geöffnet*.", "The door is opened at eight."],
        ["Hier *wird* nicht *geraucht*.", "No smoking here."],
        ["Die Briefe *werden* morgen *verschickt*.", "The letters are being sent tomorrow."],
      ] },
      { title: "Adding the person with von", text: "If you want to say who does it, use von + dative.", examples: [
        ["Das Essen *wird* von meinem Vater *gekocht*.", "The food is cooked by my father."],
        ["Der Brief *wird* vom Chef *unterschrieben*.", "The letter is signed by the boss."],
      ] },
      { title: "Action or result", text: "Werden + participle: it is happening. Sein + participle: the result.", examples: [
        ["Die Tür *wird* *geöffnet*.", "The door is being opened."],
        ["Die Tür *ist* *geöffnet*.", "The door is open."],
      ] },
    ],
    traps: [
      ["Das Auto ist gerade repariert.", "Das Auto *wird* gerade *repariert*.", "An action in progress needs werden."],
      ["Die Fenster wird geputzt.", "Die Fenster *werden* *geputzt*.", "Plural subject: werden."],
    ],
  },

  "passive-voice/simple-past": {
    visuals: [
      { kind: "table", title: "Wurde", head: ["Person", "werden, Präteritum"], rows: [["ich", "wurde"], ["du", "wurdest"], ["er / sie / es", "wurde"], ["wir", "wurden"], ["ihr", "wurdet"], ["sie / Sie", "wurden"]] },
      frame("Wurde + participle", [["Das Haus", "*wurde*", "1920", "*gebaut*."], ["Die Gäste", "*wurden*", "am Bahnhof", "*abgeholt*."]]),
    ],
    points: [
      { title: "Common in news and reports", text: "You see the past passive in newspapers and history texts.", examples: [
        ["Das Rathaus *wurde* 1890 *gebaut*.", "The town hall was built in 1890."],
        ["Der Dieb *wurde* gestern *gefasst*.", "The thief was caught yesterday."],
        ["Zwei Personen *wurden* *verletzt*.", "Two people were injured."],
      ] },
      { title: "Same pattern, past form", text: "Swap wird for wurde, werden for wurden.", examples: [
        ["Die Tür *wurde* um acht *geöffnet*.", "The door was opened at eight."],
        ["Ich *wurde* zum Vorstellungsgespräch *eingeladen*.", "I was invited to the job interview."],
        ["Die Fenster *wurden* letzte Woche *geputzt*.", "The windows were cleaned last week."],
      ] },
    ],
    traps: [
      ["Das Haus wurde gebaut worden.", "Das Haus *wurde* *gebaut*.", "The Präteritum passive has no worden."],
      ["Die Briefe wurde verschickt.", "Die Briefe *wurden* *verschickt*.", "Plural: wurden."],
    ],
  },

  "passive-voice/future": {
    visuals: [
      frame("Werden twice", [["Die Brücke", "*wird*", "nächstes Jahr", "*gebaut werden*."], ["Die Ergebnisse", "*werden*", "morgen", "*veröffentlicht werden*."]]),
      { kind: "table", title: "What people usually say", head: ["Futur I passive", "Present passive + time word"],
        rows: [["Die Straße *wird* morgen *gesperrt werden*.", "Die Straße *wird* morgen *gesperrt*."]] },
    ],
    points: [
      { title: "Werden at the start and at the end", text: "Conjugated werden in position 2. Participle and werden at the end.", examples: [
        ["Das Paket *wird* morgen *geliefert werden*.", "The parcel will be delivered tomorrow."],
        ["Die Regeln *werden* *geändert werden*.", "The rules will be changed."],
        ["Der Termin *wird* *verschoben werden*.", "The appointment will be postponed."],
      ] },
      { title: "In speech, the present is enough", text: "A time word already shows the future.", examples: [
        ["Das Paket *wird* morgen *geliefert*.", "The parcel is being delivered tomorrow."],
        ["Die Straße *wird* nächste Woche *gebaut*.", "The road is being built next week."],
        ["Die neue Brücke *wird* 2028 *eröffnet*.", "The new bridge opens in 2028."],
      ] },
    ],
    traps: [
      ["Das Haus wird gebaut wird.", "Das Haus *wird* *gebaut werden*.", "At the end: the infinitive werden."],
      ["Das Haus wird werden gebaut.", "Das Haus *wird* *gebaut werden*.", "Participle first, then werden."],
    ],
  },

  "passive-voice/perfect": {
    visuals: [
      frame("Sein + participle + worden", [["Die Tür", "*ist*", "schon", "*geöffnet worden*."], ["Die Pakete", "*sind*", "gestern", "*gebracht worden*."]]),
      { kind: "table", title: "Worden or geworden?", head: ["Meaning", "Form", "Example"],
        rows: [["become", "geworden", "Er ist Arzt *geworden*."], ["passive", "worden", "Er ist operiert *worden*."]] },
    ],
    points: [
      { title: "Sein + participle + worden", text: "Something has been done.", examples: [
        ["Mein Fahrrad *ist* *gestohlen worden*.", "My bike has been stolen."],
        ["Die Rechnung *ist* schon *bezahlt worden*.", "The bill has already been paid."],
        ["Wir *sind* nicht *informiert worden*.", "We weren't informed."],
      ] },
      { title: "Worden only after a participle", text: "Geworden means become. Worden is only for the passive.", examples: [
        ["Das Haus *ist* *verkauft worden*.", "The house has been sold."],
        ["Das Wetter *ist* schlecht *geworden*.", "The weather has turned bad."],
        ["Ist das Paket schon *abgeholt worden*?", "Has the parcel been collected yet?"],
      ] },
    ],
    traps: [
      ["Die Tür hat geöffnet worden.", "Die Tür *ist* *geöffnet worden*.", "The passive Perfekt always uses sein."],
      ["Das Auto ist repariert geworden.", "Das Auto *ist* *repariert worden*.", "Passive: worden, without ge-."],
    ],
  },

  "adjectives/endings": {
    visuals: [
      { kind: "table", title: "After der, die, das", head: genders,
        rows: [
          ["Nominative", "der rot*e* Mantel", "das rot*e* Kleid", "die rot*e* Jacke", "die rot*en* Schuhe"],
          ["Accusative", "{A:den} rot*en* Mantel", "das rot*e* Kleid", "die rot*e* Jacke", "die rot*en* Schuhe"],
          ["Dative", "{D:dem} rot*en* Mantel", "{D:dem} rot*en* Kleid", "{D:der} rot*en* Jacke", "{D:den} rot*en* Schuhe*n*"],
        ],
        note: "Five places take -e. Everything else takes -en." },
      { kind: "table", title: "After ein, kein, mein", head: genders,
        rows: [
          ["Nominative", "ein rot*er* Mantel", "ein rot*es* Kleid", "eine rot*e* Jacke", "keine rot*en* Schuhe"],
          ["Accusative", "{A:einen} rot*en* Mantel", "ein rot*es* Kleid", "eine rot*e* Jacke", "keine rot*en* Schuhe"],
          ["Dative", "{D:einem} rot*en* Mantel", "{D:einem} rot*en* Kleid", "{D:einer} rot*en* Jacke", "{D:keinen} rot*en* Schuhe*n*"],
        ],
        note: "Ein doesn't show the gender, so the adjective does: roter for der, rotes for das." },
    ],
    points: [
      { title: "Der, die, das already show the case", text: "So the adjective only needs -e or -en.", examples: [
        ["Der neu*e* Kollege ist nett.", "The new colleague is nice."],
        ["Ich nehme die blau*e* Tasche.", "I'll take the blue bag."],
        ["Wir sprechen mit dem neu*en* Kollegen.", "We're talking to the new colleague."],
      ] },
      { title: "Ein gives no hint, so the adjective does", text: "Masculine nominative: -er. Neuter nominative and accusative: -es.", examples: [
        ["Das ist ein gut*er* Plan.", "That's a good plan."],
        ["Ich habe ein klein*es* Problem.", "I have a small problem."],
        ["Er sucht einen billig*en* Laptop.", "He's looking for a cheap laptop."],
      ] },
      { title: "After sein: no ending", text: "If the adjective comes after the noun, it doesn't change.", examples: [
        ["Der Mantel ist rot.", "The coat is red."],
        ["Die Wohnung ist hell.", "The apartment is bright."],
      ] },
    ],
    traps: [
      ["ein neue Laptop", "ein neu*er* Laptop", "After ein, a masculine noun in the nominative needs -er."],
      ["Der Mantel ist rote.", "Der Mantel ist rot.", "No ending after sein."],
      ["mit dem neue Auto", "mit dem neu*en* Auto", "After an article, the dative ending is always -en."],
    ],
  },

  "adjectives/comparisons": {
    visuals: [{
      kind: "table", title: "Three steps", head: ["Base", "Comparative", "Superlative"],
      rows: [
        ["schnell", "schnell*er*", "am schnell*sten*"], ["klein", "klein*er*", "am klein*sten*"], ["alt", "*ä*lt*er*", "am *ä*lt*esten*"], ["groß", "gr*ö*ß*er*", "am gr*ö*ß*ten*"],
        ["gut", "*besser*", "am *besten*"], ["gern", "*lieber*", "am *liebsten*"], ["viel", "*mehr*", "am *meisten*"], ["hoch", "*höher*", "am *höchsten*"],
      ],
      note: "Many short adjectives add an umlaut: alt, älter; groß, größer; jung, jünger.",
    }],
    points: [
      { title: "Different: als", text: "Comparative + als means more ... than.", examples: [
        ["Berlin ist größer *als* Bonn.", "Berlin is bigger than Bonn."],
        ["Ich trinke lieber Tee *als* Kaffee.", "I prefer tea to coffee."],
        ["Heute ist es wärmer *als* gestern.", "It's warmer today than yesterday."],
      ] },
      { title: "The same: so ... wie", text: "So + base form + wie means as ... as.", examples: [
        ["Er ist *so* groß *wie* sein Vater.", "He's as tall as his father."],
        ["Das Hotel ist nicht *so* teuer *wie* gedacht.", "The hotel isn't as expensive as we thought."],
      ] },
      { title: "The most: am ...-sten", text: "After a verb, the superlative is am + -sten.", examples: [
        ["Im Frühling ist es hier *am schönsten*.", "It's nicest here in spring."],
        ["Wer läuft *am schnellsten*?", "Who runs the fastest?"],
        ["Ich esse *am liebsten* Pizza.", "Pizza is my favourite food."],
      ] },
    ],
    traps: [
      ["Er ist größer wie ich.", "Er ist größer *als* ich.", "A comparative takes als. Wie is for as ... as."],
      ["Das ist mehr gut.", "Das ist *besser*.", "German adds -er. It doesn't use mehr like English more."],
      ["Ich trinke gerner Tee.", "Ich trinke *lieber* Tee.", "Gern, lieber, am liebsten."],
    ],
  },

  "requests/polite-advice": {
    visuals: [
      { kind: "table", title: "The forms", head: ["Person", "können", "sollen", "werden", "haben"],
        rows: [["ich", "könnte", "sollte", "würde", "hätte"], ["du", "könntest", "solltest", "würdest", "hättest"], ["er / sie / es", "könnte", "sollte", "würde", "hätte"], ["wir", "könnten", "sollten", "würden", "hätten"], ["ihr", "könntet", "solltet", "würdet", "hättet"], ["sie / Sie", "könnten", "sollten", "würden", "hätten"]] },
      { kind: "table", title: "From direct to polite", head: ["Direct", "Polite"],
        rows: [["Hilf mir!", "*Könntest* du mir bitte *helfen*?"], ["Ich will einen Kaffee.", "Ich *hätte* gern einen Kaffee."], ["Geh zum Arzt!", "Du *solltest* zum Arzt *gehen*."]] },
    ],
    points: [
      { title: "Asking politely: Könnten Sie ...?", text: "The other verb goes to the end.", examples: [
        ["*Könnten* Sie mir bitte *helfen*?", "Could you help me, please?"],
        ["*Könntest* du das Fenster *zumachen*?", "Could you close the window?"],
        ["*Könnten* wir den Termin *verschieben*?", "Could we move the appointment?"],
      ] },
      { title: "Giving advice: Du solltest ...", text: "Sollte is softer than muss.", examples: [
        ["Du *solltest* mehr *schlafen*.", "You should sleep more."],
        ["Sie *sollten* das Formular heute *abgeben*.", "You should hand in the form today."],
      ] },
      { title: "Saying what you'd like: Ich würde gern ...", text: "For ordering, ich hätte gern is very common.", examples: [
        ["Ich *würde* gern in Köln *wohnen*.", "I'd like to live in Cologne."],
        ["*Würdest* du mir *helfen*?", "Would you help me?"],
        ["Ich *hätte* gern ein Wasser.", "I'd like a water, please."],
      ] },
    ],
    traps: [
      ["Ich wurde gern kommen.", "Ich *würde* gern kommen.", "Wurde without an umlaut is the past of werden."],
      ["Du solltest mehr schläfst.", "Du *solltest* mehr *schlafen*.", "The second verb is an infinitive at the end."],
    ],
  },
};
