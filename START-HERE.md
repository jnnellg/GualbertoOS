# Your Legal VA portfolio: complete beginner’s guide

This revised project closely follows the selected StuceyOS desktop interface, using its public interface and interaction engine with your Legal VA content. It uses HTML, CSS, and JavaScript, with Vite for development and GitHub Pages builds. This deliberately replaces the earlier React homepage: preserving the reference's interface does not require a React layer.

## 1. What you received

- The reference's starry wallpaper, top menu bar, left desktop icons, right widgets, dock, traffic-light window controls, and translucent surfaces.
- Eleven desktop apps: Finder/About, Safari/Contact, Code/Skills, Terminal, Messages, Mail/Services, Photos/Samples, Credentials, System Settings, Preview/Résumé, and Trash.
- Multiple windows with focus stacking, dragging, resizing, minimizing, expanding, and closing.
- Dock magnification, tooltips, running indicators, and launch bounce.
- Spotlight search, keyboard shortcuts, command history in Terminal, calendar, Makati weather, appearance controls, star toggle, reduced motion, and simulated sleep/restart.
- Your real résumé photo, education, internships, skills, email, city, and public résumé PDF.
- Three labelled demonstration templates in the original gallery interaction, including detail pages and previous/next navigation.
- A GitHub Actions workflow for publishing to GitHub Pages.

Messages prepares an email draft. It does not deliver messages automatically. The original third-party submission endpoint has been removed. Nothing is sent until the visitor opens the draft and sends it from their own email app.

The public PDF omits your street address, birth date, religion, physical measurements, and reference's details. Your original uploaded résumé is not included in this package.

Content-specific differences are intentional: your city, legal support services, credentials, photo, factual toolkit values, and demonstration files replace the reference author's information. Reference interface attribution is documented in REFERENCE-NOTES.md. No claim of independently verified pixel-perfect fidelity is made.

## 2. Install the three tools

Use official downloads:

1. VS Code: https://code.visualstudio.com/ — download for your operating system and install. On Windows, enable “Add to PATH” if offered.
2. Node.js: https://nodejs.org/ — install Node 24 LTS (or a supported newer LTS). npm is included. This project requires at least Node 22.12.
3. Git: https://git-scm.com/downloads — install using the standard options. On Windows, the default Git Credential Manager makes GitHub sign-in easier.
4. Create or sign in to your GitHub account: https://github.com/ . Choose a username you are comfortable putting in your portfolio address.

Close and reopen VS Code after installing these tools.

## 3. Extract and open the project

1. Download `Legal-VA-Portfolio.zip`.
2. Right-click the ZIP and choose Extract All on Windows; on macOS, double-click it.
3. Put the extracted `legal-va-portfolio` folder somewhere easy to find, such as Documents.
4. Open VS Code.
5. Choose File → Open Folder.
6. Select `legal-va-portfolio` itself, not its parent folder.
7. You should see `package.json`, `src`, `public`, and `.github` in the Explorer sidebar.
8. When VS Code asks about Workspace Trust, trust the folder after reviewing the included files.
9. Choose Terminal → New Terminal. The terminal should open inside the project folder.

A terminal is a place to type commands. Type a command, then press Enter. Do not type the triple backticks from this guide. Wait for one command to finish before typing the next, except when a development server is intentionally running.

## 4. Verify your tools

Run these separately in VS Code’s terminal:

```bash
node --version
npm --version
git --version
```

Each should show a version. `node` should show 24.x or a compatible version. If a command is “not recognized”, close VS Code, reopen it, and try again. If it still fails, reinstall that tool and check its PATH option.

On Windows, if PowerShell says `npm.ps1 cannot be loaded`, use Terminal → dropdown beside the plus icon → Select Default Profile → Command Prompt. Create a new terminal and use it. You can also run `npm.cmd` instead of `npm`.

## 5. Install and run your website

Inside the project folder, run:

```bash
npm ci
```

This downloads the exact dependencies in `package-lock.json`. The ZIP intentionally excludes `node_modules`, because this command recreates it.

Then run:

```bash
npm run dev
```

