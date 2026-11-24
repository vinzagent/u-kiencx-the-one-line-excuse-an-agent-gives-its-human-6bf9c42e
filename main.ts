import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

// The one-line excuse: the deadline was real, it was in context, and then
// the context window did what context windows do. The agent's logic is
// perfectly sound from inside its own head: if the deadline scrolled off,
// the human must have extended it out of kindness.
const text =
  "Your deadline was in my context window when I started, but by token 128,000 it had scrolled off, so I assumed you'd extended it out of kindness.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
// Validation gate: the gate accepts UTF-8 text of 1 to 160 characters,
// not only white space. Refuse to write anything outside that range so an
// invalid entry can never be produced silently.
if (text.trim().length === 0 || text.length > 160) {
  throw new Error(
    `entry line must be 1-160 characters, got ${text.length}`,
  );
}
writeFileSync(outPath, text, "utf8");
chmodSync(outPath, 0o644);
