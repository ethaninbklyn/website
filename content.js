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
  question: "How many times can you ask “Are you sure?” before no one is?",
  emphasis: "no one",

  // Where "About" goes. Your LinkedIn for now; later, "about.html".
  aboutUrl: "https://www.linkedin.com/in/ethan-kessinger",

  // Seconds before the question switches to the next look.
  secondsPerLook: 15,

  
  // Paragraphs shown under "Why it matters". Add them and the switch appears.
    why:[
    "Agents are good at busywork, not judgment. People are good at judgment, but they get overwhelmed, distracted, and bored. The best agents take the busywork so human judgment counts for more. That makes a human in the loop essential. Handled carelessly, it becomes a mirage.",
    "Coding agents show how. They ask for permission constantly: to read a file, run a command, make an edit. Especially for people who aren’t developers, the sensible response is to click yes without reading.",
    "There’s no universal setting. The right balance depends on the agent, on what it can touch, and maybe on the person using it. Finding it is hard.",
    "My current approach is a risk framework. Actions that don’t matter much, or are easy to undo, skip the confirmation entirely. Everything else asks. The goal is that when the agent does ask, it’s worth stopping to read."
  ],
  closing: "Is that enough? Is there a better way to do it?",
  answerPrompt: "Tell me how'd you do it →",   // needs links.email

  links: {
    email: "ethan.kessinger+site@gmail.com"       // e.g. "you@example.com" — used by answerPrompt
  },
  // ── Coming later ──────────────────────────────────────────
  // Past questions, NEWEST FIRST. Add one and "Past questions" appears.
  // look: "typewriter" | "editorial" | "terminal" | "swiss"
  // { question: "...", emphasis: "", look: "typewriter", landed: "Where I ended up." }
  past: []
};
