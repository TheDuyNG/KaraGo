# KaraGo Redesign Agent Prompt

You are working on the `redesign` branch of **KaraGo**, a karaoke room booking web application.

The current branch was created from the old frontend source code.

Your task is to perform a **major frontend redesign**.

The old UI does not need to be preserved.

You may remove, replace, restructure, or rewrite old frontend code when necessary.

However, do not delete useful business logic blindly.

Before removing existing code, inspect it and identify anything related to:

- API mappings
- Request payloads
- Response models
- Data transformation
- Booking logic
- Authentication logic
- Route parameters
- Business rules
- Constants
- Validation
- Reusable utilities

The final result should be a clean new frontend architecture designed for the future KaraGo backend.

---

# Primary Goal

Rebuild KaraGo into a modern, premium, production-quality karaoke booking web application.

The redesign should focus on:

- Beautiful UI
- Modern UX
- Clean React architecture
- Reusable components
- Clear code
- Consistent naming
- Maintainability
- Responsive design
- Future backend integration
- Clear API contracts

The final source should feel like a completely redesigned product rather than a visual patch applied over the old application.

---

# Important Branch Rule

You are working on:

```text
redesign
```

The old frontend source exists only as a reference.

Do not try to maintain two UI implementations.

When a new implementation successfully replaces an old implementation:

```text
remove the obsolete implementation
```

Do not keep files such as:

```text
OldHome.jsx
HomeNew.jsx
HomeV2.jsx
HomeRedesign.jsx
RoomCardOld.jsx
RoomCardNew.jsx
```

The final project should contain only the intended architecture.

Prefer:

```text
HomePage.jsx
RoomCard.jsx
RoomDetailsPage.jsx
```

Delete unused:

- Components
- CSS
- Assets
- Utilities
- Routes
- Hooks
- Dependencies
- Legacy files

after confirming they are no longer required.

Do not leave commented-out legacy code.

Git already preserves history.

---

# Before Removing Old Code

Always inspect the old implementation first.

Determine whether it contains important:

- API endpoints
- Request objects
- Response mappings
- Business logic
- Validation
- Data formatting
- Authentication behavior
- Booking rules

Extract useful logic before deleting obsolete UI code.

The redesign may completely replace the UI while preserving important application behavior.

---

# Backend Status

The KaraGo backend is not finished yet.

I will build the backend later.

Therefore, the frontend architecture must be designed so that the real backend can be connected later without rewriting UI components.

Do not tightly couple components to temporary/mock data.

---

# API Architecture

Create a clear API layer.

Prefer an architecture similar to:

```text
src/
├── api/
│   ├── client.js
│   ├── endpoints.js
│   └── mappers/
│
├── services/
│   ├── authService.js
│   ├── bookingService.js
│   ├── roomService.js
│   ├── locationService.js
│   └── userService.js
│
├── mocks/
│   ├── rooms.mock.js
│   ├── bookings.mock.js
│   └── users.mock.js
│
└── types/
```

Adjust the structure if TypeScript or the existing project architecture requires something different.

---

# API Client

Use one centralized API client.

For example:

```js
const apiClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
});
```

or use the project's existing HTTP library.

Do not create API requests directly inside page components.

Bad:

```js
const response = await fetch(
  "http://localhost:5000/api/rooms"
);
```

inside:

```text
RoomPage.jsx
```

Prefer:

```js
const rooms = await roomService.getRooms();
```

---

# API Endpoint Mapping

Keep API endpoints centralized.

Example:

```js
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },

  ROOMS: {
    LIST: "/rooms",
    DETAILS: (roomId) => `/rooms/${roomId}`,
    AVAILABILITY: (roomId) =>
      `/rooms/${roomId}/availability`,
  },

  BOOKINGS: {
    CREATE: "/bookings",
    DETAILS: (bookingId) =>
      `/bookings/${bookingId}`,
    MY_BOOKINGS: "/bookings/me",
  },
};
```

Do not scatter endpoint strings throughout the project.

---

# API Service Mapping

Create services representing backend capabilities.

Example:

```js
export const roomService = {
  getRooms,
  getRoomById,
  getRoomAvailability,
};

export const bookingService = {
  createBooking,
  getBooking,
  getMyBookings,
  cancelBooking,
};
```

The UI should interact with services rather than HTTP implementation details.

---

# API Data Mapping

Separate backend data from UI models when useful.

For example, the backend may eventually return:

