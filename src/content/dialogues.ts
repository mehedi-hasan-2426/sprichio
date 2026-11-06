import type { Course, Dialogue, Item } from "../lib/types.ts";

type Check = [statement: string, answer: string, options?: string[]];

interface Conversation {
  dialogue: Dialogue;
  checks: Check[];
}

const RF = ["richtig", "falsch"];

export const CONVERSATIONS: Record<string, Conversation> = {
  w1: {
    dialogue: {
      title: "Vor dem Haus", titleEn: "In front of the house", scene: "street", left: "anna",
      situation: "Max moved in on Monday. In the morning he meets his neighbour Anna in front of the house.",
      roles: { anna: "Nachbarin", max: "neuer Nachbar" },
      lines: [
        { who: "anna", de: "Guten Morgen! Sind Sie neu hier?", en: "Good morning! Are you new here?" },
        { who: "max", de: "Ja, ich wohne seit Montag im dritten Stock. Ich heiße Max.", en: "Yes, I've been living on the third floor since Monday. My name is Max." },
        { who: "anna", de: "Freut mich, ich bin Anna. Ich wohne direkt unter Ihnen.", en: "Nice to meet you, I'm Anna. I live right below you." },
        { who: "max", de: "Ach, schön! Arbeiten Sie hier in der Nähe?", en: "Oh, nice! Do you work near here?" },
        { who: "anna", de: "Ja, im Krankenhaus. Ich fange jeden Tag um sieben an. Und Sie?", en: "Yes, at the hospital. I start at seven every day. And you?" },
        { who: "max", de: "Ich mache einen Deutschkurs. Der Kurs fängt um neun an.", en: "I'm doing a German course. The course starts at nine." },
        { who: "anna", de: "Sollen wir „du“ sagen?", en: "Shall we use \"du\"?", mood: "smile" },
        { who: "max", de: "Gern! Hast du am Samstag Zeit? Dann trinken wir einen Kaffee zusammen.", en: "Sure! Are you free on Saturday? Let's have a coffee together then." },
        { who: "anna", de: "Gute Idee. Am Samstag um drei?", en: "Good idea. Saturday at three?" },
        { who: "max", de: "Perfekt. Bis Samstag!", en: "Perfect. See you on Saturday!" },
      ],
      words: [["der Stock", "floor (of a building)"], ["in der Nähe", "nearby"], ["anfangen", "to start"], ["der Kurs", "course"], ["zusammen", "together"]],
      phrases: [["Freut mich.", "Nice to meet you."], ["Sind Sie neu hier?", "Are you new here?"], ["Hast du am Samstag Zeit?", "Are you free on Saturday?"], ["Bis Samstag!", "See you on Saturday!"]],
    },
    checks: [
      ["Max wohnt im dritten Stock.", "richtig"],
      ["Anna arbeitet in einer Schule.", "falsch"],
      ["Wann fängt Annas Arbeit an?", "um sieben", ["um sieben", "um neun", "um drei"]],
      ["Was machen Anna und Max am Samstag?", "Sie trinken Kaffee.", ["Sie trinken Kaffee.", "Sie gehen ins Kino.", "Sie machen einen Kurs."]],
    ],
  },
  w2: {
    dialogue: {
      title: "Im Café", titleEn: "At the café", scene: "cafe", left: "anna",
      situation: "Max wants to order something. Anna works at the café.",
      roles: { anna: "Kellnerin", max: "Gast" },
      lines: [
        { who: "anna", de: "Guten Tag! Was möchten Sie bestellen?", en: "Hello! What would you like to order?" },
        { who: "max", de: "Ich hätte gern einen Cappuccino und ein Stück Kuchen.", en: "I'd like a cappuccino and a piece of cake, please." },
        { who: "anna", de: "Sehr gern. Wir haben Apfelkuchen und Käsekuchen.", en: "Certainly. We have apple cake and cheesecake." },
        { who: "max", de: "Hm ... Ist der Apfelkuchen mit Sahne?", en: "Hmm ... Does the apple cake come with cream?", mood: "unsure" },
        { who: "anna", de: "Ja, mit Sahne. Ohne Sahne geht auch.", en: "Yes, with cream. You can have it without, too." },
        { who: "max", de: "Dann nehme ich den Apfelkuchen ohne Sahne, bitte.", en: "Then I'll have the apple cake without cream, please." },
        { who: "anna", de: "Möchten Sie sonst noch etwas?", en: "Would you like anything else?" },
        { who: "max", de: "Nein, danke. Das ist alles. Was macht das?", en: "No, thank you. That's all. How much is that?" },
        { who: "anna", de: "Das macht 7,80 Euro. Zahlen Sie bar oder mit Karte?", en: "That's 7.80 euros. Are you paying in cash or by card?" },
        { who: "max", de: "Mit Karte, bitte.", en: "By card, please." },
        { who: "anna", de: "Gern. Einen schönen Tag noch!", en: "Sure. Have a nice day!", mood: "smile" },
      ],
      words: [["bestellen", "to order"], ["das Stück", "piece"], ["die Sahne", "cream"], ["bar", "in cash"], ["die Karte", "card"]],
      phrases: [["Ich hätte gern ...", "I'd like ..."], ["Möchten Sie sonst noch etwas?", "Would you like anything else?"], ["Was macht das?", "How much is that?"], ["Mit Karte, bitte.", "By card, please."]],
    },
    checks: [
      ["Max bestellt einen Tee.", "falsch"],
      ["Max möchte den Kuchen ohne Sahne.", "richtig"],
      ["Wie viel kostet alles?", "7,80 Euro", ["7,80 Euro", "8,70 Euro", "7,08 Euro"]],
      ["Wie bezahlt Max?", "mit Karte", ["mit Karte", "bar", "gar nicht"]],
    ],
  },
  w3: {
    dialogue: {
      title: "Die Wohnungsbesichtigung", titleEn: "Viewing an apartment", scene: "apartment", left: "max",
      situation: "Anna is looking for an apartment. Max is the landlord and shows her around.",
      roles: { anna: "Interessentin", max: "Vermieter" },
      lines: [
        { who: "max", de: "Guten Tag, Frau Kaya? Kommen Sie herein.", en: "Hello, Ms Kaya? Please come in." },
        { who: "anna", de: "Danke. Oh, die Wohnung ist schön hell!", en: "Thank you. Oh, the apartment is nice and bright!", mood: "surprised" },
        { who: "max", de: "Ja, das Wohnzimmer hat zwei große Fenster. Hier links ist die Küche.", en: "Yes, the living room has two big windows. The kitchen is here on the left." },
        { who: "anna", de: "Wie hoch ist die Miete?", en: "How much is the rent?" },
        { who: "max", de: "Die Kaltmiete ist 650 Euro. Warm sind es 780 Euro.", en: "The basic rent is 650 euros. Including heating and service charges, it's 780 euros." },
        { who: "anna", de: "Gibt es auch einen Balkon?", en: "Is there a balcony too?" },
        { who: "max", de: "Leider nicht, aber im Hof gibt es einen Garten für alle.", en: "Unfortunately not, but there's a garden for everyone in the courtyard." },
        { who: "anna", de: "Darf man hier Haustiere haben? Ich habe eine Katze.", en: "Are pets allowed here? I have a cat.", mood: "unsure" },
        { who: "max", de: "Eine Katze ist kein Problem.", en: "A cat is no problem." },
        { who: "anna", de: "Super. Wann ist die Wohnung frei?", en: "Great. When is the apartment available?" },
        { who: "max", de: "Ab dem ersten Mai.", en: "From the first of May." },
      ],
      words: [["die Miete", "rent"], ["die Kaltmiete", "rent without heating and service charges"], ["hell", "bright"], ["der Balkon", "balcony"], ["das Haustier", "pet"], ["frei", "available"]],
      phrases: [["Wie hoch ist die Miete?", "How much is the rent?"], ["Gibt es auch ...?", "Is there ... too?"], ["Wann ist die Wohnung frei?", "When is the apartment available?"]],
    },
    checks: [
      ["Die Wohnung hat einen Balkon.", "falsch"],
      ["Anna hat eine Katze.", "richtig"],
      ["Wie hoch ist die Warmmiete?", "780 Euro", ["780 Euro", "650 Euro", "870 Euro"]],
      ["Ab wann ist die Wohnung frei?", "ab dem ersten Mai", ["ab dem ersten Mai", "ab sofort", "ab dem ersten März"]],
    ],
  },
  w4: {
    dialogue: {
      title: "Montagmorgen beim Bäcker", titleEn: "Monday morning at the bakery", scene: "bakery", left: "anna",
      situation: "Max buys bread rolls every morning. Today Anna asks about his weekend.",
      roles: { anna: "Verkäuferin", max: "Kunde" },
      lines: [
        { who: "anna", de: "Morgen, Max! Wie war dein Wochenende?", en: "Morning, Max! How was your weekend?" },
        { who: "max", de: "Super! Am Samstag bin ich mit Freunden an den See gefahren.", en: "Great! On Saturday I went to the lake with friends." },
        { who: "anna", de: "Bei dem Wetter? Es hat doch geregnet!", en: "In that weather? It was raining!", mood: "surprised" },
        { who: "max", de: "Ja, am Nachmittag. Aber wir haben im Café gewartet und Kuchen gegessen.", en: "Yes, in the afternoon. But we waited in a café and ate cake." },
        { who: "anna", de: "Das klingt gut. Ich habe den ganzen Sonntag gearbeitet.", en: "That sounds good. I worked all day on Sunday." },
        { who: "max", de: "Oh nein! Und am Abend?", en: "Oh no! And in the evening?" },
        { who: "anna", de: "Da habe ich nur ferngesehen und bin früh ins Bett gegangen.", en: "I just watched TV and went to bed early." },
        { who: "max", de: "Verstehe. Ich nehme heute zwei Brötchen und ein Croissant, bitte.", en: "I see. I'll have two bread rolls and a croissant today, please." },
        { who: "anna", de: "Gern. Das macht 2,60 Euro.", en: "Sure. That's 2.60 euros." },
        { who: "max", de: "Bitte schön. Bis morgen!", en: "Here you go. See you tomorrow!", mood: "smile" },
      ],
      words: [["der See", "lake"], ["regnen", "to rain"], ["das Brötchen", "bread roll"], ["fernsehen", "to watch TV"], ["ins Bett gehen", "to go to bed"]],
      phrases: [["Wie war dein Wochenende?", "How was your weekend?"], ["Das klingt gut.", "That sounds good."], ["Bitte schön.", "Here you go."]],
    },
    checks: [
      ["Max ist am Samstag an den See gefahren.", "richtig"],
      ["Anna hatte am Sonntag frei.", "falsch"],
      ["Was hat Anna am Sonntagabend gemacht?", "Sie hat ferngesehen.", ["Sie hat ferngesehen.", "Sie ist an den See gefahren.", "Sie hat Kuchen gebacken."]],
      ["Was kauft Max?", "zwei Brötchen und ein Croissant", ["zwei Brötchen und ein Croissant", "ein Brot", "drei Brötchen"]],
    ],
  },
  w5: {
    dialogue: {
      title: "Beim Arzt", titleEn: "At the doctor's", scene: "doctor", left: "anna",
      situation: "Max feels ill. Anna is his doctor.",
      roles: { anna: "Ärztin", max: "Patient" },
      lines: [
        { who: "anna", de: "Guten Tag, Herr Becker. Was fehlt Ihnen?", en: "Hello, Mr Becker. What's the matter?" },
        { who: "max", de: "Ich habe seit drei Tagen Halsschmerzen und Fieber.", en: "I've had a sore throat and a fever for three days.", mood: "unsure" },
        { who: "anna", de: "Haben Sie auch Husten?", en: "Do you have a cough too?" },
        { who: "max", de: "Ja, ein bisschen. Und mir tut der Kopf weh.", en: "Yes, a little. And I have a headache." },
        { who: "anna", de: "Machen Sie bitte den Mund auf ... Ja, der Hals ist rot. Sie haben eine Erkältung.", en: "Please open your mouth ... Yes, your throat is red. You have a cold." },
        { who: "max", de: "Muss ich Tabletten nehmen?", en: "Do I have to take tablets?", mood: "unsure" },
        { who: "anna", de: "Nehmen Sie dreimal am Tag diese Tabletten. Und trinken Sie viel Tee.", en: "Take these tablets three times a day. And drink lots of tea." },
        { who: "max", de: "Kann ich morgen arbeiten?", en: "Can I work tomorrow?" },
        { who: "anna", de: "Nein, bleiben Sie bis Freitag zu Hause. Ich schreibe Sie krank.", en: "No, stay at home until Friday. I'll give you a sick note." },
        { who: "max", de: "Vielen Dank, Frau Doktor.", en: "Thank you very much, doctor." },
        { who: "anna", de: "Gute Besserung!", en: "Get well soon!", mood: "smile" },
      ],
      words: [["die Halsschmerzen", "sore throat"], ["das Fieber", "fever"], ["der Husten", "cough"], ["die Erkältung", "cold"], ["krankschreiben", "to give someone a sick note"]],
      phrases: [["Was fehlt Ihnen?", "What's the matter?"], ["Mir tut der Kopf weh.", "I have a headache."], ["Gute Besserung!", "Get well soon!"]],
    },
    checks: [
      ["Max hat seit drei Tagen Fieber.", "richtig"],
      ["Max soll morgen arbeiten.", "falsch"],
      ["Wie oft soll Max die Tabletten nehmen?", "dreimal am Tag", ["dreimal am Tag", "einmal am Tag", "zweimal am Tag"]],
      ["Was hat Max?", "eine Erkältung", ["eine Erkältung", "Bauchschmerzen", "ein gebrochenes Bein"]],
    ],
  },
  w6: {
    dialogue: {
      title: "Wie komme ich zum Bahnhof?", titleEn: "How do I get to the station?", scene: "street", left: "max",
      situation: "Anna is new in town and looking for the station. Max lives here and helps her.",
      roles: { anna: "Besucherin", max: "Passant" },
      lines: [
        { who: "anna", de: "Entschuldigung, wie komme ich zum Bahnhof?", en: "Excuse me, how do I get to the station?" },
        { who: "max", de: "Zum Hauptbahnhof? Das ist nicht weit. Gehen Sie hier geradeaus bis zur Ampel.", en: "To the main station? It's not far. Go straight ahead to the traffic lights." },
        { who: "anna", de: "Bis zur Ampel, okay. Und dann?", en: "To the traffic lights, okay. And then?" },
        { who: "max", de: "An der Ampel gehen Sie nach links. Dann gehen Sie über die Brücke.", en: "At the lights, turn left. Then go over the bridge." },
        { who: "anna", de: "Und nach der Brücke?", en: "And after the bridge?", mood: "unsure" },
        { who: "max", de: "Der Bahnhof ist direkt neben dem Kino. Sie sehen ihn sofort.", en: "The station is right next to the cinema. You'll see it straight away." },
        { who: "anna", de: "Wie lange brauche ich zu Fuß?", en: "How long does it take on foot?" },
        { who: "max", de: "Ungefähr zehn Minuten.", en: "About ten minutes." },
        { who: "anna", de: "Vielen Dank für Ihre Hilfe!", en: "Thank you very much for your help!", mood: "smile" },
        { who: "max", de: "Gern geschehen. Gute Reise!", en: "You're welcome. Have a good trip!" },
      ],
      words: [["geradeaus", "straight ahead"], ["die Ampel", "traffic lights"], ["die Brücke", "bridge"], ["neben", "next to"], ["zu Fuß", "on foot"]],
      phrases: [["Wie komme ich zum ...?", "How do I get to the ...?"], ["Gehen Sie geradeaus.", "Go straight ahead."], ["Gern geschehen.", "You're welcome."]],
    },
    checks: [
      ["Der Bahnhof ist neben dem Kino.", "richtig"],
      ["An der Ampel geht Anna nach rechts.", "falsch"],
      ["Wie lange braucht Anna zu Fuß?", "ungefähr zehn Minuten", ["ungefähr zehn Minuten", "eine Stunde", "zwei Minuten"]],
      ["Was ist zwischen der Ampel und dem Bahnhof?", "eine Brücke", ["eine Brücke", "ein Marktplatz", "ein Parkplatz"]],
    ],
  },
  w7: {
    dialogue: {
      title: "Der erste Arbeitstag", titleEn: "The first day at work", scene: "office", left: "max",
      situation: "Anna starts a new job today. Her colleague Max shows her around.",
      roles: { anna: "neue Kollegin", max: "Kollege" },
      lines: [
        { who: "max", de: "Hallo, du bist bestimmt Anna, die neue Kollegin?", en: "Hi, you must be Anna, the new colleague?" },
        { who: "anna", de: "Ja, genau. Heute ist mein erster Tag. Ich bin ein bisschen nervös.", en: "Yes, that's right. Today is my first day. I'm a bit nervous.", mood: "unsure" },
        { who: "max", de: "Keine Sorge, das Team ist sehr nett. Ich zeige dir dein Büro.", en: "Don't worry, the team is very nice. I'll show you your office." },
        { who: "anna", de: "Danke! Wann fängt die Arbeit normalerweise an?", en: "Thanks! When does work usually start?" },
        { who: "max", de: "Bei uns kann man zwischen sieben und neun anfangen. Ich komme meistens um acht, weil es dann noch ruhig ist.", en: "Here you can start between seven and nine. I usually come at eight because it's still quiet then." },
        { who: "anna", de: "Und wie lange ist die Mittagspause?", en: "And how long is the lunch break?" },
        { who: "max", de: "Eine halbe Stunde. Wir essen oft zusammen in der Kantine.", en: "Half an hour. We often eat together in the canteen." },
        { who: "anna", de: "Schön. Wie kann ich mich am Computer anmelden?", en: "Nice. How do I log in to the computer?" },
        { who: "max", de: "Das macht Frau Weber von der IT. Sie kommt um zehn, deshalb trinken wir jetzt erst mal einen Kaffee.", en: "Ms Weber from IT does that. She comes in at ten, so let's have a coffee first." },
        { who: "anna", de: "Gute Idee!", en: "Good idea!", mood: "smile" },
      ],
      words: [["die Kollegin", "colleague (female)"], ["meistens", "usually"], ["die Mittagspause", "lunch break"], ["die Kantine", "canteen"], ["sich anmelden", "to log in; to register"]],
      phrases: [["Keine Sorge.", "Don't worry."], ["Ich zeige dir ...", "I'll show you ..."], ["erst mal", "first (for now)"]],
    },
    checks: [
      ["Anna ist ein bisschen nervös.", "richtig"],
      ["Die Mittagspause dauert eine Stunde.", "falsch"],
      ["Warum kommt Max meistens um acht?", "Weil es dann noch ruhig ist.", ["Weil es dann noch ruhig ist.", "Weil der Chef das will.", "Weil der Bus dann fährt."]],
      ["Wer hilft Anna mit dem Computer?", "Frau Weber", ["Frau Weber", "Max", "der Chef"]],
    ],
  },
  w8: {
    dialogue: {
      title: "Im Kleidungsgeschäft", titleEn: "In the clothes shop", scene: "shop", left: "anna",
      situation: "Max is looking for a present for his sister. Anna works in the shop.",
      roles: { anna: "Verkäuferin", max: "Kunde" },
      lines: [
        { who: "anna", de: "Kann ich Ihnen helfen?", en: "Can I help you?" },
        { who: "max", de: "Ja, ich suche ein Geschenk für meine Schwester. Vielleicht einen Pullover?", en: "Yes, I'm looking for a present for my sister. Maybe a sweater?" },
        { who: "anna", de: "Welche Größe trägt sie?", en: "What size does she wear?" },
        { who: "max", de: "Größe M, glaube ich. Sie mag helle Farben.", en: "Size M, I think. She likes light colours.", mood: "unsure" },
        { who: "anna", de: "Wie finden Sie diesen gelben Pullover? Er ist aus Baumwolle.", en: "What do you think of this yellow sweater? It's made of cotton." },
        { who: "max", de: "Der ist schön! Gibt es ihn auch in Blau?", en: "That's nice! Do you have it in blue too?" },
        { who: "anna", de: "Ja, hier ist der blaue. Er ist ein bisschen billiger als der gelbe.", en: "Yes, here's the blue one. It's a bit cheaper than the yellow one." },
        { who: "max", de: "Was kostet er?", en: "How much is it?" },
        { who: "anna", de: "39 Euro. Und Sie können ihn vier Wochen lang umtauschen.", en: "39 euros. And you can exchange it within four weeks." },
        { who: "max", de: "Perfekt, dann nehme ich den blauen. Können Sie ihn als Geschenk einpacken?", en: "Perfect, then I'll take the blue one. Could you gift-wrap it?", mood: "smile" },
        { who: "anna", de: "Natürlich, gern.", en: "Of course." },
      ],
      words: [["die Größe", "size"], ["hell", "light (colour)"], ["die Baumwolle", "cotton"], ["umtauschen", "to exchange"], ["einpacken", "to wrap"]],
      phrases: [["Kann ich Ihnen helfen?", "Can I help you?"], ["Gibt es ihn auch in Blau?", "Do you have it in blue too?"], ["Dann nehme ich ...", "Then I'll take ..."]],
    },
    checks: [
      ["Der blaue Pullover ist teurer als der gelbe.", "falsch"],
      ["Max kann den Pullover umtauschen.", "richtig"],
      ["Für wen ist das Geschenk?", "für seine Schwester", ["für seine Schwester", "für seine Mutter", "für Anna"]],
      ["Welche Größe trägt die Schwester?", "M", ["M", "S", "L"]],
    ],
  },
  w9: {
    dialogue: {
      title: "Eine Einladung", titleEn: "An invitation", scene: "park", left: "anna",
      situation: "Anna and Max are friends. They meet in the park, and Anna has a plan for Saturday.",
      roles: { anna: "Freundin", max: "Freund" },
      lines: [
        { who: "anna", de: "Hey Max! Was machst du am Samstag?", en: "Hey Max! What are you doing on Saturday?" },
        { who: "max", de: "Noch nichts. Warum?", en: "Nothing yet. Why?" },
        { who: "anna", de: "Ich habe Geburtstag und mache ein Grillfest hier im Park. Hast du Lust?", en: "It's my birthday and I'm having a barbecue here in the park. Do you want to come?" },
        { who: "max", de: "Klar, sehr gern! Um wie viel Uhr?", en: "Sure, I'd love to! What time?", mood: "smile" },
        { who: "anna", de: "Ab vier Uhr. Wenn es regnet, feiern wir bei mir zu Hause.", en: "From four o'clock. If it rains, we'll celebrate at my place." },
        { who: "max", de: "Soll ich etwas mitbringen?", en: "Should I bring anything?" },
        { who: "anna", de: "Vielleicht einen Salat? Und deine Gitarre, wenn du Lust hast!", en: "Maybe a salad? And your guitar, if you feel like it!" },
        { who: "max", de: "Gitarre? Hm, ich spiele nicht so gut ...", en: "Guitar? Hmm, I don't play that well ...", mood: "unsure" },
        { who: "anna", de: "Doch! Ich finde, dass du super spielst.", en: "Yes, you do! I think you play brilliantly." },
        { who: "max", de: "Na gut. Ich freue mich auf Samstag!", en: "All right. I'm looking forward to Saturday!", mood: "smile" },
      ],
      words: [["der Geburtstag", "birthday"], ["das Grillfest", "barbecue"], ["Lust haben", "to feel like (doing something)"], ["mitbringen", "to bring along"], ["feiern", "to celebrate"]],
      phrases: [["Hast du Lust?", "Do you want to come?"], ["Soll ich etwas mitbringen?", "Should I bring anything?"], ["Ich freue mich auf ...", "I'm looking forward to ..."]],
    },
    checks: [
      ["Das Fest beginnt um vier Uhr.", "richtig"],
      ["Wenn es regnet, gehen sie ins Kino.", "falsch"],
      ["Was soll Max mitbringen?", "einen Salat und seine Gitarre", ["einen Salat und seine Gitarre", "nur Getränke", "einen Kuchen"]],
      ["Warum feiert Anna?", "Sie hat Geburtstag.", ["Sie hat Geburtstag.", "Sie hat eine neue Wohnung.", "Sie hat einen neuen Job."]],
    ],
  },
  w10: {
    dialogue: {
      title: "Am Bahnhof", titleEn: "At the station", scene: "station", left: "max",
      situation: "Anna wants to go to Hamburg. Max works at the ticket counter.",
      roles: { anna: "Reisende", max: "Bahnmitarbeiter" },
      lines: [
        { who: "anna", de: "Guten Tag. Ich möchte nach Hamburg fahren. Wann fährt der nächste Zug?", en: "Hello. I'd like to go to Hamburg. When is the next train?" },
        { who: "max", de: "Um 14:30 Uhr von Gleis 7. Sie müssen in Hannover umsteigen.", en: "At 2:30 pm from platform 7. You have to change in Hanover." },
        { who: "anna", de: "Gibt es keinen direkten Zug?", en: "Isn't there a direct train?", mood: "unsure" },
        { who: "max", de: "Doch, um 15:10 Uhr. Der ist aber zwanzig Euro teurer.", en: "Yes, at 3:10 pm. But it's twenty euros more." },
        { who: "anna", de: "Dann nehme ich den Zug um halb drei. Einfach, bitte.", en: "Then I'll take the train at half past two. One way, please." },
        { who: "max", de: "Haben Sie eine BahnCard?", en: "Do you have a BahnCard (rail discount card)?" },
        { who: "anna", de: "Nein, leider nicht. Was kostet die Fahrkarte?", en: "No, unfortunately not. How much is the ticket?" },
        { who: "max", de: "59 Euro. Möchten Sie einen Sitzplatz reservieren?", en: "59 euros. Would you like to reserve a seat?" },
        { who: "anna", de: "Ja, bitte. Am Fenster, wenn möglich.", en: "Yes, please. By the window, if possible." },
        { who: "max", de: "Gern. Hier ist Ihre Fahrkarte. Gute Reise!", en: "Sure. Here's your ticket. Have a good trip!", mood: "smile" },
      ],
      words: [["das Gleis", "platform; track"], ["umsteigen", "to change trains"], ["einfach", "one way"], ["die Fahrkarte", "ticket"], ["reservieren", "to reserve"]],
      phrases: [["Wann fährt der nächste Zug?", "When is the next train?"], ["Sie müssen in ... umsteigen.", "You have to change in ..."], ["Am Fenster, wenn möglich.", "By the window, if possible."]],
    },
    checks: [
      ["Anna muss in Hannover umsteigen.", "richtig"],
      ["Anna kauft eine Rückfahrkarte.", "falsch"],
      ["Von welchem Gleis fährt der Zug?", "Gleis 7", ["Gleis 7", "Gleis 17", "Gleis 3"]],
      ["Warum nimmt Anna den Zug um 14:30 Uhr?", "Er ist billiger.", ["Er ist billiger.", "Er ist schneller.", "Er hat ein Restaurant."]],
    ],
  },
  w11: {
    dialogue: {
      title: "Im Bürgeramt", titleEn: "At the citizens' office", scene: "counter", left: "max",
      situation: "Anna has moved and needs to register her new address. Max works at the counter.",
      roles: { anna: "Kundin", max: "Sachbearbeiter" },
      lines: [
        { who: "max", de: "Guten Tag. Nummer 47? Bitte nehmen Sie Platz.", en: "Hello. Number 47? Please take a seat." },
        { who: "anna", de: "Guten Tag. Ich bin umgezogen und möchte meine neue Adresse anmelden.", en: "Hello. I've moved and I'd like to register my new address." },
        { who: "max", de: "Haben Sie Ihren Ausweis und die Bestätigung vom Vermieter dabei?", en: "Do you have your ID card and the confirmation from your landlord with you?" },
        { who: "anna", de: "Den Ausweis, ja. Könnten Sie mir sagen, was die Bestätigung genau ist?", en: "The ID card, yes. Could you tell me what exactly the confirmation is?", mood: "unsure" },
        { who: "max", de: "Das ist ein Formular. Ihr Vermieter muss es unterschreiben.", en: "It's a form. Your landlord has to sign it." },
        { who: "anna", de: "Ach so. Ich glaube, ich habe es hier ... Ja, hier ist es.", en: "I see. I think I have it here ... Yes, here it is." },
        { who: "max", de: "Sehr gut. Bitte füllen Sie noch dieses Formular aus.", en: "Very good. Please fill in this form as well." },
        { who: "anna", de: "Wo muss ich unterschreiben?", en: "Where do I sign?" },
        { who: "max", de: "Hier unten, bitte. So, hier ist Ihre Meldebescheinigung.", en: "Down here, please. There you go, here's your registration certificate." },
        { who: "anna", de: "Vielen Dank! Das ging ja schnell.", en: "Thank you very much! That was quick.", mood: "smile" },
      ],
      words: [["anmelden", "to register"], ["der Ausweis", "ID card"], ["die Bestätigung", "confirmation"], ["unterschreiben", "to sign"], ["ausfüllen", "to fill in"]],
      phrases: [["Könnten Sie mir sagen, ...?", "Could you tell me ...?"], ["Wo muss ich unterschreiben?", "Where do I sign?"], ["Bitte nehmen Sie Platz.", "Please take a seat."]],
    },
    checks: [
      ["Anna ist umgezogen.", "richtig"],
      ["Anna hat die Bestätigung vergessen.", "falsch"],
      ["Wer muss die Bestätigung unterschreiben?", "der Vermieter", ["der Vermieter", "Anna", "der Sachbearbeiter"]],
      ["Welche Nummer hat Anna?", "47", ["47", "74", "17"]],
    ],
  },
  w12: {
    dialogue: {
      title: "Ein Jahr in Köln", titleEn: "A year in Cologne", scene: "cafe-table", left: "max",
      situation: "Max has lived in Cologne for exactly one year. He meets his friend Anna for a coffee.",
      roles: { anna: "Freundin", max: "Freund" },
      lines: [
        { who: "max", de: "Anna, weißt du was? Heute bin ich genau ein Jahr in Köln.", en: "Anna, guess what? I've been in Cologne for exactly one year today.", mood: "smile" },
        { who: "anna", de: "Wirklich? Glückwunsch! Wie war das erste Jahr?", en: "Really? Congratulations! How was the first year?", mood: "surprised" },
        { who: "max", de: "Am Anfang war es schwer, weil ich fast kein Deutsch gesprochen habe.", en: "At the beginning it was hard because I spoke almost no German." },
        { who: "anna", de: "Und jetzt sprichst du viel besser als vor einem Jahr!", en: "And now you speak much better than a year ago!" },
        { who: "max", de: "Danke! Ich habe jeden Tag gelernt und viel mit den Nachbarn gesprochen.", en: "Thanks! I studied every day and talked a lot with the neighbours." },
        { who: "anna", de: "Was war für dich am schwierigsten?", en: "What was the hardest for you?" },
        { who: "max", de: "Die Artikel! Der, die, das ... Ich vergesse sie immer noch manchmal.", en: "The articles! Der, die, das ... I still forget them sometimes.", mood: "unsure" },
        { who: "anna", de: "Das geht allen so. Was planst du für das nächste Jahr?", en: "Everyone has that problem. What are you planning for next year?" },
        { who: "max", de: "Im Juni mache ich die A2-Prüfung. Danach möchte ich eine Ausbildung anfangen.", en: "In June I'm taking the A2 exam. After that I'd like to start vocational training." },
        { who: "anna", de: "Super! Dann trinken wir noch einen Kaffee. Ich lade dich ein!", en: "Great! Let's have another coffee then. It's on me!", mood: "smile" },
      ],
      words: [["der Anfang", "beginning"], ["schwierig", "difficult"], ["vergessen", "to forget"], ["die Prüfung", "exam"], ["einladen", "to treat; to invite"]],
      phrases: [["Weißt du was?", "Guess what?"], ["Glückwunsch!", "Congratulations!"], ["Das geht allen so.", "Everyone has that problem."], ["Ich lade dich ein.", "It's on me."]],
    },
    checks: [
      ["Max wohnt seit zwei Jahren in Köln.", "falsch"],
      ["Max findet die Artikel schwierig.", "richtig"],
      ["Was macht Max im Juni?", "die A2-Prüfung", ["die A2-Prüfung", "eine Reise", "einen Umzug"]],
      ["Wer bezahlt den Kaffee?", "Anna", ["Anna", "Max", "beide"]],
    ],
  },
};

