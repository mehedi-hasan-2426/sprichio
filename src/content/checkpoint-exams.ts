import type { CheckpointExam, Course, ExamPassage, ExamSpeakingPart, Item } from "../lib/types.ts";
import { parseInline } from "../lib/inline.ts";
import type { AuthorPart, Question, WordRef } from "./exam-kit.ts";
import { choiceItem } from "./exam-kit.ts";

interface FormField {
  label: string;
  value?: string;
  answers?: string[];
  evidence?: string;
}

export interface ExamSource {
  n: number;
  topics: number[];
  reading: AuthorPart[];
  form: { title: string; instruction: string; instructionEn: string; source: ExamPassage; fields: FormField[] };
  letter: { situation: string; instructionEn: string; points: string[]; covers: number[]; min: number; max: number; model: string };
  speaking: ExamSpeakingPart[];
  words: WordRef[];
}

const passage = (title: string, ...paragraphs: string[]): ExamPassage => ({ title, paragraphs });
const mc = (prompt: string, options: string[], answer: string, evidence: string, why: string): Question => ({ prompt, options, answer, evidence, why });
const tf = (prompt: string, answer: "richtig" | "falsch", evidence: string, why: string): Question => ({ prompt, answer, evidence, why });
const ADS = ["a", "b", "c", "d", "e", "f", "g", "h", "x"];
const match = (prompt: string, answer: string, evidence: string, why: string): Question => ({ prompt, options: ADS, answer, evidence, why });

const LESEN_1 = { title: "Lesen, Teil 1", instruction: "Lesen Sie die Aufgaben 1–5 und den Text. Kreuzen Sie an: a, b oder c.", instructionEn: "Read tasks 1–5 and the text. Choose a, b or c." };
const LESEN_2 = { title: "Lesen, Teil 2", instruction: "Lesen Sie den Text und die Aufgaben 6–10. Sind die Aussagen richtig oder falsch?", instructionEn: "Read the text and tasks 6–10. Are the statements true or false?", stretch: true };
const LESEN_3 = {
  title: "Lesen, Teil 3",
  instruction: "Lesen Sie die Anzeigen a–h und die Aufgaben 11–15. Welche Anzeige passt zu welcher Situation? Für eine Situation passt keine Anzeige. Dann wählen Sie x.",
  instructionEn: "Read adverts a–h and tasks 11–15. Which advert fits which situation? One situation has no matching advert: choose x.",
};
const FORM_EN = "Read the text. Write the five missing pieces of information into the form. Write only the information, not whole sentences.";
const LETTER_EN = "Choose three of the four points and write one or two sentences for each. Start with a greeting and end with a closing. Write about 40 words.";
const INTRO = {
  title: "Sprechen, Teil 1: Sich vorstellen",
  instruction: "Stellen Sie sich vor. Sagen Sie zu jedem Stichwort ein bis zwei ganze Sätze. Ihr Partner oder Ihre Partnerin stellt danach eine Frage zu Ihnen.",
  instructionEn: "Introduce yourself. Say one or two full sentences for every keyword. Then your partner asks you one question.",
};
const TALK = {
  title: "Sprechen, Teil 2: Ein Alltagsgespräch führen",
  instruction: "Nehmen Sie eine Karte nach der anderen. Stellen Sie mit dem Fragewort eine Frage zum Thema. Ihr Partner oder Ihre Partnerin antwortet und fragt Sie dann auch. Allein üben: Stellen Sie die Frage laut und antworten Sie selbst in zwei bis drei Sätzen.",
  instructionEn: "Take one card after another. Ask a question about the topic with the question word; your partner answers and then asks you. Practising alone: ask the question aloud and answer it yourself in two or three sentences.",
};
const PLAN_TITLE = "Sprechen, Teil 3: Etwas aushandeln";
const PLAN_EN = "You are A and your partner is B. Each of you only looks at your own column. Make suggestions, say no politely with a reason and agree on one time.";