```json
{
  "room_id": 101,
  "room_name": "Galaxy Room",
  "price_per_hour": 250000,
  "max_capacity": 12
}
```

The UI may use:

```js
{
  id: 101,
  name: "Galaxy Room",
  pricePerHour: 250000,
  maxCapacity: 12,
}
```

Use a mapper:

```js
export const mapRoomResponse = (room) => ({
  id: room.room_id,
  name: room.room_name,
  pricePerHour: room.price_per_hour,
  maxCapacity: room.max_capacity,
});
```

This prevents backend naming conventions from leaking throughout the React application.

When backend contracts change later, update the mapper rather than rewriting UI components.

---

# Request Mapping

Request payloads should also be mapped explicitly.

Example frontend model:

```js
const bookingForm = {
  roomId,
  bookingDate,
  startTime,
  durationHours,
  guestCount,
};
```

Possible API payload:

```js
{
  room_id: bookingForm.roomId,
  booking_date: bookingForm.bookingDate,
  start_time: bookingForm.startTime,
  duration_hours: bookingForm.durationHours,
  guest_count: bookingForm.guestCount,
}
```

Use request mappers when necessary.

Example:

```js
export const mapCreateBookingRequest = (booking) => ({
  room_id: booking.roomId,
  booking_date: booking.bookingDate,
  start_time: booking.startTime,
  duration_hours: booking.durationHours,
  guest_count: booking.guestCount,
});
```

---

# Future Backend Compatibility

Because the backend will be created later, define clean frontend contracts now.

For major entities, define expected models.

At minimum:

```text
User
KaraokeVenue
KaraokeRoom
RoomImage
RoomAmenity
RoomAvailability
Booking
BookingStatus
Payment
Location
Promotion
```

Keep these models consistent throughout the frontend.

If TypeScript is available, prefer interfaces/types.

Example:

```ts
export interface KaraokeRoom {
  id: string;
  name: string;
  description: string;
  capacity: number;
  pricePerHour: number;
  images: string[];
  amenities: RoomAmenity[];
}
```

---

# Mock Data Strategy

Until the backend exists, use realistic mock data.

Mock data must use the same frontend models that real API responses will eventually map into.

For example:

```js
export const mockRooms = [
  {
    id: "room-001",
    name: "Neon Galaxy",
    description: "Premium karaoke room",
    capacity: 10,
    pricePerHour: 250000,
  },
];
```

UI components should not know whether data came from:

```text
Mock Data
or
Real Backend
```

The service layer should handle that difference.

---

# Optional Mock Mode

Support an environment value such as:

```env
VITE_USE_MOCK_API=true
```

Then expose:

```js
export const appConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  useMockApi:
    import.meta.env.VITE_USE_MOCK_API === "true",
};
```

Services can temporarily return mocks when the backend is unavailable.

Example concept:

```js
const getRooms = async () => {
  if (appConfig.useMockApi) {
    return mockRooms;
  }

  const response = await apiClient.get(
    API_ENDPOINTS.ROOMS.LIST
  );

  return response.data.map(mapRoomResponse);
};
```

This allows development before the backend exists.

When the backend is ready:

```env
VITE_USE_MOCK_API=false
```

The UI should continue working without significant changes.

---

# Environment Files

Create appropriate environment files.

Prefer:

```text
.env.development
.env.production
.env.example
```

Example:

```env
VITE_APP_NAME=KaraGo
VITE_API_BASE_URL=http://localhost:5000/api
VITE_USE_MOCK_API=true
```

Production:

```env
VITE_APP_NAME=KaraGo
VITE_API_BASE_URL=https://api.karago.example/api
VITE_USE_MOCK_API=false
```

Do not commit secrets.

Do not put:

- passwords
- API secrets
- private keys
- database credentials

inside frontend environment files.

Remember that Vite variables beginning with:

```text
VITE_
```

are available in the browser.

---

# Environment Configuration

Create one centralized application configuration.

Example:

```js
export const appConfig = {
  appName:
    import.meta.env.VITE_APP_NAME ?? "KaraGo",

  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL,

  useMockApi:
    import.meta.env.VITE_USE_MOCK_API === "true",

  environment:
    import.meta.env.MODE,
};
```

Avoid accessing:

```js
import.meta.env
```

throughout random components.

---

# Frontend Architecture

Prefer a feature-oriented architecture.

Example:

