import type { WeddingConfig } from '../types/wedding';

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      nickname: "Charis",
      fullName: "Charis Maulana S. A.",
      parents: "Putra dari Keluarga Bpk. ... & Ibu ...",
      bio: "Menyongsong babak baru kehidupan dengan penuh rasa syukur dan cinta kasih.",
      photo: "/images/groom.jpg",
    },
    bride: {
      nickname: "Sita",
      fullName: "Sita Maulidia A. Z.",
      parents: "Putri dari Keluarga Bpk. ... & Ibu ...",
      bio: "Berjalan bersama menuju masa depan, merajut bahagia dalam ikatan suci pernikahan.",
      photo: "/images/bride.jpg",
    },
  },

  weddingDate: "2026-12-12T08:00:00+07:00",
  displayDate: "Sabtu, 12 Desember 2026",
  tagline: "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepada-Nya.",
  heroImage: "/images/hero.jpg",
  coverImage: "/images/cover.jpg",

  events: [
    {
      id: "akad",
      title: "Akad Nikah",
      date: "2026-12-12",
      startTime: "08:00",
      endTime: "10:00",
      venue: "Kediaman Mempelai / Gedung Pilihan",
      address: "Malang, Jawa Timur",
    },
    {
      id: "reception",
      title: "Resepsi Pernikahan",
      date: "2026-12-12",
      startTime: "11:00",
      endTime: "14:00",
      venue: "Grand Ballroom Utama",
      address: "Malang, Jawa Timur",
    },
  ],

  loveStory: [
    {
      id: "1",
      date: "Awal Pertemuan",
      title: "Pertama Kali Berjumpa",
      description: "Takdir mempertemukan kami dalam sebuah kesempatan indah yang menumbuhkan rasa saling mengagumi.",
    },
    {
      id: "2",
      date: "Menjalin Komitmen",
      title: "Melangkah Bersama",
      description: "Melewati berbagai cerita, suka dan duka bersama, memperkuat keyakinan untuk menyatukan hati.",
    },
    {
      id: "3",
      date: "12 Desember 2026",
      title: "Hari Bahagia",
      description: "Puncak dari segala penantian suci, mengikat janji sehidup semati di hadapan Allah SWT dan keluarga tercinta.",
    },
  ],

  gallery: [
    { id: "g1", src: "/images/gallery/photo-1.jpg", alt: "Prewedding 1", caption: "The Beginning of Forever", aspect: "portrait" },
    { id: "g2", src: "/images/gallery/photo-2.jpg", alt: "Prewedding 2", caption: "Warmth & Smiles", aspect: "landscape" },
    { id: "g3", src: "/images/gallery/photo-3.jpg", alt: "Prewedding 3", caption: "Timeless Moments", aspect: "square" },
    { id: "g4", src: "/images/gallery/photo-4.jpg", alt: "Prewedding 4", caption: "Hand in Hand", aspect: "portrait" },
  ],

  rsvp: {
    mode: "whatsapp",
    whatsappNumber: "6281234567890", // Ganti dengan nomor WhatsApp aktif Anda (tanpa +)
  },

  gift: {
    enabled: true,
    accounts: [
      {
        bank: "BCA",
        accountHolder: "Charis Maulana S. A.",
        accountNumber: "1234567890",
      },
      {
        bank: "Mandiri",
        accountHolder: "Sita Maulidia A. Z.",
        accountNumber: "0987654321",
      },
    ],
  },

  staticWishes: [
    {
      id: "w1",
      name: "Keluarga Besar",
      relation: "Keluarga",
      message: "Barakallahu lakuma wa baraka 'alaika wa jama'a bainakuma fi khair. Selamat menempuh hidup baru!",
      date: "Hari Ini",
    },
  ],

  music: {
    enabled: true,
    src: "/music/wedding.mp3",
    title: "Romantic Cinematic Theme",
  },
};