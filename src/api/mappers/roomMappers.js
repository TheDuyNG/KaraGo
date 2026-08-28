export const mapRoomResponse = (room) => ({
  id: String(room.room_id ?? room.id),
  venueId: String(room.venue_id ?? room.venueId),
  name: room.room_name ?? room.name,
  description: room.description ?? '',
  capacity: Number(room.max_capacity ?? room.capacity ?? 0),
  sizeSquareMeters: Number(room.size_square_meters ?? room.sizeSquareMeters ?? 0),
  pricePerHour: Number(room.price_per_hour ?? room.pricePerHour ?? 0),
  minimumHours: Number(room.minimum_hours ?? room.minimumHours ?? 1),
  images: room.images ?? [],
  amenities: room.amenities ?? [],
  isPopular: Boolean(room.is_popular ?? room.isPopular),
})

export const mapVenueResponse = (venue) => ({
  id: String(venue.venue_id ?? venue.id),
  name: venue.venue_name ?? venue.name,
  address: venue.address,
  district: venue.district,
  city: venue.city,
  rating: Number(venue.rating ?? 0),
  reviewCount: Number(venue.review_count ?? venue.reviewCount ?? 0),
  description: venue.description ?? '',
  image: venue.cover_image_url ?? venue.image,
  roomIds: (venue.room_ids ?? venue.roomIds ?? []).map(String),
  coordinates: venue.coordinates ?? null,
})