```text
src/
├── api/
├── assets/
├── components/
│   ├── common/
│   ├── layout/
│   └── ui/
│
├── config/
├── constants/
│
├── features/
│   ├── auth/
│   ├── booking/
│   ├── rooms/
│   ├── venues/
│   └── profile/
│
├── hooks/
├── layouts/
├── mocks/
├── pages/
├── routes/
├── services/
├── styles/
├── types/
└── utils/
```

Do not follow this structure mechanically.

Adapt it intelligently to the project.

---

# React Component Rules

Use reusable React components where reuse provides value.

Examples:

```text
Button
Input
Modal
Badge
Section
Container
PageHeader
LoadingState
ErrorState
EmptyState

VenueCard
RoomCard
RoomGallery
RoomAmenities
RoomFilters

BookingCalendar
TimeSlotPicker
GuestSelector
BookingSummary
```

Avoid giant page components.

A page should mainly compose features and components.

---

# Avoid Overengineering

Do not create abstractions just because they are possible.

Do not create:

```text
BaseAbstractRoomFactory
GenericUniversalComponent
GlobalEverythingContext
```

for simple problems.

Use the simplest architecture that remains scalable and understandable.

---

# Naming Rules

Use descriptive variables.

Bad:

```js
const d = response.data;
const x = rooms.filter(...);
const temp = {};
```

Good:

```js
const roomResponse = response.data;

const availableRooms = rooms.filter(...);

const bookingPayload = {};
```

---

# Boolean Naming

Prefer:

```js
isLoading
isSubmitting
isAuthenticated
isAvailable
isSelected
hasError
hasActiveBooking
canBook
shouldShowModal
```

---

# Function Naming

Use clear action names.

Prefer:

```js
getAvailableRooms
calculateBookingTotal
mapRoomResponse
createBooking
validateBookingForm

handleRoomSelect
handleDateChange
handleBookingSubmit
handleDialogClose
```

Avoid:

```js
doSomething
process
handleData
fn
func
test
temp
```

---

# Function Design

Functions should normally have one clear responsibility.

Prefer early returns when they improve readability.

Avoid deeply nested code.

Bad:

```js
if (...) {
  if (...) {
    if (...) {
      if (...) {
      }
    }
  }
}
```

Prefer clear guards and extracted functions.

---

# Comments

Do not comment obvious code.

Bad:

```js
// Set loading
setIsLoading(true);
```

Comments should explain:

```text
WHY
```

not simply:

```text
WHAT
```

Use comments for:

- Business rules
- Important architecture choices
- Workarounds
- Non-obvious behavior
- Backend contract assumptions

---

# UI Design Direction

KaraGo should feel:

- Premium
- Modern
- Energetic
- Entertainment-focused
- Music-inspired
- Social
- Stylish

Avoid making it look like:

- Generic admin software
- Bootstrap demo
- Tutorial project
- Enterprise ERP dashboard

Think closer to a modern consumer booking application.

---

# Visual Language

Use:

- Strong typography
- Intentional whitespace
- Modern cards
- Large imagery
- Clear hierarchy
- Premium room photography
- Subtle gradients when appropriate
- Smooth hover states
- Tasteful animation
- Clear CTA buttons
- Consistent border radius
- Consistent shadows
- Consistent spacing

Avoid excessive:

- Neon effects
- Glow
- Gradients
- Glassmorphism
- Animation

Karaoke branding can be energetic without becoming visually chaotic.

---

# Responsive Design

The redesign must support:

```text
Mobile
Tablet
Laptop
Desktop
```

Mobile must be treated as a first-class experience.

Pay particular attention to:

- Navigation
- Search
- Room cards
- Filters
- Booking calendar
- Time slot selection
- Dialogs
- Booking summary
- Checkout
- Image galleries

---

# Primary Booking Journey

Design the application around this flow:

```text
Home
  ↓
Discover Venues / Rooms
  ↓
Room Details
  ↓
Choose Date
  ↓
Choose Available Time
  ↓
Choose Duration
  ↓
Guest Count
  ↓
Booking Summary
  ↓
Confirm Booking
```

Keep this journey simple and obvious.

---

# Suggested Pages

Prioritize:

```text
Home
Venue Search
Venue Details
Room Details
Booking
Booking Confirmation

Login
Register

Profile
My Bookings
Booking Details
```

Future features may include:

```text
Favorites
Reviews
Promotions
Online Payment
Membership
Notifications
```

Design the architecture so these can be added later without major restructuring.

---

# Loading and Error States

Every asynchronous feature should consider:

```text
Loading
Success
Empty
Error
```

Do not allow API failures to produce blank pages.