const KEYS = ["a", "b", "c"];

export function addDialogues(course: Course): void {
  for (const unit of course.weeks) {
    const conversation = CONVERSATIONS[unit.id];
    if (!conversation) throw new Error(`Missing conversation for ${unit.id}`);
    unit.dialogue = conversation.dialogue;
    const blocks = conversation.checks.map(([statement, answer, options], index) => {
      const id = `${unit.id}-talk-${index + 1}`;
      const shift = (index + Number(unit.id.slice(1))) % 3;
      const labels = options ? [...options.slice(shift), ...options.slice(0, shift)] : RF;
      if (!labels.includes(answer)) throw new Error(`Invalid conversation check ${id}`);
      const item: Item = {
        id, n: index + 1, group: "Conversation", kind: "choice", blanks: 0, capStart: false,
        prompt: options ? statement : `Richtig oder falsch? *${statement}*`,
        options: labels.map((label, key) => ({ key: KEYS[key] ?? String(key), label })),
        correct: KEYS[labels.indexOf(answer)], answers: [[answer]], display: answer, tag: "HÖ",
        hint: "Read the conversation again and find the sentence that answers this.", rule: conversation.dialogue.title,
      };
      unit.items[id] = item;
      return { kind: "item" as const, itemId: id };
    });
    unit.sections.unshift({
      id: "gespraech", title: "Conversation", role: "dialogue",
      blocks: [{ kind: "h", text: [{ t: "Did you understand?" }] }, ...blocks],
    });
  }
}
