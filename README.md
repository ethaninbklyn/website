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

## Put it on GitHub Pages (one time)

1. **Create the repository.** github.com → New repository → name it `ethankessinger.com` → **Public** → Create.
2. **Upload the files.** Click "uploading an existing file", drag in everything in this folder, commit.
   (`.nojekyll` starts with a dot and may be hidden on your computer. If it doesn't upload, that's fine.)
3. **Turn on Pages.** Settings → Pages → Source: "Deploy from a branch" → `main`, `/ (root)` → Save.
   The Custom domain box should fill in as `www.ethankessinger.com` from the `CNAME` file.
   Check the site at `https://YOUR-USERNAME.github.io/ethankessinger.com/` before touching DNS.
4. **Point the domain.** At your registrar, turn **off** the forwarding to LinkedIn, delete any old A/CNAME records for `@` and `www`, then add:

   | Type | Name | Value |
   |---|---|---|
   | CNAME | `www` | `YOUR-GITHUB-USERNAME.github.io` |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |

5. **Turn on HTTPS.** Once Settings → Pages shows the DNS check passed (minutes to a few hours), tick **Enforce HTTPS**.
6. **Verify the domain.** Profile menu → Settings → Pages → Add a domain → `ethankessinger.com`, then add the TXT record it gives you at your registrar.

## Editing later

Open `content.js` on github.com → pencil icon → edit → Commit. The site updates in about a minute, and every version is kept in the history.
