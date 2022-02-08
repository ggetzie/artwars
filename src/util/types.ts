import {Categories, Cities} from '.';

export type CategoryName = typeof Categories[keyof typeof Categories];
export type CityName = typeof Cities[keyof typeof Cities];
export type DutyMap = {
  [key in CityName]: number;
};

export type Artwork = {
  id: number;
  artist: string;
  title: string;
  urls: string[];
  category: CategoryName;
  year: number;
  minValue: number;
  maxValue: number;
  startingValue: number;
  special: string;
};

export type ArtworkData = {
  id: number;
  currentValue: number;
  city: CityName;
  auction: boolean;
  owner: string;
  destroyed: boolean;
};

export type ArtByCityItem = {
  title: CityName;
  data: Artwork[];
};

export type Transaction = {
  id: number;
  price: number;
  newOwner: string;
};

export type NPC = {
  name: string;
  city: CityName;
  bio: string;
  dialogue: {
    selling: {
      insulted: string;
      reject: string;
      accept: string;
      enthusiasm: string;
    };
    buying: {
      insulted: string;
      reject: string;
      accept: string;
      enthusiasm: string;
    };
  };
};

export type NPCData = {
  index: number;
  preference: CategoryName;
};
