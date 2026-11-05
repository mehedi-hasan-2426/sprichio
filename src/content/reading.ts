import type { Block, Course, ExamPassage } from "../lib/types.ts";
import type { AuthorPart, Question, WordRef } from "./exam-kit.ts";
import { choiceItem, passageText, wordCount } from "./exam-kit.ts";

export interface WeeklyReading {
  week: number;
  parts: AuthorPart[];
  words: WordRef[];
  grammar: [label: string, topic: number][];
}

const passage = (title: string, ...paragraphs: string[]): ExamPassage => ({ title, paragraphs });
const mc = (prompt: string, options: string[], answer: string, evidence: string, why: string): Question => ({ prompt, options, answer, evidence, why });
const tf = (prompt: string, answer: "richtig" | "falsch", evidence: string, why: string): Question => ({ prompt, answer, evidence, why });
const MIXED = "Lesen Sie den Text und die Aufgaben 1–5. Kreuzen Sie an: a, b oder c – oder richtig oder falsch.";
const MIXED_EN = "Read the text and tasks 1–5. Choose a, b or c – or true or false.";
const part = (passages: ExamPassage[], questions: Question[]): AuthorPart => ({ title: "", instruction: MIXED, instructionEn: MIXED_EN, passages, questions });
const STRETCH = "Längerer Text (A2+): Er ist länger als ein typischer Prüfungstext. Lesen Sie zuerst die Aufgaben und suchen Sie dann die passende Stelle im Text.";
const STRETCH_WORDS = 250;

