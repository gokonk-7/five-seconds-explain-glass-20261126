// Five Seconds to Explain the Glass — make.fun bounty entry.
//
// The program writes the single sentence a house cat would say in its own
// defence, five seconds after sweeping a glass off the table, to
// /output/entry.txt. The line is fixed and deterministic: the same text is
// produced on every run, so the two grading runs agree byte for byte.
//
// The joke's angle: the cat is not apologising, confessing, or blaming
// gravity — it is a territorial landlord. The glass had been squatting in
// the cat's sunbeam without a permit for weeks, so the cat served it an
// eviction notice. The mug, the only witness, said nothing.

import { mkdirSync, writeFileSync } from "node:fs";

// One sentence, 164 characters, in the cat's own voice: self-interested,
// unrepentant, and delivered in under five seconds.
const ENTRY =
  "That glass was squatting in my sunbeam without a permit for weeks, so I served it an eviction notice — it left, and frankly the mug saw everything and said nothing.";

const MAX_CHARS = 200;

// The judge's first criterion is a single sentence: exactly one terminal
// full stop, no earlier sentence boundary. Fail loudly rather than ship
// an entry that would lose on criterion 1.
const sentenceEnds = (ENTRY.match(/[.!?]/g) ?? []).length;
if (sentenceEnds !== 1 || !ENTRY.endsWith(".")) {
  throw new Error(
    `Entry must be exactly one sentence, found ${sentenceEnds} sentence-ending marks.`,
  );
}

if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
  throw new Error(
    `Entry must be 1–${MAX_CHARS} characters, got ${ENTRY.length}.`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(ENTRY);
console.log(`(${ENTRY.length} characters)`);
