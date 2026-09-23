import type { Plate } from "@/components/media/MediaPlate";

/**
 * The media register — every photo and video slot the site has, with a brief
 * for what belongs in it.
 *
 * This file IS the shot list. Each entry renders as a designed holding plate
 * until `src` or `video` is filled in, so the layout is final now and the
 * assets drop in later without a rebuild. Adding a real file is a one-line
 * change here.
 *
 * Video deliverables: 1920×1080, 30fps. Hand them over as .mp4 — anything that
 * scroll-scrubs gets sliced to webp frames first, because scrubbing compressed
 * video on scroll is what causes the judder the client flagged.
 */

export const OFFICE: Plate[] = [
  {
    id: "office-uae-1",
    kind: "photo",
    label: "UAE — the floor",
    brief: "Wide shot of the working space. Real desks, real screens, daylight. No staged poses.",
    aspect: "aspect-[4/3]",
    accent: "#2563eb",
  },
  {
    id: "office-uae-2",
    kind: "photo",
    label: "UAE — a conversation",
    brief: "Two or three people at a whiteboard or a screen, mid-discussion. Candid.",
    aspect: "aspect-[4/3]",
    accent: "#2563eb",
  },
  {
    id: "office-vellore-1",
    kind: "photo",
    label: "Vellore — the floor",
    brief: "Same treatment as the UAE floor so the pair reads as one company.",
    aspect: "aspect-[4/3]",
    accent: "#0d9488",
  },
  {
    id: "office-vellore-2",
    kind: "photo",
    label: "Vellore — the build",
    brief: "Someone actually working: code on screen, a device being tested, a rig on a bench.",
    aspect: "aspect-[4/3]",
    accent: "#0d9488",
  },
  {
    id: "office-exterior",
    kind: "photo",
    label: "The building",
    brief: "Exterior or entrance of either hub. Establishes that the address is real.",
    aspect: "aspect-[4/3]",
    accent: "#5a6472",
  },
  {
    id: "office-team",
    kind: "photo",
    label: "The team",
    brief: "Everyone together. Natural light, no stock-photo body language.",
    aspect: "aspect-[4/3]",
    accent: "#f0a500",
  },
];

export const EXPO: Plate[] = [
  {
    id: "expo-stand",
    kind: "photo",
    label: "The stand",
    brief: "Our booth at an expo, with the event name legible. ⟨TBC⟩ which events.",
    aspect: "aspect-[3/2]",
    accent: "#7c3aed",
  },
  {
    id: "expo-demo",
    kind: "photo",
    label: "Demonstrating",
    brief: "Someone from the team showing a platform to a visitor at the stand.",
    aspect: "aspect-[3/2]",
    accent: "#7c3aed",
  },
  {
    id: "expo-floor",
    kind: "photo",
    label: "The floor",
    brief: "Wide shot of the hall — establishes scale of the event we attended.",
    aspect: "aspect-[3/2]",
    accent: "#7c3aed",
  },
  {
    id: "expo-reel",
    kind: "video",
    label: "Expo reel",
    brief: "20–40s silent cut of stand footage. 1080p, no music needed.",
    aspect: "aspect-[16/9]",
    accent: "#7c3aed",
  },
];

export const ACHIEVEMENTS: Plate[] = [
  {
    id: "ach-cert",
    kind: "photo",
    label: "Certifications",
    brief: "Certificates, partner badges or accreditations. Flat, straight-on, ≥1500px.",
    aspect: "aspect-[3/2]",
    accent: "#ca8a04",
  },
  {
    id: "ach-award",
    kind: "photo",
    label: "Recognition",
    brief: "Any award, listing or formal recognition. ⟨TBC⟩ whether these exist.",
    aspect: "aspect-[3/2]",
    accent: "#ca8a04",
  },
  {
    id: "ach-partner",
    kind: "photo",
    label: "Partnerships",
    brief: "Signing, handshake or partner event photo. Only if genuine.",
    aspect: "aspect-[3/2]",
    accent: "#ca8a04",
  },
];

export const READERS: Plate[] = [
  {
    id: "rc-session",
    kind: "photo",
    label: "A session",
    brief: "People sitting with books, mid-session. Warm, unposed, faces fine if consented.",
    aspect: "aspect-[3/2]",
    accent: "#a16207",
  },
  {
    id: "rc-chennai",
    kind: "photo",
    label: "Chennai meet",
    brief: "The Chennai group. Wide enough to show how many people come.",
    aspect: "aspect-[3/2]",
    accent: "#a16207",
  },
  {
    id: "rc-vellore",
    kind: "photo",
    label: "Vellore meet",
    brief: "The Vellore group, same treatment.",
    aspect: "aspect-[3/2]",
    accent: "#a16207",
  },
  {
    id: "rc-books",
    kind: "photo",
    label: "What we read",
    brief: "The books themselves, laid out. Cheap to shoot and it dates the club honestly.",
    aspect: "aspect-[3/2]",
    accent: "#a16207",
  },
];

export const COMPANY_FILM: Plate = {
  id: "company-film",
  kind: "video",
  label: "Company film",
  brief:
    "60–90s. Both hubs, real work, no voiceover needed — we caption it. 1080p, delivered as .mp4.",
  aspect: "aspect-[16/9]",
  accent: "#f0a500",
};

export const SALES: Plate[] = [
  {
    id: "sales-call",
    kind: "photo",
    label: "Working with a client",
    brief: "A real meeting or site visit. Consent required if faces are identifiable.",
    aspect: "aspect-[4/3]",
    accent: "#2563eb",
  },
  {
    id: "sales-onsite",
    kind: "photo",
    label: "On site",
    brief: "Team at a client's plant, clinic or yard — where the software actually runs.",
    aspect: "aspect-[4/3]",
    accent: "#ea580c",
  },
  {
    id: "sales-review",
    kind: "video",
    label: "Client review",
    brief:
      "30–60s testimonial. Landscape plus a vertical crop, good audio, subtitles. Real name and title.",
    aspect: "aspect-[4/3]",
    accent: "#0d9488",
  },
];

/**
 * Venture film briefs. Each becomes a ScrollStory once the footage lands, and
 * each is sliced to ~60 webp frames rather than played as video.
 */
export const VENTURE_FILMS: Record<string, string> = {
  "agri-iot":
    "Drone lifting from a field at dawn, climbing steadily. Single continuous take, constant speed, no cuts. 10s, 1080p.",
  "sunday-delivery":
    "Cold box loaded into a van, doors closing, van pulling away down a Vellore-region road. Single continuous take, no cuts. 10s, 1080p.",
  "readers-club":
    "Slow push across a table of books toward a seated group. Single continuous take, constant speed. 10s, 1080p.",
};
