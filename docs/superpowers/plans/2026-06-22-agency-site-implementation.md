# Agency Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (RU/EN) static agency site with micro-interactions, deployed to GitHub Pages.

**Architecture:** Two language directories (`ru/`, `en/`) with shared CSS and JS in root. A root `index.html` detects browser language and redirects. Each page is self-contained HTML linking to `../styles/` and `../js/`.

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JS, no build tools, GitHub Pages.

## Global Constraints

- No frameworks, no npm, no bundler — all files load directly in browser
- CSS paths from `ru/` and `en/` subdirectories use `../styles/` prefix
- JS paths from `ru/` and `en/` subdirectories use `../js/` prefix
- All placeholder text in RU pages is Russian; EN pages are English
- Accent color `#2563EB` throughout (TBD by owner, easy to change via CSS variable)
- `<html lang="ru">` on all `ru/` pages; `<html lang="en">` on all `en/` pages
- No dark mode, no form, no CMS, no backend
- Verify each task by running `python3 -m http.server 8080` from project root and opening `http://localhost:8080`

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | Language detection redirect only |
| `styles/main.css` | CSS variables, reset, typography, grid, section spacing |
| `styles/components.css` | Nav, footer, buttons, cards, tags |
| `styles/animations.css` | All micro-interaction CSS (underline, flip, accordion, glow) |
| `js/lang.js` | Browser language detection → redirect (root only) |
| `js/cursor.js` | Cursor glow on `.project-card` via `--mouse-x`/`--mouse-y` |
| `js/animations.js` | Nav blur, word rotate, services accordion |
| `ru/index.html` | Russian main page (all sections assembled) |
| `ru/projects.html` | Russian case studies page |
| `ru/blog.html` | Russian founder blog page |
| `en/index.html` | English main page (translated copy of ru/index.html) |
| `en/projects.html` | English case studies page |
| `en/blog.html` | English founder blog page |

---

### Task 1: Project Scaffold

**Files:**
- Create: `index.html`
- Create: `styles/main.css`
- Create: `styles/components.css`
- Create: `styles/animations.css`
- Create: `js/lang.js`
- Create: `js/cursor.js`
- Create: `js/animations.js`
- Create: `ru/index.html`
- Create: `ru/projects.html`
- Create: `ru/blog.html`
- Create: `en/index.html`
- Create: `en/projects.html`
- Create: `en/blog.html`

**Interfaces:**
- Produces: base HTML template reused by all pages in `ru/` and `en/`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p ru en styles js
```

- [ ] **Step 2: Create root redirect index.html**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agency</title>
  <script src="js/lang.js"></script>
</head>
<body></body>
</html>
```

- [ ] **Step 3: Create js/lang.js**

```javascript
const lang = navigator.language.startsWith('ru') ? 'ru' : 'en';
window.location.replace('/' + lang + '/');
```

- [ ] **Step 4: Create base HTML template (will be used for all pages)**

Save this as `ru/index.html` (and repeat for other pages with different `<title>` and `lang` attribute):

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Название агентства] — AI-автоматизация</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles/main.css">
  <link rel="stylesheet" href="../styles/components.css">
  <link rel="stylesheet" href="../styles/animations.css">
</head>
<body>
  <!-- sections will be added in subsequent tasks -->
  <script src="../js/animations.js"></script>
  <script src="../js/cursor.js"></script>
</body>
</html>
```

- [ ] **Step 5: Create en/index.html with lang="en"**

Same as above but `<html lang="en">` and `<title>Agency Name — AI Automation</title>`.

- [ ] **Step 6: Create stub pages (copy base template, adjust title)**

`ru/projects.html` — title: `Кейсы`
`ru/blog.html` — title: `Блог`
`en/projects.html` — title: `Case Studies`
`en/blog.html` — title: `Blog`

- [ ] **Step 7: Create empty CSS files with section comments**

`styles/main.css`:
```css
/* ── Variables ── */
/* ── Reset ── */
/* ── Typography ── */
/* ── Grid / Layout ── */
/* ── Section spacing ── */
/* ── Responsive ── */
```

`styles/components.css`:
```css
/* ── Buttons ── */
/* ── Nav ── */
/* ── Footer ── */
/* ── Project Cards ── */
/* ── Service Blocks ── */
/* ── Founder Block ── */
/* ── Testimonials ── */
/* ── CTA ── */
/* ── Blog Cards ── */
```

`styles/animations.css`:
```css
/* ── Animated underline ── */
/* ── Nav blur ── */
/* ── Word rotate ── */
/* ── Services accordion ── */
/* ── Cursor glow ── */
/* ── Text flip ── */
```

- [ ] **Step 8: Create empty JS files**

`js/cursor.js`:
```javascript
// cursor glow — added in Task 6
```

`js/animations.js`:
```javascript
// nav blur, word rotate, accordion — added in Tasks 3-5
```

- [ ] **Step 9: Verify server runs**

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080` — browser should redirect to `http://localhost:8080/ru/` or `/en/` based on browser language. Page is blank but no errors.

- [ ] **Step 10: Commit**

```bash
git add index.html ru/ en/ styles/ js/
git commit -m "chore: scaffold project structure and base HTML templates"
```

---

### Task 2: Design System CSS

**Files:**
- Modify: `styles/main.css`

**Interfaces:**
- Produces: CSS custom properties used by all subsequent tasks

- [ ] **Step 1: Write main.css**

```css
/* ── Variables ── */
:root {
  --color-bg:     #FFFFFF;
  --color-text:   #0A0A0A;
  --color-muted:  #6B7280;
  --color-accent: #2563EB;
  --color-border: #E5E7EB;

  --font-sans: 'Inter', system-ui, sans-serif;
  --text-hero: clamp(48px, 8vw, 120px);
  --text-h2:   clamp(28px, 4vw, 48px);
  --text-body: 16px;
  --weight-light:  300;
  --weight-normal: 400;
  --weight-medium: 500;

  --section-gap: 120px;
  --container:   1200px;
}

/* ── Reset ── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: var(--text-body);
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: var(--font-sans);
  background: var(--color-bg);
  color: var(--color-text);
  font-weight: var(--weight-normal);
  line-height: 1.6;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* ── Typography ── */
h1, h2, h3 { line-height: 1.1; }

/* ── Grid / Layout ── */
.container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 40px;
}

/* ── Section spacing ── */
section {
  padding: var(--section-gap) 0;
}

.section-title {
  font-size: var(--text-h2);
  font-weight: var(--weight-light);
  margin-bottom: 48px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 48px;
}

.section-link {
  color: var(--color-muted);
  text-decoration: none;
  font-size: 15px;
  transition: color 0.2s;
}
.section-link:hover { color: var(--color-accent); }

/* ── Responsive ── */
@media (max-width: 768px) {
  .container { padding: 0 24px; }
  :root { --section-gap: 80px; }
}

@media (max-width: 480px) {
  :root { --section-gap: 64px; }
}
```