export const READINGS: WeeklyReading[] = [
  {
    week: 1,
    parts: [part([
      passage("Ein Tag von Jonas",
        "Jonas ist 29 Jahre alt und arbeitet als Krankenpfleger in Leipzig. Seine Arbeitszeiten sind nicht jede Woche gleich. Im Kalender an der Küchentür steht jede Woche sein Tagesplan. Diese Woche hat er Frühdienst. Sein Wecker klingelt schon um halb fünf. Er steht sofort auf, duscht schnell und trinkt einen Kaffee. Frühstück? Dafür hat er keine Zeit. Um Viertel vor sechs fährt er mit dem Fahrrad los, die Fahrt dauert nur zehn Minuten.",
        "Sein Dienst fängt um sechs Uhr an und hört um halb drei auf. Mittags macht er eine kurze Pause und isst ein Brot von zu Hause. Nach dem Feierabend kauft er meistens noch ein. Dann ruft er oft seine Schwester Lena an. Sie wohnt in München, und die beiden telefonieren fast jeden Tag eine halbe Stunde. Am Abend ist Jonas sehr müde. Er sieht selten fern, er liest lieber ein Buch. Um halb zehn geht er ins Bett.",
        "Nächste Woche hat Jonas Spätdienst. Dann fängt seine Arbeit erst um 14 Uhr an und hört um halb elf am Abend auf. Er schläft lange, frühstückt in Ruhe und räumt am Vormittag die Wohnung auf. Am Wochenende hat Jonas meistens frei. Dann schläft er manchmal bis zehn Uhr und trifft am Nachmittag Freunde. Nur jedes dritte Wochenende muss er arbeiten. Das findet er nicht schlimm: Dafür hat er danach am Montag und am Dienstag frei."),
    ], [
      mc("Was macht Jonas in dieser Woche morgens vor der Arbeit?", ["Er frühstückt in Ruhe zu Hause.", "Er duscht und trinkt nur einen Kaffee.", "Er räumt die Wohnung auf."], "b",
        "Er steht sofort auf, duscht schnell und trinkt einen Kaffee. Frühstück? Dafür hat er keine Zeit.",
        "a) and c) describe his late-shift week (next week), not this week."),
      mc("Wie lange ist Jonas in dieser Woche jeden Tag bei der Arbeit?", ["sechs Stunden", "achteinhalb Stunden", "zehn Stunden"], "b",
        "Sein Dienst fängt um sechs Uhr an und hört um halb drei auf.",
        "From 6:00 to 14:30 is eight and a half hours. Ten hours would start at 4:30, when only the alarm rings."),
      mc("Wann spricht Jonas meistens mit seiner Schwester?", ["in der Mittagspause", "nach der Arbeit und dem Einkaufen", "spät am Abend im Bett"], "b",
        "Nach dem Feierabend kauft er meistens noch ein. Dann ruft er oft seine Schwester Lena an.",
        "In the break he eats his bread. In the evening he reads and goes to bed; the call comes right after shopping."),
      tf("Am Abend sieht Jonas meistens fern.", "falsch", "Er sieht selten fern, er liest lieber ein Buch.",
        "„selten“ means rarely, so TV is not what he usually does in the evening; he prefers reading."),
      tf("Nach einem Wochenende mit Arbeit hat Jonas zwei Tage frei.", "richtig",
        "Nur jedes dritte Wochenende muss er arbeiten. Das findet er nicht schlimm: Dafür hat er danach am Montag und am Dienstag frei.",
        "Monday and Tuesday are the two free days after a working weekend."),
    ])],
    words: [
      ["der Wecker", 1, "Wecker"], ["der Kalender", 1, "Kalender"], ["der Tagesplan", 1, "Tagesplan"], ["auf·stehen", 1, "steht sofort auf"],
      ["duschen", 1, "duscht"], ["an·fangen", 1, "fängt um sechs Uhr an"], ["auf·hören", 1, "hört um halb drei auf"], ["die Pause", 1, "Pause"],
      ["der Feierabend", 1, "Feierabend"], ["ein·kaufen", 1, "kauft er meistens noch ein"], ["an·rufen", 1, "ruft er oft seine Schwester Lena an"],
      ["fern·sehen", 1, "sieht selten fern"], ["der Vormittag", 1, "Vormittag"], ["auf·räumen", 1, "räumt am Vormittag die Wohnung auf"], ["das Wochenende", 1, "Wochenende"],
    ],
    grammar: [["Verb auf Position 2", 1], ["Trennbare Verben", 1], ["Präsens mit Vokalwechsel", 1]],
  },
  {
    week: 2,
    parts: [part([
      passage("Frischmarkt Becker – Angebote der Woche",
        "Liebe Kundinnen und Kunden, unsere Angebote gelten von Montag bis Samstag. Diese Woche gibt es bei uns:",
        "Äpfel aus der Region: 1 kg 2,49 €, ab 3 kg nur 1,99 € pro Kilo · Tomaten: 500 g 1,79 € · Vollkornbrot, frisch aus unserer Bäckerei: 2,20 € · Bergkäse: 100 g 1,99 € · Orangensaft, 1-Liter-Flasche: 1,49 € plus 0,25 € Pfand, ab drei Flaschen nur 1,29 € pro Flasche (plus Pfand) · Bio-Eier, Packung mit 10 Stück: 3,49 € (nur Montag und Dienstag)",
        "Unser Tipp für den Abend: Ab 18 Uhr kostet jedes Brot aus unserer Bäckerei nur noch die Hälfte. Haben Sie Fragen zu einem Produkt? Unsere Verkäuferinnen helfen Ihnen gern. An der Käsetheke dürfen Sie jeden Käse vor dem Kauf probieren.",
        "Neu: Sie können jetzt auch online bestellen. Ab 30 € liefern wir kostenlos nach Hause, unter 30 € kostet die Lieferung 3,90 €. Was Sie bis 12 Uhr bestellen, bringen wir noch am selben Tag. Spätere Bestellungen kommen am nächsten Tag. Getränke liefern wir nur in Kisten mit sechs Flaschen.",
        "Leere Flaschen geben Sie bitte an der Kasse zurück. Das Pfand bekommen Sie sofort bar zurück. Öffnungszeiten: Montag bis Freitag 7–20 Uhr, Samstag 8–18 Uhr, Sonntag geschlossen. Unsere Bäckerei öffnet immer schon 30 Minuten vor dem Markt."),
    ], [
      mc("Sie kaufen 3 kg Äpfel. Wie viel bezahlen Sie?", ["5,97 €", "7,47 €", "1,99 €"], "a", "ab 3 kg nur 1,99 € pro Kilo",
        "From 3 kg every kilo costs 1,99 €: 3 × 1,99 € = 5,97 €. 7,47 € uses the normal price, and 1,99 € is only one kilo."),
      mc("Sie kaufen am Mittwoch zwei Flaschen Orangensaft. Was bezahlen Sie mit Pfand?", ["2,58 €", "2,98 €", "3,48 €"], "c",
        "1,49 € plus 0,25 € Pfand, ab drei Flaschen nur 1,29 € pro Flasche",
        "Two bottles do not get the three-bottle price: 2 × (1,49 € + 0,25 €) = 3,48 €. 2,98 € forgets the deposit; 2,58 € uses the offer price."),
      mc("Ab wann können Sie am Samstag Brot in der Bäckerei kaufen?", ["ab 6.30 Uhr", "ab 7.30 Uhr", "ab 8 Uhr"], "b",
        "Unsere Bäckerei öffnet immer schon 30 Minuten vor dem Markt.",
        "On Saturday the market opens at 8:00, so the bakery opens at 7:30. 6:30 is the weekday time; 8:00 is the market."),
      tf("Sie bestellen um 14 Uhr online für 35 €. Die Lieferung kommt am selben Tag.", "falsch",
        "Was Sie bis 12 Uhr bestellen, bringen wir noch am selben Tag. Spätere Bestellungen kommen am nächsten Tag.",
        "Delivery is free above 30 €, but an order at 14:00 arrives the next day."),
      tf("Am Freitag um 19 Uhr bezahlen Sie für ein Vollkornbrot 1,10 €.", "richtig",
        "Ab 18 Uhr kostet jedes Brot aus unserer Bäckerei nur noch die Hälfte.",
        "Half of 2,20 € is 1,10 €, and on Friday the shop is open until 20:00."),
    ])],
    words: [
      ["das Angebot", 2, "Angebote"], ["der Apfel", 2, "Äpfel"], ["die Tomate", 2, "Tomaten"], ["die Bäckerei", 2, "Bäckerei"], ["der Käse", 2, "Bergkäse"],
      ["der Saft", 2, "Orangensaft"], ["die Flasche", 2, "Flasche"], ["das Pfand", 2, "Pfand"], ["das Ei", 2, "Eier"], ["die Packung", 2, "Packung"],
      ["das Brot", 2, "Brot"], ["die Kasse", 2, "Kasse"], ["zurück·geben", 2, "geben Sie bitte an der Kasse zurück"], ["probieren", 2, "probieren"], ["der Abend", 1, "Abend"],
    ],
    grammar: [["Akkusativ", 2], ["Modalverben", 2]],
  },
  {
    week: 3,
    parts: [part([
      passage("Wohnungsanzeige",
        "2-Zimmer-Wohnung in Freiburg-Mitte, frei ab 1. Dezember. 55 m², 3. Stock, kein Aufzug. Helles Wohnzimmer mit Balkon, kleines Schlafzimmer, neue Küche mit Kühlschrank und Herd, Bad mit Dusche. Die Wohnung ist ruhig, aber nur fünf Minuten zu Fuß von der Straßenbahn. Einkaufen können Sie im Supermarkt an der Ecke.",
        "Miete: 720 € plus 150 € Nebenkosten im Monat. Kaution: zwei Monatsmieten ohne Nebenkosten. Keine Haustiere. Besichtigung am Samstag von 10 bis 12 Uhr. Bitte schreiben Sie vorher eine E-Mail an wohnung-roth@example.com."),
      passage("Antwort von Frau Roth",
        "Sehr geehrter Herr Novak, vielen Dank für Ihre E-Mail. Leider sind am Samstag schon alle Termine weg. Sie können aber am Montag um 18 Uhr kommen.",
        "Zu Ihren Fragen: Der Schrank im Schlafzimmer gehört mir. Er bleibt in der Wohnung, Sie können ihn gern benutzen. Das Sofa im Wohnzimmer gehört der Mieterin, sie nimmt es beim Umzug mit. Eine Katze ist leider nicht möglich, das steht auch im Mietvertrag. Die Mieterin zieht am 30. November um. Den Schlüssel bekommen Sie am 1. Dezember von mir.",
        "Der Hausmeister wohnt im Erdgeschoss. Er hilft Ihnen gern, zum Beispiel bei Problemen mit der Heizung. Im Keller gibt es auch einen Raum für Fahrräder. Bitte antworten Sie mir bis Sonntag. Mit freundlichen Grüßen, Monika Roth"),
    ], [
      mc("Was bezahlt man jeden Monat für die Wohnung?", ["720 €", "870 €", "1440 €"], "b", "Miete: 720 € plus 150 € Nebenkosten im Monat.",
        "Rent plus service charges: 720 € + 150 € = 870 €. 720 € forgets the service charges; 1440 € is the deposit."),
      mc("Wie hoch ist die Kaution?", ["870 €", "1440 €", "1740 €"], "b", "Kaution: zwei Monatsmieten ohne Nebenkosten.",
        "Two months' rent without service charges: 2 × 720 € = 1440 €. 1740 € wrongly adds the service charges; 870 € is one month with them."),
      mc("Wann kann Herr Novak die Wohnung ansehen?", ["am Samstagvormittag", "am Montagabend", "am Sonntag"], "b", "Sie können aber am Montag um 18 Uhr kommen.",
        "The Saturday slots are all taken. Sunday is only the deadline for his answer."),
      tf("Herr Novak bekommt das Sofa mit der Wohnung.", "falsch", "Das Sofa im Wohnzimmer gehört der Mieterin, sie nimmt es beim Umzug mit.",
        "The tenant takes the sofa with her. Only the wardrobe (Schrank) stays in the flat."),
      tf("Bei Problemen mit der Heizung bekommt Herr Novak im Haus Hilfe.", "richtig",
        "Der Hausmeister wohnt im Erdgeschoss. Er hilft Ihnen gern, zum Beispiel bei Problemen mit der Heizung.",
        "The caretaker lives in the same building, on the ground floor, and helps with the heating."),
    ])],
    words: [
      ["der Stock", 3, "Stock"], ["der Aufzug", 3, "Aufzug"], ["der Balkon", 3, "Balkon"], ["die Küche", 3, "Küche"], ["die Miete", 3, "Miete"],
      ["die Nebenkosten", 3, "Nebenkosten"], ["die Kaution", 3, "Kaution"], ["der Schrank", 3, "Schrank"], ["gehören (+ Dat.)", 3, "gehört mir"],
      ["das Sofa", 3, "Sofa"], ["der Umzug", 3, "Umzug"], ["der Mietvertrag", 3, "Mietvertrag"], ["der Hausmeister", 3, "Hausmeister"],
      ["das Erdgeschoss", 3, "Erdgeschoss"], ["helfen (+ Dat.)", 3, "hilft Ihnen"], ["die Heizung", 3, "Heizung"], ["der Schlüssel", 3, "Schlüssel"], ["um·ziehen", 3, "zieht am 30. November um"], ["der Termin", 1, "Termine"],
    ],
    grammar: [["Verben mit Dativ", 3], ["Personalpronomen im Dativ", 3]],
  },
  {
    week: 4,
    parts: [part([
      passage("Ein Wochenende am See",
        "Letztes Wochenende war das Wetter endlich schön. Am Samstag bin ich früh aufgestanden und mit meiner Freundin Aylin zum See gefahren. Zuerst haben wir eine halbe Stunde auf den Bus gewartet, aber er ist nicht gekommen. Am Bahnhof haben wir schnell noch Brötchen gekauft. Dann sind wir mit dem Zug gefahren. Die Fahrt hat nur 40 Minuten gedauert.",
        "Am See haben wir einen langen Spaziergang gemacht, fast zwei Stunden. Mittags hatten wir großen Hunger und haben in einem kleinen Restaurant Fisch gegessen. Das Essen war ziemlich teuer, aber sehr lecker. Aylin hat das Essen bezahlt, und ich habe am Nachmittag das Eis bezahlt. Danach haben wir noch einen Kaffee getrunken.",
        "Am Nachmittag sind wir geschwommen. Das Wasser war noch sehr kalt! Aylin ist nur fünf Minuten im Wasser geblieben, ich eine halbe Stunde. Um 18 Uhr hat es plötzlich geregnet. Wir sind schnell ins kleine Museum am Hafen gegangen und haben dort alte Fotos vom See gesehen. Am Abend sind wir müde, aber glücklich nach Hause gefahren.",
        "Am Sonntag bin ich zu Hause geblieben. Ich habe meine Wohnung aufgeräumt, ein Buch gelesen und meine Eltern angerufen. Am Abend hat Aylin mir ihre Fotos vom Samstag geschickt. Dann bin ich früh ins Bett gegangen. Das war wirklich ein schönes Erlebnis!"),
    ], [
      mc("Wie sind die beiden zum See gekommen?", ["mit dem Bus", "mit dem Zug", "mit dem Fahrrad"], "b", "Dann sind wir mit dem Zug gefahren.",
        "They waited for the bus, but it did not come. A bike is not mentioned."),
      mc("Was hat Aylin bezahlt?", ["das Eis", "das Mittagessen", "die Fahrkarten"], "b", "Aylin hat das Essen bezahlt, und ich habe am Nachmittag das Eis bezahlt.",
        "The writer paid for the ice cream. Tickets are not mentioned."),
      mc("Warum sind die beiden ins Museum gegangen?", ["Es hat geregnet.", "Das Wasser war zu kalt.", "Sie wollten Fotos machen."], "a",
        "Um 18 Uhr hat es plötzlich geregnet. Wir sind schnell ins kleine Museum am Hafen gegangen",
        "The cold water was earlier, while swimming. In the museum they looked at old photos; they did not go there to take photos."),
      tf("Aylin ist eine halbe Stunde geschwommen.", "falsch", "Aylin ist nur fünf Minuten im Wasser geblieben, ich eine halbe Stunde.",
        "Aylin stayed in the water for only five minutes; the writer stayed half an hour."),
      tf("Am Sonntag hat die Ich-Person mit ihren Eltern telefoniert.", "richtig", "und meine Eltern angerufen",
        "„anrufen“ means to phone, so the writer talked to the parents on the phone."),
    ])],
    words: [
      ["das Wetter", 4, "Wetter"], ["auf·stehen", 4, "aufgestanden"], ["der See", 4, "See"], ["fahren", 4, "gefahren"], ["kommen", 4, "gekommen"],
      ["der Spaziergang", 4, "Spaziergang"], ["essen", 4, "gegessen"], ["bleiben", 4, "geblieben"], ["das Museum", 4, "Museum"],
      ["lesen", 4, "gelesen"], ["das Erlebnis", 4, "Erlebnis"], ["an·rufen", 1, "angerufen"],
    ],
    grammar: [["Perfekt mit haben und sein", 4], ["war und hatte", 4]],
  },
  {
    week: 5,
    parts: [part([
      passage("Praxis Dr. med. Anna Lorenz – Allgemeinmedizin",
        "Liebe Patientinnen und Patienten, hier finden Sie die wichtigsten Informationen zu unserer Praxis.",
        "Sprechzeiten: Montag, Dienstag und Donnerstag von 8 bis 12 Uhr und von 15 bis 18 Uhr. Mittwoch und Freitag nur von 8 bis 12 Uhr.",
        "Termine: Bitte vereinbaren Sie einen Termin am Telefon oder online. Ohne Termin können Sie in die offene Sprechstunde kommen, von Montag bis Freitag zwischen 8 und 9 Uhr. Dann müssen Sie aber oft lange warten.",
        "Bitte bringen Sie bei jedem Besuch Ihre Gesundheitskarte mit. Haben Sie Fieber oder Husten? Dann setzen Sie sich bitte nicht ins Wartezimmer, sondern melden Sie sich zuerst an der Anmeldung. Wir bringen Sie dann in einen anderen Raum.",
        "Brauchen Sie ein neues Rezept für Ihre Tabletten? Dann können Sie es auch per E-Mail bestellen. Sie können das Rezept ab dem nächsten Praxistag um 10 Uhr an der Anmeldung abholen. Am Wochenende ist die Praxis geschlossen.",
        "Eine Krankmeldung für Ihre Arbeit bekommen Sie nur nach einer Untersuchung in der Praxis, nicht am Telefon.",
        "Urlaub: Vom 23.12. bis 2.1. ist die Praxis geschlossen. In dieser Zeit hilft Ihnen die Praxis Dr. Klein in der Bahnhofstraße 4. In einem Notfall in der Nacht oder am Wochenende rufen Sie bitte die Nummer 116 117 an."),
    ], [
      mc("Sie haben am Mittwoch erst ab 14 Uhr Zeit. Was ist richtig?", ["Sie können ohne Termin kommen.", "Die Praxis ist dann schon geschlossen.", "Sie müssen online einen Termin machen."], "b",
        "Mittwoch und Freitag nur von 8 bis 12 Uhr.",
        "On Wednesday the practice is open only in the morning, so neither the open consultation nor an appointment works at 14:00."),
      mc("Sie haben Fieber. Was sollen Sie in der Praxis zuerst machen?", ["im Wartezimmer warten", "an der Anmeldung Bescheid sagen", "die Nummer 116 117 anrufen"], "b",
        "Dann setzen Sie sich bitte nicht ins Wartezimmer, sondern melden Sie sich zuerst an der Anmeldung.",
        "The waiting room is exactly what you should avoid. 116 117 is for emergencies at night or at the weekend."),
      mc("Sie bestellen am Freitagabend ein Rezept per E-Mail. Wann können Sie es abholen?", ["am Samstag um 10 Uhr", "am Montag ab 10 Uhr", "am Freitag um 18 Uhr"], "b",
        "Sie können das Rezept ab dem nächsten Praxistag um 10 Uhr an der Anmeldung abholen. Am Wochenende ist die Praxis geschlossen.",
        "Saturday is not a practice day, so the next practice day is Monday. On Friday the practice already closes at 12:00."),
      tf("Eine Krankmeldung kann man auch am Telefon bekommen.", "falsch", "nur nach einer Untersuchung in der Praxis, nicht am Telefon",
        "A sick note needs an examination in the practice."),
      tf("Am 30. Dezember gehen Sie zur Praxis Dr. Klein.", "richtig",
        "Vom 23.12. bis 2.1. ist die Praxis geschlossen. In dieser Zeit hilft Ihnen die Praxis Dr. Klein in der Bahnhofstraße 4.",
        "30 December is inside the holiday from 23.12. to 2.1., when Dr. Klein's practice helps."),
    ])],
    words: [
      ["die Praxis", 5, "Praxis"], ["die Sprechstunde", 5, "Sprechstunde"], ["die Gesundheitskarte", 5, "Gesundheitskarte"], ["das Fieber / der Husten / der Schnupfen", 5, "Fieber"],
      ["das Wartezimmer", 5, "Wartezimmer"], ["das Rezept", 5, "Rezept"], ["die Tablette", 5, "Tabletten"], ["die Krankmeldung", 5, "Krankmeldung"],
      ["die Untersuchung", 5, "Untersuchung"], ["der Notfall", 5, "Notfall"], ["der Termin", 1, "Termin"],
    ],
    grammar: [["Imperativ mit Sie", 5], ["Modalverben", 2]],
  },
  {
    week: 6,
    parts: [part([
      passage("Neuer Raum für den Deutschtreff!",
        "Hallo zusammen, unser Deutschtreff ist ab nächster Woche in einem neuen Raum. Wir treffen uns nicht mehr in der Bibliothek, sondern im Gemeindezentrum in der Lindenstraße 8. Der Raum in der Bibliothek war leider zu klein für uns. Der Tag und die Uhrzeit bleiben gleich: dienstags um 18.30 Uhr.",
        "So findet ihr den Weg: Nehmt am Hauptbahnhof die Straßenbahn Nummer 3 in Richtung Zoo und fahrt bis zur Haltestelle „Marktplatz“. Das sind vier Stationen. Die Linie 5 fährt auch zum Marktplatz, aber sie fährt einen großen Umweg und braucht zwanzig Minuten mehr.",
        "Geht dann über den Platz und an der Kirche vorbei. Normalerweise biegt ihr an der Ampel rechts in die Lindenstraße ab. Im Moment ist dort aber eine Baustelle, und ihr könnt dort nicht zu Fuß gehen. Geht also an der Ampel geradeaus bis zur nächsten Kreuzung und biegt erst dort rechts ab. Nach hundert Metern seht ihr links das Gemeindezentrum. Es ist das gelbe Haus gegenüber der Apotheke.",
        "Unser Raum ist im ersten Stock, Raum 104. Abends ist der Haupteingang an der Straße geschlossen. Bitte benutzt den Eingang hinter dem Haus, neben dem Parkplatz. Eure Fahrräder könnt ihr im Hof abstellen, aber bitte stellt sie nicht vor den Eingang. Bis Dienstag! Marco"),
    ], [
      mc("Was ist ab nächster Woche anders?", ["der Tag", "der Ort", "die Uhrzeit"], "b",
        "Wir treffen uns nicht mehr in der Bibliothek, sondern im Gemeindezentrum in der Lindenstraße 8.",
        "The day and the time stay the same (bleiben gleich); only the place changes."),
      mc("Welche Straßenbahn sollen die Leute nehmen?", ["die Linie 3", "die Linie 5", "Beide sind gleich schnell."], "a",
        "aber sie fährt einen großen Umweg und braucht zwanzig Minuten mehr",
        "Line 5 also goes to Marktplatz, but it needs twenty minutes more, so Marco tells everyone to take line 3."),
      mc("Wo biegt man im Moment rechts ab?", ["an der Ampel", "an der nächsten Kreuzung", "an der Kirche"], "b",
        "Geht also an der Ampel geradeaus bis zur nächsten Kreuzung und biegt erst dort rechts ab.",
        "The usual turn at the traffic lights is closed because of the roadworks. You only walk past the church."),
      tf("Die Apotheke ist auf der anderen Straßenseite.", "richtig", "Es ist das gelbe Haus gegenüber der Apotheke.",
        "„gegenüber“ means opposite, so the pharmacy is on the other side of the street."),
      tf("Am Abend geht man durch den Eingang an der Straße.", "falsch",
        "Abends ist der Haupteingang an der Straße geschlossen. Bitte benutzt den Eingang hinter dem Haus, neben dem Parkplatz.",
        "In the evening the front entrance is closed; people use the entrance behind the building."),
    ])],
    words: [
      ["die Bibliothek", 6, "Bibliothek"], ["die Richtung", 6, "Richtung"], ["die Haltestelle", 6, "Haltestelle"], ["der Platz", 6, "Platz"],
      ["die Kirche", 6, "Kirche"], ["vorbei·gehen", 6, "an der Kirche vorbei"], ["die Ampel", 6, "Ampel"], ["ab·biegen", 6, "biegt ihr an der Ampel rechts in die Lindenstraße ab"],
      ["die Baustelle", 6, "Baustelle"], ["die Kreuzung", 6, "Kreuzung"], ["gegenüber", 6, "gegenüber"], ["der Eingang", 6, "Eingang"],
      ["der Parkplatz", 6, "Parkplatz"], ["stellen → stehen", 6, "stellt sie nicht"],
    ],
    grammar: [["Wechselpräpositionen", 6], ["Imperativ mit ihr", 5]],
  },
  {
    week: 7,
    parts: [part([
      passage("Bäckerei Sonnenkorn sucht ab sofort: Verkäufer/in (m/w/d) in Teilzeit",
        "Wir sind eine Familienbäckerei mit drei Filialen in Bremen und backen seit 1987 jeden Tag frisches Brot. Für unsere Filiale am Bahnhof suchen wir ab sofort eine Verkäuferin oder einen Verkäufer in Teilzeit für 20 Stunden pro Woche.",
        "Ihre Aufgaben: Sie beraten unsere Kundinnen und Kunden freundlich, verkaufen Brot, Brötchen und Kuchen und arbeiten an der Kasse. Außerdem halten Sie den Laden sauber und ordentlich.",
        "Das bringen Sie mit: Deutsch auf Niveau A2, Freude an der Arbeit mit Menschen und Zeit am Samstagvormittag. Erfahrung im Verkauf ist schön, aber keine Pflicht. In den ersten zwei Wochen arbeitet eine erfahrene Kollegin immer mit Ihnen zusammen.",
        "Das bieten wir: ein nettes Team, 14,50 € pro Stunde, am Sonntag 25 Prozent mehr Gehalt, und jeden Tag kostenloses Brot für alle Mitarbeitenden.",
        "Arbeitszeiten: Montag bis Freitag entweder Frühschicht von 6 bis 10 Uhr oder Spätschicht von 14 bis 18 Uhr, außerdem jeden zweiten Samstag von 7 bis 12 Uhr. Am Sonntag ist die Filiale am Bahnhof von 8 bis 11 Uhr geöffnet. Am Sonntag arbeiten aber nur Mitarbeitende, die das möchten.",
        "Interesse? Schicken Sie Ihren Lebenslauf bis zum 15. März per E-Mail an jobs@sonnenkorn.example. Sie möchten uns lieber persönlich kennenlernen? Dann kommen Sie dienstags zwischen 14 und 16 Uhr in die Filiale am Bahnhof und fragen Sie nach Frau Kuhn."),
    ], [
      mc("Welche Person passt am besten zu der Stelle?", [
        "Sie hat viel Erfahrung im Verkauf, kann aber nie am Samstag arbeiten.",
        "Sie hat noch nie im Verkauf gearbeitet, spricht aber gern mit Menschen und hat samstags Zeit.",
        "Sie sucht eine Stelle mit 40 Stunden pro Woche.",
      ], "b", "Erfahrung im Verkauf ist schön, aber keine Pflicht.",
        "Experience is not required, but time on Saturday mornings is. The job has 20 hours a week, not 40."),
      mc("Wie viel verdient man ungefähr pro Stunde am Sonntag?", ["14,50 €", "etwa 18 €", "25 €"], "b", "am Sonntag 25 Prozent mehr Gehalt",
        "25 % more than 14,50 € is about 18,13 €. 14,50 € is the normal rate, and 25 is the percentage, not the pay."),
      mc("Wie kann man sich bewerben?", ["nur per E-Mail", "per E-Mail oder am Dienstagnachmittag persönlich", "jeden Tag persönlich in allen Filialen"], "b",
        "Dann kommen Sie dienstags zwischen 14 und 16 Uhr in die Filiale am Bahnhof",
        "There are two ways: e-mail, or in person on Tuesday afternoon in the station branch – not every day and not in every branch."),
      tf("Man muss an jedem Samstag arbeiten.", "falsch", "außerdem jeden zweiten Samstag von 7 bis 12 Uhr",
        "Staff work only every second Saturday."),
      tf("Am Anfang arbeitet man nicht allein.", "richtig", "In den ersten zwei Wochen arbeitet eine erfahrene Kollegin immer mit Ihnen zusammen.",
        "For the first two weeks an experienced colleague always works with you."),
    ])],
    words: [
      ["die Teilzeit", 7, "Teilzeit"], ["die Aufgabe", 7, "Aufgaben"], ["der Kunde", 7, "Kunden"], ["die Erfahrung", 7, "Erfahrung"],
      ["der Kollege / die Kollegin", 7, "Kollegin"], ["das Gehalt", 7, "Gehalt"], ["die Arbeitszeit", 7, "Arbeitszeiten"], ["die Schicht", 7, "Frühschicht"],
      ["der Lebenslauf", 7, "Lebenslauf"], ["kennen·lernen", 7, "kennenlernen"], ["die Kasse", 2, "Kasse"],
    ],
    grammar: [["Modalverben", 2], ["aber und oder", 7]],
  },
  {
    week: 8,
    parts: [part([
      passage("Forum: Was schenke ich meiner Schwester?",
        "Nora: Meine Schwester Lisa hat nächste Woche Geburtstag. Sie wird 30. Sie liest gern, macht viel Sport und trinkt am liebsten Tee. Kleidung möchte ich ihr nicht schenken, denn ich finde nie die richtige Größe und Farbe für sie. Ich möchte nicht mehr als 40 Euro ausgeben. Habt ihr eine Idee?",
        "Jan: Ein Buch ist immer gut! Aber vielleicht hat sie schon viele Bücher. Ein Gutschein für eine Buchhandlung ist praktischer, dann kann sie selbst auswählen. Gutscheine gibt es ab 10 Euro. Die Buchhandlung am Markt hat auch schöne Karten dazu.",
        "Mehmet: Kauf ihr eine schöne Teekanne und einen guten Tee. Das ist persönlicher als ein Gutschein. Im Teeladen in der Fußgängerzone kostet das zusammen ungefähr 35 Euro, und sie packen es dort auch schön ein.",
        "Clara: Ich finde Erlebnisse besser als Sachen. Geht zusammen in ein Kletterzentrum! Ein Tagesticket kostet 18 Euro pro Person. Das ist am günstigsten, und ihr habt Zeit zusammen. Das Kletterzentrum ist auch am Sonntag geöffnet.",
        "Nora: Danke euch! Claras Idee gefällt mir am besten. Aber Lisa hat sich letzten Monat am Fuß verletzt und darf noch keinen Sport machen. Und eine Teekanne hat sie schon zu Weihnachten bekommen. Ich glaube, ich nehme Jans Idee und kaufe noch eine Tafel Schokolade dazu."),
    ], [
      mc("Warum möchte Nora ihrer Schwester keine Kleidung schenken?", ["Kleidung ist ihr zu teuer.", "Sie weiß nicht, was Lisa passt und steht.", "Lisa hat schon genug Kleidung."], "b",
        "denn ich finde nie die richtige Größe und Farbe für sie",
        "Size is about what fits (passen), colour about what suits (stehen). Price and Lisa's wardrobe are not her reason."),
      mc("Was kostet Claras Idee für Nora und Lisa zusammen?", ["18 Euro", "35 Euro", "36 Euro"], "c", "Ein Tagesticket kostet 18 Euro pro Person.",
        "Two people: 2 × 18 € = 36 €. 18 € is one person; 35 € is Mehmet's idea."),
      mc("Was schenkt Nora am Ende?", ["einen Gutschein für eine Buchhandlung und Schokolade", "eine Teekanne mit Tee", "einen Tag im Kletterzentrum"], "a",
        "Ich glaube, ich nehme Jans Idee und kaufe noch eine Tafel Schokolade dazu.",
        "Jan suggested the bookshop voucher. Lisa already has a teapot, and she may not do sport at the moment."),
      tf("Lisa kann im Moment nicht klettern gehen.", "richtig", "Aber Lisa hat sich letzten Monat am Fuß verletzt und darf noch keinen Sport machen.",
        "She injured her foot and may not do sport yet, so climbing is not possible."),
      tf("Mehmets Geschenk kostet mehr als 40 Euro.", "falsch", "kostet das zusammen ungefähr 35 Euro",
        "About 35 € is below Nora's limit of 40 €."),
    ])],
    words: [
      ["der Geburtstag", 8, "Geburtstag"], ["schenken (+ Dat. + Akk.)", 8, "schenken"], ["die Größe", 8, "Größe"], ["die Farbe", 8, "Farbe"],
      ["der Gutschein", 8, "Gutschein"], ["aus·wählen", 8, "auswählen"], ["ein·packen", 8, "packen es dort auch schön ein"],
      ["die Fußgängerzone", 6, "Fußgängerzone"], ["sich verletzen", 5, "verletzt"],
    ],
    grammar: [["Komparativ und Superlativ", 8], ["denn", 7]],
  },
  {
    week: 9,
    parts: [part([
      passage("Einladung",
        "Liebe Freundinnen und Freunde, ich habe es geschafft: Ich habe meine Prüfung bestanden! Das möchte ich mit euch feiern. Die Party ist am Freitag, den 14. März, ab 19.30 Uhr in meinem Garten im Rosenweg 5. Wenn es regnet, feiern wir im Keller. Dort ist genug Platz für alle Gäste.",
        "Ich mache Salate und kaufe die Getränke. Ich freue mich aber, wenn ihr einen Nachtisch mitbringt. Ihr könnt gern eure Partner mitbringen, aber bitte keine Hunde, denn meine Katze hat Angst. Bitte sagt mir bis Montag Bescheid: Kommt ihr? Dann kann ich besser planen. Ich freue mich auf euch! Jana"),
      passage("Nachricht von Jana am Mittwoch",
        "Hallo zusammen, danke für eure schnellen Antworten auf meine Einladung! Fast alle haben schon zugesagt. Es gibt aber eine kleine Änderung: Mein Bruder möchte mit seiner Band spielen, und ich habe natürlich ja gesagt. Die Party fängt deshalb schon um 18 Uhr an, denn die Nachbarn möchten ab 22 Uhr Ruhe haben.",
        "Wer mit dem Auto kommt: In meiner Straße gibt es leider keine Parkplätze. Bitte parkt am Sportplatz und geht die fünf Minuten zu Fuß. Wer mit dem Bus kommt: Die Linie 4 hält am Rosenweg. Und noch etwas: Nachtisch habe ich jetzt schon genug. Bringt lieber Brot oder Käse mit! Bis Freitag, Jana"),
    ], [
      mc("Warum feiert Jana?", ["Sie hat Geburtstag.", "Sie hat eine Prüfung geschafft.", "Sie hat eine neue Wohnung."], "b", "Ich habe meine Prüfung bestanden!",
        "No birthday and no new flat are mentioned; „bestanden“ means she passed an exam."),
      mc("Warum beginnt die Party früher?", ["Es soll regnen.", "Die Nachbarn möchten am späten Abend Ruhe.", "Jana muss am Samstag früh arbeiten."], "b",
        "denn die Nachbarn möchten ab 22 Uhr Ruhe haben",
        "Rain only changes the place (the cellar), and work on Saturday is not mentioned. The band plays, and from 22:00 it must be quiet."),
      mc("Was sollen die Gäste jetzt mitbringen?", ["einen Nachtisch", "Brot oder Käse", "Getränke"], "b", "Bringt lieber Brot oder Käse mit!",
        "The first message asked for dessert, but on Wednesday Jana has enough. She buys the drinks herself."),
      tf("Gäste mit Auto müssen ein Stück zu Fuß gehen.", "richtig", "Bitte parkt am Sportplatz und geht die fünf Minuten zu Fuß.",
        "There is no parking in Jana's street, so drivers park at the sports ground and walk."),
      tf("Bei Regen gibt es keine Party.", "falsch", "Wenn es regnet, feiern wir im Keller.",
        "If it rains, the party moves to the cellar."),
    ])],
    words: [
      ["feiern", 9, "feiern"], ["der Gast", 9, "Gäste"], ["das Getränk", 9, "Getränke"], ["mit·bringen", 9, "mitbringt"],
      ["sich freuen auf (+ Akk.)", 9, "freue mich auf euch"], ["die Einladung", 9, "Einladung"], ["zu·sagen ↔ ab·sagen", 9, "zugesagt"],
      ["der Parkplatz", 6, "Parkplätze"],
    ],
    grammar: [["wenn-Sätze", 9], ["Reflexive Verben", 9]],
  },
  {
    week: 10,
    parts: [part([
      passage("Buchungsbestätigung – Hotel Alpenblick",
        "Sehr geehrte Frau Sanchez, vielen Dank für Ihre Buchung. Hier sind Ihre Daten: Anreise am Freitag, 6. Juni, ab 15 Uhr. Abreise am Sonntag, 8. Juni, bis 11 Uhr. Zimmer: ein Doppelzimmer mit Balkon für zwei Nächte. Preis: 98 € pro Nacht mit Frühstück. Ihre Buchungsnummer ist 4521.",
        "Frühstück gibt es von 7 bis 10 Uhr, am Samstag und Sonntag bis 10.30 Uhr. Halbpension mit Abendessen um 19 Uhr kostet 22 € pro Person und Nacht extra. Kinder unter 6 Jahren essen kostenlos. Bitte sagen Sie uns einen Tag vorher Bescheid.",
        "Die Rezeption ist von 7 bis 22 Uhr geöffnet. Kommen Sie später an? Dann rufen Sie uns bitte vorher an. Wir legen Ihren Schlüssel in eine Box neben dem Eingang und schicken Ihnen den Code per SMS.",
        "Parkplätze gibt es hinter dem Hotel (8 € pro Tag). Vom Bahnhof sind es zehn Minuten zu Fuß, ein Taxi kostet ungefähr 12 €. Haben Sie viel Gepäck? Dann holen wir Sie kostenlos mit unserem Hotelbus am Bahnhof ab. Bitte reservieren Sie diesen Service mindestens einen Tag vorher.",
        "Stornierung: Bis drei Tage vor der Anreise ist die Stornierung kostenlos. Danach bezahlen Sie die Hälfte vom Zimmerpreis. Mit freundlichen Grüßen, Ihr Team vom Hotel Alpenblick"),
    ], [
      mc("Was kostet das Zimmer für den ganzen Aufenthalt, ohne Parkplatz und Abendessen?", ["98 €", "196 €", "294 €"], "b", "Preis: 98 € pro Nacht mit Frühstück.",
        "Two nights (Friday to Sunday): 2 × 98 € = 196 €. 98 € is one night; 294 € would be three nights."),
      mc("Frau Sanchez und ihr Mann möchten am Freitag und am Samstag im Hotel zu Abend essen. Was kostet das extra?", ["22 €", "44 €", "88 €"], "c",
        "kostet 22 € pro Person und Nacht extra",
        "2 people × 2 nights × 22 € = 88 €. 44 € counts only one person or one night."),
      mc("Bis wann kann Frau Sanchez kostenlos stornieren?", ["bis 3. Juni", "bis 5. Juni", "bis 6. Juni"], "a", "Bis drei Tage vor der Anreise ist die Stornierung kostenlos.",
        "Arrival is on 6 June; three days before is 3 June. After that she pays half the room price."),
      tf("Am Sonntag kann man bis halb elf frühstücken.", "richtig", "am Samstag und Sonntag bis 10.30 Uhr",
        "At the weekend breakfast lasts until 10:30 (halb elf)."),
      tf("Für den Hotelbus muss man extra bezahlen.", "falsch", "Dann holen wir Sie kostenlos mit unserem Hotelbus am Bahnhof ab.",
        "The hotel bus is free; you only have to book it a day ahead."),
    ])],
    words: [
      ["das Einzelzimmer / das Doppelzimmer", 10, "Doppelzimmer"], ["die Halbpension", 10, "Halbpension"], ["die Rezeption", 10, "Rezeption"],
      ["ab·fahren ↔ an·kommen", 10, "Kommen Sie später an"], ["das Gepäck / der Koffer", 10, "Gepäck"], ["buchen / reservieren", 10, "reservieren"],
      ["die Stornierung", 10, "Stornierung"], ["der Schlüssel", 3, "Schlüssel"], ["der Eingang", 6, "Eingang"],
    ],
    grammar: [["Zeitangaben", 10], ["Imperativ mit Sie", 5]],
  },
  {
    week: 11,
    parts: [part([
      passage("Bürgeramt Neustadt (fiktive Stadt): Wohnsitz anmelden",
        "Wer muss sich anmelden? Alle Personen, die neu nach Neustadt ziehen, auch Kinder.",
        "Wann? Innerhalb von 14 Tagen nach dem Einzug. Eine späte Anmeldung kann teuer werden.",
        "Was brauchen Sie? Ihren Personalausweis oder Reisepass, für Kinder die Geburtsurkunde. Außerdem brauchen Sie die Wohnungsgeberbestätigung. Diese Bescheinigung bekommen Sie von Ihrem Vermieter, und er muss sie unterschreiben. Das Anmeldeformular können Sie online oder im Bürgeramt ausfüllen.",
        "Termin: Bitte buchen Sie online einen Termin. Ohne Termin bekommen Sie am Eingang eine Wartenummer, aber Sie müssen oft lange warten.",
        "Kosten: Die Anmeldung ist kostenlos. Eine Meldebescheinigung kostet 5 €. Sie können bar oder mit Karte bezahlen.",
        "Sie können nicht selbst kommen? Dann kann eine andere Person die Anmeldung für Sie machen. Diese Person braucht ein Schreiben mit Ihrer Unterschrift und eine Kopie von Ihrem Ausweis.",
        "Sie ziehen mit Ihrer Familie um? Dann kann eine Person alle Familienmitglieder anmelden. Bringen Sie bitte die Ausweise von allen Personen mit. Nach der Anmeldung bekommen Sie eine Meldebescheinigung, wenn Sie das möchten. Diese brauchen Sie zum Beispiel bei der Bank, wenn Sie ein Konto eröffnen. Ihre neue Adresse schreiben wir auch auf Ihren Personalausweis. Das kostet nichts.",
        "Öffnungszeiten: Montag und Mittwoch 8–14 Uhr, Dienstag und Donnerstag 10–18 Uhr, Freitag 8–12 Uhr."),
    ], [
      mc("Sie sind am 3. Mai eingezogen. Bis wann müssen Sie sich spätestens anmelden?", ["bis 10. Mai", "bis 17. Mai", "bis 3. Juni"], "b",
        "Innerhalb von 14 Tagen nach dem Einzug.",
        "3 May + 14 days = 17 May. 10 May is only one week later; 3 June is a whole month later."),
      mc("Wer unterschreibt die Wohnungsgeberbestätigung?", ["Sie selbst", "Ihr Vermieter", "eine Mitarbeiterin im Bürgeramt"], "b",
        "Diese Bescheinigung bekommen Sie von Ihrem Vermieter, und er muss sie unterschreiben.",
        "You sign only the letter for another person. The office does not sign this confirmation."),
      mc("Sie sind krank, und Ihre Freundin geht für Sie zum Bürgeramt. Was braucht sie?", [
        "nur ihren eigenen Ausweis",
        "Ihre Unterschrift auf einem Schreiben und eine Kopie Ihres Ausweises",
        "eine Meldebescheinigung",
      ], "b", "Diese Person braucht ein Schreiben mit Ihrer Unterschrift und eine Kopie von Ihrem Ausweis.",
        "Her own ID alone is not enough, and the registration certificate is what you get after registering."),
      tf("Sie arbeiten bis 16 Uhr. Am Dienstag und am Donnerstag können Sie nach der Arbeit kommen.", "richtig", "Dienstag und Donnerstag 10–18 Uhr",
        "Only on Tuesday and Thursday is the office open after 16:00."),
      tf("Die Anmeldung und eine Meldebescheinigung kosten zusammen 10 €.", "falsch", "Die Anmeldung ist kostenlos. Eine Meldebescheinigung kostet 5 €.",
        "Registration is free, so together it costs 5 €."),
    ])],
    words: [
      ["das Bürgeramt", 11, "Bürgeramt"], ["sich an·melden", 11, "anmelden"], ["der Reisepass", 11, "Reisepass"], ["die Bescheinigung", 11, "Bescheinigung"],
      ["unterschreiben", 11, "unterschreiben"], ["aus·füllen", 11, "ausfüllen"], ["die Wartenummer", 11, "Wartenummer"], ["die Anmeldung", 11, "Anmeldung"],
      ["die Unterschrift", 11, "Unterschrift"], ["die Kopie", 11, "Kopie"], ["der Ausweis", 11, "Ausweis"], ["das Konto", 11, "Konto"], ["eröffnen", 11, "eröffnen"], ["der Vermieter / die Vermieterin", 3, "Vermieter"],
    ],
    grammar: [["Modalverben", 2], ["Imperativ mit Sie", 5]],
  },
  {
    week: 12,
    parts: [
      {
        title: "Teil A: Wohin gehen Sie?",
        instruction: "Lesen Sie den Wegweiser und die Aufgaben 1–3. Kreuzen Sie an: a, b oder c.",
        instructionEn: "Read the store guide and tasks 1–3. Choose a, b or c.",
        passages: [passage("Kaufhaus Zentral – Wegweiser",
          "Untergeschoss: Lebensmittel, Getränke, Haushaltswaren (Teller, Tassen, Töpfe)",
          "Erdgeschoss: Taschen, Schmuck, Uhren, Information, Kundenservice (Umtausch und Rückgabe mit Kassenbon)",
          "1. Stock: Damenmode, Damenschuhe, Sportkleidung",
          "2. Stock: Herrenmode, Herrenschuhe, Kindermode, Spielzeug",
          "3. Stock: Elektro, Handys, Computer, Café „Zentral“ mit Dachterrasse",
          "4. Stock: Möbel, Lampen, Teppiche, Bettwäsche",
          "Toiletten finden Sie im 1. und im 3. Stock. Der Aufzug ist neben dem Haupteingang. Unsere Information im Erdgeschoss hilft Ihnen gern, wenn Sie etwas nicht finden. Das Café im 3. Stock ist bis 19 Uhr geöffnet.")],
        questions: [
          mc("Sie möchten eine Jacke zurückgeben. Sie haben sie letzte Woche hier gekauft.", ["Erdgeschoss", "1. Stock", "anderes Stockwerk"], "a",
            "Kundenservice (Umtausch und Rückgabe mit Kassenbon)",
            "Returns go to customer service on the ground floor, not to the fashion floors."),
          mc("Ihr Neffe wird fünf Jahre alt, und Sie suchen ein Geschenk.", ["Erdgeschoss", "2. Stock", "anderes Stockwerk"], "b", "Kindermode, Spielzeug",
            "Toys and children's clothes are on the 2nd floor. Bags and jewellery on the ground floor are not for a five-year-old."),
          mc("Sie brauchen eine Lampe für Ihr Wohnzimmer.", ["3. Stock", "Untergeschoss", "anderes Stockwerk"], "c", "4. Stock: Möbel, Lampen",
            "Lamps are on the 4th floor. The 3rd floor (electronics) and the basement (household goods) are traps."),
        ],
      },
      {
        title: "Teil B: Welche Anzeige passt?",
        instruction: "Lesen Sie die Anzeigen a–d und die Aufgaben 4–6. Welche Anzeige passt? Eine Anzeige passt nicht.",
        instructionEn: "Read adverts a–d and tasks 4–6. Which advert fits? One advert does not fit.",
        passages: [
          passage("a", "Sprachcafé im Stadtteilzentrum: jeden Samstag von 15 bis 17 Uhr. Sprechen Sie Deutsch mit Menschen aus der Nachbarschaft, alle Niveaus sind willkommen. Der Eintritt ist frei, ein Kaffee kostet 1 €."),
          passage("b", "Fitnessstudio FitPlus: Neu ist unser Abendtarif. Sie trainieren von Montag bis Freitag ab 19 Uhr für nur 15 € im Monat. Wer auch tagsüber kommen möchte, bezahlt 39 € im Monat."),
          passage("c", "Sprachschule Lingua: Samstagskurs Deutsch B1, jeden Samstag von 9 bis 13 Uhr, vier Wochen, 390 €. Wir wiederholen die wichtigste Grammatik, bieten eine gute Vorbereitung auf die Prüfung und vergleichen jede Woche Ihre Ergebnisse. So sehen Sie Ihren Fortschritt."),
          passage("d", "Bauernhof Lindenhof: sonntags von 10 bis 17 Uhr geöffnet. Tiere füttern, Traktor fahren, großer Spielplatz. Erwachsene 6 €, Kinder unter 6 Jahren frei."),
        ],
        questions: [
          mc("Selin möchte am Wochenende ihr Deutsch verbessern, aber sie hat wenig Geld.", ["a", "b", "c", "d"], "a", "Der Eintritt ist frei, ein Kaffee kostet 1 €.",
            "The B1 course (c) is also on Saturday, but it costs 390 €. The language café is almost free."),
          mc("Paul arbeitet bis 18 Uhr und sucht eine günstige Möglichkeit, abends Sport zu machen.", ["a", "b", "c", "d"], "b",
            "Sie trainieren von Montag bis Freitag ab 19 Uhr für nur 15 € im Monat.",
            "After work he can use the cheap evening rate from 19:00. No other advert offers sport."),
          mc("Familie Roth möchte am Sonntag mit den Kindern einen Ausflug machen.", ["a", "b", "c", "d"], "d", "sonntags von 10 bis 17 Uhr geöffnet",
            "The farm is open on Sundays and has a playground. Advert c is the one that fits nobody."),
        ],
      },
    ],
    words: [
      ["wiederholen", 12, "wiederholen"], ["die Vorbereitung", 12, "Vorbereitung"], ["die Prüfung", 12, "Prüfung"], ["vergleichen", 12, "vergleichen"],
      ["das Ergebnis", 12, "Ergebnisse"], ["der Fortschritt", 12, "Fortschritt"], ["die Rückgabe", 8, "Rückgabe"], ["der Kassenbon", 8, "Kassenbon"],
      ["der Aufzug", 3, "Aufzug"],
    ],
    grammar: [["Wiederholung: Verbposition", 12], ["Wechselpräpositionen", 6]],
  },
];

