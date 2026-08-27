# Booking Nhanh

A complete bilingual booking experience for premium private karaoke rooms. The application includes the customer website, a three-step booking flow, local authentication, customer booking history, and an operations dashboard.

## Run locally

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
```

## Demo admin account

- Email: `admin@bookingnhanh.vn`
- Password: `Admin@123`

## Features

- English and Vietnamese with English as the default language
- Persistent light and dark modes with system-theme detection
- Responsive two-level navigation inspired by the provided reference
- Room discovery, capacity filters, sorting, and availability control
- Validated multi-step booking with duplicate-slot prevention
- Registration, login, protected customer account, and cancellation requests
- Protected admin dashboard with booking status management, room controls, customer list, metrics, and CSV export
- Browser-persistent demo data through a dedicated storage service

## Architecture note

This repository is currently frontend-only. Authentication and operational data are stored in `localStorage` so every workflow can be demonstrated without a separate server. For production, replace `src/services/localStore.js` with authenticated API calls and never store passwords in browser storage.
