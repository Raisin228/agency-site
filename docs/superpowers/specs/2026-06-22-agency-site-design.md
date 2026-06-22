# Agency Site — Design Spec
**Date:** 2026-06-22  
**Status:** Approved

---

## 1. Контекст и цель

Личный бренд-сайт / micro-agency landing page для Богдана (20 лет, разработчик AI-агентских систем, Python backend, Ярославль → Москва, 2 года в найме, движется в сторону предпринимательства).

**Цель:** привлечение потенциальных клиентов на разработку и консалтинг. Клиент заходит — видит человека, проекты, опыт — пишет в Telegram или email.

**Этап:** wireframe с заглушками. Контент будет заполнен позже. Название бренда TBD.

---

## 2. Референс и принципы

**Референс:** galt.agency — минимализм, много воздуха, крупная типографика, чёткая структура.  
**Отличие от референса:** это личный бренд, не агентство. Упор на человека, не на команду.

**Принципы дизайна:**
- Белый фон, чёрный текст, много пространства
- Красота в деталях: едва заметные микро-анимации, не перегружать
- Контент-первый: анимации поддерживают, не отвлекают
- Всё на заглушках сейчас — структура должна легко наполняться

---

## 3. Стек

| Компонент | Решение |
|-----------|---------|
| Разметка | HTML5 (семантическая) |
| Стили | CSS3 (custom properties, без фреймворков) |
| Анимации | Vanilla JS + CSS transitions/transforms |
| Деплой | GitHub Pages (прямая раздача статики) |
| Сборщик | Нет |
| Зависимости | Нет |

---

## 4. Структура файлов

```
agency-site/
├── index.html
├── projects.html
├── about.html
├── styles/
│   ├── main.css          # переменные, сброс, типографика, сетка
│   ├── animations.css    # все микро-взаимодействия
│   └── components.css    # nav, footer, карточки, кнопки
└── js/
    ├── cursor.js         # cursor glow эффект
    └── animations.js     # счётчики, text flip, hover reveals, IntersectionObserver
```

---

## 5. Страницы

| Страница | Файл | Назначение |
|----------|------|------------|
| Главная | `index.html` | Hero + Projects preview + Services + About + Testimonials + CTA |
| Проекты | `projects.html` | Полная сетка кейсов с описаниями |
| О себе | `about.html` | Расширенная версия About-блока |

---

## 6. Главная страница — секции

### 6.1 Nav
```
[LOGO / NAME TBD]      Projects  About      [→ Get in touch]
```
- Логотип / имя слева
- Ссылки по центру
- CTA-кнопка справа (outlined, hover: fill)
- При скролле: лёгкое `backdrop-filter: blur` + тонкая нижняя граница
- Ссылки: animated underline при hover (CSS `width: 0 → 100%`, `transition: 0.3s`)

### 6.2 Hero
```
Building          [подзаголовок-заглушка, 1-2 строки]
Automating
Thinking

[→ Get in touch]
```
- Левая колонка: слова меняются автоматически (JS fade/slide: Building → Automating → Thinking → ...)
- Правая колонка: подзаголовок + CTA
- Крупный шрифт (`clamp(48px, 8vw, 120px)`), тонкий `font-weight: 300`
- Много воздуха снизу перед следующей секцией

### 6.3 Projects preview
```
Projects ─────────────────────────────── See all →

┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│                │  │                │  │                │
│   [image]      │  │   [image]      │  │   [image]      │
│                │  │                │  │                │
│ Project Name   │  │ Project Name   │  │ Project Name   │
│ Tag · Tag      │  │ Tag · Tag      │  │ Tag · Tag      │
└────────────────┘  └────────────────┘  └────────────────┘
```
- Сетка 3 колонки (на мобайле 1 колонка)
- **Cursor glow:** при движении мыши по карточке — радиальный градиент spotlight следует за курсором (JS `mousemove` → CSS custom property `--mouse-x`, `--mouse-y`)
- Hover: лёгкое затемнение изображения, тег выезжает
- Все данные — заглушки

### 6.4 What I do (Services)
```
┌──────────────────────────────────────────────────┐
│  AI Agents & Automation                    →     │
└──────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────┐
│  Backend Development                       →     │  ← hover: цветная
└──────────────────────────────────────────────────┘    обводка + описание
┌──────────────────────────────────────────────────┐    выезжает вниз
│  Consulting                                →     │
└──────────────────────────────────────────────────┘
```
- Accordion-стиль: каждая строка — кликабельный блок
- Hover: цветная обводка (акцент `#2563EB`) появляется + краткое описание плавно выезжает снизу (`max-height: 0 → auto`)
- Стрелка `→` вращается на `↓` при раскрытии

