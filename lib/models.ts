export type MusicModel = {
  id: string;
  name: string;
  isPaid: boolean;
  description: string;
};

export const MUSIC_MODELS: MusicModel[] = [
  {
    id: "elevenmusic",
    name: "ElevenMusic",
    isPaid: true,
    description: "Premium vocal & instrumental generation"
  },
  {
    id: "acestep",
    name: "AceStep",
    isPaid: false,
    description: "Free community rhythm model"
  },
  {
    id: "stable-medium",
    name: "Stable Audio Medium",
    isPaid: true,
    description: "Balanced quality & speed"
  },
  {
    id: "stable-large",
    name: "Stable Audio Large",
    isPaid: true,
    description: "Highest fidelity generation"
  }
];
