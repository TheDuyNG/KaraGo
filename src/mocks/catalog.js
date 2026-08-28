import suiteImage from '../assets/images/karaoke-suite.png'

const neonRoomImage = '/0070ffcde6521052fada0d648ed9dc14.jpg'

export const mockVenues = [
  {
    id: 'venue-saigon-echo',
    name: 'KaraGo Nguyễn Huệ',
    address: '42 Nguyễn Huệ, Bến Nghé',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    rating: 4.9,
    reviewCount: 328,
    description: {
      vi: 'Không gian karaoke riêng tư giữa trung tâm thành phố, được tuyển chọn cho những buổi gặp gỡ đáng nhớ.',
      en: 'Private karaoke in the heart of the city, curated for nights worth remembering.',
    },
    image: suiteImage,
    roomIds: ['room-velvet', 'room-afterglow', 'room-grand-stage'],
    coordinates: { latitude: 10.7742, longitude: 106.7036 },
  },
  {
    id: 'venue-thao-dien-social',
    name: 'KaraGo Thảo Điền',
    address: '18 Xuân Thủy, Thảo Điền',
    district: 'TP. Thủ Đức',
    city: 'TP. Hồ Chí Minh',
    rating: 4.8,
    reviewCount: 214,
    description: {
      vi: 'Phòng hát phong cách và dịch vụ tinh tế trong khu phố sôi động nhất Thảo Điền.',
      en: 'Design-led rooms and thoughtful service in Thảo Điền’s most vibrant neighborhood.',
    },
    image: neonRoomImage,
    roomIds: ['room-neon-loft', 'room-cassette'],
    coordinates: { latitude: 10.8034, longitude: 106.7334 },
  },
]

export const mockRooms = [
  {
    id: 'room-velvet', venueId: 'venue-saigon-echo',
    name: { vi: 'Velvet No. 8', en: 'Velvet No. 8' },
    description: { vi: 'Không gian ấm áp cho nhóm bạn thân, với sofa nhung ôm trọn căn phòng và hệ âm thanh cân chỉnh riêng.', en: 'A warm, intimate suite with wraparound velvet seating and a finely tuned sound system.' },
    capacity: 8, sizeSquareMeters: 32, pricePerHour: 480000, minimumHours: 2,
    images: [suiteImage], amenities: ['dolby', 'wirelessMics', 'songLibrary', 'welcomeDrinks'], isPopular: true,
  },
  {
    id: 'room-afterglow', venueId: 'venue-saigon-echo',
    name: { vi: 'Afterglow', en: 'Afterglow' },
    description: { vi: 'Phòng tiệc hiện đại cho hội bạn thích không khí sôi động nhưng vẫn riêng tư.', en: 'A contemporary party suite for groups who want energy without giving up privacy.' },
    capacity: 14, sizeSquareMeters: 48, pricePerHour: 720000, minimumHours: 2,
    images: [neonRoomImage], amenities: ['dolby', 'wirelessMics', 'ambientLights', 'miniBar'], isPopular: true,
  },
  {
    id: 'room-grand-stage', venueId: 'venue-saigon-echo',
    name: { vi: 'Grand Stage', en: 'Grand Stage' },
    description: { vi: 'Sân khấu riêng, màn hình lớn và không gian rộng cho sinh nhật hoặc buổi tiệc công ty.', en: 'A private stage, cinematic screen, and generous space for birthdays or team celebrations.' },
    capacity: 24, sizeSquareMeters: 76, pricePerHour: 1180000, minimumHours: 3,
    images: [suiteImage], amenities: ['stage', 'dolby', 'wirelessMics', 'eventHost', 'miniBar'], isPopular: false,
  },
  {
    id: 'room-neon-loft', venueId: 'venue-thao-dien-social',
    name: { vi: 'Neon Loft', en: 'Neon Loft' },
    description: { vi: 'Phòng gác lửng cá tính, ánh sáng tùy chỉnh và danh sách bài hát mới được cập nhật hằng tuần.', en: 'A characterful loft with customizable lighting and a song library refreshed every week.' },
    capacity: 12, sizeSquareMeters: 44, pricePerHour: 650000, minimumHours: 2,
    images: [neonRoomImage], amenities: ['ambientLights', 'wirelessMics', 'songLibrary', 'miniBar'], isPopular: true,
  },
  {
    id: 'room-cassette', venueId: 'venue-thao-dien-social',
    name: { vi: 'Cassette Club', en: 'Cassette Club' },
    description: { vi: 'Thiết kế hoài cổ với âm thanh hiện đại cho một đêm hát thật khác biệt.', en: 'Retro-minded design meets modern sound for a night with a different rhythm.' },
    capacity: 6, sizeSquareMeters: 27, pricePerHour: 390000, minimumHours: 2,
    images: [suiteImage], amenities: ['wirelessMics', 'songLibrary', 'welcomeDrinks'], isPopular: false,
  },
]

export const mockAvailability = ['18:00', '19:00', '20:30', '21:30', '22:30']