### 6.5 About / Trust
```
┌──────────────┐   [Name TBD]
│              │
│              │   [Bio placeholder · 2-3 строки]
│   [фото]     │
│              │   tg · linkedin · email
│              │
└──────────────┘

        2           8+          3          20
        █           █           █          █
        ██          ██          ██         ██
        ███         █████       ███        █████
       ─────       ─────       ─────      ─────
       года        проектов    стека      лет
       опыта
```
- Верх: фото слева (portrait, квадрат с `border-radius: 12px`), текст справа
- Низ: 4 столбца-гистограммы
- **Анимация гистограмм:** срабатывает при попадании секции в viewport (`IntersectionObserver`)
  - Столбцы: `transform: scaleY(0) → scaleY(1)`, `transform-origin: bottom`, `easeOut 1.2s`
  - Цифры: JS-счётчик `0 → target` через `requestAnimationFrame`, та же длительность
  - Высота столбцов пропорциональна значениям относительно максимума
- Цвет столбцов: акцент `#2563EB` с небольшой прозрачностью

### 6.6 Testimonials
```
"Placeholder testimonial text, 1-2 sentences describing the work."
— Name Surname, Role at Company Name

"Another testimonial placeholder text here, similar length."
— Name Surname, Role at Company Name
```
- Простой список, без карусели
- Кавычки крупным шрифтом, серый цвет
- Имя/роль: небольшой, серый

### 6.7 CTA
```
Ready to start?
Let's talk.

[→ Telegram]          [→ Email]
```
- Крупный заголовок, минимум элементов
- Две кнопки рядом: одна filled, одна outlined
- **Text flip на кнопках:** при hover текст "переворачивается" по оси X (CSS `perspective` + `rotateX`)

### 6.8 Footer
```
[NAME TBD]                    tg · linkedin · email
© 2026
```
- Одна строка, тонкая верхняя граница
- Соцсети: hover — animated underline

---

## 7. Микро-взаимодействия (полный список)

| Эффект | Где | Механика |
|--------|-----|----------|
| Cursor glow | Project cards | JS `mousemove` → CSS `radial-gradient` via custom properties |
| Hover border | Service blocks | CSS `border-color` transition + `box-shadow` |
| Text flip | CTA кнопки | CSS `transform: rotateX(90deg)` + `perspective` |
| Hover reveal | Service description | CSS `max-height: 0 → 120px`, `opacity: 0 → 1` |
| Animated underline | Nav links, footer links | CSS `::after` pseudo, `width: 0 → 100%` |
| Histogram + counter | About stats | `IntersectionObserver` + `requestAnimationFrame` |
| Word rotate | Hero heading | JS interval + CSS `opacity` + `translateY` |
| Nav blur | Nav on scroll | JS `scroll` event + CSS `backdrop-filter` |

---

## 8. Дизайн-система

```css
/* Цвета */
--color-bg:      #FFFFFF;
--color-text:    #0A0A0A;
--color-muted:   #6B7280;
--color-accent:  #2563EB;
--color-border:  #E5E7EB;

/* Типографика */
--font-sans: 'Inter', system-ui, sans-serif;
--text-hero: clamp(48px, 8vw, 120px);
--text-h2:   clamp(28px, 4vw, 48px);
--text-body: 16px;
--weight-light:  300;
--weight-normal: 400;
--weight-medium: 500;

/* Отступы */
--section-gap:  120px;
--container:    1200px;
```

---

## 9. Адаптивность

| Breakpoint | Изменения |
|------------|-----------|
| < 768px | Project cards → 1 колонка; About → фото сверху, текст снизу; гистограммы уменьшаются |
| < 480px | Hero font уменьшается; Nav → бургер-меню |

---

## 10. Что НЕ входит в скоуп

- Тёмная тема
- CMS или бэкенд
- Блог / статьи (можно добавить позже)
- Форма обратной связи (только ссылки на tg/email)
- Авторизация, база данных

---

## 11. Открытые вопросы (TBD)

- Название бренда / логотип
- Реальные фото автора
- Реальные кейсы и описания проектов
- Акцентный цвет (сейчас `#2563EB` как у Galt — можно поменять)
- Реальные отзывы
- Домен