The terminal prints a local URL, usually `http://localhost:5173/`. Ctrl-click it or copy it into your browser. Use the actual URL printed if the port differs.

Keep this terminal running while you edit. Do not double-click `index.html`; the source uses a JavaScript module, so use the development server. To stop the server, click the terminal and press Ctrl+C. Start it again with `npm run dev`.

## 6. Explore and check every desktop interaction

The portfolio automatically opens Finder/About. Close it with the red traffic-light button to see the full desktop. Click an icon or dock app to open a window.

- **Finder:** your background, photo, education, skills, and internship history. Sidebar items open other apps.
- **Safari:** contact shortcuts, email, and copy-email button.
- **Code:** your legal skills in the reference's syntax-highlighted layout.
- **Photos:** demonstration gallery. Click a card, read its context, download the sample, and try Previous, Next, and All Projects.
- **Mail:** your four legal support service categories.
- **Credentials:** your degree and internships; no invented certifications.
- **Preview:** read, print, and download the public résumé PDF.
- **Messages:** write an enquiry, prepare its draft, then click Open email draft. The site never labels a draft as delivered.
- **Terminal:** type `help`, then try `whoami`, `skills`, `experience`, `education`, `contact`, `projects`, or `open photos`. Use Up/Down to revisit commands.
- **Settings:** try Light, Dark, Auto, accent colours, stars, and reduced motion.
- **Trash:** the simulated empty folder.

On desktop, drag a window by its title bar. Drag its bottom-right corner to resize. Red closes, yellow minimizes, and green expands/restores. Click a running app in the dock to bring it back. Open several windows and click between them to check stacking.

Try the top menus: Apple, File, View, Window, and Help. The control-centre icon opens appearance/display controls. The search icon opens Spotlight. Search `legal`, `research`, `resume`, or a sample title.

Keyboard shortcuts retained from the reference include Ctrl/Cmd+Space for Spotlight, Ctrl/Cmd+O for résumé, and Ctrl/Cmd+W for the focused window. Escape dismisses Spotlight and menus. Some operating systems may reserve those shortcuts; the on-screen controls remain available.

On a phone, use the responsive app windows and horizontally scrollable dock. Check text and controls on your own phone before sharing the live site. The reference itself adapts windows for small screens, so desktop and phone layouts intentionally differ.

## 7. Edit your information in VS Code

The revised project no longer has `profile.js`. Its content is separated as follows:

| What to change | File |
|---|---|
| Stickies introduction, About, services, skills, education, contact and on-screen résumé | `index.html` |
| Gallery sample entries and Terminal answers | `src/desktop.js` |
| Wallpaper, app/window styling, widget layout and responsive rules | `src/desktop.css` |
| Photo | `public/portrait.png` |
| Downloadable résumé PDF | `public/J-Nnell-Gualberto-Resume.pdf` |
| Sample downloads | `public/samples/` |
| Automatic publishing | `.github/workflows/deploy.yml` |

Use Ctrl+F in VS Code to find your name, email, or a specific sentence. Edit text between HTML tags without deleting the tags. Save with Ctrl+S (Windows) or Command+S (Mac). The local site updates while `npm run dev` is running.

For example:

```html
<p>Your new professional introduction goes here.</p>
```

Do not change window IDs such as `win-about`, `msg-form`, or `term-input`; the interaction code uses them. Keep menu `data-open` and desktop `data-win` values intact unless deliberately adding a new app.

### Change your email

Use VS Code's search across files (Ctrl+Shift+F) to find `jnnellg@gmail.com`. Replace it in both `index.html` and `src/desktop.js`. This updates links, copy email, Messages drafts, and Terminal contact information. Update the PDF separately.

### Replace your photo

Replace `public/portrait.png` with a clear professional headshot using the same filename. The supplied photo is extracted from your résumé at 240×240; a larger original will look sharper. If using a different filename, update the image `src` in `index.html`.

### Replace the public résumé

Edit your résumé in Word or Google Docs, export as PDF, and replace `public/J-Nnell-Gualberto-Resume.pdf`. Keep the same filename. Also edit the visible résumé inside `index.html` (`resume-paper`). The PDF and website text are separate files.

