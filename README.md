# KaraGo Web

Premium, responsive karaoke-room discovery and booking frontend built with React and Vite.

## Local development

```bash
npm install
npm run dev
```

The backend is not available yet, so development and production builds currently use the mock service layer. Copy `.env.example` when you need local overrides. Set `VITE_USE_MOCK_API=false` when connecting the proposed backend contract documented in `docs/api-contract.md`.

## Quality checks

```bash
npm run lint
npm run build
```

Preferences are stored independently under `karago.language` and `karago.theme`. Vietnamese and dark mode are the initial defaults.
