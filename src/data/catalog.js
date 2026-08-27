export const rooms = [
  {
    id: 'studio',
    nameKey: 'rooms.studio.name',
    descriptionKey: 'rooms.studio.description',
    capacity: 6,
    price: 320000,
    size: 24,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1524777313293-86d2ab467344?auto=format&fit=crop&w=1200&q=82',
    features: ['features.dolbySound', 'features.display4k', 'features.welcomeDrinks'],
  },
  {
    id: 'signature',
    nameKey: 'rooms.signature.name',
    descriptionKey: 'rooms.signature.description',
    capacity: 12,
    price: 590000,
    size: 42,
    rating: 4.9,
    popular: true,
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=82',
    features: ['features.premiumSound', 'features.privateBar', 'features.stageLighting'],
  },
  {
    id: 'grand',
    nameKey: 'rooms.grand.name',
    descriptionKey: 'rooms.grand.description',
    capacity: 20,
    price: 890000,
    size: 68,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1578736641330-3155e606cd40?auto=format&fit=crop&w=1200&q=82',
    features: ['features.concertSound', 'features.danceFloor', 'features.dedicatedHost'],
  },
  {
    id: 'celebration',
    nameKey: 'rooms.celebration.name',
    descriptionKey: 'rooms.celebration.description',
    capacity: 30,
    price: 1290000,
    size: 96,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=82',
    features: ['features.liveStage', 'features.eventSetup', 'features.photoBackdrop'],
  },
]

export const timeSlots = ['18:00', '19:30', '21:00', '22:30']

export const testimonials = [
  { name: 'Minh Anh', roleKey: 'home.birthdayHost', quoteKey: 'home.testimonialOne', initials: 'MA' },
  { name: 'Daniel Lee', roleKey: 'home.weekendRegular', quoteKey: 'home.testimonialTwo', initials: 'DL' },
  { name: 'Ngoc Han', roleKey: 'home.eventPlanner', quoteKey: 'home.testimonialThree', initials: 'NH' },
]

export const galleryImages = [
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=900&q=80',
]
