# KaraGo Web

Premium, responsive karaoke-room discovery and booking frontend built with React and Vite.

## Local development

```bash
npm install
npm run dev
```

Local development uses `http://localhost:5000` through the centralized `VITE_API_BASE_URL` setting. Set `VITE_USE_MOCK_API=true` in a local override only when the backend is unavailable.

Production uses `https://api.dtech.io.vn`. Configure the following Vercel Production environment variable (the committed production file provides the same build-time default):

```text
VITE_API_BASE_URL=https://api.dtech.io.vn
```

## Quality checks

```bash
npm run lint
npm run build
```

Preferences are stored independently under `karago.language` and `karago.theme`. Vietnamese and dark mode are the initial defaults.