- [ ] **Step 2: Verify typography loads**

Open `http://localhost:8080/ru/` in browser. Page is blank but DevTools → Elements should show Inter font loading from Google Fonts. No console errors.

- [ ] **Step 3: Commit**

```bash
git add styles/main.css
git commit -m "feat: add design system CSS variables and reset"
```

---

### Task 3: Nav Component

**Files:**
- Modify: `ru/index.html` — add `<nav>` HTML
- Modify: `styles/components.css` — nav styles
- Modify: `styles/animations.css` — animated underline + nav blur CSS
- Modify: `js/animations.js` — blur on scroll

**Interfaces:**
- Produces: `.nav`, `.nav--scrolled`, `.nav__link` classes used on every page

- [ ] **Step 1: Add nav HTML to ru/index.html (between `<body>` and `<script>`)**

```html
<nav class="nav">
  <div class="container nav__inner">
    <a href="index.html" class="nav__logo">[Название]</a>
    <ul class="nav__links">
      <li><a href="projects.html" class="nav__link">Проекты</a></li>
      <li><a href="blog.html" class="nav__link">Блог</a></li>
    </ul>
    <div class="nav__actions">
      <a href="../en/" class="nav__lang">EN</a>
      <a href="mailto:placeholder@example.com" class="btn btn--outline nav__cta">→ Написать</a>
    </div>
    <button class="nav__burger" aria-label="Меню">
      <span></span>
      <span></span>
    </button>
  </div>
</nav>
<div class="nav__mobile" id="nav-mobile">
  <ul>
    <li><a href="projects.html">Проекты</a></li>
    <li><a href="blog.html">Блог</a></li>
    <li><a href="../en/">EN</a></li>
    <li><a href="mailto:placeholder@example.com">→ Написать</a></li>
  </ul>
</div>
```

- [ ] **Step 2: Add nav CSS to styles/components.css**

```css
/* ── Nav ── */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 20px 0;
  transition: background 0.3s, border-bottom 0.3s;
}

.nav--scrolled {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid var(--color-border);
}

.nav__inner {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav__logo {
  font-weight: var(--weight-medium);
  text-decoration: none;
  color: var(--color-text);
  margin-right: auto;
  font-size: 15px;
}

.nav__links {
  display: flex;
  gap: 32px;
  list-style: none;
}

.nav__actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav__lang {
  font-size: 13px;
  color: var(--color-muted);
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: color 0.2s;
}
.nav__lang:hover { color: var(--color-text); }

/* ── Buttons ── */
.btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 22px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: var(--weight-medium);
  text-decoration: none;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  cursor: pointer;
  border: 1px solid transparent;
}

.btn--outline {
  border-color: var(--color-border);
  color: var(--color-text);
  background: transparent;
}
.btn--outline:hover {
  border-color: var(--color-text);
}

.btn--filled {
  background: var(--color-text);
  color: var(--color-bg);
  border-color: var(--color-text);
}
.btn--filled:hover {
  background: #1a1a1a;
}

/* Mobile nav */
.nav__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin-left: auto;
}
.nav__burger span {
  display: block;
  width: 22px;
  height: 1px;
  background: var(--color-text);
  transition: transform 0.3s;
}

.nav__mobile {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-bg);
  z-index: 99;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.nav__mobile.open { display: flex; }
.nav__mobile ul {
  list-style: none;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.nav__mobile a {
  font-size: 28px;
  font-weight: var(--weight-light);
  text-decoration: none;
  color: var(--color-text);
}

@media (max-width: 768px) {
  .nav__links, .nav__actions { display: none; }
  .nav__burger { display: flex; }
}
```

- [ ] **Step 3: Add animated underline to styles/animations.css**

```css
/* ── Animated underline ── */
.nav__link,
.footer__link {
  position: relative;
  text-decoration: none;
  color: var(--color-text);
}

.nav__link::after,
.footer__link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.3s ease;
}

.nav__link:hover::after,
.footer__link:hover::after {
  width: 100%;
}

/* ── Nav blur ── */
/* CSS rule is in components.css (.nav--scrolled); JS triggers the class */
```

- [ ] **Step 4: Add nav blur JS to js/animations.js**

```javascript
// Nav blur on scroll
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 50);
  }, { passive: true });
})();

// Burger menu toggle
(function () {
  const burger = document.querySelector('.nav__burger');
  const mobile = document.getElementById('nav-mobile');
  if (!burger || !mobile) return;
  burger.addEventListener('click', () => {
    mobile.classList.toggle('open');
  });
  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobile.classList.remove('open'));
  });
})();
```

- [ ] **Step 5: Visual verification**

Open `http://localhost:8080/ru/index.html`:
- Nav is fixed at top with logo and links
- Scroll down (add temporary `<div style="height:2000px">` in body): nav gets blur background
- Hover over "Проекты" link: underline animates from left to right
- Remove temporary div after test

- [ ] **Step 6: Copy nav HTML to all other page stubs**

Add the same `<nav>` to `ru/projects.html`, `ru/blog.html`. For `en/` pages use English labels:
- Logo text: `[Agency Name]`
- Links: `Projects`, `Blog`
- Lang switcher: `RU` (links to `../ru/`)
- CTA: `→ Contact`

- [ ] **Step 7: Commit**

```bash
git add ru/ en/ styles/components.css styles/animations.css js/animations.js
git commit -m "feat: add nav with blur-on-scroll and animated underlines"
```

---

### Task 4: Hero Section

**Files:**
- Modify: `ru/index.html` — add hero HTML after `<nav>`
- Modify: `styles/components.css` — hero layout and typography
- Modify: `styles/animations.css` — fade-out class for word rotate
- Modify: `js/animations.js` — word rotate logic

