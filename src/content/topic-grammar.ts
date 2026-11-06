import type { Course, GrammarLesson, GrammarVisual } from "../lib/types.ts";

const frame = (title: string, head: string[], rows: string[][], mark: number[], note?: string): GrammarVisual => ({ kind: "table", title, head, rows, mark, ...(note ? { note } : {}) });
const slots = ["Position 1", "Verb", "Middle", "End"];
const verbPlaces: GrammarVisual = {
  kind: "table", title: "Where does the verb go?", head: ["Sentence type", "Verb", "Example"],
  rows: [
    ["Statement", "position 2", "Am Samstag *gehe* ich ins Kino."],
    ["Yes/no question", "position 1", "*Kommst* du mit?"],
    ["W-question", "position 2", "Wann *fängt* der Film an?"],
    ["After dass, weil, wenn, ob", "at the end", "..., wenn du Zeit *hast*."],
    ["Imperative", "position 1", "*Komm* doch mit!"],
  ],
};

interface TopicGrammar {
  lesson: GrammarLesson;
  related: string[];
}

export const TOPIC_GRAMMAR: Record<string, TopicGrammar> = {
  w1: {
    related: ["verbs/separable", "verbs/irregular", "sentence-structure/answering-questions"],
    lesson: {
      visuals: [
        frame("The verb stays in position 2", slots, [
          ["Ich", "*stehe*", "um sieben", "*auf*."],
          ["Um sieben", "*stehe*", "ich", "*auf*."],
          ["Am Abend", "*sehe*", "ich oft", "*fern*."],
          ["Wann", "*stehst*", "du", "*auf*?"],
        ], [1, 3], "Position 1 can be the subject, a time or a question word. The verb never moves from position 2."),
        { kind: "steps", title: "Which kind of question?", steps: [
          ["Do you want a yes or a no?", "Verb first", "*Arbeitest* du heute?"],
          ["Do you want information?", "W-word, then the verb", "Wann *fängt* dein Kurs an?"],
        ] },
      ],
      points: [
        { title: "Position 2 is for the verb", text: "Whatever comes first, the verb stays second. If a time comes first, the subject moves behind the verb.", examples: [
          ["Ich *frühstücke* um sieben.", "I have breakfast at seven."],
          ["Um sieben *frühstücke* ich.", "At seven I have breakfast."],
          ["Am Wochenende *schlafe* ich lange.", "On weekends I sleep late."],
        ] },
        { title: "Asking about someone's day", text: "W-question: question word, then verb. Yes/no question: the verb comes first.", examples: [
          ["Wann *stehst* du auf?", "When do you get up?"],
          ["Wie oft *machst* du Sport?", "How often do you do sport?"],
          ["*Hast* du am Montag Zeit?", "Are you free on Monday?"],
        ] },
        { title: "Daily routine verbs that split", text: "Aufstehen, anfangen, einkaufen, fernsehen and anrufen send their first part to the end.", examples: [
          ["Der Kurs *fängt* um neun *an*.", "The course starts at nine."],
          ["Am Samstag *kaufe* ich *ein*.", "On Saturday I do the shopping."],
          ["Ich *rufe* meine Mutter am Abend *an*.", "I call my mother in the evening."],
        ] },
        { title: "How often?", text: "Immer, oft, manchmal, selten and nie usually come right after the verb and the subject.", examples: [
          ["Ich trinke *oft* Tee.", "I often drink tea."],
          ["Er kommt *nie* zu spät.", "He's never late."],
          ["Wir kochen *manchmal* zusammen.", "We sometimes cook together."],
        ] },
      ],
      traps: [
        ["Am Montag ich arbeite.", "Am Montag *arbeite* ich.", "The verb stays in position 2, so the subject moves behind it."],
        ["Wann du stehst auf?", "Wann *stehst* du *auf*?", "After the W-word comes the verb."],
        ["Ich aufstehe um sieben.", "Ich *stehe* um sieben *auf*.", "The first part of the verb goes to the end."],
      ],
      hook: "Verb second. Count the parts of the sentence, not the words.",
    },
  },

  w2: {
    related: ["cases/nominative-accusative-dative", "prepositions/accusative", "requests/polite-advice"],
    lesson: {
      visuals: [
        { kind: "table", title: "Accusative: only the masculine changes", head: ["", "Masculine", "Neuter", "Feminine", "Plural"],
          rows: [
            ["Nominative", "der / ein / kein Apfel", "das / ein / kein Brot", "die / eine / keine Milch", "die / keine Eier"],
            ["Accusative", "{A:den} / {A:einen} / {A:keinen} Apfel", "{A:das} / {A:ein} / {A:kein} Brot", "{A:die} / {A:eine} / {A:keine} Milch", "{A:die} / {A:keine} Eier"],
          ],
          note: "Plural without an article: Ich kaufe Eier." },
        { kind: "steps", title: "Kein or nicht?", steps: [
          ["Is there a noun with ein, or a noun with no article?", "kein", "Ich esse *kein* Fleisch. Ich habe *keine* Zeit."],
          ["Anything else: a verb, an adjective, a noun with der, die or das?", "nicht", "Der Kaffee ist *nicht* heiß."],
        ] },
        frame("Modal verbs make a bracket", slots, [
          ["Ich", "*möchte*", "ein Kilo Äpfel", "*kaufen*."],
          ["Wir", "*müssen*", "noch Milch", "*holen*."],
          ["", "*Kann*", "ich mit Karte", "*bezahlen*?"],
        ], [1, 3]),
      ],
      points: [
        { title: "Shopping verbs take the accusative", text: "Kaufen, brauchen, nehmen, möchten, haben, suchen and es gibt: the thing you want is accusative.", examples: [
          ["Ich brauche {A:einen} Korb.", "I need a basket."],
          ["Ich nehme {A:den} Käse.", "I'll take the cheese."],
          ["Gibt es hier {A:einen} Bäcker?", "Is there a bakery here?"],
        ] },
        { title: "Kein for nouns, nicht for the rest", text: "Kein replaces ein. Nicht says no to a verb, an adjective or a specific thing.", examples: [
          ["Wir haben {A:keinen} Zucker mehr.", "We don't have any sugar left."],
          ["Ich esse *kein* Fleisch.", "I don't eat meat."],
          ["Die Tomaten sind *nicht* frisch.", "The tomatoes aren't fresh."],
        ] },
        { title: "Modal verbs: position 2 and the end", text: "Möchten, können, müssen, dürfen and wollen take position 2. The other verb waits at the end.", examples: [
          ["Ich *möchte* ein Brot *kaufen*.", "I'd like to buy a loaf of bread."],
          ["Du *musst* an der Kasse *bezahlen*.", "You have to pay at the till."],
          ["*Kann* ich mit Karte *bezahlen*?", "Can I pay by card?"],
        ] },
        { title: "Mein, dein, unser work like ein", text: "They take the same endings: meinen Korb, meine Tasche, mein Handy.", examples: [
          ["Hast du {A:deinen} Einkaufszettel?", "Do you have your shopping list?"],
          ["Ich suche {A:meine} Tasche.", "I'm looking for my bag."],
        ] },
        { title: "Asking politely", text: "Ich hätte gern and Könnten Sie ...? sound friendly. Ich will sounds rude in a shop.", examples: [
          ["Ich *hätte gern* 200 Gramm Käse.", "I'd like 200 grams of cheese, please."],
          ["*Könnten* Sie mir eine Tüte geben?", "Could you give me a bag?"],
          ["Was *kostet* ein Kilo Tomaten?", "How much is a kilo of tomatoes?"],
        ] },
      ],
      traps: [
        ["Ich möchte ein Apfel.", "Ich möchte {A:einen} Apfel.", "Möchten takes the accusative: masculine ein becomes einen."],
        ["Ich habe nicht Zeit.", "Ich habe *keine* Zeit.", "A noun without an article takes kein."],
        ["Ich will einen Kaffee.", "Ich *hätte gern* einen Kaffee.", "When you order, ich will sounds rude."],
      ],
      hook: "Der becomes den. Everything else stays the same.",
    },
  },

  w3: {
    related: ["cases/dative", "prepositions/dative", "cases/dative-pronouns"],
    lesson: {
      visuals: [
        { kind: "table", title: "Dative articles", head: ["", "Masculine", "Neuter", "Feminine", "Plural"],
          rows: [
            ["Nominative", "der Vermieter", "das Haus", "die Wohnung", "die Nachbarn"],
            ["Dative", "{D:dem} Vermieter", "{D:dem} Haus", "{D:der} Wohnung", "{D:den} Nachbarn"],
            ["Dative with ein / mein", "{D:einem} Vermieter", "{D:einem} Haus", "{D:einer} Wohnung", "{D:meinen} Nachbarn"],
          ],
          note: "Nachbarn already ends in -n, so nothing is added in the dative plural." },
        { kind: "table", title: "Verbs that take the dative", head: ["Verb", "Example"],
          rows: [
            ["helfen", "Ich helfe {D:der} Nachbarin."],
            ["gehören", "Das Fahrrad gehört {D:dem} Mann von oben."],
            ["gefallen", "Die Wohnung gefällt {D:mir}."],
            ["danken", "Wir danken {D:dem} Hausmeister."],
            ["antworten", "Der Vermieter antwortet {D:uns} nicht."],
          ] },
      ],
      points: [
        { title: "Dative after aus, bei, mit, nach, seit, von, zu", text: "These seven always take the dative.", examples: [
          ["Ich wohne seit {D:einem} Jahr hier.", "I've lived here for a year."],
          ["Die Wohnung liegt in der Nähe {D:vom} Bahnhof.", "The apartment is near the station."],
          ["Ich spreche mit {D:dem} Vermieter.", "I'm talking to the landlord."],
        ] },
        { title: "Verbs that take the dative", text: "The person who is helped, thanked or answered is dative.", examples: [
          ["Kannst du {D:mir} beim Umzug helfen?", "Can you help me move?"],
          ["Die Küche gefällt {D:uns} sehr.", "We really like the kitchen."],
          ["Wem gehört der Kinderwagen im Flur?", "Whose stroller is that in the hallway?"],
        ] },
        { title: "Dative pronouns", text: "mir, dir, ihm, ihr, uns, euch, ihnen, Ihnen.", examples: [
          ["Wie gefällt {D:dir} die Wohnung?", "How do you like the apartment?"],
          ["Der Nachbar hilft {D:uns} oft.", "The neighbour often helps us."],
          ["Ich gebe {D:Ihnen} den Schlüssel.", "I'll give you the key."],
        ] },
      ],
      traps: [
        ["Ich wohne bei meine Eltern.", "Ich wohne bei {D:meinen} Eltern.", "Bei takes the dative: plural meinen."],
        ["Die Wohnung gefällt mich.", "Die Wohnung gefällt {D:mir}.", "Gefallen takes the dative."],
        ["Ich helfe den Nachbar.", "Ich helfe {D:dem} Nachbar*n*.", "Helfen takes the dative, and Nachbar adds -n."],
      ],
      hook: "Wem? Dative: who gets it, who is helped, who owns it.",
    },
  },

  w4: {
    related: ["tenses/present-perfect", "tenses/perfect-sein", "tenses/past-participle"],
    lesson: {
      visuals: [
        frame("The Perfekt frame", slots, [
          ["Am Samstag", "*habe*", "ich lange", "*geschlafen*."],
          ["Dann", "*bin*", "ich in die Stadt", "*gefahren*."],
          ["Abends", "*haben*", "wir Freunde", "*getroffen*."],
        ], [1, 3]),
        { kind: "steps", title: "Haben or sein?", steps: [
          ["Is there an accusative object (what? whom?)?", "haben", "Wir *haben* einen Film *gesehen*."],
          ["Is it moving or travelling?", "sein", "Ich *bin* an den See *gefahren*."],
          ["Does something change: aufstehen, einschlafen?", "sein", "Ich *bin* früh *aufgestanden*."],
          ["None of these?", "haben", "Wir *haben* viel *gelacht*."],
        ] },
      ],
      points: [
        { title: "Helper verb plus participle", text: "Haben or sein in position 2, the participle at the very end.", examples: [
          ["Was *hast* du am Wochenende *gemacht*?", "What did you do on the weekend?"],
          ["Ich *habe* meine Oma *besucht*.", "I visited my grandma."],
          ["Wir *haben* im Park *gegrillt*.", "We had a barbecue in the park."],
        ] },
        { title: "Sein for moving and changing", text: "Going, driving, flying, getting up and falling asleep take sein.", examples: [
          ["Wir *sind* an den See *gefahren*.", "We drove to the lake."],
          ["Ich *bin* früh *aufgestanden*.", "I got up early."],
          ["Was *ist* *passiert*?", "What happened?"],
        ] },
        { title: "War and hatte", text: "For sein and haben, Germans usually use the short past: war, hatte.", examples: [
          ["Das Wetter *war* super.", "The weather was great."],
          ["Wir *hatten* viel Spaß.", "We had a lot of fun."],
          ["*Warst* du auf der Party?", "Were you at the party?"],
        ] },
        { title: "Irregular participles", text: "Many common verbs end in -en. Learn them in pairs: lesen, gelesen.", examples: [
          ["Ich habe ein Buch *gelesen*.", "I read a book."],
          ["Wir haben einen Kuchen *gebacken*.", "We baked a cake."],
          ["Er hat lange *geschlafen*.", "He slept late."],
        ] },
      ],
      traps: [
        ["Ich habe nach Hamburg gefahren.", "Ich *bin* nach Hamburg *gefahren*.", "Travelling takes sein."],
        ["Ich habe gegessen eine Pizza.", "Ich *habe* eine Pizza *gegessen*.", "The participle goes to the end."],
        ["Er ist gut geschlafen.", "Er *hat* gut *geschlafen*.", "Sleeping is not moving: haben."],
      ],
      hook: "Moving or changing: sein. Everything else: haben.",
    },
  },

  w5: {
    related: ["cases/dative-pronouns", "requests/polite-advice", "verbs/irregular"],
    lesson: {
      visuals: [
        { kind: "table", title: "The imperative", head: ["Infinitive", "du", "ihr", "Sie"],
          rows: [
            ["kommen", "Komm!", "Kommt!", "Kommen Sie!"],
            ["nehmen", "Nimm!", "Nehmt!", "Nehmen Sie!"],
            ["schlafen", "Schlaf!", "Schlaft!", "Schlafen Sie!"],
            ["sein", "Sei!", "Seid!", "Seien Sie!"],
            ["sich ausruhen", "Ruh dich aus!", "Ruht euch aus!", "Ruhen Sie sich aus!"],
          ] },
        { kind: "table", title: "What hurts?", head: ["One thing hurts: tut weh", "Several things hurt: tun weh"],
          rows: [["{D:Mir} *tut* der Kopf *weh*.", "{D:Mir} *tun* die Füße *weh*."], ["*Tut* {D:dir} der Bauch *weh*?", "*Tun* {D:dir} die Augen *weh*?"]] },
      ],
      points: [
        { title: "Imperative for a friend: du", text: "Take the du form and drop -st and du: du nimmst becomes Nimm! An umlaut from a to ä disappears: du schläfst becomes Schlaf!", examples: [
          ["*Nimm* die Tabletten nach dem Essen!", "Take the tablets after meals."],
          ["*Trink* viel Wasser!", "Drink plenty of water."],
          ["*Bleib* heute im Bett!", "Stay in bed today."],
        ] },
        { title: "The doctor uses Sie", text: "Verb first, then Sie.", examples: [
          ["*Machen Sie* bitte den Mund auf.", "Please open your mouth."],
          ["*Kommen Sie* in einer Woche wieder.", "Come back in a week."],
          ["*Nehmen Sie* zweimal am Tag eine Tablette.", "Take one tablet twice a day."],
        ] },
        { title: "Sollen: passing on advice", text: "Use sollen to say what someone else told you to do.", examples: [
          ["Der Arzt sagt, ich *soll* viel schlafen.", "The doctor says I should get plenty of sleep."],
          ["*Soll* ich morgen wiederkommen?", "Should I come back tomorrow?"],
          ["Du *sollst* die Salbe zweimal am Tag benutzen.", "You're supposed to use the cream twice a day."],
        ] },
        { title: "Wehtun: the person is dative", text: "The body part is the subject. The person who feels it is dative.", examples: [
          ["{D:Mir} *tut* der Rücken *weh*.", "My back hurts."],
          ["{D:Mir} *tun* die Füße *weh*.", "My feet hurt."],
          ["Wo *tut* es {D:Ihnen} *weh*?", "Where does it hurt?"],
        ] },
      ],
      traps: [
        ["Nimmst die Tablette!", "*Nimm* die Tablette!", "Imperative: no -st and no du."],
        ["Ich tut der Kopf weh.", "{D:Mir} *tut* der Kopf *weh*.", "The person is dative: mir."],
        ["Mir tut die Füße weh.", "{D:Mir} *tun* die Füße *weh*.", "Several body parts: tun."],
      ],
      hook: "The doctor tells you: Nehmen Sie ... You tell a friend: Ich soll ...",
    },
  },

  w6: {
    related: ["prepositions/two-way", "prepositions/position-verbs", "prepositions/places"],
    lesson: {
      visuals: [
        { kind: "steps", title: "Wo or wohin?", steps: [
          ["Does something move to a new place?", "Wohin? Accusative", "Ich gehe in {A:die} Stadt."],
          ["Is it already there?", "Wo? Dative", "Ich bin in {D:der} Stadt."],
        ] },
        { kind: "table", title: "Directions", head: ["German", "English"],
          rows: [
            ["Gehen Sie geradeaus.", "Go straight on."],
            ["Biegen Sie an {D:der} Ampel links ab.", "Turn left at the traffic lights."],
            ["Gehen Sie über {A:die} Brücke.", "Go over the bridge."],
            ["Die Post ist neben {D:der} Bank.", "The post office is next to the bank."],
            ["Das Café ist gegenüber {D:vom} Rathaus.", "The café is opposite the town hall."],
          ] },
      ],
      points: [
        { title: "Wo or wohin in town", text: "Where you are: dative. Where you are going: accusative.", examples: [
          ["Wir treffen uns vor {D:dem} Kino.", "Let's meet in front of the cinema."],
          ["Ich gehe in {A:den} Supermarkt.", "I'm going into the supermarket."],
          ["Das Café ist {D:am} Marktplatz.", "The café is on the market square."],
        ] },
        { title: "Stehen or stellen", text: "Stellen means putting something somewhere. Stehen means it is there.", examples: [
          ["Das Fahrrad steht vor {D:der} Tür.", "The bike is outside the door."],
          ["Ich stelle das Fahrrad vor {A:die} Tür.", "I put the bike outside the door."],
          ["Der Stadtplan liegt auf {D:dem} Tisch.", "The map is on the table."],
        ] },
        { title: "Asking the way", text: "Start with Entschuldigung. Use zu for places in town.", examples: [
          ["Entschuldigung, wie komme ich {D:zum} Bahnhof?", "Excuse me, how do I get to the station?"],
          ["Gibt es hier in der Nähe eine Apotheke?", "Is there a pharmacy near here?"],
          ["Ist das weit von hier?", "Is it far from here?"],
        ] },
        { title: "Directions use the imperative", text: "Polite: Gehen Sie ... To a friend: Geh ...", examples: [
          ["*Gehen Sie* bis {D:zur} Kreuzung.", "Go as far as the crossroads."],
          ["*Nehmen Sie* die zweite Straße rechts.", "Take the second street on the right."],
          ["*Geh* einfach geradeaus.", "Just go straight ahead."],
        ] },
      ],
      traps: [
        ["Ich gehe im Park.", "Ich gehe in {A:den} Park.", "Going there is a goal: accusative."],
        ["Das Rad stellt vor der Tür.", "Das Rad *steht* vor {D:der} Tür.", "Where it is: stehen."],
        ["Wie komme ich nach dem Bahnhof?", "Wie komme ich {D:zum} Bahnhof?", "Places in town: zu, not nach."],
      ],
      hook: "Arrow: wohin, accusative. Dot: wo, dative.",
    },
  },

  w7: {
    related: ["conjunctions/subordinate", "conjunctions/dass-weil", "tenses/past-participle"],
    lesson: {
      visuals: [
        { kind: "table", title: "Three ways to give a reason", head: ["Word", "Verb position", "Example"],
          rows: [
            ["denn", "normal, position 2", "Ich bin müde, *denn* ich *habe* viel gearbeitet."],
            ["weil", "at the end", "Ich bin müde, *weil* ich viel gearbeitet *habe*."],
            ["deshalb", "straight after deshalb", "Ich habe viel gearbeitet, *deshalb* *bin* ich müde."],
          ] },
        frame("Und, aber, oder, denn sit in position 0", ["Position 0", "Position 1", "Verb", "Rest"], [
          ["*und*", "ich", "*arbeite*", "im Büro."],
          ["*aber*", "heute", "*bin*", "ich zu Hause."],
          ["*denn*", "der Chef", "*ist*", "krank."],
        ], [2]),
      ],
      points: [
        { title: "Und, aber, oder, denn change nothing", text: "They sit before position 1. After them the sentence is normal.", examples: [
          ["Ich arbeite Vollzeit, *aber* freitags *habe* ich frei.", "I work full-time, but I have Fridays off."],
          ["Sie ist Krankenpflegerin, *und* ihr Mann *arbeitet* in einer Bäckerei.", "She's a nurse and her husband works in a bakery."],
          ["Ich komme später, *denn* ich *habe* noch einen Termin.", "I'll come later because I still have an appointment."],
        ] },
        { title: "Weil: the verb goes last", text: "Weil gives a reason and sends the verb with the person ending to the end.", examples: [
          ["Ich suche einen neuen Job, *weil* die Arbeitszeiten schlecht *sind*.", "I'm looking for a new job because the hours are bad."],
          ["Er kann nicht kommen, *weil* er krank *ist*.", "He can't come because he's ill."],
        ] },
        { title: "Deshalb: the result, verb right after", text: "Deshalb takes position 1, so the verb follows straight away.", examples: [
          ["Der Bus hatte Verspätung, *deshalb* *bin* ich zu spät gekommen.", "The bus was late, so I was late."],
          ["Ich spreche gut Englisch, *deshalb* *arbeite* ich im Kundenservice.", "I speak good English, so I work in customer service."],
        ] },
        { title: "Work in the Perfekt", text: "Verbs ending in -ieren and verbs with be-, ver- or er- take no ge-.", examples: [
          ["Ich *habe* drei Jahre in Polen *gearbeitet*.", "I worked in Poland for three years."],
          ["Sie *hat* Informatik *studiert*.", "She studied computer science."],
          ["Der Chef *hat* mir alles *erklärt*.", "The boss explained everything to me."],
        ] },
      ],
      traps: [
        ["..., weil ich habe keine Zeit.", "..., weil ich keine Zeit *habe*.", "After weil the verb goes last."],
        ["..., deshalb ich bin müde.", "..., deshalb *bin* ich müde.", "After deshalb the verb comes next."],
        ["..., denn ich keine Zeit habe.", "..., denn ich *habe* keine Zeit.", "Denn changes nothing."],
      ],
      hook: "Denn: nothing moves. Weil: verb to the end. Deshalb: verb right after.",
    },
  },

  w8: {
    related: ["adjectives/comparisons", "adjectives/endings", "cases/accusative-dative"],
    lesson: {
      visuals: [
        { kind: "table", title: "Comparing", head: ["Base", "Comparative", "Superlative"],
          rows: [["billig", "billig*er*", "am billig*sten*"], ["teuer", "teu*rer*", "am teuer*sten*"], ["warm", "w*ä*rm*er*", "am w*ä*rm*sten*"], ["gut", "*besser*", "am *besten*"], ["gern", "*lieber*", "am *liebsten*"]] },
        { kind: "table", title: "Adjective endings you hear in shops", head: ["", "der Pullover", "das Hemd", "die Jacke", "die Schuhe"],
          rows: [
            ["Nominative, der/das/die", "der blau*e* Pullover", "das weiß*e* Hemd", "die schwarz*e* Jacke", "die braun*en* Schuhe"],
            ["Accusative, der/das/die", "{A:den} blau*en* Pullover", "das weiß*e* Hemd", "die schwarz*e* Jacke", "die braun*en* Schuhe"],
            ["Accusative, ein", "{A:einen} blau*en* Pullover", "ein weiß*es* Hemd", "eine schwarz*e* Jacke", "braun*e* Schuhe"],
          ] },
      ],
      points: [
        { title: "Comparing prices and sizes", text: "More or less: comparative + als. The same: so ... wie.", examples: [
          ["Die Jacke ist billig*er* *als* der Mantel.", "The jacket is cheaper than the coat."],
          ["Das Hemd ist *so* teuer *wie* die Jeans.", "The shirt is as expensive as the jeans."],
          ["Welche Schuhe gefallen dir *am besten*?", "Which shoes do you like best?"],
        ] },
        { title: "Describing clothes", text: "Before a noun the adjective needs an ending. After sein it doesn't.", examples: [
          ["Ich suche {A:einen} warm*en* Pullover.", "I'm looking for a warm sweater."],
          ["Das rot*e* Kleid steht dir gut.", "The red dress suits you."],
          ["Die Hose ist zu kurz.", "The pants are too short."],
        ] },
        { title: "Presents: person dative, thing accusative", text: "When you give something, the person is dative and the present is accusative.", examples: [
          ["Ich schenke {D:meiner} Schwester {A:einen} Schal.", "I'm giving my sister a scarf."],
          ["Was schenkst du {D:deinem} Vater?", "What are you giving your father?"],
          ["Der Pullover passt {D:mir} nicht.", "The sweater doesn't fit me."],
        ] },
      ],
      traps: [
        ["Die Jacke ist billiger wie der Mantel.", "Die Jacke ist billiger *als* der Mantel.", "Comparative + als."],
        ["Ich suche ein warm Pullover.", "Ich suche {A:einen} warm*en* Pullover.", "Accusative masculine: einen + -en."],
        ["Das ist teuerer.", "Das ist teu*rer*.", "Teuer drops an e: teurer."],
      ],
      hook: "Five places take -e. Everything else takes -en.",
    },
  },

  w9: {
    related: ["conjunctions/subordinate", "conjunctions/als-wenn-wann", "verbs/reflexive"],
    lesson: {
      visuals: [
        frame("Dass and wenn send the verb to the end", ["Main clause", "Conjunction", "Middle", "Verb"], [
          ["Ich finde,", "*dass*", "das Konzert toll", "*war*."],
          ["Wir grillen,", "*wenn*", "das Wetter schön", "*ist*."],
          ["Ich glaube,", "*dass*", "sie nicht kommen", "*kann*."],
        ], [3]),
        verbPlaces,
      ],
      points: [
        { title: "Dass: what you think or say", text: "After finden, glauben, hoffen and wissen, dass starts a clause with the verb at the end.", examples: [
          ["Ich finde, *dass* Wandern Spaß *macht*.", "I think hiking is fun."],
          ["Schön, *dass* du *kommst*!", "Great that you're coming!"],
          ["Ich hoffe, *dass* das Wetter gut *bleibt*.", "I hope the weather stays nice."],
        ] },
        { title: "Wenn: if, or whenever", text: "If the wenn clause comes first, the main clause starts with its verb.", examples: [
          ["*Wenn* es regnet, *gehen* wir ins Museum.", "If it rains, we'll go to the museum."],
          ["Ruf mich an, *wenn* du Lust *hast*.", "Call me if you feel like it."],
          ["*Wenn* ich frei habe, *spiele* ich Fußball.", "When I'm off, I play football."],
        ] },
        { title: "Free time verbs with sich", text: "Sich freuen, sich treffen, sich verabreden, sich interessieren.", examples: [
          ["Ich freue {A:mich} auf deine Party.", "I'm looking forward to your party."],
          ["Wir treffen {A:uns} um acht vor dem Kino.", "We're meeting at eight outside the cinema."],
          ["Interessierst du {A:dich} für Musik?", "Are you interested in music?"],
        ] },
        { title: "Saying yes or no to an invitation", text: "Thank the person first. If you say no, give a short reason.", examples: [
          ["Danke für die Einladung, ich komme gern!", "Thanks for the invitation, I'd love to come!"],
          ["Leider kann ich nicht, weil ich arbeiten muss.", "Unfortunately I can't because I have to work."],
          ["Wie wäre es mit Samstag?", "How about Saturday?"],
        ] },
      ],
      traps: [
        ["Ich finde, dass das Konzert war toll.", "Ich finde, dass das Konzert toll *war*.", "After dass the verb goes last."],
        ["Wenn es regnet, wir bleiben zu Hause.", "Wenn es regnet, *bleiben* wir zu Hause.", "After the wenn clause, the verb comes first."],
        ["Ich freue auf die Party.", "Ich freue {A:mich} auf die Party.", "Sich freuen needs mich."],
      ],
      hook: "Verb, comma, verb: Wenn ich Zeit habe, komme ich.",
    },
  },

  w10: {
    related: ["tenses/simple-past", "prepositions/time", "prepositions/places"],
    lesson: {
      visuals: [
        { kind: "table", title: "Modal verbs in the past", head: ["Person", "können", "müssen", "wollen", "dürfen"],
          rows: [
            ["ich", "konnte", "musste", "wollte", "durfte"], ["du", "konntest", "musstest", "wolltest", "durftest"], ["er / sie / es", "konnte", "musste", "wollte", "durfte"],
            ["wir", "konnten", "mussten", "wollten", "durften"], ["ihr", "konntet", "musstet", "wolltet", "durftet"], ["sie / Sie", "konnten", "mussten", "wollten", "durften"],
          ],
          note: "No umlaut in the past: können becomes konnte, müssen becomes musste." },
        { kind: "table", title: "Vor, seit and in at the station", head: ["Past", "Past until now", "Future"],
          rows: [["*vor* einer Stunde: the train left", "*seit* einer Stunde: I've been waiting", "*in* einer Stunde: the next train comes"]] },
      ],
      points: [
        { title: "Modal verbs in the past", text: "Musste, konnte, wollte, then the infinitive at the end.", examples: [
          ["Wir *mussten* zwei Stunden *warten*.", "We had to wait for two hours."],
          ["Ich *konnte* keinen Platz *finden*.", "I couldn't find a seat."],
          ["Wir *wollten* mit dem Nachtzug *fahren*.", "We wanted to take the night train."],
        ] },
        { title: "Clock times", text: "Timetables: 14:30 Uhr, vierzehn Uhr dreißig. In conversation: halb drei, Viertel nach, Viertel vor.", examples: [
          ["Der Zug fährt um 14:30 Uhr ab.", "The train leaves at 2:30 pm."],
          ["Wir treffen uns um halb drei.", "Let's meet at half past two."],
          ["Es ist Viertel vor acht.", "It's a quarter to eight."],
        ] },
        { title: "How long, since when, when", text: "Dauern for how long. Seit for since. Vor for ago. In for from now.", examples: [
          ["Die Fahrt dauert drei Stunden.", "The journey takes three hours."],
          ["Ich warte *seit* {D:einer} Stunde.", "I've been waiting for an hour."],
          ["Ich war *vor* zwei Jahren in Wien.", "I was in Vienna two years ago."],
          ["*In* zehn Minuten sind wir da.", "We'll be there in ten minutes."],
        ] },
        { title: "At the ticket counter", text: "Short phrases you can use as they are.", examples: [
          ["Von welchem Gleis fährt der Zug nach Bonn?", "Which platform does the train to Bonn leave from?"],
          ["Muss ich umsteigen?", "Do I have to change trains?"],
          ["Eine Fahrkarte nach Köln, bitte. Hin und zurück.", "A return ticket to Cologne, please."],
        ] },
      ],
      traps: [
        ["Ich musste warten zwei Stunden.", "Ich *musste* zwei Stunden *warten*.", "The infinitive goes to the end."],
        ["Ich warte für eine Stunde.", "Ich warte *seit* {D:einer} Stunde.", "Still waiting now: seit."],
        ["Ich könnte nicht kommen.", "Ich *konnte* nicht kommen.", "Konnte is the past. Könnte means could, as in maybe."],
      ],
      hook: "Halb drei is half an hour before three: 2:30.",
    },
  },

  w11: {
    related: ["requests/polite-advice", "conjunctions/dass-ob", "sentence-structure/answering-questions"],
    lesson: {
      visuals: [
        { kind: "table", title: "From normal to very polite", head: ["Normal", "Very polite"],
          rows: [
            ["Ich will ein Konto eröffnen.", "Ich *würde* gern ein Konto *eröffnen*."],
            ["Haben Sie einen Termin frei?", "*Hätten* Sie einen Termin frei?"],
            ["Können Sie mir helfen?", "*Könnten* Sie mir bitte *helfen*?"],
            ["Ich will etwas fragen.", "Ich *hätte* eine Frage."],
          ] },
        frame("Indirect questions: the verb goes last", ["Start", "Question word", "Middle", "Verb"], [
          ["Können Sie mir sagen,", "*wo*", "das Bürgeramt", "*ist*?"],
          ["Ich möchte wissen,", "*wann*", "die Post", "*aufmacht*."],
          ["Wissen Sie,", "*ob*", "ich einen Termin", "*brauche*?"],
        ], [3]),
      ],
      points: [
        { title: "Very polite: könnte, hätte, würde", text: "At an office, these sound friendly and respectful.", examples: [
          ["*Könnten* Sie das bitte buchstabieren?", "Could you spell that, please?"],
          ["Ich *hätte* gern einen Termin.", "I'd like an appointment."],
          ["*Würden* Sie mir das Formular erklären?", "Would you explain the form to me?"],
        ] },
        { title: "Indirect questions", text: "Start with a polite phrase, then the question word, and put the verb last. For a yes/no question use ob.", examples: [
          ["Können Sie mir sagen, *wie lange* das *dauert*?", "Can you tell me how long it takes?"],
          ["Ich möchte wissen, *was* ich mitbringen *muss*.", "I'd like to know what I need to bring."],
          ["Wissen Sie, *ob* die Bank heute offen *hat*?", "Do you know if the bank is open today?"],
        ] },
        { title: "At the counter", text: "Say what you need in one short sentence.", examples: [
          ["Ich möchte ein Paket nach Polen schicken.", "I'd like to send a parcel to Poland."],
          ["Ich brauche eine Meldebescheinigung.", "I need a certificate of registration."],
          ["Wo muss ich unterschreiben?", "Where do I sign?"],
        ] },
      ],
      traps: [
        ["Können Sie mir sagen, wo ist das Bürgeramt?", "Können Sie mir sagen, wo das Bürgeramt *ist*?", "In an indirect question the verb goes last."],
        ["Wissen Sie, wenn die Post offen hat?", "Wissen Sie, *ob* die Post offen hat?", "A yes/no question inside a sentence uses ob."],
        ["Ich wurde gern ein Konto eröffnen.", "Ich *würde* gern ein Konto eröffnen.", "Würde has an umlaut."],
      ],
      hook: "Polite start, question word, verb at the end.",
    },
  },

  w12: {
    related: ["cases/nominative-accusative-dative", "tenses/present-perfect", "conjunctions/subordinate", "prepositions/two-way"],
    lesson: {
      visuals: [
        verbPlaces,
        { kind: "steps", title: "Which case?", steps: [
          ["Who does it?", "Nominative", "{N:Der} Kellner bringt den Kaffee."],
          ["What or whom does the action hit?", "Accusative", "Er bringt {A:den} Kaffee."],
          ["Who gets it?", "Dative", "Er bringt {D:dem} Gast den Kaffee."],
          ["Is there a preposition?", "The preposition decides", "mit {D:dem} Zug, für {A:den} Zug"],
        ] },
      ],
      points: [
        { title: "Verb position in one look", text: "Position 2, a bracket with a second verb at the end, or the verb last after weil, dass, wenn.", examples: [
          ["Morgen *fahre* ich nach Berlin.", "Tomorrow I'm going to Berlin."],
          ["Ich *muss* morgen nach Berlin *fahren*.", "I have to go to Berlin tomorrow."],
          ["Ich bleibe zu Hause, weil ich krank *bin*.", "I'm staying home because I'm ill."],
        ] },
        { title: "Cases in one look", text: "Subject nominative, object accusative, receiver dative, and prepositions decide for themselves.", examples: [
          ["{N:Der} Kellner bringt {D:dem} Gast {A:den} Kaffee.", "The waiter brings the guest the coffee."],
          ["Ich gehe mit {D:meiner} Kollegin in {A:den} Park.", "I'm going to the park with my colleague."],
          ["Das Geschenk ist für {A:meinen} Bruder.", "The present is for my brother."],
        ] },
        { title: "The past in one look", text: "Perfekt for most verbs, war and hatte for sein and haben.", examples: [
          ["Ich *habe* gestern lange *gearbeitet*.", "I worked late yesterday."],
          ["Wir *sind* nach Italien *geflogen*.", "We flew to Italy."],
          ["Es *war* toll, aber ich *hatte* wenig Zeit.", "It was great, but I didn't have much time."],
        ] },
        { title: "Being polite in one look", text: "Könnten, hätte, würde and indirect questions.", examples: [
          ["*Könnten* Sie mir helfen?", "Could you help me?"],
          ["Ich *hätte* gern ein Wasser.", "I'd like a water, please."],
          ["Wissen Sie, wo der Bahnhof *ist*?", "Do you know where the station is?"],
        ] },
      ],
      traps: [
        ["Am Montag ich arbeite.", "Am Montag *arbeite* ich.", "The verb stays in position 2."],
        ["Ich helfe dich.", "Ich helfe {D:dir}.", "Helfen takes the dative."],
        ["Ich habe nach Berlin gefahren.", "Ich *bin* nach Berlin *gefahren*.", "Travelling takes sein."],
        ["..., weil ich bin krank.", "..., weil ich krank *bin*.", "After weil the verb goes last."],
      ],
      hook: "Before the exam: verb position, case, haben or sein. Check these three in every sentence.",
    },
  },
};

export function addTopicGrammar(course: Course): void {
  const titles = new Map((course.grammar ?? []).map((topic) => [topic.slug, topic.title]));
  for (const unit of course.weeks) {
    const entry = TOPIC_GRAMMAR[unit.id];
    if (!entry) throw new Error(`Missing topic grammar for ${unit.id}`);
    unit.grammarLesson = entry.lesson;
    unit.grammarLinks = entry.related.map((slug) => {
      const title = titles.get(slug);
      if (!title) throw new Error(`Unknown grammar topic ${slug} in ${unit.id}`);
      return { slug, title };
    });
  }
}