export const CHECKPOINT_EXAMS: ExamSource[] = [
  {
    n: 1,
    topics: [1, 2, 3, 4],
    reading: [
      {
        ...LESEN_1,
        passages: [passage("Wohnanlage Am Lindenpark – Informationen für neue Mieterinnen und Mieter",
          "Herzlich willkommen in der Wohnanlage Am Lindenpark! Hier finden Sie die wichtigsten Informationen für Ihren Alltag im Haus.",
          "Hausmeister: Herr Kaya hat sein Büro im Erdgeschoss von Haus B, gleich neben dem Aufzug. Sprechzeiten: Montag und Donnerstag von 7 bis 9 Uhr, Mittwoch von 16 bis 18 Uhr. Bei Problemen mit dem Wasser oder mit der Heizung erreichen Sie Herrn Kaya auch am Abend und am Wochenende am Handy: 0151 200 300.",
          "Schlüssel: Einen zweiten Schlüssel für Ihre Wohnung bekommen Sie nur beim Vermieter, nicht beim Hausmeister. Der Schlüssel kostet 25 Euro. Haben Sie Ihren Schlüssel verloren? Dann rufen Sie bitte sofort den Vermieter an.",
          "Waschküche: Die Waschmaschinen im Keller von Haus A können Sie von Montag bis Samstag zwischen 7 und 20 Uhr benutzen. Am Sonntag bleibt die Waschküche geschlossen. Bitte nehmen Sie Ihre Wäsche nach dem Waschen gleich mit.",
          "Pakete: Sie sind nicht zu Hause? Dann nimmt Frau Berger aus dem Erdgeschoss von Haus A Ihre Pakete an. Sie ist meistens den ganzen Tag zu Hause. Bitte holen Sie Ihre Pakete noch am selben Tag bei ihr ab.",
          "Fahrräder: Fahrräder sind im Flur und vor dem Aufzug nicht erlaubt. Für Fahrräder gibt es einen Raum hinter Haus B. Den Schlüssel für diesen Raum bekommen Sie beim Hausmeister.",
          "Ruhe: Bitte machen Sie von 22 bis 6 Uhr und am Sonntag keine laute Musik. Ihre Nachbarn danken Ihnen!")],
        questions: [
          mc("Sie brauchen einen zweiten Schlüssel für Ihre Wohnung. Wen fragen Sie?", ["Herrn Kaya", "den Vermieter", "Frau Berger"], "b",
            "Einen zweiten Schlüssel für Ihre Wohnung bekommen Sie nur beim Vermieter, nicht beim Hausmeister.",
            "Herr Kaya is the caretaker; the text excludes him for flat keys (he only has the key for the bike room). Frau Berger takes in parcels."),
          mc("Am Samstagabend ist Ihre Heizung kalt. Was machen Sie?", ["Sie gehen am Montag um 7 Uhr ins Büro von Herrn Kaya.", "Sie rufen Herrn Kaya gleich am Handy an.", "Sie warten bis Mittwoch um 16 Uhr."], "b",
            "Bei Problemen mit dem Wasser oder mit der Heizung erreichen Sie Herrn Kaya auch am Abend und am Wochenende am Handy",
            "Monday and Wednesday are only his office hours. For heating problems you can call his mobile, also at the weekend."),
          mc("Sie möchten am Sonntagvormittag Wäsche waschen. Was ist richtig?", ["Das geht von 7 bis 20 Uhr.", "Das geht am Sonntag nicht.", "Das geht nur in Haus B."], "b",
            "Am Sonntag bleibt die Waschküche geschlossen.",
            "7–20 Uhr is only Monday to Saturday, and the machines are in Haus A, not Haus B."),
          mc("Ein Paket kommt am Dienstag, aber Sie sind bei der Arbeit. Wo holen Sie es ab?", ["bei einer Nachbarin im Erdgeschoss von Haus A", "im Büro neben dem Aufzug", "im Keller von Haus A"], "a",
            "Dann nimmt Frau Berger aus dem Erdgeschoss von Haus A Ihre Pakete an.",
            "The office next to the lift is the caretaker's office, and the basement of Haus A is the laundry room."),
          mc("Wo darf Ihr Fahrrad stehen?", ["im Flur vor Ihrer Wohnung", "in einem Raum hinter Haus B", "neben dem Aufzug"], "b",
            "Für Fahrräder gibt es einen Raum hinter Haus B.",
            "Bikes are not allowed in the hallway or in front of the lift."),
        ],
      },
      {
        ...LESEN_2,
        passages: [passage("Mein neues Leben in Kassel – ein Blog von Samira",
          "Letzten Monat bin ich von Hamburg nach Kassel umgezogen. Meine neue Wohnung hat zwei Zimmer, eine kleine Küche und einen Balkon. Sie ist im vierten Stock, und leider gibt es keinen Aufzug. Am Tag vom Umzug haben mir zwei Freunde aus Hamburg geholfen. Wir haben den ganzen Samstag Kartons und Möbel getragen. Nur den großen Schrank haben wir allein nicht geschafft. Da hat der Nachbar aus dem dritten Stock, Herr Lehmann, sofort mitgeholfen. Am Sonntag habe ich ihm zum Dank einen Kuchen gebracht. Jetzt grüßen wir uns jeden Morgen auf der Treppe.",
          "Mein Alltag ist jetzt ganz anders. In Hamburg habe ich nur zehn Minuten zur Arbeit gebraucht, ich bin immer zu Fuß gegangen. Hier fahre ich vierzig Minuten mit dem Bus. Mein Wecker klingelt jetzt schon um halb sechs und nicht mehr um sieben. Frühstück gibt es zu Hause nicht mehr. Ich esse ein Brötchen im Bus und trinke meinen Kaffee bei der Arbeit. Dafür habe ich schon um 16 Uhr Feierabend, und am Nachmittag habe ich viel Zeit.",
          "Am Dienstag und am Freitag gibt es in meiner Straße einen Markt. Das Obst und das Gemüse dort kosten genauso viel wie im Supermarkt, aber sie sind viel frischer. Am ersten Freitag habe ich dort Kartoffeln und Äpfel gekauft. Erst beim Bezahlen habe ich gesehen: Ich habe kein Bargeld dabei, und am Markt kann man nicht mit Karte bezahlen. Die Verkäuferin war sehr nett. Ich habe die Äpfel und die Kartoffeln trotzdem mitgenommen und das Geld am Dienstag gebracht. Seitdem kaufe ich jede Woche bei ihr ein.",
          "Letztes Wochenende hatte ich endlich Zeit für die Stadt. Am Samstag hat es den ganzen Tag geregnet. Ich bin zu Hause geblieben, habe die letzten Kartons ausgepackt und die Küche aufgeräumt. Am Abend habe ich lange mit meiner Mutter telefoniert. Am Sonntag war das Wetter dann wunderschön. Herr Lehmann und seine Frau haben mich zu einem Ausflug in den Bergpark mitgenommen. Wir sind drei Stunden gewandert und haben viele Fotos gemacht. Mittags haben wir in einem kleinen Restaurant gegessen. Herr Lehmann hat für alle bezahlt, aber nächstes Mal bezahle ich!",
          "Am Abend war ich sehr müde, aber glücklich. Ich glaube, in Kassel kann ich gut leben.")],
        questions: [
          tf("Beim Umzug haben Samira nur ihre Freunde geholfen.", "falsch",
            "Da hat der Nachbar aus dem dritten Stock, Herr Lehmann, sofort mitgeholfen.",
            "Her two friends helped, but the neighbour Herr Lehmann also helped with the big wardrobe."),
          tf("Samira braucht jetzt mehr Zeit für den Weg zur Arbeit.", "richtig",
            "In Hamburg habe ich nur zehn Minuten zur Arbeit gebraucht, ich bin immer zu Fuß gegangen. Hier fahre ich vierzig Minuten mit dem Bus.",
            "She used to need ten minutes; now she needs forty."),
          tf("Auf dem Markt bezahlt Samira weniger für Obst und Gemüse.", "falsch",
            "Das Obst und das Gemüse dort kosten genauso viel wie im Supermarkt, aber sie sind viel frischer.",
            "The prices are the same as in the supermarket; the difference is that the food is fresher."),
          tf("Beim ersten Einkauf auf dem Markt hat Samira erst später bezahlt.", "richtig",
            "Ich habe die Äpfel und die Kartoffeln trotzdem mitgenommen und das Geld am Dienstag gebracht.",
            "She had no cash on Friday and brought the money the following Tuesday."),
          tf("Am Samstag hat Samira mit ihren Nachbarn einen Ausflug gemacht.", "falsch",
            "Am Samstag hat es den ganzen Tag geregnet. Ich bin zu Hause geblieben",
            "The trip with the Lehmanns was on Sunday. On Saturday it rained and she stayed at home."),
        ],
      },
      {
        ...LESEN_3,
        passages: [
          passage("a", "Umzug ins Ausland! Wir verkaufen ein graues Sofa (drei Jahre alt), einen Tisch und vier Stühle. Alles zusammen kostet 150 Euro. Sie müssen die Möbel selbst abholen: 4. Stock, kein Aufzug. Am Samstag von 10 bis 14 Uhr, Gartenweg 3."),
          passage("b", "Bäckerei Korn – Frühstück zum Mitnehmen: Kaffee und zwei Brötchen für nur 3,50 Euro, von Montag bis Freitag ab 6 Uhr. Am Samstag und am Sonntag ist die Bäckerei geschlossen."),
          passage("c", "Kochen mit Gemüse aus der Region: Unser Kochkurs zeigt Ihnen schnelle und gesunde Rezepte für jeden Tag. Samstag von 15 bis 18 Uhr, 25 Euro mit allen Zutaten. Rufen Sie uns bis Donnerstag an: 0561 33 44 55."),
          passage("d", "Kleine 1-Zimmer-Wohnung mit Möbeln, Erdgeschoss, ab sofort frei. Miete 480 Euro mit Nebenkosten. Keine Haustiere. Besichtigung nur am Wochenende."),
          passage("e", "Sonntags draußen: Wir machen jeden Sonntag eine Wanderung um den See, etwa drei Stunden. Wir treffen uns um 9 Uhr am Bahnhof. Die Wanderung kostet nichts. Bringen Sie bitte Essen und etwas zu trinken für den Tag mit."),
          passage("f", "Konzert im Stadtpark: Am Freitag um 20 Uhr spielt die Band „Nordwind“ Pop und Rock. Karten für 12 Euro bekommen Sie im Supermarkt Frisch an der Kasse oder am Abend im Park."),
          passage("g", "Wir suchen Hilfe für unseren Umzug am 14. Juni! Sie tragen Kartons und Möbel, und wir bezahlen 15 Euro pro Stunde. Mittags kochen wir für alle. Rufen Sie an: 0176 123 456."),
          passage("h", "Gemüsekiste vom Bauernhof: Wir bringen Ihnen jeden Mittwoch frisches Obst und Gemüse nach Hause. Sie bestellen online, wir liefern bis 20 Uhr. Ab 20 Euro bezahlen Sie nichts für die Lieferung."),
        ],
        questions: [
          match("Sie wohnen seit einer Woche in einer neuen Wohnung, aber im Wohnzimmer gibt es noch keine Möbel.", "a",
            "Wir verkaufen ein graues Sofa (drei Jahre alt), einen Tisch und vier Stühle.",
            "d) is a whole flat, but you already have one. g) needs helpers for a move and sells nothing."),
          match("Sie arbeiten bis 19 Uhr und haben keine Zeit zum Einkaufen. Trotzdem möchten Sie jede Woche frisches Gemüse essen.", "h",
            "Wir bringen Ihnen jeden Mittwoch frisches Obst und Gemüse nach Hause.",
            "c) also uses vegetables, but it is a cooking course on Saturday, not food delivered every week."),
          match("Sie möchten am Sonntag mit anderen Menschen draußen etwas machen. Es soll nichts kosten.", "e",
            "Die Wanderung kostet nichts.",
            "The concert (f) costs 12 euros and is on Friday; the bakery (b) is closed at the weekend."),
          match("Sie möchten am Samstagabend Musik hören.", "x",
            "The only concert (f) is on Friday at 20:00.",
            "f) is a concert, but on Friday. No other advert offers music, so the answer is x."),
          match("Sie möchten lernen, wie man ein gesundes Essen kocht. Am Samstagnachmittag haben Sie Zeit.", "c",
            "Samstag von 15 bis 18 Uhr, 25 Euro mit allen Zutaten.",
            "h) delivers vegetables but teaches nothing, and b) only sells breakfast."),
        ],
      },
    ],
    form: {
      title: "Anmeldung: Kochkurs „Gesund kochen“",
      instruction: "Ihr Kollege Daniel möchte einen Kochkurs machen. Sein Computer ist kaputt, und er bittet Sie um Hilfe. Lesen Sie seine Nachricht und schreiben Sie die fünf fehlenden Informationen in das Formular.",
      instructionEn: FORM_EN,
      source: passage("Nachricht von Daniel",
        "Hallo! Kannst du mir bitte beim Formular für den Kochkurs helfen? Mein Computer ist kaputt. Hier sind meine Daten: Ich bin am 3. März 1994 geboren. Seit Mai wohne ich in der Gartenstraße 12 in 34117 Kassel. Am besten erreichst du mich am Handy, die Nummer ist 0176 4455 213. Am Dienstagabend arbeite ich immer lange, ich nehme also den Kurs am Samstag. Und bitte schreib dazu: Ich esse kein Fleisch! Danke und viele Grüße, Daniel Weber"),
      fields: [
        { label: "Familienname", value: "Weber" },
        { label: "Vorname", value: "Daniel" },
        { label: "Geburtsdatum", answers: ["03.03.1994", "3.3.1994", "3. März 1994", "03.03.94", "3.3.94"], evidence: "Ich bin am 3. März 1994 geboren." },
        { label: "Straße, Hausnummer", answers: ["Gartenstraße 12", "Gartenstr. 12"], evidence: "Seit Mai wohne ich in der Gartenstraße 12 in 34117 Kassel." },
        { label: "PLZ, Ort", value: "34117 Kassel" },
        { label: "Handynummer", answers: ["0176 4455 213", "01764455213", "0176 4455213", "0176/4455213"], evidence: "die Nummer ist 0176 4455 213" },
        { label: "Kurstag (Dienstag oder Samstag)", answers: ["Samstag", "am Samstag"], evidence: "ich nehme also den Kurs am Samstag" },
        { label: "Wichtig für das Essen", answers: ["kein Fleisch", "ohne Fleisch", "vegetarisch", "Ich esse kein Fleisch", "er isst kein Fleisch"], evidence: "Ich esse kein Fleisch!" },
      ],
    },
    letter: {
      situation: "Ihr Freund Paul zieht am Samstag um und fragt: „Kannst du mir helfen?“ Antworten Sie Paul. Wählen Sie drei Punkte aus und schreiben Sie zu jedem Punkt ein bis zwei Sätze. Vergessen Sie die Anrede und den Gruß nicht. Schreiben Sie ca. 40 Wörter.",
      instructionEn: LETTER_EN,
      points: ["Uhrzeit", "Essen und Trinken", "Auto oder Kartons", "Ihr letzter Umzug"],
      covers: [0, 1, 3],
      min: 35,
      max: 50,
      model: "Lieber Paul,\nnatürlich helfe ich dir am Samstag! Am Vormittag habe ich einen Termin, aber um 11 Uhr bin ich bei dir. Ich bringe Brötchen und Kaffee mit. Bei meinem Umzug im Mai hast du mir auch geholfen. Jetzt helfe ich dir!\nViele Grüße\nAlex",
    },
    speaking: [
      { ...INTRO, cards: ["Name?", "Alter?", "Land?", "Wohnort?", "Wohnung?", "Sprachen?", "Beruf?", "Hobby?"],
        model: ["Ich heiße Alex und bin 31 Jahre alt.", "Ich komme aus Brasilien und wohne seit einem Jahr in Kassel.", "Meine Wohnung hat zwei Zimmer und einen kleinen Balkon.", "Ich spreche Portugiesisch, Englisch und ein bisschen Deutsch."] },
      { ...TALK, cards: ["Thema Einkaufen: Wo …?", "Thema Einkaufen: Wann …?", "Thema Einkaufen: Was …?", "Thema Einkaufen: Wie viel …?"],
        model: ["Wo kaufst du am liebsten ein? – Meistens im Supermarkt neben meiner Wohnung. Am Samstag gehe ich auch auf den Markt.", "Wann gehst du einkaufen? – Nach dem Feierabend, so um 18 Uhr. Dann ist es nicht so voll.", "Was kaufst du jede Woche? – Brot, Obst, Gemüse und Milch. Fleisch esse ich nicht so oft."] },
      { title: PLAN_TITLE,
        instruction: "Sie möchten am Samstag zusammen Möbel für Ihre neue Wohnung kaufen. Finden Sie einen Termin.",
        instructionEn: PLAN_EN,
        cards: ["Hast du am … Zeit?", "Um … kann ich leider nicht, da …", "Geht es um …?", "Das passt mir gut."],
        table: { header: ["Samstag", "A (Sie)", "B"], rows: [
          ["8–10 Uhr", "Frühstück mit den Eltern", "frei"],
          ["10–12 Uhr", "frei", "auf dem Markt einkaufen"],
          ["12–14 Uhr", "Mittagessen bei Oma", "frei"],
          ["14–16 Uhr", "frei", "Fußball mit dem Sohn"],
          ["16–18 Uhr", "frei", "frei"],
          ["ab 18 Uhr", "Kino mit Lea", "Abendessen bei Freunden"],
        ] },
        model: ["A: Hast du am Samstag um 10 Uhr Zeit? – B: Nein, da kaufe ich auf dem Markt ein. Geht es um 12 Uhr?", "A: Um 12 Uhr kann ich leider nicht, da esse ich bei meiner Oma. Und um 14 Uhr? – B: Da spiele ich mit meinem Sohn Fußball.", "A: Geht es um 16 Uhr? – B: Ja, das passt mir gut. Dann fahren wir um 16 Uhr ins Möbelhaus.", "Lösung: Beide haben am Samstag 16–18 Uhr frei."] },
    ],
    words: [
      ["der Wecker", 1, "Wecker"], ["der Feierabend", 1, "Feierabend"], ["der Nachmittag", 1, "Nachmittag"], ["das Wochenende", 1, "Wochenende"], ["auf·räumen", 1, "die Küche aufgeräumt"],
      ["das Brötchen", 2, "Brötchen"], ["der Apfel", 2, "Äpfel"], ["die Kartoffel", 2, "Kartoffeln"], ["bezahlen", 2, "bezahlen"], ["der Supermarkt", 2, "Supermarkt"], ["die Zutat", 2, "Zutaten"], ["die Kasse", 2, "Kasse"],
      ["der Aufzug", 3, "Aufzug"], ["der Schlüssel", 3, "Schlüssel"], ["der Hausmeister", 3, "Hausmeister"], ["die Heizung", 3, "Heizung"], ["der Vermieter / die Vermieterin", 3, "Vermieter"],
      ["der Nachbar / die Nachbarin", 3, "Nachbar"], ["der Umzug", 3, "Umzug"], ["das Erdgeschoss", 3, "Erdgeschoss"], ["der Balkon", 3, "Balkon"], ["die Nebenkosten", 3, "Nebenkosten"], ["der Schrank", 3, "Schrank"],
      ["der Ausflug", 4, "Ausflug"], ["das Wetter", 4, "Wetter"], ["die Wanderung", 4, "Wanderung"], ["bleiben", 4, "geblieben"], ["der See", 4, "See"], ["das Konzert", 4, "Konzert"],
    ],
  },
  {
    n: 2,
    topics: [5, 6, 7, 8],
    reading: [
      {
        ...LESEN_1,
        passages: [passage("Gesundheitszentrum am Rathausplatz – Wegweiser",
          "Erdgeschoss: Apotheke am Rathaus (Montag bis Samstag 8–20 Uhr): Medikamente mit und ohne Rezept · Information · Café",
          "1. Stock: Dr. med. Petra Hahn, Allgemeinmedizin (nur Erwachsene) · Labor: Blut abnehmen nur am Vormittag von 7.30 bis 10 Uhr, bitte ohne Frühstück kommen",
          "2. Stock: Dr. Yusuf Demir, Zahnarzt · Physiotherapie „Bewegung“: Übungen für Rücken, Arme und Beine",
          "3. Stock: Augenarztpraxis Dr. Klein (Termine nur online) · Kinderarztpraxis Dr. Sommer (offene Sprechstunde für Kinder jeden Tag von 8 bis 9 Uhr)",
          "Der Aufzug ist rechts neben dem Eingang. Parkplätze für Patientinnen und Patienten finden Sie hinter dem Haus. Vor dem Eingang dürfen Sie nicht parken.",
          "An der Information im Erdgeschoss bekommen Sie einen Plan vom Haus und Hilfe bei allen Fragen. Telefon: 0421 55 66 77. Das Café ist jeden Tag von 8 bis 17 Uhr geöffnet.",
          "Bitte beachten Sie: Am Mittwochnachmittag sind alle Praxen im Haus geschlossen. In einem Notfall gehen Sie bitte in die Notfallpraxis im Krankenhaus, Brückenstraße 3. Die Apotheke ist auch am Mittwochnachmittag geöffnet.")],
        questions: [
          mc("Ihre Tochter ist sechs Jahre alt und hat seit zwei Tagen Fieber.", ["1. Stock", "3. Stock", "anderes Stockwerk"], "b", "Kinderarztpraxis Dr. Sommer",
            "Dr. Hahn on the 1st floor treats only adults (nur Erwachsene), so a child goes to the paediatric practice on the 3rd floor."),
          mc("Sie haben ein Rezept für Tabletten und möchten sie heute um 19 Uhr holen.", ["Erdgeschoss", "1. Stock", "anderes Stockwerk"], "a", "Apotheke am Rathaus (Montag bis Samstag 8–20 Uhr)",
            "Medicine comes from the pharmacy on the ground floor, which is open until 20:00. The 1st floor is a doctor's practice."),
          mc("Ihre Ärztin sagt: Sie sollen wegen Ihrer Rückenschmerzen Übungen machen.", ["1. Stock", "3. Stock", "anderes Stockwerk"], "c",
            "Physiotherapie „Bewegung“: Übungen für Rücken, Arme und Beine",
            "Physiotherapy is on the 2nd floor. That floor is not option a or b, so the answer is „anderes Stockwerk“."),
          mc("Es ist Mittwoch, 16 Uhr. Sie haben plötzlich starke Zahnschmerzen.", ["2. Stock", "Erdgeschoss", "in ein anderes Haus"], "c",
            "In einem Notfall gehen Sie bitte in die Notfallpraxis im Krankenhaus, Brückenstraße 3.",
            "The dentist is on the 2nd floor, but all practices are closed on Wednesday afternoon. The pharmacy is open, but it cannot treat toothache."),
          mc("Sie kommen mit dem Auto. Wo können Sie parken?", ["vor dem Eingang", "hinter dem Haus", "neben der Apotheke"], "b",
            "Parkplätze für Patientinnen und Patienten finden Sie hinter dem Haus.",
            "Parking in front of the entrance is not allowed, and parking next to the pharmacy is not mentioned."),
        ],
      },
      {
        ...LESEN_2,
        passages: [passage("Neu im Team: Lucia Ferreira",
          "In unserer Zeitung für Mitarbeitende stellen wir jeden Monat eine neue Kollegin oder einen neuen Kollegen vor. Diesmal sprechen wir mit Lucia Ferreira. Sie ist 34 Jahre alt und arbeitet seit März als Verkäuferin in unserer Abteilung für Damenmode. Das Gespräch hat unsere Kollegin Sandra Wolf geführt.",
          "Frau Ferreira, was haben Sie früher gemacht? – „In Portugal habe ich Mode studiert. Danach habe ich fünf Jahre bei einer kleinen Firma gearbeitet. Wir haben dort Kleider und Blusen aus Baumwolle gemacht. Vor zwei Jahren bin ich mit meinem Mann nach Deutschland gekommen, weil er hier eine Stelle bekommen hat. Am Anfang habe ich in einem Café gearbeitet, denn mein Deutsch war noch nicht so gut.“",
          "Wie haben Sie die Stelle bei uns gefunden? – „Eine Freundin hat mir die Anzeige geschickt, und ich habe sofort eine Bewerbung geschrieben. Beim Vorstellungsgespräch war ich sehr nervös, aber der Chef war sehr freundlich. Er hat gesagt: Ihr Deutsch ist gut genug, und Ihre Erfahrung ist für uns wichtiger. Zwei Tage später hatte ich den Arbeitsvertrag.“",
          "Was gefällt Ihnen an der Arbeit? – „Ich berate gern Kundinnen. Viele sind unsicher: Welche Größe passt? Welche Farbe steht mir? Ich finde dann oft etwas Passendes für sie. Am liebsten arbeite ich am Samstag, weil dann am meisten los ist. Die Arbeitszeiten sind fair: Ich arbeite in Teilzeit, 25 Stunden pro Woche, meistens von Dienstag bis Samstag.“",
          "Und wie kommen Sie zur Arbeit? – „Meistens mit dem Fahrrad. Ich fahre über die Brücke und dann durch die Fußgängerzone. Das dauert nur fünfzehn Minuten. Im Winter nehme ich die Straßenbahn, aber die ist oft voll und langsamer als das Fahrrad.“",
          "Hatten Sie schon einmal ein Problem? – „Ja, im April. Auf dem Weg zur Arbeit bin ich vom Fahrrad gefallen und habe mich am Arm verletzt. Die Ärztin hat gesagt, ich soll eine Woche zu Hause bleiben. Das war schwer für mich, denn ich war ja ganz neu. Aber meine Kolleginnen haben mir eine Karte und Blumen geschickt. Da habe ich gewusst: Hier bin ich richtig.“")],
        questions: [
          tf("Frau Ferreira hat schon in Portugal mit Kleidung gearbeitet.", "richtig", "Wir haben dort Kleider und Blusen aus Baumwolle gemacht.",
            "Her small company in Portugal made dresses and blouses."),
          tf("Frau Ferreira ist nach Deutschland gekommen, weil sie hier eine Arbeit gefunden hat.", "falsch", "weil er hier eine Stelle bekommen hat",
            "Her husband got the job. She first worked in a café."),
          tf("Frau Ferreira war im Vorstellungsgespräch nervös, aber sie hat die Stelle bekommen.", "richtig", "Zwei Tage später hatte ich den Arbeitsvertrag.",
            "She was nervous, but two days later she had the employment contract."),
          tf("Frau Ferreira arbeitet jeden Tag außer Sonntag.", "falsch", "meistens von Dienstag bis Samstag",
            "She usually works Tuesday to Saturday, so Monday is free too; she works part-time."),
          tf("Im Winter ist sie mit der Straßenbahn schneller als mit dem Fahrrad.", "falsch", "aber die ist oft voll und langsamer als das Fahrrad",
            "The tram is slower than the bike."),
        ],
      },
      {
        ...LESEN_3,
        passages: [
          passage("a", "Kleiderkiste – Second-Hand für die ganze Familie: Jacken, Mäntel und Schuhe für Erwachsene und Kinder, alles gut und günstig. Wir kaufen auch Ihre Kleidung: Bringen Sie saubere Sachen dienstags von 10 bis 13 Uhr. Im Moment suchen wir besonders warme Wintersachen."),
          passage("b", "Stadtführung zu Fuß: Lernen Sie die Altstadt kennen! Jeden Samstag um 11 Uhr starten wir vor dem Rathaus. Die Führung dauert zwei Stunden und kostet 8 Euro. Auch auf Englisch. Bitte tragen Sie bequeme Schuhe."),
          passage("c", "Physiotherapie Aktiv: Rückenkurs für Menschen, die viel am Computer sitzen. Dienstags von 18 bis 19 Uhr, acht Termine. Ihre Versicherung bezahlt einen Teil vom Kurs. Der Kurs ist auch für Anfänger. Bitte bringen Sie bequeme Kleidung und ein Handtuch mit."),
          passage("d", "Fahrradkuriere gesucht! Sie bringen Pakete mit dem Fahrrad zu Kunden in der Innenstadt. Teilzeit, nur vormittags von 7 bis 12 Uhr, 14 Euro pro Stunde. Erfahrung ist nicht nötig. Ein Fahrrad bekommen Sie von uns. Schicken Sie uns einfach einen kurzen Lebenslauf per E-Mail."),
          passage("e", "Schneiderei Yilmaz: Ihre Hose ist zu lang? Ihr Mantel passt nicht mehr? Wir ändern Ihre Kleidung schnell und günstig. Kleine Arbeiten sind oft schon am nächsten Tag fertig. Montag bis Freitag 9–18 Uhr, Samstag 9–13 Uhr."),
          passage("f", "Apotheke am Bahnhof: Wir sind für Sie da, auch nachts und am Sonntag. Tabletten gegen Kopfschmerzen, Salben und vieles mehr. Unsere Apothekerinnen beraten Sie gern, auch auf Englisch und Türkisch. Nach 20 Uhr klingeln Sie bitte rechts neben der Tür."),
          passage("g", "Workshop „Die erste Stelle in Deutschland“: Wir helfen Ihnen bei der Bewerbung und beim Lebenslauf, und wir üben das Vorstellungsgespräch. Kostenlos, Mittwoch 9–12 Uhr, im Bürgerhaus, Raum 12. Haben Sie schon einen Lebenslauf? Dann bringen Sie ihn bitte mit."),
          passage("h", "Fahrradverleih am Hauptbahnhof: Fahrräder für einen Tag nur 12 Euro. Sie bekommen einen Stadtplan und Tipps für schöne Wege über die Brücke und am Fluss. Kinderfahrräder haben wir auch."),
        ],
        questions: [
          match("Sie haben eine schöne Hose gekauft, aber sie ist zu lang.", "e", "Ihre Hose ist zu lang?",
            "a) sells and buys second-hand clothes, but it does not change them."),
          match("Ihre Freundin hat bald ihr erstes Vorstellungsgespräch und möchte vorher üben.", "g", "und wir üben das Vorstellungsgespräch",
            "d) is a job offer, not help with an interview."),
          match("Es ist Sonntagabend. Sie haben starke Kopfschmerzen und keine Tabletten mehr zu Hause.", "f", "auch nachts und am Sonntag",
            "c) is a course for back pain and only on Tuesdays."),
          match("Sie suchen eine Arbeit in Teilzeit am Nachmittag.", "x", "Advert d is part-time, but only in the morning (nur vormittags von 7 bis 12 Uhr).",
            "d) is the only job, but it is a morning job, so the answer is x."),
          match("Sie sitzen jeden Tag acht Stunden im Büro und haben oft Schmerzen im Rücken.", "c", "Rückenkurs für Menschen, die viel am Computer sitzen.",
            "f) sells medicine, but the back course works on the cause of the pain."),
        ],
      },
    ],
    form: {
      title: "Praxis Dr. Hahn – Anmeldung für neue Patientinnen und Patienten",
      instruction: "Ihre Kollegin Mei Lin Chen ist neu in der Stadt und geht heute zum ersten Mal zu Dr. Hahn. Ihre rechte Hand tut weh, sie kann nicht gut schreiben. Lesen Sie, was Mei Lin Ihnen erzählt, und schreiben Sie die fünf fehlenden Informationen in das Formular.",
      instructionEn: FORM_EN,
      source: passage("Mei Lin erzählt",
        "Ich heiße Mei Lin Chen und bin am 22. August 1989 in Shanghai geboren. Seit Januar arbeite ich als Köchin im Hotel Krone. Ich wohne in der Bahnhofstraße 5 in Bremen. Meine Versicherung ist die Nordkasse. Seit drei Tagen habe ich starke Halsschmerzen und Fieber. Im Moment nehme ich keine Medikamente."),
      fields: [
        { label: "Familienname", value: "Chen" },
        { label: "Vorname", value: "Mei Lin" },
        { label: "Geburtsdatum", answers: ["22.08.1989", "22.8.1989", "22. August 1989", "22.08.89"], evidence: "bin am 22. August 1989 in Shanghai geboren" },
        { label: "Anschrift", value: "Bahnhofstraße 5, Bremen" },
        { label: "Beruf", answers: ["Köchin", "Köchin im Hotel Krone"], evidence: "Seit Januar arbeite ich als Köchin im Hotel Krone." },
        { label: "Versicherung", answers: ["Nordkasse", "die Nordkasse"], evidence: "Meine Versicherung ist die Nordkasse." },
        { label: "Was fehlt Ihnen?", answers: ["Halsschmerzen und Fieber", "Fieber und Halsschmerzen", "starke Halsschmerzen und Fieber", "Halsschmerzen, Fieber", "Fieber, Halsschmerzen"], evidence: "Seit drei Tagen habe ich starke Halsschmerzen und Fieber." },
        { label: "Seit wann?", answers: ["seit drei Tagen", "seit 3 Tagen", "drei Tage", "3 Tage"], evidence: "Seit drei Tagen habe ich starke Halsschmerzen und Fieber." },
        { label: "Medikamente", value: "keine" },
      ],
    },
    letter: {
      situation: "Sie sind krank und können morgen nicht zur Arbeit kommen. Schreiben Sie Ihrer Chefin, Frau Berg, eine E-Mail. Wählen Sie drei Punkte aus und schreiben Sie zu jedem Punkt ein bis zwei Sätze. Vergessen Sie die Anrede und den Gruß nicht. Schreiben Sie ca. 40 Wörter.",
      instructionEn: LETTER_EN,
      points: ["Was fehlt Ihnen?", "Arzt und Krankmeldung", "Wann kommen Sie wieder?", "Ihre Termine mit Kunden"],
      covers: [0, 1, 2],
      min: 35,
      max: 50,
      model: "Sehr geehrte Frau Berg,\nleider kann ich morgen nicht zur Arbeit kommen. Ich habe Fieber und starke Halsschmerzen. Heute Nachmittag gehe ich zum Arzt. Die Krankmeldung schicke ich Ihnen danach. Ich glaube, am Montag bin ich wieder im Büro.\nMit freundlichen Grüßen\nAlex Meyer",
    },
    speaking: [
      { ...INTRO, cards: ["Name?", "Alter?", "Land?", "Wohnort?", "Sprachen?", "Beruf?", "Hobby?"],
        model: ["Ich heiße Alex, ich bin 31 und komme aus Brasilien.", "Ich arbeite als Verkäufer in einem Modegeschäft, weil ich gern mit Menschen spreche.", "In meiner Freizeit fahre ich gern Fahrrad."] },
      { ...TALK, cards: ["Thema Arbeit: Was …?", "Thema Arbeit: Wie …?", "Thema Arbeit: Wie lange …?", "Thema Arbeit: Warum …?"],
        model: ["Was machst du bei der Arbeit? – Ich berate Kunden und arbeite an der Kasse.", "Wie kommst du zur Arbeit? – Mit der Straßenbahn. Ich fahre vier Stationen und gehe dann noch fünf Minuten zu Fuß.", "Warum gefällt dir deine Arbeit? – Weil meine Kolleginnen sehr nett sind."] },
      { title: PLAN_TITLE,
        instruction: "Eine Kollegin hat am Freitag Geburtstag. Sie möchten am Donnerstag zusammen ein Geschenk für sie kaufen. Finden Sie einen Termin.",
        instructionEn: PLAN_EN,
        cards: ["Hast du am Donnerstag um … Zeit?", "Da kann ich leider nicht, weil …", "Und um …?", "Gut, dann treffen wir uns um …"],
        table: { header: ["Donnerstag", "A (Sie)", "B"], rows: [
          ["8–10 Uhr", "Besprechung mit dem Chef", "frei"],
          ["10–12 Uhr", "frei", "Termin beim Arzt"],
          ["12–13 Uhr", "Mittagessen mit einem Kunden", "frei"],
          ["13–15 Uhr", "frei", "Kunden anrufen"],
          ["15–17 Uhr", "frei", "frei"],
          ["ab 17 Uhr", "Sport", "die Kinder abholen"],
        ] },
        model: ["A: Hast du am Donnerstag um 10 Uhr Zeit? – B: Nein, da habe ich einen Termin beim Arzt. Geht es um 12 Uhr?", "A: Da esse ich mit einem Kunden zu Mittag. Und um 13 Uhr? – B: Da muss ich Kunden anrufen.", "A: Geht es um 15 Uhr? – B: Ja, um 15 Uhr passt es mir gut. Dann gehen wir zusammen in die Stadt.", "Lösung: Beide haben am Donnerstag 15–17 Uhr frei."] },
    ],
    words: [
      ["das Rezept", 5, "Rezept"], ["die Tablette", 5, "Tabletten"], ["die Apotheke", 5, "Apotheke"], ["der Notfall", 5, "Notfall"], ["die Versicherung", 5, "Versicherung"],
      ["die Salbe", 5, "Salben"], ["sich verletzen", 5, "verletzt"], ["die Praxis", 5, "Praxen"],
      ["die Brücke", 6, "Brücke"], ["die Fußgängerzone", 6, "Fußgängerzone"], ["der Eingang", 6, "Eingang"], ["der Parkplatz", 6, "Parkplätze"], ["das Rathaus", 6, "Rathaus"],
      ["das Krankenhaus", 6, "Krankenhaus"], ["der Stadtplan", 6, "Stadtplan"],
      ["die Stelle", 7, "Stelle"], ["die Bewerbung", 7, "Bewerbung"], ["das Vorstellungsgespräch", 7, "Vorstellungsgespräch"], ["der Arbeitsvertrag", 7, "Arbeitsvertrag"],
      ["die Teilzeit", 7, "Teilzeit"], ["der Lebenslauf", 7, "Lebenslauf"], ["die Firma", 7, "Firma"], ["die Erfahrung", 7, "Erfahrung"],
      ["die Größe", 8, "Größe"], ["die Farbe", 8, "Farbe"], ["die Bluse", 8, "Blusen"], ["das Kleid", 8, "Kleider"], ["die Baumwolle", 8, "Baumwolle"],
      ["die Hose", 8, "Hose"], ["der Mantel", 8, "Mantel"], ["passen (+ Dat.)", 8, "passt"],
    ],
  },
  {
    n: 3,
    topics: [9, 10, 11, 12],
    reading: [
      {
        ...LESEN_1,
        passages: [passage("Rathaus Neustadt (fiktive Stadt) – Bürgerservice: Wegweiser",
          "Erdgeschoss: Information (Formulare für alle Ämter) · Bürgeramt (Anmeldung, Personalausweis, Reisepass) · Kassenautomat (nur Bargeld)",
          "1. Stock: Standesamt (Hochzeiten, Geburtsurkunden). Termine für eine Hochzeit vereinbaren Sie bitte mindestens drei Monate vorher.",
          "2. Stock: Kasse (nur Kartenzahlung) · Fundbüro: verlorene Sachen aus Bus und Bahn. Die Sachen kommen nach zwei Tagen ins Fundbüro. Bitte bringen Sie Ihren Ausweis mit.",
          "3. Stock: Kulturamt: Vereine, Feste und Veranstaltungen in der Stadt. Hier bekommen Sie auch Karten für Konzerte im Rathaussaal.",
          "Für das Bürgeramt brauchen Sie einen Termin. Ohne Termin ziehen Sie bitte am Eingang eine Wartenummer. Gebühren bezahlen Sie bar am Automaten im Erdgeschoss oder mit Karte an der Kasse im 2. Stock. Der Automat nimmt Münzen und Scheine bis 50 Euro.",
          "Öffnungszeiten: Montag bis Freitag 8–12 Uhr, Donnerstag auch 14–18 Uhr. Der Aufzug ist links neben der Treppe. Toiletten finden Sie im Erdgeschoss und im 2. Stock.")],
        questions: [
          mc("Sie haben im Bus Ihre Tasche vergessen.", ["Erdgeschoss", "2. Stock", "anderes Stockwerk"], "b", "Fundbüro: verlorene Sachen aus Bus und Bahn",
            "The lost property office is on the 2nd floor. The information desk on the ground floor is a trap."),
          mc("Ihr Reisepass ist nicht mehr gültig. Sie brauchen einen neuen.", ["Erdgeschoss", "1. Stock", "anderes Stockwerk"], "a", "Bürgeramt (Anmeldung, Personalausweis, Reisepass)",
            "Passports are done at the citizens' office on the ground floor. The registry office on the 1st floor is for weddings and birth certificates."),
          mc("Ihr Sportverein möchte im Sommer ein Fest im Park machen.", ["1. Stock", "2. Stock", "anderes Stockwerk"], "c",
            "Kulturamt: Vereine, Feste und Veranstaltungen in der Stadt",
            "Clubs and festivals are on the 3rd floor, which is neither option a nor b."),
          mc("Sie möchten eine Gebühr bar bezahlen.", ["Erdgeschoss", "2. Stock", "anderes Stockwerk"], "a", "Gebühren bezahlen Sie bar am Automaten im Erdgeschoss",
            "The cash desk on the 2nd floor takes only cards; cash goes into the machine on the ground floor."),
          mc("Sie und Ihr Partner möchten heiraten.", ["Erdgeschoss", "3. Stock", "anderes Stockwerk"], "c", "1. Stock: Standesamt (Hochzeiten, Geburtsurkunden)",
            "Weddings are on the 1st floor. The 3rd floor organises festivals, not weddings."),
        ],
      },
      {
        ...LESEN_2,
        passages: [passage("Betreff: Endlich wieder zu Hause!",
          "Liebe Kursgruppe, ihr wisst ja, dass ich letztes Wochenende zur Hochzeit von meiner Cousine nach Salzburg gefahren bin. Heute möchte ich euch erzählen, wie die Reise war. Es ist nämlich nicht alles gut gegangen.",
          "Ich hatte eine Fahrkarte mit Reservierung für den Zug um 7.12 Uhr. In München musste ich umsteigen, und für den Anschluss hatte ich zwanzig Minuten Zeit. Leider hatte unser Zug schon in Nürnberg fünfundvierzig Minuten Verspätung. Den Anschluss in München konnte ich also nicht mehr bekommen. Am Schalter hat mir eine Mitarbeiterin sehr freundlich geholfen: Ich durfte ohne neue Fahrkarte den nächsten Zug nehmen. Der war allerdings so voll, dass ich zwei Stunden stehen musste.",
          "In Salzburg bin ich erst um 21 Uhr angekommen. Die Rezeption in meiner Pension war schon geschlossen. Aber ich habe am Nachmittag aus dem Zug angerufen, deshalb war mein Schlüssel in einer Box neben dem Eingang. Das hat super funktioniert! In der Pension habe ich gut geschlafen, und das Frühstück am nächsten Morgen war wirklich lecker.",
          "Die Hochzeit am Samstag war wunderschön. Wir haben bis zwei Uhr nachts gefeiert und getanzt. Die Band hat bis Mitternacht gespielt, danach haben wir noch lange zusammengesessen. Meine Cousine hat sich sehr über unser Geschenk gefreut: Wir haben zusammen einen Gutschein für ein Wochenende in den Bergen gekauft.",
          "Am Sonntag hatte ich dann das nächste Problem: Ich konnte meinen Ausweis nicht finden. Ich habe im ganzen Zimmer gesucht, aber ich habe ihn nicht gefunden. Zum Glück hatte ich meinen Reisepass dabei, und so konnte ich ohne Probleme zurückfahren. Die Rückreise war übrigens ganz pünktlich.",
          "Gestern war ich im Bürgeramt. Ich wollte einen neuen Ausweis beantragen, aber ohne Termin war das nicht möglich. Jetzt habe ich einen Termin in zwei Wochen. Das ist kein Problem, hat die Mitarbeiterin gesagt, denn mein Reisepass ist noch bis 2028 gültig. Und heute Morgen habe ich eine E-Mail von der Pension bekommen: Eine Mitarbeiterin hat meinen Ausweis unter dem Bett gefunden! Sie schicken ihn mir mit der Post. Den Termin im Bürgeramt sage ich jetzt natürlich ab.",
          "Bis Donnerstag im Kurs! Tomasz")],
        questions: [
          tf("Tomasz hat den Zug in München verpasst, weil er zu spät zum Bahnhof gekommen ist.", "falsch",
            "Leider hatte unser Zug schon in Nürnberg fünfundvierzig Minuten Verspätung.",
            "He missed the connection because his first train was 45 minutes late, not because he was late himself."),
          tf("Für den zweiten Zug musste Tomasz keine neue Fahrkarte kaufen.", "richtig", "Ich durfte ohne neue Fahrkarte den nächsten Zug nehmen.",
            "He was allowed to take the next train with his old ticket."),
          tf("Tomasz hat seinen Schlüssel an der Rezeption bekommen.", "falsch", "Die Rezeption in meiner Pension war schon geschlossen.",
            "Reception was already closed; the key was in a box next to the entrance."),
          tf("Tomasz geht nicht mehr zu seinem Termin im Bürgeramt.", "richtig", "Den Termin im Bürgeramt sage ich jetzt natürlich ab.",
            "His ID card was found, so he cancels the appointment."),
          tf("Auf der Rückfahrt hatte Tomasz wieder Verspätung.", "falsch", "Die Rückreise war übrigens ganz pünktlich.",
            "The return journey was on time."),
        ],
      },
      {
        ...LESEN_3,
        passages: [
          passage("a", "Sprachcafé in der Stadtbibliothek: jeden Donnerstag von 18 bis 20 Uhr. Deutsch sprechen mit netten Leuten, alle Niveaus sind willkommen. Sie möchten sich auf eine Prüfung vorbereiten? Wir wiederholen zusammen wichtige Themen, und Sie sehen Ihren Fortschritt. Keine Angst vor Fehlern! Jede Woche gibt es ein anderes Thema, zum Beispiel Arbeit, Reisen oder Feste. Kostenlos und ohne Anmeldung."),
          passage("b", "Tanzkurs für Paare: In sechs Wochen lernen Sie die wichtigsten Tänze, perfekt vor der Hochzeit! Freitags um 19 Uhr, 120 Euro pro Paar. Sie brauchen keine Erfahrung. Bitte melden Sie sich bis Ende des Monats an."),
          passage("c", "Mitfahrgelegenheit: Ich fahre am Samstag um 7 Uhr mit dem Auto von Kassel nach Berlin. Drei Plätze sind noch frei, 20 Euro pro Person. Bitte nur ein Koffer pro Person, und ich nehme keine Tiere mit. Am Sonntagabend fahre ich zurück."),
          passage("d", "Stadtbank: Eröffnen Sie jetzt online ein Konto ohne Gebühren. Sie brauchen nur Ihren Ausweis und eine Anschrift in Deutschland. Ihre Bankkarte bekommen Sie nach einer Woche mit der Post."),
          passage("e", "Paketshop im Kiosk am Markt: Pakete abgeben und abholen, auch am Sonntag von 10 bis 18 Uhr. Briefmarken bekommen Sie bei uns auch. Von Montag bis Samstag haben wir von 7 bis 20 Uhr geöffnet."),
          passage("f", "Jugendherberge am See: Zimmer für zwei bis sechs Personen, mit Halbpension ab 32 Euro pro Person und Nacht. Ideal für Gruppen und Familien. Kostenlose Stornierung bis sieben Tage vor der Anreise. Bettwäsche bitte mitbringen oder für 5 Euro bei uns leihen."),
          passage("g", "Hilfe bei Formularen: Studierende helfen Ihnen kostenlos bei Anträgen für Ämter und bei Briefen vom Amt. Dienstags von 10 bis 12 Uhr im Stadtteilzentrum. Bitte bringen Sie alle Unterlagen mit. Wir sprechen Deutsch, Englisch, Arabisch und Russisch."),
          passage("h", "Radtour zum Schloss: Am Sonntag um 9 Uhr fahren wir vom Rathaus los, 40 Kilometer. Zurück können Sie mit dem Zug fahren. Anmeldung bis Freitag im Kulturamt. Bitte bringen Sie etwas zu essen und zu trinken mit. Kinder ab 10 Jahren können mitfahren."),
        ],
        questions: [
          match("Sie möchten am Sonntag ein Paket an Ihre Schwester schicken.", "e", "Pakete abgeben und abholen, auch am Sonntag von 10 bis 18 Uhr.",
            "h) is also on Sunday, but it is a bike tour; d) is a bank."),
          match("Sie haben einen Brief vom Amt bekommen und verstehen das Formular nicht.", "g", "Studierende helfen Ihnen kostenlos bei Anträgen für Ämter und bei Briefen vom Amt.",
            "d) also needs documents, but it only opens bank accounts."),
          match("Sie möchten am Wochenende nach Berlin fahren, aber eine Zugfahrkarte ist Ihnen zu teuer.", "c", "Ich fahre am Samstag um 7 Uhr mit dem Auto von Kassel nach Berlin.",
            "h) mentions a train, but only for the way back from a bike tour."),
          match("Sie möchten mit Ihrer Familie (fünf Personen) zwei Nächte günstig am Wasser übernachten.", "f", "Zimmer für zwei bis sechs Personen",
            "No other advert offers a place to sleep."),
          match("Sie möchten am Samstagabend neue Leute kennenlernen und Deutsch sprechen.", "x",
            "The language café (a) is only on Thursday evenings, and the dance course (b) is on Fridays and for couples.",
            "Nothing fits Saturday evening, so the answer is x."),
        ],
      },
    ],
    form: {
      title: "Stadtbank – Antrag: Konto eröffnen",
      instruction: "Ihre Freundin Ana möchte bei der Stadtbank ein Konto eröffnen. Sie helfen ihr beim Formular. Lesen Sie den Text und schreiben Sie die fünf fehlenden Informationen in das Formular.",
      instructionEn: FORM_EN,
      source: passage("Was Sie über Ana wissen",
        "Ana Souza ist am 9. Dezember 1996 in Recife geboren. Sie hat einen brasilianischen Pass. Sie war noch nie verheiratet und hat keine Kinder. Seit dem 1. September wohnt sie in Freiburg, in der Lindenstraße 8. Die Postleitzahl ist 79098. Ana arbeitet als Krankenpflegerin im Krankenhaus St. Josef. Ihr Gehalt bekommt sie immer am Ende des Monats."),
      fields: [
        { label: "Familienname", value: "Souza" },
        { label: "Vorname", value: "Ana" },
        { label: "Geburtsdatum", value: "09.12.1996" },
        { label: "Geburtsort", answers: ["Recife"], evidence: "Ana Souza ist am 9. Dezember 1996 in Recife geboren." },
        { label: "Staatsangehörigkeit", answers: ["brasilianisch", "Brasilien", "Brasilianerin"], evidence: "Sie hat einen brasilianischen Pass." },
        { label: "Familienstand", answers: ["ledig"], evidence: "Sie war noch nie verheiratet und hat keine Kinder." },
        { label: "Straße, Hausnummer", answers: ["Lindenstraße 8", "Lindenstr. 8"], evidence: "in der Lindenstraße 8" },
        { label: "PLZ, Wohnort", value: "79098 Freiburg" },
        { label: "Beruf", answers: ["Krankenpflegerin"], evidence: "Ana arbeitet als Krankenpflegerin im Krankenhaus St. Josef." },
      ],
    },
    letter: {
      situation: "Ihre Kursleiterin, Frau Roth, hat Sie zum Abschlussfest von Ihrem Deutschkurs eingeladen. Das Fest ist am Freitag um 17 Uhr im Park. Antworten Sie Frau Roth. Wählen Sie drei Punkte aus und schreiben Sie zu jedem Punkt ein bis zwei Sätze. Vergessen Sie die Anrede und den Gruß nicht. Schreiben Sie ca. 40 Wörter.",
      instructionEn: LETTER_EN,
      points: ["Kommen Sie?", "Essen", "Ihr schönster Moment im Kurs", "Der nächste Kurs (B1)"],
      covers: [0, 1, 2],
      min: 35,
      max: 50,
      model: "Liebe Frau Roth,\nvielen Dank für die Einladung! Ich komme gern am Freitag in den Park. Ich bringe einen Apfelkuchen mit, den backe ich am Donnerstag. Am schönsten war für mich unser Rollenspiel beim Arzt, weil wir so viel gelacht haben.\nViele Grüße\nAlex",
    },
    speaking: [
      { ...INTRO, cards: ["Name?", "Herkunft?", "Wohnort?", "Sprachen?", "Beruf?", "Hobby?", "Reisen?"],
        model: ["Ich heiße Alex und komme aus Brasilien.", "Seit zwei Jahren wohne ich in Kassel und arbeite als Krankenpfleger.", "Ich reise sehr gern. Letzten Sommer bin ich mit dem Zug nach Wien gefahren."] },
      { ...TALK, cards: ["Thema Reisen: Wohin …?", "Thema Reisen: Wie …?", "Thema Reisen: Mit wem …?", "Thema Reisen: Was …?"],
        model: ["Wohin fährst du im Urlaub? – Ich fahre gern ans Meer, aber dieses Jahr fahre ich in die Berge.", "Wie reist du am liebsten? – Mit dem Zug, weil ich dann lesen kann.", "Mit wem fährst du? – Meistens mit meiner Schwester."] },
      { title: PLAN_TITLE,
        instruction: "Sie möchten am Samstag zusammen eine Ausstellung im Museum besuchen. Das Museum ist von 10 bis 18 Uhr geöffnet, der Besuch dauert etwa zwei Stunden. Finden Sie einen Termin.",
        instructionEn: PLAN_EN,
        cards: ["Wie wäre es mit …?", "Das passt mir leider nicht, weil …", "Ich schlage vor, dass wir …", "Gute Idee! Dann machen wir das so."],
        table: { header: ["Samstag", "A (Sie)", "B"], rows: [
          ["8–10 Uhr", "schwimmen", "frei"],
          ["10–12 Uhr", "frei", "Paket bei der Post abholen"],
          ["12–14 Uhr", "Mittagessen mit Kollegen", "frei"],
          ["14–16 Uhr", "frei", "frei"],
          ["16–18 Uhr", "Fahrrad reparieren", "frei"],
          ["ab 18 Uhr", "frei", "Geburtstagsfeier"],
        ] },
        model: ["A: Wie wäre es mit 10 Uhr? – B: Das passt mir leider nicht, weil ich ein Paket abholen muss. Ich schlage vor, dass wir um 12 Uhr gehen.", "A: Um 12 Uhr esse ich mit Kollegen. Geht es um 14 Uhr? – B: Gute Idee! Um 14 Uhr habe ich Zeit.", "A: Dann treffen wir uns um 14 Uhr vor dem Museum.", "Lösung: Beide haben am Samstag 14–16 Uhr frei."] },
    ],
    words: [
      ["die Hochzeit", 9, "Hochzeit"], ["feiern", 9, "gefeiert"], ["sich freuen über (+ Akk.)", 9, "hat sich sehr über unser Geschenk gefreut"], ["die Veranstaltung", 9, "Veranstaltungen"],
      ["der Verein", 9, "Vereine"], ["das Fest", 9, "Feste"], ["die Mitfahrgelegenheit", 9, "Mitfahrgelegenheit"],
      ["die Fahrkarte", 10, "Fahrkarte"], ["die Reservierung", 10, "Reservierung"], ["um·steigen", 10, "umsteigen"], ["der Anschluss", 10, "Anschluss"], ["die Verspätung", 10, "Verspätung"],
      ["die Rezeption", 10, "Rezeption"], ["die Rückreise", 10, "Rückreise"], ["die Halbpension", 10, "Halbpension"], ["die Jugendherberge", 10, "Jugendherberge"], ["die Stornierung", 10, "Stornierung"],
      ["das Bürgeramt", 11, "Bürgeramt"], ["der Reisepass", 11, "Reisepass"], ["der Ausweis", 11, "Ausweis"], ["beantragen", 11, "beantragen"], ["gültig", 11, "gültig"],
      ["die Gebühr", 11, "Gebühren"], ["die Wartenummer", 11, "Wartenummer"], ["das Konto", 11, "Konto"], ["die Anschrift", 11, "Anschrift"], ["die Unterlage", 11, "Unterlagen"],
      ["der Antrag", 11, "Anträgen"], ["die Postleitzahl", 11, "Postleitzahl"],
      ["die Prüfung", 12, "Prüfung"], ["wiederholen", 12, "wiederholen"], ["der Fortschritt", 12, "Fortschritt"], ["der Fehler", 12, "Fehlern"],
    ],
  },
];