**Interfaces:**
- Produces: `.hero__word` element read by word rotate JS; `document.documentElement.lang` read to pick RU or EN word list

- [ ] **Step 1: Add hero HTML to ru/index.html (after closing `</nav>` and mobile nav div)**

```html
<section class="hero">
  <div class="container hero__inner">
    <div class="hero__left">
      <h1 class="hero__heading">
        <span class="hero__word">Строим</span>
      </h1>
    </div>
    <div class="hero__right">
      <p class="hero__subtitle">Помогаем предпринимателям экономить время и расти быстрее — автоматизируем рутину с помощью AI.</p>
      <a href="projects.html" class="btn btn--filled">→ Смотреть кейсы</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add hero CSS to styles/components.css**

```css
/* ── Hero ── */
.hero {
  padding-top: calc(80px + var(--section-gap));
  padding-bottom: var(--section-gap);
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: end;
  width: 100%;
}

.hero__heading {
  font-size: var(--text-hero);
  font-weight: var(--weight-light);
  line-height: 1;
}

.hero__subtitle {
  font-size: 18px;
  color: var(--color-muted);
  line-height: 1.65;
  margin-bottom: 40px;
  max-width: 420px;
}

@media (max-width: 768px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .hero__subtitle { max-width: 100%; }
}
```

- [ ] **Step 3: Add word rotate CSS to styles/animations.css**

```css
/* ── Word rotate ── */
.hero__word {
  display: block;
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.hero__word.fade-out {
  opacity: 0;
  transform: translateY(-16px);
}
```

- [ ] **Step 4: Add word rotate JS to js/animations.js (append after burger code)**

```javascript
// Word rotate
(function () {
  const el = document.querySelector('.hero__word');
  if (!el) return;
  const lang = document.documentElement.lang;
  const words = lang === 'ru'
    ? ['Строим', 'Автоматизируем', 'Масштабируем']
    : ['We Build', 'We Automate', 'We Scale'];
  let i = 0;
  setInterval(() => {
    el.classList.add('fade-out');
    setTimeout(() => {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.classList.remove('fade-out');
    }, 350);
  }, 2500);
})();
```

- [ ] **Step 5: Visual verification**

Open `http://localhost:8080/ru/index.html`:
- Hero is full-width, two-column: heading left, subtitle + button right
- Heading word cycles: Строим → Автоматизируем → Масштабируем every 2.5s with fade
- Button "→ Смотреть кейсы" is visible and styled
- At < 768px viewport: single column layout

- [ ] **Step 6: Commit**

```bash
git add ru/index.html styles/components.css styles/animations.css js/animations.js
git commit -m "feat: add hero section with word rotation animation"
```

---

### Task 5: Services Accordion

**Files:**
- Modify: `ru/index.html` — add services section
- Modify: `styles/components.css` — service block styles
- Modify: `styles/animations.css` — accordion expand CSS
- Modify: `js/animations.js` — accordion click handler

**Interfaces:**
- Produces: `.service`, `.service.active`, `.service__header` used by JS

- [ ] **Step 1: Add services HTML to ru/index.html (after hero section)**

```html
<section class="services">
  <div class="container">
    <h2 class="section-title">Что мы делаем</h2>
    <div class="service-list">

      <div class="service">
        <div class="service__header">
          <span class="service__name">Автоматизация рутины</span>
          <span class="service__arrow" aria-hidden="true">→</span>
        </div>
        <div class="service__body">
          <p>Заменяем ручной труд автоматическими воркфлоу — экономим команде 10–30 часов в неделю на повторяющихся задачах.</p>
        </div>
      </div>

      <div class="service">
        <div class="service__header">
          <span class="service__name">AI-агенты и системы</span>
          <span class="service__arrow" aria-hidden="true">→</span>
        </div>
        <div class="service__body">
          <p>Строим автономных AI-агентов, которые обрабатывают входящие, квалифицируют лиды и отвечают на вопросы без участия человека.</p>
        </div>
      </div>

      <div class="service">
        <div class="service__header">
          <span class="service__name">Backend-разработка</span>
          <span class="service__arrow" aria-hidden="true">→</span>
        </div>
        <div class="service__body">
          <p>Разрабатываем API, интеграции и серверную логику под любую бизнес-задачу. Python, FastAPI, интеграции с внешними сервисами.</p>
        </div>
      </div>

      <div class="service">
        <div class="service__header">
          <span class="service__name">Стратегия и консалтинг</span>
          <span class="service__arrow" aria-hidden="true">→</span>
        </div>
        <div class="service__body">
          <p>Помогаем разобраться, где в вашем бизнесе AI даст максимальный эффект — без воды и лишних трат.</p>
        </div>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Add service block CSS to styles/components.css**

```css
/* ── Service Blocks ── */
.service-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.service {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.3s;
  cursor: pointer;
}

.service:hover,
.service.active {
  border-color: var(--color-accent);
}

.service__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  user-select: none;
}

.service__name {
  font-size: clamp(16px, 2vw, 20px);
  font-weight: var(--weight-medium);
}

.service__arrow {
  font-size: 18px;
  color: var(--color-muted);
  transition: transform 0.3s ease, color 0.3s;
  flex-shrink: 0;
}

.service.active .service__arrow {
  transform: rotate(90deg);
  color: var(--color-accent);
}

.service__body {
  padding: 0 32px;
  overflow: hidden;
}

.service__body p {
  color: var(--color-muted);
  line-height: 1.65;
  padding-bottom: 24px;
}
```

- [ ] **Step 3: Add accordion CSS to styles/animations.css**

```css
/* ── Services accordion ── */
.service__body {
  max-height: 0;
  opacity: 0;
  transition: max-height 0.4s ease, opacity 0.3s ease;
}

.service.active .service__body {
  max-height: 160px;
  opacity: 1;
}
```

- [ ] **Step 4: Add accordion JS to js/animations.js (append)**

```javascript
// Services accordion
(function () {
  document.querySelectorAll('.service__header').forEach(header => {
    header.addEventListener('click', () => {
      const service = header.parentElement;
      const isActive = service.classList.contains('active');
      document.querySelectorAll('.service').forEach(s => s.classList.remove('active'));
      if (!isActive) service.classList.add('active');
    });
  });
})();
```

- [ ] **Step 5: Visual verification**

Open `http://localhost:8080/ru/index.html`:
- 4 service blocks visible with grey borders
- Click "Автоматизация рутины": border turns blue, description slides in, arrow rotates
- Click another service: first closes, second opens
- Click same service again: closes