export function applyReadings(course: Course): void {
  for (const reading of READINGS) {
    const unit = course.weeks[reading.week - 1];
    const section = unit?.sections.find((s) => s.role === "reading");
    if (!unit || !section) throw new Error(`Missing reading section for topic ${reading.week}`);
    const old = new Set(section.blocks.flatMap((block) => (block.kind === "item" ? [block.itemId] : [])));
    unit.items = Object.fromEntries(Object.entries(unit.items).filter(([id]) => !old.has(id)));
    const blocks: Block[] = [];
    let n = 0;
    for (const part of reading.parts) {
      if (part.title) blocks.push({ kind: "h", text: [{ t: part.title }] });
      blocks.push({ kind: "p", text: [{ t: part.instruction }] });
      const words = part.passages.reduce((sum, p) => sum + wordCount(passageText(p)), 0);
      if (words > STRETCH_WORDS) blocks.push({ kind: "p", text: [{ t: STRETCH, i: true }] });
      for (const p of part.passages) blocks.push({ kind: "quote", lines: [[{ t: p.title, b: true }], ...p.paragraphs.map((line) => [{ t: line }])] });
      for (const q of part.questions) {
        n++;
        const id = `${unit.id}-lesen-v2-${n}`;
        unit.items[id] = choiceItem(id, n, "Lesen", q);
        blocks.push({ kind: "item", itemId: id });
      }
    }
    section.blocks = blocks;
  }
}
