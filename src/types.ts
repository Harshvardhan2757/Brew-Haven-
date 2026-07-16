export type SeatingPreference = 'standard' | 'window-workspace' | 'garden-patio' | 'couch-corner';

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seating: SeatingPreference;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
  notes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'signatures' | 'espresso' | 'refreshers' | 'eats';
  tags: string[];
  image: string;
  isVeg?: boolean;
  isHighlyRecommended?: boolean;
  flavorProfile?: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  date: string;
  avatar: string;
}
