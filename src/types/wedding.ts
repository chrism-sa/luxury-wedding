export interface PersonProfile {
  nickname: string;
  fullName: string;
  parents: string;
  bio: string;
  photo: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  venue: string;
  address: string;
}

export interface LoveStoryItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

export interface GiftAccount {
  bank: string;
  accountHolder: string;
  accountNumber: string;
}

export interface GuestWish {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
}

export interface WeddingConfig {
  couple: {
    groom: PersonProfile;
    bride: PersonProfile;
  };
  weddingDate: string; // ISO 8601 with timezone
  displayDate: string;
  tagline: string;
  heroImage: string;
  coverImage: string;
  events: EventItem[];
  loveStory: LoveStoryItem[];
  gallery: GalleryItem[];
  rsvp: {
    mode: 'whatsapp' | 'local-preview';
    whatsappNumber: string; // Gunakan format 628xxx atau kosongkan jika belum ada
  };
  gift: {
    enabled: boolean;
    accounts: GiftAccount[];
  };
  staticWishes: GuestWish[];
  music: {
    enabled: boolean;
    src: string;
    title: string;
  };
}