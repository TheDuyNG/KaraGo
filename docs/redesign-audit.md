# KaraGo redesign audit

## Legacy assessment

### KEEP

- React, Vite, React Router, i18next, and the existing browser token/session concept.
- Core booking attributes: selected venue/service, room or table identifier, guest count, time, price, and status.
- Existing backend intent around `/api/auth/login`, `/api/auth/register`, `/api/auth/me`, and booking CRUD.
- VND as the commercial currency and Ho Chi Minh City venue data as useful product context.

### REFACTOR

- Direct page-level `fetch` calls into one API client, centralized endpoint definitions, and capability-oriented services.
- Backend fields such as `_id`, `tableNumber`, and raw response envelopes into stable frontend models through mappers.
- Language state into a Vietnamese-first i18n initialization using `karago.language` persistence.
- Booking selection handoff into route state and backend-ready request payload mapping.
- Authentication persistence into named KaraGo storage keys, with temporary reads/writes of old keys for backend compatibility.

### REPLACE

- The duplicated NOXH homepage and its custom cursor/particle implementation.
- Generic Ant Design booking, venue discovery, authentication, about, and admin surfaces.
- Table-centric booking UX with a room-first venue discovery and availability journey.
- Scattered raw colors and inline styles with semantic theme tokens shared by deliberate light and dark themes.
- Hardcoded interface strings with hierarchical Vietnamese and English translation resources.

### DELETE

- Old navbar, carousel, footer, marquee, Swiper cards, and their styling.
- Legacy `bookingsApi`, API config, protected admin route, and old page implementations after replacement.
- Ant Design, Tailwind, Day.js, Swiper, and marquee dependencies once no replacement referenced them.
- Obsolete venue JSON after extracting useful fields into frontend-domain mocks.

## Preserved business and API behavior

- Bearer token authentication and stored user roles remain supported at the API boundary.
- Login/register continue to expect a token plus user result.
- Bookings retain guests, time, price, and lifecycle status semantics.
- Mock entities use the same frontend models returned by real-response mappers.
- Booking validation enforces a valid date, Vietnamese phone number, room capacity, room minimum duration, and a six-hour maximum.
- Service code handles mock-versus-real operation; UI components do not branch on data source.

## Implemented migration plan

1. Establish configuration, theme, localization, formatting, API, mappers, services, and mocks.
2. Replace the application shell and implement home, discovery, room details, availability, booking, and confirmation.
3. Replace authentication, booking history, cancellation, about, error, loading, and empty states.
4. Remove legacy UI and dependencies, document the expected backend boundary, and verify lint/build.
