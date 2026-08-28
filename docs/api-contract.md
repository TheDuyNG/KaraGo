# KaraGo proposed API contract

This is the frontend's expected boundary for the future backend. It is a proposal until backend implementation is finalized. JSON uses `snake_case`; API mappers convert it to frontend models.

## Conventions

- Base path: `/api`
- Media type: `application/json`
- Authenticated calls: `Authorization: Bearer <token>`
- Identifiers are opaque strings.
- Dates use `YYYY-MM-DD`; times use local `HH:mm` in the venue timezone.
- Money is integer VND. Do not return formatted price strings.
- List responses use `{ "items": [], "meta": { "page": 1, "page_size": 20, "total": 0 } }`.
- Errors use `{ "code": "ROOM_UNAVAILABLE", "message": "...", "details": {} }`.

## Domain models

### User

Required: `user_id`, `name`, `email`, `role`. Optional: `phone`, `avatar_url`, `created_at`.

### KaraokeVenue

Required: `venue_id`, `venue_name`, `address`, `district`, `city`, `rating`, `review_count`, `description`, `cover_image_url`. Optional: `coordinates`, `phone`, `opening_hours`, `room_ids`.

### KaraokeRoom

Required: `room_id`, `venue_id`, `room_name`, `description`, `max_capacity`, `price_per_hour`, `minimum_hours`, `images`, `amenities`. Optional: `size_square_meters`, `is_popular`.

`images` contains `{ "image_id": "...", "url": "...", "alt": "...", "sort_order": 0 }`. `amenities` may initially be stable codes such as `dolby`, `wirelessMics`, `songLibrary`, `welcomeDrinks`, `ambientLights`, `miniBar`, `stage`, and `eventHost`.

### RoomAvailability

Required: `room_id`, `date`, `slots`. Each slot should eventually support `{ "start_time": "19:00", "is_available": true, "max_duration_hours": 4 }`; the frontend currently also accepts a string array.

### Booking

Required: `booking_id`, `booking_code`, `room_id`, `room_name`, `venue_name`, `booking_date`, `start_time`, `duration_hours`, `guest_count`, `customer_name`, `customer_phone`, `status`, `total_amount`, `created_at`. Optional: `special_requests`, `payment`.

Status values: `pending`, `confirmed`, `completed`, `cancelled`.

### Payment

Required when present: `payment_id`, `booking_id`, `amount`, `currency`, `status`. Optional: `method`, `paid_at`, `refunded_at`. Currency is `VND`; status values are `unpaid`, `deposit_paid`, `paid`, `refunded`.

### Location and Promotion

Location requires `city`, `district`, and `address`; coordinates are optional. Promotion requires `promotion_id`, `title`, `discount_type`, `discount_value`, `starts_at`, `ends_at`, and `is_active`; promo codes and eligibility constraints are optional.

## Authentication

### `POST /auth/login`

Request:

```json
{ "email": "minh@example.com", "password": "secret123" }
```

Response `200`: `{ "token": "...", "user": { "user_id": "...", "name": "Minh Anh", "email": "minh@example.com", "role": "customer" } }`

Errors: `400 VALIDATION_ERROR`, `401 INVALID_CREDENTIALS`, `429 RATE_LIMITED`.

### `POST /auth/register`

Request requires `name`, `email`, and `password`. Response `201` matches login. Errors: `400 VALIDATION_ERROR`, `409 EMAIL_ALREADY_EXISTS`.

### `GET /auth/me` and `GET /users/me`

Authenticated. Returns the current User. Errors: `401 UNAUTHORIZED`.

## Venues and rooms

### `GET /venues`

Optional query: `district`, `city`, `query`, `page`, `page_size`. Returns a venue list.

### `GET /venues/:venueId`

Returns one venue. Errors: `404 VENUE_NOT_FOUND`.

### `GET /rooms`

Optional query: `venue_id`, `booking_date`, `guest_count`, `query`, `page`, `page_size`. Returns rooms compatible with the supplied filters.

### `GET /rooms/:roomId`

Returns one room. Errors: `404 ROOM_NOT_FOUND`.

### `GET /rooms/:roomId/availability?date=YYYY-MM-DD`

Returns RoomAvailability. Errors: `400 INVALID_DATE`, `404 ROOM_NOT_FOUND`.

## Bookings

### `POST /bookings`

Authenticated or guest-session capable.

```json
{
  "room_id": "room-velvet",
  "booking_date": "2026-09-12",
  "start_time": "19:00",
  "duration_hours": 2,
  "guest_count": 6,
  "customer_name": "Minh Anh",
  "customer_phone": "0901234567",
  "special_requests": "Birthday setup"
}
```

Response `201`: Booking. The server is authoritative for availability, status, and `total_amount`.

Errors: `400 VALIDATION_ERROR`, `404 ROOM_NOT_FOUND`, `409 ROOM_UNAVAILABLE`, `409 SLOT_ALREADY_BOOKED`, `422 INVALID_GUEST_COUNT`, `422 INVALID_DURATION`, `503 BOOKING_CREATION_FAILED`.

### `GET /bookings/:bookingId`

Authenticated or authorized by a short-lived guest booking token. Returns Booking. Errors: `401 UNAUTHORIZED`, `403 FORBIDDEN`, `404 BOOKING_NOT_FOUND`, `410 BOOKING_EXPIRED`.

### `GET /bookings/me`

Authenticated. Optional `status`, `page`, and `page_size`. Returns bookings belonging to the current user.

### `PATCH /bookings/:bookingId/cancel`

Authenticated. No body required initially. Returns the cancelled Booking. Errors: `404 BOOKING_NOT_FOUND`, `409 BOOKING_NOT_CANCELLABLE`, `422 CANCELLATION_WINDOW_CLOSED`.

## Future endpoints

- `GET /promotions`
- `POST /bookings/:bookingId/payments`
- `GET /payments/:paymentId`
- `PATCH /users/me`

These are intentionally not consumed by the current UI. They should be specified when their product journeys are designed.
