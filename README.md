# ethankessinger.com

One open question at a time.

## Launch version

Right now the site is just the question, plus an "About ↗" link to LinkedIn.
The rest is built in and switches on as you add content to `content.js`:

| Add this in `content.js` | And this appears |
|---|---|
| `aboutUrl` | The "About" link, top right. LinkedIn for now; `"about.html"` once that page exists |
| paragraphs in `why` | The "The question / Why it matters" switch |
| an entry in `past` | The "Past questions" link and the time-machine view |


## What's here

| File | What it is | Edit it? |
|---|---|---|
| `content.js` | The question, and everything that comes later | **Yes — the only file you edit** |
| `index.html` | The page | Rarely |
| `app.js`, `styles.css` | Behavior and design | No |
| `og-image.png` | The preview image shown when the link is shared | No |
| `CNAME` | Tells GitHub your domain (`www.ethankessinger.com`) | No |
| `404.html`, `favicon.svg`, `.nojekyll` | Supporting files | No |

The repository is public, so anything you commit is readable on GitHub even before it shows on the site.
Keep drafts (the "why" paragraphs, the About page) somewhere else until they're ready.


## Editing later

Open `content.js` on github.com → pencil icon → edit → Commit. The site updates in about a minute, and every version is kept in the history.
