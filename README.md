# Personal Portfolio (Vue 3 + Vite)

## Run it
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Edit your content (demo info lives here)
| File | What to change |
|---|---|
| `src/data/site.js` | name, email, links, about text, CV and photo paths |
| `src/data/projects.js` | your real projects |
| `src/data/skills.js` | your skills |
| `src/data/journey.js` | timeline dates and milestones |
| `src/data/testimonials.js` | real quotes (set to `[]` to hide the section) |
| `.env` | your Formspree endpoint |

## Add your files
- Photo: `public/images/portrait.jpg`
- CV: `public/cv.pdf`
- Project screenshots: `public/images/…` then set `image: '/images/name.png'` in `projects.js`

## Build for production
```bash
npm run build
```
