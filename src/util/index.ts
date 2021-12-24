import {valueToNode} from '@babel/types';

const Cities = {
  NewYork: 'New York',
  London: 'London',
  Moscow: 'Moscow',
  SanFrancisco: 'San Francisco',
  LosAngeles: 'Los Angeles',
  HongKong: 'Hong Kong',
  Dubai: 'Dubai',
} as const;

const MAX_OWNED_BY_NPC = 10;
const MAX_ON_AUCTION = 20;

export type CityName = typeof Cities[keyof typeof Cities];

const Categories = {
  Prehistoric: 'Prehistoric',
  Ancient: 'Ancient',
  Classical: 'Classical',
  Medieval: 'Medieval',
  Renaissance: 'Renaissance',
  Baroque: 'Baroque',
  Rococo: 'Rococo',
  NeoClassical: 'Neo-Classical',
  Romantic: 'Romantic',
  Realist: 'Realist',
  Impressionist: 'Impressionist',
  PostImpressionist: 'Post-Impressionist',
  Expressionist: 'Expressionist',
  CubistFuturist: 'Cubist/Futurist',
  Surrealist: 'Surrealist',
  AbstractExpressionist: 'Abstract Expressionist',
  PopArt: 'Pop Art',
  Contemporary: 'Contemporary',
};
export type CategoryName = typeof Categories[keyof typeof Categories];

export type Category = {
  name: CategoryName;
  start: number;
  end: number;
};

export type NPC = {
  name: string;
  city: CityName;
  preference: CategoryName;
  bio: string;
  dialogue: {
    offer: {
      insulted: string;
      reject: string;
      accept: string;
      enthusiasm: string;
    };
  };
};

function randInt(min: number, max: number): number {
  // return a random number between min and max (min included, max excluded)
  const res = Math.floor(Math.random() * (max - min)) + min;
  return res;
}

function randomChoiceNR(arr: any[]): {selected: any; remaining: any[]} {
  // select a random element from an array without replacement
  // returns the selected element and the original array without the selection
  if (arr.length === 0) {
    throw 'Empty array';
  }
  const index = randInt(0, arr.length);
  return {
    selected: arr[index],
    remaining: arr.slice(0, index).concat(arr.slice(index + 1)),
  };
}

function randomChoiceR(arr: any[]): any {
  // select a random element from an array
  if (arr.length === 0) {
    throw 'Empty array';
  }
  const index = randInt(0, arr.length);
  return arr[index];
}

function setupNPCs(): NPC[] {
  const npcs: NPC[] = require('../../res/data/npcs.json');
  const categoryNames = Object.values(Categories);
  let prefs = randomChoiceNR(categoryNames);
  for (let npc of npcs) {
    npc.preference = prefs.selected;
    prefs = randomChoiceNR(prefs.remaining);
  }

  return npcs;
}

export function getNPCForCity(city: CityName, npcs: NPC[]) {
  for (const npc of npcs) {
    if (npc.city === city) {
      return npc;
    }
  }
  throw `No NPC found for city ${city}`;
}

export type ArtWork = {
  id: number;
  artist: string;
  title: string;
  urls: string[];
  category: CategoryName;
  year: number;
  value: number;
  city: CityName;
  owner: string;
  auction: boolean;
};

export type Transaction = {
  id: number;
  price: number;
  newOwner: string;
};

function setupArtworks(cities: CityName[], npcs: NPC[]): ArtWork[] {
  const data: ArtWork[] = require('../../res/data/artworks.json');
  let res = [];
  const chanceOwnedByNPC = MAX_OWNED_BY_NPC / (data.length / cities.length);
  const chanceOnAuction = MAX_ON_AUCTION / (data.length / cities.length);
  for (const aw of data) {
    const city = randomChoiceR(cities);
    let owner = '';
    let auction = false;
    if (Math.random() <= chanceOwnedByNPC) {
      const npc = getNPCForCity(city, npcs);
      owner = npc.name;
    } else {
      if (Math.random() <= chanceOnAuction) {
        auction = true;
      }
    }
    res.push({
      ...aw,
      city: city,
      auction: auction,
      owner: owner,
    });
  }
  return res;
}

export type ArtByCityItem = {
  title: CityName;
  data: ArtWork[];
};

export type OfferResponse = 'insulted' | 'reject' | 'accept' | 'enthusiasm';

function considerOffer(
  artwork: ArtWork,
  offer: number,
  preference: CategoryName,
): OfferResponse {
  const preferred = artwork.category === preference;
  const ratio = offer / artwork.value;
  const minRatio = preferred ? 0.915 : 0.7;
  const maxRatio = preferred ? 1.25 : 1.1;
  if (ratio < minRatio) {
    return 'insulted';
  } else if (ratio > maxRatio) {
    return 'enthusiasm';
  } else {
    const threshold = Math.exp(ratio) - Math.exp(minRatio);
    const roll = Math.random();
    return Math.random() <= threshold ? 'accept' : 'reject';
  }
}

export {Cities, setupNPCs, Categories, setupArtworks, considerOffer};