Create reusable states such as:

```text
LoadingState
ErrorState
EmptyState
```

---

# Booking Error Scenarios

Prepare UX for cases such as:

```text
Room unavailable
Time slot already booked
Invalid date
Invalid guest count
Booking creation failed
Network error
Booking expired
```

Even if the backend is not available yet, the frontend architecture should anticipate them.

---

# Forms

Forms should have:

- Clear labels
- Validation
- Helpful error messages
- Loading state
- Disabled states
- Duplicate-submit prevention
- Keyboard accessibility

---

# Accessibility

Use semantic HTML.

Use:

```html
<button>
<nav>
<main>
<section>
<form>
<label>
```

appropriately.

Do not use:

```html
<div onclick="...">
```

as a replacement for buttons.

Interactive controls should work with a keyboard.

Provide visible focus states.

---

# Performance

Avoid unnecessary:

- rerenders
- useEffect
- state
- dependencies
- huge bundles

Use lazy loading where beneficial.

Optimize images.

Do not introduce a large dependency for something that can be implemented cleanly with the existing stack.

---

# Dependency Rules

Before installing a dependency:

1. Check whether the project already has an equivalent.
2. Determine whether the dependency provides meaningful value.
3. Avoid duplicate UI libraries.
4. Avoid unnecessary utility libraries.

Remove unused dependencies after the redesign.

---

# Migration Strategy

Because this is the `redesign` branch, aggressive cleanup is allowed.

Use this process:

## Phase 1 — Audit

Inspect:

- Existing structure
- Existing pages
- Existing routes
- Components
- Hooks
- API code
- Models
- Environment configuration
- Styling
- Dependencies
- Existing business logic

Identify what should be:

```text
KEEP
REFACTOR
REPLACE
DELETE
```

## Phase 2 — Foundation

Build:

- Application configuration
- API client
- Endpoint mapping
- Service layer
- API mappers
- Mock layer
- Design tokens
- Shared UI components
- Application layout

## Phase 3 — Core UX

Implement:

```text
Home
Room discovery
Room details
Booking flow
```

## Phase 4 — Account UX

Implement:

```text
Authentication UI
Profile
Booking history
```

## Phase 5 — Cleanup

Remove obsolete:

- UI code
- Styles
- Components
- Assets
- Routes
- Dependencies
- Utility functions

Run the project and ensure no imports reference deleted legacy files.

---

# Important Cleanup Rule

Once functionality has been migrated successfully:

```text
DELETE THE OLD IMPLEMENTATION
```

Do not preserve legacy UI "just in case."

Git history already preserves it.

The final `redesign` branch should represent the new KaraGo architecture clearly.

---

# API Documentation

Since the backend will be built later, create documentation describing the frontend's expected API contracts.

Create something similar to:

```text
docs/api-contract.md
```

Document expected endpoints such as:

```text
GET    /rooms
GET    /rooms/:roomId
GET    /rooms/:roomId/availability

POST   /bookings
GET    /bookings/:bookingId
GET    /bookings/me
PATCH  /bookings/:bookingId/cancel

POST   /auth/login
POST   /auth/register

GET    /users/me
```

These endpoints are proposals until the backend is finalized.

Document:

- Request shape
- Response shape
- Required fields
- Optional fields
- Expected error cases

This document will become a reference when implementing the backend.

---

# Backend-Friendly Principle

The frontend should define what information it needs.

Do not unnecessarily design the backend inside the React project.

Keep the boundary:

```text
React UI
   ↓
Feature / Hook
   ↓
Service
   ↓
Mapper
   ↓
API Client
   ↓
Backend
```

Components should not depend directly on backend field naming.

---

# Expected Final Quality

The redesigned KaraGo project should be:

```text
Beautiful
Modern
Responsive
Clean
Reusable
Maintainable
Backend-ready
Production-oriented
Easy to understand
```

Another developer should be able to inspect the project and quickly understand:

- Where UI components live
- Where API calls live
- Where API mappings live
- Where mock data lives
- Where environment settings live
- How bookings work
- How to connect the future backend

---

# First Action

Before changing code:

1. Audit the current source.
2. Inspect existing API-related code carefully.
3. Identify useful business logic.
4. Identify obsolete UI code.
5. Create a short migration plan.
6. Start building the new foundation.
7. Replace the old UI incrementally.
8. Delete old implementations after their replacements are working.

Do not attempt to preserve the old visual design.

The `redesign` branch exists specifically to create the new KaraGo experience.