- [ ] **Step 6: Commit**

```bash
git add ru/index.html styles/components.css styles/animations.css js/animations.js
git commit -m "feat: add services accordion with expand animation"
```

---

### Task 6: Projects Cards + Cursor Glow

**Files:**
- Modify: `ru/index.html` — add projects preview section
- Modify: `styles/components.css` — project card styles
- Modify: `styles/animations.css` — cursor glow CSS
- Modify: `js/cursor.js` — cursor glow JS

**Interfaces:**
- Produces: `.project-card` class; `--mouse-x`/`--mouse-y` CSS custom properties set by cursor.js

- [ ] **Step 1: Add projects preview HTML to ru/index.html (after services section)**

```html
<section class="projects" id="projects">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title" style="margin-bottom:0">Наши работы</h2>
      <a href="projects.html" class="section-link">Все кейсы →</a>
    </div>
    <div class="projects-grid">

      <article class="project-card">
        <div class="project-card__image">
          <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="400" height="240" fill="#F3F4F6"/>
            <text x="200" y="125" text-anchor="middle" fill="#9CA3AF" font-family="system-ui" font-size="14">Изображение</text>
          </svg>
        </div>
        <div class="project-card__info">
          <h3 class="project-card__title">Название проекта</h3>
          <div class="project-card__tags">
            <span class="tag">AI Agent</span>
            <span class="tag">Python</span>
          </div>
        </div>
      </article>

      <article class="project-card">
        <div class="project-card__image">
          <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="400" height="240" fill="#F3F4F6"/>
            <text x="200" y="125" text-anchor="middle" fill="#9CA3AF" font-family="system-ui" font-size="14">Изображение</text>
          </svg>
        </div>
        <div class="project-card__info">
          <h3 class="project-card__title">Название проекта</h3>
          <div class="project-card__tags">
            <span class="tag">Backend</span>
            <span class="tag">FastAPI</span>
          </div>
        </div>
      </article>

      <article class="project-card">
        <div class="project-card__image">
          <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="400" height="240" fill="#F3F4F6"/>
            <text x="200" y="125" text-anchor="middle" fill="#9CA3AF" font-family="system-ui" font-size="14">Изображение</text>
          </svg>
        </div>
        <div class="project-card__info">
          <h3 class="project-card__title">Название проекта</h3>
          <div class="project-card__tags">
            <span class="tag">Automation</span>
            <span class="tag">Bot</span>
          </div>
        </div>
      </article>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Add project card CSS to styles/components.css**

```css
/* ── Project Cards ── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;
}

.project-card {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  transition: border-color 0.3s;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.project-card:hover {
  border-color: #D1D5DB;
}

.project-card__image {
  overflow: hidden;
}

.project-card__image svg,
.project-card__image img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.project-card:hover .project-card__image svg,
.project-card:hover .project-card__image img {
  transform: scale(1.03);
}

.project-card__info {
  padding: 20px;
}

.project-card__title {
  font-size: 17px;
  font-weight: var(--weight-medium);
  margin-bottom: 10px;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 100px;
  background: #F3F4F6;
  color: var(--color-muted);
}

@media (max-width: 768px) {
  .projects-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Add cursor glow CSS to styles/animations.css**

```css
/* ── Cursor glow ── */
.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    280px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(37, 99, 235, 0.07),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  z-index: 0;
  border-radius: inherit;
}

.project-card:hover::before {
  opacity: 1;
}
```

- [ ] **Step 4: Write cursor glow JS in js/cursor.js**

```javascript
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
  });
});
```

- [ ] **Step 5: Visual verification**

Open `http://localhost:8080/ru/index.html`:
- 3 project cards in a row with grey placeholder images
- Hover over any card: subtle blue glow follows the cursor
- Hover: image scales up slightly (1.03x)
- "Все кейсы →" link visible in section header

- [ ] **Step 6: Commit**

```bash
git add ru/index.html styles/components.css styles/animations.css js/cursor.js
git commit -m "feat: add project cards grid with cursor glow effect"
```

---

### Task 7: Founder Trust Block

**Files:**
- Modify: `ru/index.html` — add founder section after projects
- Modify: `styles/components.css` — founder block styles

**Interfaces:**
- Produces: `.founder` section (no JS needed)

- [ ] **Step 1: Add founder HTML to ru/index.html (after projects section)**

```html
<section class="founder">
  <div class="container founder__inner">
    <div class="founder__photo">
      <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="founder__img">
        <rect width="280" height="280" fill="#F3F4F6" rx="12"/>
        <circle cx="140" cy="110" r="50" fill="#D1D5DB"/>
        <ellipse cx="140" cy="230" rx="80" ry="55" fill="#D1D5DB"/>
      </svg>
    </div>
    <div class="founder__info">
      <p class="founder__label">За агентством</p>
      <h3 class="founder__name">[Имя основателя]</h3>
      <p class="founder__role">Основатель и lead-разработчик</p>
      <p class="founder__bio">Строю AI-системы, которые помогают бизнесу расти. Специализируюсь на автоматизации, чистой архитектуре и измеримых результатах.</p>
      <a href="blog.html" class="founder__link">→ Читать блог</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add founder CSS to styles/components.css**

```css
/* ── Founder Block ── */
.founder__inner {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 64px;
  align-items: center;
}

.founder__img {
  width: 280px;
  height: 280px;
  border-radius: 12px;
  display: block;
}

.founder__label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-bottom: 12px;
}

.founder__name {
  font-size: 32px;
  font-weight: var(--weight-medium);
  margin-bottom: 4px;
}

.founder__role {
  color: var(--color-muted);
  margin-bottom: 20px;
  font-size: 15px;
}

.founder__bio {
  color: var(--color-muted);
  line-height: 1.7;
  margin-bottom: 24px;
  max-width: 480px;
}

.founder__link {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: var(--weight-medium);
  font-size: 15px;
  transition: opacity 0.2s;
}
.founder__link:hover { opacity: 0.75; }

