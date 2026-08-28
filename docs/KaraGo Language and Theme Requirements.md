# Language and Theme Requirements

KaraGo must support multiple languages and themes from the beginning of the redesign.

## Supported Languages

The application must support:

- Vietnamese
- English

Vietnamese should be treated as a primary product language, not a partial translation.

English must also be fully supported.

Do not hardcode user-facing text directly inside React components.

Bad:

```jsx
<h1>Đặt phòng karaoke</h1>
```

Prefer translation keys:

```jsx
<h1>{t("home.hero.title")}</h1>
```

Use a localization architecture such as:

```text
src/
├── i18n/
│   ├── index.js
│   ├── locales/
│   │   ├── vi.json
│   │   └── en.json
```

Example:

```json
{
  "home": {
    "hero": {
      "title": "Đặt phòng karaoke dễ dàng",
      "subtitle": "Tìm phòng phù hợp và đặt lịch chỉ trong vài phút"
    }
  }
}
```

English:

```json
{
  "home": {
    "hero": {
      "title": "Book your karaoke room easily",
      "subtitle": "Find the perfect room and book it in minutes"
    }
  }
}
```

Use clear hierarchical translation keys.

Prefer:

```text
booking.summary.title
booking.form.guestCount
room.details.capacity
navigation.home
common.cancel
common.confirm
```

Avoid vague keys such as:

```text
text1
label2
titleA
```

## Language Selector

Provide a clear language selector in an appropriate location such as the main navigation or settings menu.

Example options:

```text
VI
EN
```

or:

```text
Tiếng Việt
English
```

Persist the selected language.

Use local storage or another appropriate client-side persistence method.

The application should remember the user's language after refresh.

If no language preference has been saved, choose a sensible default.

Prefer Vietnamese as the initial default language unless project requirements specify otherwise.

Do not reload the entire application when the language changes.

## Localization Rules

All user-facing content should be translatable, including:

- Navigation
- Buttons
- Form labels
- Validation messages
- Empty states
- Error messages
- Booking statuses
- Room labels
- Date-related labels
- Confirmation messages
- Authentication screens
- Profile pages
- Notifications
- Dialogs
- Footer content

Avoid mixing Vietnamese and English in the same interface state.

Use locale-aware formatting for:

- Currency
- Dates
- Times
- Numbers

For Vietnamese, format currency appropriately for VND.

Example:

```text
250.000 ₫
```

Do not manually concatenate currency symbols throughout components.

Create reusable formatting utilities.

Example:

```js
formatCurrency
formatDate
formatTime
```

These utilities should respect the current locale.

---

# Theme Support

KaraGo must support:

- Dark mode
- Light mode

Dark mode is the default theme.

Light mode must be fully designed and supported.

Do not build only a dark UI and apply a simple color inversion for light mode.

Both themes should feel intentional and polished.

## Default Theme

When a user visits KaraGo for the first time:

```text
Default theme = Dark
```

Do not default to the operating system theme unless explicitly required later.

Once the user changes the theme, persist that preference.

Example:

```text
localStorage
```

The application should remember the theme across sessions.

## Theme Selector

Provide a theme toggle in the UI.

Possible states:

```text
Dark
Light
```

A simple sun/moon icon toggle is acceptable if accessible labels are provided.

Example:

```jsx
<button aria-label={t("theme.toggle")}>
  ...
</button>
```

## Theme Architecture

Do not scatter theme-specific conditional styles throughout components.

Bad:

```jsx
className={isDark ? "bg-black text-white" : "bg-white text-black"}
```

repeated everywhere.

Prefer a centralized theme system using:

- CSS variables
- design tokens
- theme classes
- the project's existing styling framework

Example:

```css
:root {
  --background: #ffffff;
  --surface: #f7f7f8;
  --text-primary: #111111;
  --text-secondary: #666666;
}

[data-theme="dark"] {
  --background: #0b0b0f;
  --surface: #15151c;
  --text-primary: #ffffff;
  --text-secondary: #a8a8b3;
}
```

Components should use semantic tokens:

```css
background: var(--background);
color: var(--text-primary);
```

Avoid raw colors repeated across the project.

## Design Tokens

Create reusable semantic tokens for at least:

```text
background
surface
surfaceElevated
textPrimary
textSecondary
textMuted
border
primary
primaryHover
danger
success
warning
overlay
shadow
```

The same semantic token may use different values in dark and light themes.

Components should not care which theme is active.

## Dark Mode Direction

Dark mode should feel premium and modern.

Avoid pure black everywhere.

Prefer layered surfaces with sufficient contrast.

Use:

- dark neutral backgrounds
- elevated surfaces
- subtle borders
- restrained accent colors
- strong typography contrast

Avoid excessive neon glow.

KaraGo can feel energetic without looking like a gaming dashboard.

## Light Mode Direction

Light mode should remain visually consistent with the KaraGo brand.

Use:

- clean neutral backgrounds
- clear surface separation
- readable typography
- restrained shadows
- consistent accent colors

Do not let the light theme feel like an unfinished fallback.

## Accessibility

Ensure sufficient contrast in both themes.

Check:

- body text
- secondary text
- disabled text
- buttons
- links
- input borders
- focus states
- selected states
- error messages

Interactive controls must remain clear in both themes.

## Theme Persistence

Use a centralized theme provider or hook.

Example architecture:

```text
src/
├── providers/
│   └── ThemeProvider.jsx
├── hooks/
│   └── useTheme.js
```

Example conceptual API:

```js
const {
  theme,
  setTheme,
  toggleTheme,
} = useTheme();
```

Do not duplicate theme state in multiple components.

---

# Language + Theme Settings

Keep language and theme settings separated conceptually.

Example:

```text
Language:
vi
en

Theme:
dark
light
```

Persist both preferences independently.

Example storage:

```text
karago.language
karago.theme
```

Do not store arbitrary UI preferences under unclear keys.

---

# Environment Support

Environment configuration may include default application settings.

Example:

```env
VITE_APP_NAME=KaraGo
VITE_DEFAULT_LANGUAGE=vi
VITE_DEFAULT_THEME=dark
```

Expose them through the centralized application configuration.

Example:

```js
export const appConfig = {
  appName: import.meta.env.VITE_APP_NAME ?? "KaraGo",
  defaultLanguage:
    import.meta.env.VITE_DEFAULT_LANGUAGE ?? "vi",
  defaultTheme:
    import.meta.env.VITE_DEFAULT_THEME ?? "dark",
};
```

Do not access these environment values directly throughout React components.

---

# Expected Result

After the redesign:

- All major pages support Vietnamese and English.
- Language switching works without reloading.
- The selected language persists after refresh.
- Dark mode is the default.
- Light mode is fully supported.
- Theme switching works immediately.
- The selected theme persists after refresh.
- Components use semantic design tokens.
- User-facing strings are not hardcoded throughout the application.
- Currency, dates, times, and numbers respect the active locale.
- Both themes look production-ready.