export function commonFreeRows(rows: string[][]): string[] {
  return rows.filter((row) => row[1] === "frei" && row[2] === "frei").map((row) => row[0] ?? "");
}

function formItem(id: string, n: number, field: FormField): Item {
  const answers = field.answers ?? [];
  return {
    id, n, group: "Schreiben 1", prompt: `${field.label}: ___`, kind: "text", blanks: 1, capStart: true,
    answers: answers.map((a) => [a]), display: answers[0] ?? "", tag: "WS",
    hint: "Find this detail in the text. Write only the information, not a whole sentence.",
    rule: `Text: „${field.evidence ?? ""}“`,
  };
}

export function addCheckpointExams(course: Course): void {
  for (const cp of course.checkpoints) {
    const source = CHECKPOINT_EXAMS.find((e) => e.n === cp.n);
    if (!source) throw new Error(`No exam for checkpoint ${cp.n}`);
    const items: Record<string, Item> = {};
    let n = 0;
    const reading = source.reading.map((part, teil) => ({
      title: part.title, instruction: part.instruction, instructionEn: part.instructionEn, passages: part.passages,
      ...(part.stretch ? { stretch: true } : {}),
      itemIds: part.questions.map((q) => {
        n++;
        const id = `cp${cp.n}-l${teil + 1}-${n}`;
        items[id] = choiceItem(id, n, `Lesen ${teil + 1}`, q);
        return id;
      }),
    }));
    let gap = 0;
    const fields = source.form.fields.map((field) => {
      if (!field.answers) return { label: field.label, value: field.value ?? "" };
      gap++;
      const id = `cp${cp.n}-s1-${gap}`;
      items[id] = formItem(id, gap, field);
      return { label: field.label, itemId: id };
    });
    const exam: CheckpointExam = {
      topics: source.topics,
      reading,
      form: { title: source.form.title, instruction: source.form.instruction, instructionEn: source.form.instructionEn, source: source.form.source, fields },
      letter: {
        task: { id: `cp${cp.n}-brief`, prompt: parseInline(source.letter.situation), min: source.letter.min, max: source.letter.max, model: source.letter.model },
        points: source.letter.points,
        instructionEn: source.letter.instructionEn,
      },
      speaking: source.speaking,
      speakingKey: `cp${cp.n}-sprechen`,
    };
    cp.exam = exam;
    cp.items = items;
  }
}