@media (max-width: 768px) {
  .founder__inner {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .founder__img {
    margin: 0 auto;
    width: 200px;
    height: 200px;
  }
  .founder__bio { max-width: 100%; }
}
```

- [ ] **Step 3: Visual verification**

Open `http://localhost:8080/ru/index.html` and scroll to founder section:
- Two-column layout: placeholder avatar left, text right
- "→ Читать блог" link is blue
- At < 768px: stacks vertically, centered

- [ ] **Step 4: Commit**

```bash
git add ru/index.html styles/components.css
git commit -m "feat: add founder trust block"
```

---

### Task 8: Testimonials + CTA + Footer

**Files:**
- Modify: `ru/index.html` — add testimonials, CTA, footer sections
- Modify: `styles/components.css` — testimonials, CTA, footer styles
- Modify: `styles/animations.css` — text flip CSS

**Interfaces:**
- Produces: `.btn-flip` class; `.footer__link` with animated underline (already defined in Task 3)

- [ ] **Step 1: Add testimonials HTML to ru/index.html (after founder section)**

```html
<section class="testimonials">
  <div class="container">
    <h2 class="section-title">Отзывы клиентов</h2>
    <div class="testimonial-list">

      <div class="testimonial">
        <blockquote class="testimonial__quote">
          Автоматизировали весь процесс онбординга. Теперь экономим 15 часов в неделю, которые раньше уходили на ручную обработку заявок.
        </blockquote>
        <cite class="testimonial__author">— [Имя], [Должность] в [Компания]</cite>
      </div>

      <div class="testimonial">
        <blockquote class="testimonial__quote">
          AI-агент обрабатывает 80% входящих вопросов без участия нашей команды. Скорость ответа выросла в 10 раз.
        </blockquote>
        <cite class="testimonial__author">— [Имя], [Должность] в [Компания]</cite>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Add CTA HTML to ru/index.html (after testimonials)**

```html
<section class="cta">
  <div class="container cta__inner">
    <p class="cta__label">Начнём работу</p>
    <h2 class="cta__heading">Готовы автоматизировать<br>свой бизнес?</h2>
    <div class="cta__buttons">
      <a href="https://t.me/placeholder" class="btn btn--filled btn-flip" target="_blank" rel="noopener">
        <span class="btn-flip__front">→ Telegram</span>
        <span class="btn-flip__back">→ Telegram</span>
      </a>
      <a href="mailto:placeholder@example.com" class="btn btn--outline btn-flip">
        <span class="btn-flip__front">→ Email</span>
        <span class="btn-flip__back">→ Email</span>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add footer HTML to ru/index.html (after CTA, before scripts)**

```html
<footer class="footer">
  <div class="container footer__inner">
    <span class="footer__name">[Название агентства]</span>
    <div class="footer__links">
      <a href="https://t.me/placeholder" class="footer__link" target="_blank" rel="noopener">tg</a>
      <a href="https://linkedin.com" class="footer__link" target="_blank" rel="noopener">linkedin</a>
      <a href="mailto:placeholder@example.com" class="footer__link">email</a>
    </div>
    <div class="footer__right">
      <a href="../en/" class="footer__lang">EN</a>
      <span class="footer__copy">© 2026</span>
    </div>
  </div>
</footer>
```

- [ ] **Step 4: Add testimonials and CTA CSS to styles/components.css**

```css
/* ── Testimonials ── */
.testimonial-list {
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.testimonial__quote {
  font-size: clamp(18px, 2.5vw, 26px);
  font-weight: var(--weight-light);
  line-height: 1.55;
  color: var(--color-text);
  border: none;
  margin: 0 0 12px;
  padding-left: 36px;
  position: relative;
}

.testimonial__quote::before {
  content: '\201C';
  position: absolute;
  left: 0;
  top: -12px;
  font-size: 64px;
  color: var(--color-border);
  font-family: Georgia, serif;
  line-height: 1;
}

.testimonial__author {
  font-size: 14px;
  color: var(--color-muted);
  font-style: normal;
  padding-left: 36px;
}

/* ── CTA ── */
.cta__inner {
  text-align: center;
}

.cta__label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-bottom: 16px;
}

.cta__heading {
  font-size: var(--text-h2);
  font-weight: var(--weight-light);
  line-height: 1.2;
  margin-bottom: 48px;
}

.cta__buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ── Footer ── */
.footer {
  padding: 32px 0;
  border-top: 1px solid var(--color-border);
}

.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.footer__name {
  font-weight: var(--weight-medium);
  font-size: 14px;
}

.footer__links {
  display: flex;
  gap: 24px;
}

.footer__right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.footer__lang {
  font-size: 13px;
  color: var(--color-muted);
  text-decoration: none;
  letter-spacing: 0.05em;
}
.footer__lang:hover { color: var(--color-text); }

.footer__copy {
  font-size: 13px;
  color: var(--color-muted);
}
```

- [ ] **Step 5: Add text flip CSS to styles/animations.css**

```css
/* ── Text flip ── */
.btn-flip {
  position: relative;
  overflow: hidden;
  perspective: 600px;
}

.btn-flip__front,
.btn-flip__back {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.35s ease;
  backface-visibility: hidden;
  width: 100%;
}

.btn-flip__back {
  position: absolute;
  inset: 0;
  transform: rotateX(-90deg);
  transform-origin: center top;
}

.btn-flip:hover .btn-flip__front {
  transform: rotateX(90deg);
  transform-origin: center bottom;
}

.btn-flip:hover .btn-flip__back {
  transform: rotateX(0deg);
}
```

- [ ] **Step 6: Visual verification**

Open `http://localhost:8080/ru/index.html` and scroll to bottom:
- Two testimonials with large grey quotation marks
- CTA section centered with large heading and two buttons
- Hover each CTA button: text flips forward (rotates on X axis)
- Footer shows name, social links, EN switcher, copyright
- Footer social links have animated underline on hover

- [ ] **Step 7: Commit**

```bash
git add ru/index.html styles/components.css styles/animations.css
git commit -m "feat: add testimonials, CTA with text flip, and footer"
```

---

### Task 9: Complete ru/index.html — Full Page Verification

**Files:**
- Review: `ru/index.html` — check section order, JS wiring, meta tags

**Interfaces:**
- Consumes: all tasks 3–8
- Produces: complete, verified Russian main page

- [ ] **Step 1: Verify section order in ru/index.html**

The body should contain in this order:
1. `<nav>` + `<div class="nav__mobile">`
2. `<section class="hero">`
3. `<section class="services">`
4. `<section class="projects">`
5. `<section class="founder">`
6. `<section class="testimonials">`
7. `<section class="cta">`
8. `<footer class="footer">`
9. `<script src="../js/animations.js"></script>`
10. `<script src="../js/cursor.js"></script>`

- [ ] **Step 2: Full page visual pass**

Open `http://localhost:8080/ru/` (triggers lang redirect) or directly `http://localhost:8080/ru/index.html`.

Check each item:
- [ ] Nav sticks at top, blur appears after scrolling 50px
- [ ] Nav links have animated underline on hover
- [ ] Hero word rotates: Строим → Автоматизируем → Масштабируем
- [ ] Services accordion: click opens/closes, arrow rotates, border turns blue
- [ ] Project cards: cursor glow follows mouse, image scales on hover
- [ ] Founder block: two-column layout with placeholder avatar
- [ ] Testimonials: large grey quotes, names below
- [ ] CTA buttons: text flip on hover
- [ ] Footer links: animated underline
- [ ] No console errors (DevTools → Console)
- [ ] No layout overflow on any section (DevTools → inspect)

- [ ] **Step 3: Commit**

```bash
git add ru/index.html
git commit -m "feat: complete Russian main page assembly"
```

---

### Task 10: English Main Page (en/index.html)

**Files:**
- Modify: `en/index.html` — full English translation of ru/index.html

**Interfaces:**
- Consumes: same CSS/JS as ru/index.html
- Produces: complete English main page

- [ ] **Step 1: Copy ru/index.html content to en/index.html**

Change:
- `<html lang="ru">` → `<html lang="en">`
- `<title>` → `[Agency Name] — AI Automation`
- Lang switcher: `../en/` → `../ru/` and label `EN` → `RU`

- [ ] **Step 2: Translate all Russian text in en/index.html**

Nav:
- `Проекты` → `Projects`
- `Блог` → `Blog`
- `→ Написать` → `→ Contact`

Hero:
- `Строим` → `We Build` (word rotate JS picks EN list based on `lang="en"`)
- Subtitle: `We help entrepreneurs save time and grow faster by automating routine tasks with AI.`
- CTA: `→ See Our Work`

Services title: `What We Do`

Services items:
- `Автоматизация рутины` → `Routine Automation` · body: `We replace manual work with automated workflows — saving your team 10–30 hours a week.`
- `AI-агенты и системы` → `AI Agents & Systems` · body: `We build autonomous AI agents that handle inbound requests, qualify leads, and answer questions without human input.`
- `Backend-разработка` → `Backend Development` · body: `We build APIs, integrations, and server logic for any business task. Python, FastAPI, third-party integrations.`
- `Стратегия и консалтинг` → `Strategy & Consulting` · body: `We help you identify where AI will have the most impact in your business — without fluff or wasted budget.`

Projects title: `Our Work` · link: `All cases →`

Card titles: `Project Name` (keep as-is, placeholders)

Founder section:
- `За агентством` → `Behind the agency`
- Role: `Founder & Lead Developer`
- Bio: `Building AI systems that help businesses grow. Obsessed with automation, clean architecture, and measurable results.`
- Link: `→ Read the blog`

Testimonials title: `Client Testimonials`

Testimonials text:
- `They automated our entire onboarding process. We now save 15 hours a week that used to go into manual request handling.`
- `The AI agent handles 80% of incoming questions without involving our team. Response speed improved 10x.`

CTA label: `Let's work together`
CTA heading: `Ready to automate<br>your business?`
CTA buttons: `→ Telegram` and `→ Email` (same)

Footer lang: `RU` (links to `../ru/`)

- [ ] **Step 3: Visual verification**

Open `http://localhost:8080/en/index.html`:
- All text is in English
- Word rotates: We Build → We Automate → We Scale
- All interactions work identically to Russian version
- Lang switcher in nav: `RU` link appears and points to `../ru/`

- [ ] **Step 4: Commit**

```bash
git add en/index.html
git commit -m "feat: add English main page translation"
```

---

### Task 11: Projects Pages

**Files:**
- Modify: `ru/projects.html` — full Russian case studies page
- Modify: `en/projects.html` — English translation

**Interfaces:**
- Consumes: shared CSS/JS (cursor glow, nav)
- Produces: full projects grid with 6 placeholder case studies

- [ ] **Step 1: Write ru/projects.html**

Add nav (same as index.html). Then:

```html
<main>
  <section class="page-header">
    <div class="container">
      <h1 class="page-title">Наши кейсы</h1>
      <p class="page-subtitle">Проекты, которые мы реализовали для клиентов.</p>
    </div>
  </section>

  <section class="projects-full">
    <div class="container">
      <div class="projects-grid projects-grid--2col">

        <article class="project-card project-card--full">
          <div class="project-card__image">
            <svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="600" height="360" fill="#F3F4F6"/>
              <text x="300" y="185" text-anchor="middle" fill="#9CA3AF" font-family="system-ui" font-size="16">Изображение</text>
            </svg>
          </div>
          <div class="project-card__info">
            <h2 class="project-card__title">Название проекта 1</h2>
            <div class="project-card__tags">
              <span class="tag">AI Agent</span>
              <span class="tag">Python</span>
              <span class="tag">FastAPI</span>
            </div>
            <p class="project-card__problem"><strong>Проблема:</strong> Клиент тратил 20 часов в неделю на ручную обработку входящих заявок.</p>
            <p class="project-card__result"><strong>Результат:</strong> AI-агент автоматизировал 90% обработки. Экономия: 18 часов в неделю.</p>
          </div>
        </article>

        <!-- Repeat article block 5 more times with placeholder content -->
        <article class="project-card project-card--full">
          <div class="project-card__image">
            <svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="600" height="360" fill="#F3F4F6"/>
              <text x="300" y="185" text-anchor="middle" fill="#9CA3AF" font-family="system-ui" font-size="16">Изображение</text>
            </svg>
          </div>
          <div class="project-card__info">
            <h2 class="project-card__title">Название проекта 2</h2>
            <div class="project-card__tags">
              <span class="tag">Backend</span>
              <span class="tag">Integration</span>
            </div>
            <p class="project-card__problem"><strong>Проблема:</strong> Ручная синхронизация данных между CRM и внутренней базой занимала часы.</p>
            <p class="project-card__result"><strong>Результат:</strong> Автоматическая синхронизация в реальном времени. Ошибки — 0.</p>
          </div>
        </article>

        <article class="project-card project-card--full">
          <div class="project-card__image">
            <svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="600" height="360" fill="#F3F4F6"/>
              <text x="300" y="185" text-anchor="middle" fill="#9CA3AF" font-family="system-ui" font-size="16">Изображение</text>
            </svg>
          </div>
          <div class="project-card__info">
            <h2 class="project-card__title">Название проекта 3</h2>
            <div class="project-card__tags">
              <span class="tag">Telegram Bot</span>
              <span class="tag">AI</span>
            </div>
            <p class="project-card__problem"><strong>Проблема:</strong> Служба поддержки не справлялась с объёмом повторяющихся вопросов.</p>
            <p class="project-card__result"><strong>Результат:</strong> Telegram-бот с AI обрабатывает 75% запросов автоматически.</p>
          </div>
        </article>

        <article class="project-card project-card--full">
          <div class="project-card__image">
            <svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="600" height="360" fill="#F3F4F6"/>
              <text x="300" y="185" text-anchor="middle" fill="#9CA3AF" font-family="system-ui" font-size="16">Изображение</text>
            </svg>
          </div>
          <div class="project-card__info">
            <h2 class="project-card__title">Название проекта 4</h2>
            <div class="project-card__tags">
              <span class="tag">Automation</span>
              <span class="tag">Python</span>
            </div>
            <p class="project-card__problem"><strong>Проблема:</strong> Еженедельная отчётность собиралась вручную из 5 разных источников.</p>
            <p class="project-card__result"><strong>Результат:</strong> Отчёт генерируется автоматически каждый понедельник.</p>
          </div>
        </article>

        <article class="project-card project-card--full">
          <div class="project-card__image">
            <svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="600" height="360" fill="#F3F4F6"/>
              <text x="300" y="185" text-anchor="middle" fill="#9CA3AF" font-family="system-ui" font-size="16">Изображение</text>
            </svg>
          </div>
          <div class="project-card__info">
            <h2 class="project-card__title">Название проекта 5</h2>
            <div class="project-card__tags">
              <span class="tag">AI Agent</span>
              <span class="tag">API</span>
            </div>
            <p class="project-card__problem"><strong>Проблема:</strong> Квалификация лидов занимала у менеджеров 3 часа в день.</p>
            <p class="project-card__result"><strong>Результат:</strong> AI-агент квалифицирует и приоритизирует лиды за секунды.</p>
          </div>
        </article>

        <article class="project-card project-card--full">
          <div class="project-card__image">
            <svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="600" height="360" fill="#F3F4F6"/>
              <text x="300" y="185" text-anchor="middle" fill="#9CA3AF" font-family="system-ui" font-size="16">Изображение</text>
            </svg>
          </div>
          <div class="project-card__info">
            <h2 class="project-card__title">Название проекта 6</h2>
            <div class="project-card__tags">
              <span class="tag">Consulting</span>
              <span class="tag">Strategy</span>
            </div>
            <p class="project-card__problem"><strong>Проблема:</strong> Компания не знала, с чего начать внедрение AI.</p>
            <p class="project-card__result"><strong>Результат:</strong> Дорожная карта автоматизации на 6 месяцев с ROI-оценкой.</p>
          </div>
        </article>

      </div>
    </div>
  </section>
</main>
```

Add footer (same as index.html). Add scripts.

- [ ] **Step 2: Add page-specific CSS to styles/components.css**

```css
/* ── Page Header ── */
.page-header {
  padding-top: calc(80px + 64px);
  padding-bottom: 64px;
}

.page-title {
  font-size: var(--text-h2);
  font-weight: var(--weight-light);
  margin-bottom: 16px;
}

.page-subtitle {
  color: var(--color-muted);
  font-size: 18px;
}

/* ── Projects full grid ── */
.projects-grid--2col {
  grid-template-columns: repeat(2, 1fr);
}

.project-card--full .project-card__problem,
.project-card--full .project-card__result {
  font-size: 15px;
  color: var(--color-muted);
  line-height: 1.6;
  margin-top: 12px;
}

@media (max-width: 768px) {
  .projects-grid--2col { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Write en/projects.html**

Copy `ru/projects.html`, change `lang="ru"` → `lang="en"`, translate:
- Title: `Case Studies`
- Subtitle: `Projects we have delivered for clients.`
- Nav labels (same as en/index.html)
- "Проблема:" → "Problem:", "Результат:" → "Result:"
- Translate each project's problem and result text to English

- [ ] **Step 4: Visual verification**

Open `http://localhost:8080/ru/projects.html`:
- Page header with title and subtitle
- 6 project cards in 2-column grid
- Cursor glow works on each card
- Footer present
- Open `http://localhost:8080/en/projects.html`: same layout in English

- [ ] **Step 5: Commit**

```bash
git add ru/projects.html en/projects.html styles/components.css
git commit -m "feat: add projects page with 6 case study placeholders"
```

---

### Task 12: Blog Pages

**Files:**
- Modify: `ru/blog.html` — founder blog in Russian
- Modify: `en/blog.html` — English translation

**Interfaces:**
- Consumes: shared CSS/JS (nav, footer)
- Produces: blog list page with 3 placeholder articles

- [ ] **Step 1: Write ru/blog.html**

Add nav (same as other pages). Then:

```html
<main>
  <section class="page-header">
    <div class="container">
      <h1 class="page-title">Блог</h1>
      <p class="page-subtitle">Мысли об AI, автоматизации и предпринимательстве.</p>
    </div>
  </section>

  <section>
    <div class="container blog-list">

      <article class="blog-card">
        <time class="blog-card__date" datetime="2026-06-15">15 июня 2026</time>
        <h2 class="blog-card__title">Как AI сэкономил клиенту 20 часов в неделю</h2>
        <p class="blog-card__excerpt">Разбираем кейс: как мы автоматизировали процесс онбординга для SaaS-компании с нуля до продакшена за 3 недели.</p>
      </article>

      <article class="blog-card">
        <time class="blog-card__date" datetime="2026-05-28">28 мая 2026</time>
        <h2 class="blog-card__title">Почему 90% AI-проектов умирают до запуска</h2>
        <p class="blog-card__excerpt">Три главные причины, почему бизнес не получает результат от AI, и как их избежать с самого начала.</p>
      </article>

      <article class="blog-card">
        <time class="blog-card__date" datetime="2026-05-10">10 мая 2026</time>
        <h2 class="blog-card__title">С чего начать автоматизацию в малом бизнесе</h2>
        <p class="blog-card__excerpt">Практический чеклист: как выбрать первый процесс для автоматизации, чтобы получить результат за 2 недели.</p>
      </article>

    </div>
  </section>
</main>
```

Add footer and scripts.

- [ ] **Step 2: Add blog CSS to styles/components.css**

```css
/* ── Blog Cards ── */
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.blog-card {
  padding: 40px 0;
  border-bottom: 1px solid var(--color-border);
}
.blog-card:first-child { border-top: 1px solid var(--color-border); }

.blog-card__date {
  display: block;
  font-size: 13px;
  color: var(--color-muted);
  margin-bottom: 12px;
  letter-spacing: 0.03em;
}

.blog-card__title {
  font-size: clamp(18px, 2vw, 24px);
  font-weight: var(--weight-medium);
  margin-bottom: 12px;
  line-height: 1.3;
  cursor: default;
}

.blog-card__excerpt {
  color: var(--color-muted);
  line-height: 1.65;
  max-width: 640px;
}
```

- [ ] **Step 3: Write en/blog.html**

Copy `ru/blog.html`, change `lang="ru"` → `lang="en"`, translate:
- Title: `Blog`
- Subtitle: `Thoughts on AI, automation, and entrepreneurship.`
- Nav labels (same as en/index.html)
- Article 1: `How AI saved a client 20 hours a week` / `A case study: how we automated a SaaS onboarding process from scratch to production in 3 weeks.`
- Article 2: `Why 90% of AI projects die before launch` / `The three main reasons businesses don't get results from AI, and how to avoid them from day one.`
- Article 3: `Where to start with automation in a small business` / `A practical checklist: how to pick the first process to automate and see results within 2 weeks.`

- [ ] **Step 4: Visual verification**

Open `http://localhost:8080/ru/blog.html`:
- Page header: "Блог" title and subtitle
- 3 article cards separated by border lines
- Date, title, excerpt for each article
- Open `http://localhost:8080/en/blog.html`: English version

- [ ] **Step 5: Commit**

```bash
git add ru/blog.html en/blog.html styles/components.css
git commit -m "feat: add blog page with 3 placeholder articles"
```

---

### Task 13: Mobile Responsive

**Files:**
- Modify: `styles/main.css` — responsive section spacing (already partially done)
- Modify: `styles/components.css` — remaining mobile breakpoints

**Interfaces:**
- Consumes: all HTML pages from Tasks 3–12
- Produces: site functional at < 768px and < 480px

- [ ] **Step 1: Add remaining mobile CSS to styles/components.css**

```css
/* ── Responsive ── */
@media (max-width: 768px) {
  /* Hero (already in Task 4) */

  /* Testimonials */
  .testimonial__quote { font-size: 18px; }

  /* CTA */
  .cta__buttons { flex-direction: column; align-items: center; }

  /* Footer */
  .footer__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  /* Blog */
  .blog-card { padding: 28px 0; }
}

@media (max-width: 480px) {
  /* Nav */
  .nav { padding: 16px 0; }

  /* Hero: clamp handles font scaling already */

  /* Services */
  .service__header { padding: 20px 20px; }
  .service__body { padding: 0 20px; }
  .service.active .service__body { padding: 0 20px 20px; }
}
```

- [ ] **Step 2: Verify at 375px viewport (iPhone SE size)**

In Chrome DevTools → Toggle Device Toolbar → select 375px width. Check each page:

`ru/index.html`:
- [ ] Nav shows only logo + burger button
- [ ] Burger opens full-screen mobile menu
- [ ] Hero is single column; word rotates correctly
- [ ] Services accordion works with touch
- [ ] Projects: single column cards
- [ ] Founder: stacked (avatar above text, centered)
- [ ] CTA buttons stack vertically
- [ ] Footer stacks vertically

`ru/projects.html`:
- [ ] 2-col grid → 1 col

`ru/blog.html`:
- [ ] Cards readable and spaced correctly

- [ ] **Step 3: Verify at 768px viewport (tablet)**

Resize to 768px. Key checks:
- [ ] Desktop nav still visible (burger hidden)
- [ ] Projects grid: 1 column
- [ ] Founder: stacked

- [ ] **Step 4: Commit**

```bash
git add styles/components.css styles/main.css
git commit -m "feat: complete mobile responsive layout for all pages"
```

---

## Self-Review

### Spec Coverage Check

| Spec Requirement | Task |
|-----------------|------|
| Bilingual RU/EN | Tasks 1, 10–12 |
| Lang detect redirect | Task 1 (lang.js) |
| Lang switcher in nav | Tasks 3, 10 |
| Nav blur + animated underline | Task 3 |
| Hero word rotate | Task 4 |
| Services accordion | Task 5 |
| Projects grid + cursor glow | Task 6 |
| Founder trust block (not biography) | Task 7 |
| Testimonials | Task 8 |
| CTA text flip | Task 8 |
| Footer | Task 8 |
| Projects page (case studies) | Task 11 |
| Blog page (founder articles) | Task 12 |
| Mobile responsive < 768px | Task 13 |
| Mobile burger menu | Task 13 (CSS in Task 3, JS in Task 3) |
| CSS design system variables | Task 2 |
| No framework, no bundler | All tasks |

All spec requirements are covered.

### Type / Class Consistency

- `.nav--scrolled` defined in CSS (Task 3) and toggled in JS (Task 3) ✓
- `.hero__word` + `.fade-out` defined in CSS (Task 4) and toggled in JS (Task 4) ✓
- `.service.active` defined in CSS (Task 5) and toggled in JS (Task 5) ✓
- `.project-card::before` uses `--mouse-x`/`--mouse-y` defined in CSS (Task 6) and set in JS (Task 6) ✓
- `.btn-flip__front`/`.btn-flip__back` defined in CSS (Task 8) and used in HTML (Task 8) ✓
- `.nav__mobile.open` defined in CSS (Task 3) and toggled in JS (Task 3) ✓