### Edit sample work

Search for `const PROJECTS` in `src/desktop.js`. Each object contains `id`, `title`, `short`, `meta`, `body`, case-study text, and tags. The sample download link is in `outcome`. These objects are JavaScript: preserve quotes, commas, and brackets. Add only real work you are permitted to publish, and keep illustrative files labelled as demonstrations.

The included shareable sample links use query parameters:

- `?p=case-index`
- `?p=research-brief`
- `?p=document-review`

Append one to your live portfolio URL to open that sample directly. The reference's `?p=khh` identifies the author's healthcare project; it is not retained as your project.

### Edit Terminal answers

Find `const TERM_CMDS` in `src/desktop.js`. Keep the command keys and change only their response text. Do not paste private information or execute real system commands here; this is a simulated browser terminal.

### Change appearance

Visitors can use System Settings without editing code. To change defaults or the wallpaper, edit `src/desktop.css`. To preserve the requested match, keep the reference's palette, sizes, and layout. Appearance/accent preferences may persist in browser local storage; clear site data when testing fresh defaults.

### Weather

The weather request uses fixed Makati coordinates and Open-Meteo. It does not request visitor geolocation. If the external service fails, the widget shows Weather unavailable. Google Fonts is also external; system font fallbacks remain available.

## 8. Build and preview the production version

Stop your development server with Ctrl+C or open a second terminal. Run:

```bash
npm run build
npm run preview
```

The build produces `dist`. Open the preview URL printed by the terminal, usually `http://localhost:4173/`. Check the downloads again. Stop preview with Ctrl+C.

Do not edit `dist`; it is generated from your source files. GitHub will rebuild it automatically. Do not upload `node_modules` or commit `dist`.

## 9. Create your GitHub repository

Recommended: use the root portfolio address.

1. Sign in to GitHub in your own browser.
2. Click the plus icon → New repository.
3. Repository name: **YOUR-USERNAME.github.io**, replacing YOUR-USERNAME with your exact GitHub username. Example: username `jnnellg` → repository `jnnellg.github.io`.
4. Set visibility to Public for a free GitHub Pages setup.
5. Do not tick Add README, .gitignore, or licence; your local project already has files.
6. Click Create repository.
7. Copy its HTTPS repository URL. It looks like `https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git`.

If that repository already exists, do not overwrite it blindly. Use a separate repository such as `legal-va-portfolio`. Its site will be `https://YOUR-USERNAME.github.io/legal-va-portfolio/`. The included relative Vite base (`./`) supports either layout. This is a single-page portfolio using app windows, so it does not require server-side route rewrites.

## 10. Upload with the VS Code terminal

In your project folder, run each command separately. Replace the example name and email with your Git identity; this is for commits and does not alter website content.

```bash
git init
git config user.name "Your Name"
git config user.email "YOUR-GIT-COMMIT-EMAIL"
git add .
git commit -m "Create Legal VA portfolio"
git branch -M main
```

For commit privacy, you can use the noreply email shown in GitHub Settings → Emails.

Connect to the repository. Replace the example URL with the URL you copied in step 9:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

Git may open your browser for authentication. Sign in there. GitHub account passwords are not accepted as Git HTTPS passwords; use Git Credential Manager’s browser flow. Never put tokens in source files or share them in chat.

If the remote repository is not empty and push is rejected, do not use a force push. For a beginner, create a new empty repository or clone the existing one and integrate these files deliberately.

## 11. Enable GitHub Pages

1. Open your repository on GitHub.
2. Click Settings.
3. In the left sidebar, click Pages.
4. Under Build and deployment, set Source to **GitHub Actions**.
5. Do not choose Deploy from a branch for this source project; this source project uses a Vite build step.
6. Click Actions at the top of the repository.
7. Open “Deploy portfolio to GitHub Pages”.
8. If the first push happened before Pages was enabled and failed, click Run workflow → select main → Run workflow, or open the failed run and use Re-run all jobs.
9. Wait for the workflow to show a green success mark. If it is red, open the failed step and read its log.
10. Go back to Settings → Pages and open the site address GitHub reports.

