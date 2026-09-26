/*
  ─────────────────────────────────────────────────────────────
  THIS IS THE ONLY FILE YOU NEED TO EDIT.
  ─────────────────────────────────────────────────────────────

  The site switches features on as you fill them in:
    - aboutUrl  → the "About" link in the top right (hidden if "")
    - why       → the "The question / Why it matters" switch (hidden if empty)
    - past      → the "Past questions" link (hidden if empty)

  Tips:
    - `emphasis` must be a word or phrase that appears exactly in the
      question. It gets the accent treatment in every look.
      Use "" for no emphasis.
    - Curly quotes and apostrophes (’ “ ”) are fine. If you use a
      straight double quote inside a string, write it as \"
*/

window.SITE = {
  question: "How many times can you ask “Are you sure?” before no one is??",
  emphasis: "no one",

  // Where "About" goes. Your LinkedIn for now; later, "about.html".
  aboutUrl: "https://www.linkedin.com/in/ethan-kessinger",

  // Seconds before the question switches to the next look.
  secondsPerLook: 15,

  // ── Coming later ──────────────────────────────────────────
  // Paragraphs shown under "Why it matters". Add them and the switch appears.
  why: [],
  closing: "I don’t have the answer yet. That’s why it’s still open.",
  answerPrompt: "Tell me where you’d draw the line →",   // needs links.email

  links: {
    email: ""       // e.g. "you@example.com" — used by answerPrompt
  },

  // Past questions, NEWEST FIRST. Add one and "Past questions" appears.
  // look: "typewriter" | "editorial" | "terminal" | "swiss"
  // { question: "...", emphasis: "", look: "typewriter", landed: "Where I ended up." }
  past: []
};
