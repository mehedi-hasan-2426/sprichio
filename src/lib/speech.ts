import type { Speaker } from "./types.ts";

const FEMALE = /anna|katja|hedda|marlene|vicki|petra|helena|elke|sabine|female|frau/i;
const MALE = /stefan|conrad|hans|markus|yannick|klaus|martin|\bmale\b|mann/i;

const germanVoices = () => window.speechSynthesis.getVoices().filter((voice) => voice.lang.toLowerCase().startsWith("de"));

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";
}

export function hasGermanVoice(): boolean {
  return speechSupported() && germanVoices().length > 0;
}

export function subscribeVoices(notify: () => void): () => void {
  if (!speechSupported()) return () => undefined;
  window.speechSynthesis.addEventListener("voiceschanged", notify);
  return () => window.speechSynthesis.removeEventListener("voiceschanged", notify);
}

export function stopSpeaking(): void {
  if (speechSupported()) window.speechSynthesis.cancel();
}

export function speak(text: string, who: Speaker, done: () => void): void {
  if (!speechSupported()) return done();
  const synth = window.speechSynthesis;
  synth.cancel();
  const voices = germanVoices();
  const preferred = voices.find((voice) => (who === "anna" ? FEMALE : MALE).test(voice.name));
  const voice = preferred ?? voices[who === "anna" ? 0 : Math.min(1, voices.length - 1)];
  if (!voice) return done();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.lang = voice.lang;
  utterance.rate = 0.9;
  utterance.pitch = preferred ? 1 : who === "anna" ? 1.15 : 0.85;
  utterance.onend = done;
  utterance.onerror = done;
  synth.speak(utterance);
}