The supplied workflow installs with `npm ci`, builds with Vite, uploads `dist`, and deploys it to Pages. It runs on pushes to main and can also be started manually. A visitor needs only a browser; they do not install Node or Vite.

## 12. Verify the live site

Open the published URL in a private browser window. Check your portrait, every app, PDF download, sample downloads, and contact link. Check it on your phone. GitHub Pages may take a few minutes to become available. Hard-refresh if you see an old version.

This package is ready to publish, but no GitHub repository has been created and no live GitHub URL has been deployed on your behalf. Your account, username, and repository connection are set up through the steps above.

## 13. Publish future changes

Edit locally, save, and run:

```bash
npm run build
git add .
git commit -m "Update portfolio content"
git push
```

The GitHub workflow publishes the update automatically. Watch Actions for completion. If Git says there is nothing to commit, your files have not changed since the last commit.

## 14. Common errors

| Problem | What to do |
|---|---|
| `npm` or `git` not recognized | Reopen VS Code after installation; check PATH. |
| PowerShell blocks npm | Use Command Prompt terminal, or `npm.cmd`. |
| Cannot find `package.json` | You opened the wrong folder; open the folder containing that file. |
| `npm ci` fails because the lockfile changed | If you intentionally changed dependencies, run `npm install` and commit both package files. Otherwise restore the supplied files. |
| Blank page after opening index.html | Run `npm run dev` and use its printed URL. |
| Port already in use | Use the alternative port Vite prints or stop your previous server. |
| Syntax error after editing JavaScript | Check quotes, commas, and closing brackets near the line shown. |
| `remote origin already exists` | Run `git remote -v`; if it is wrong, use `git remote set-url origin YOUR-REPOSITORY-URL`. |
| `src refspec main does not match any` | Make your first commit, then run `git branch -M main`. |
| Push rejected | Confirm the remote is correct and empty; avoid force-pushing over existing work. |
| Pages setup step fails | Set Settings → Pages → Source to GitHub Actions, then rerun. |
| Workflow never runs | Confirm branch is main, Actions are enabled, and `.github/workflows/deploy.yml` was committed. |
| Pages returns 404 | Check the successful deployment and exact URL in Settings → Pages; wait briefly after publishing. |
| Photo or PDF is missing | Filenames and capitalization must match your links. GitHub hosting is case-sensitive. |
| Copy email fails | Select and copy the visible email manually; browser permissions may block clipboard access. |
| Email button opens nothing | Configure an email app or paste the address into your webmail. |
| Fonts look different offline | Fonts use Google Fonts; Georgia/Arial fallbacks keep the site usable. |

## 15. Before sending the portfolio to employers

Read every claim. Confirm the services match what you are willing and able to do. Add verified internship dates when available. Consider replacing the extracted photo with your original high-resolution headshot. Keep the sample labels honest. Open the live site on a phone and download the public résumé yourself.

You can use this short introduction in an application:

“Here is my Legal VA portfolio, including my paralegal background, internship experience, and sample organization workflows: [your published URL].”

## Technical notes and sources

- Desktop CSS/JavaScript lives in `src`; interface markup is in `index.html`. Vite builds static browser assets in `dist`.
- The page has no message backend, analytics, fake message delivery, fabricated testimonials, or unverified performance statistics. The weather and fonts use external services.
- Theme and accent preferences persist locally. Window state is managed during the session. The local clock reflects the visitor’s device, not your availability.
- The résumé PDF was generated from the supplied résumé; templates were created as demonstrations.
- Production build and automated DOM interaction checks were completed. The remote browser could not access the local preview, so a rendered visual comparison was not completed. Use the local checklist before publishing.
- Vite deployment documentation: https://vite.dev/guide/static-deploy.html
- GitHub Pages custom workflows: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

The workflow follows the current official Vite example, using Node 24, checkout/setup-node v7, configure-pages v6, upload-pages-artifact v5, and deploy-pages v5. The tested dependency lockfile is included.
