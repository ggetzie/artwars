import {CategoryName, Categories, ArtWork, randomChoiceNR} from '.';
import {CityName} from './cities';

export type NPC = {
  name: string;
  city: CityName;
  preference: CategoryName;
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

export type OfferResponse = 'insulted' | 'reject' | 'accept' | 'enthusiasm';

function setupNPCs(): NPC[] {
  const npcs: NPC[] = require('../../res/data/npcs.json');
  let prefs = randomChoiceNR(Object.values(Categories));
  for (let npc of npcs) {
    npc.preference = prefs.selected;
    prefs = randomChoiceNR(prefs.remaining);
  }

  return npcs;
}

function getNPCForCity(city: CityName, npcs: NPC[]) {
  for (const npc of npcs) {
    if (npc.city === city) {
      return npc;
    }
  }
  throw `No NPC found for city ${city}`;
}

function considerSell(
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

function considerBuy(
  artwork: ArtWork,
  asking: number,
  preference: CategoryName,
): OfferResponse {
  const ratio = asking / artwork.value;
  const preferred = artwork.category === preference;
  const base = 100;
  const minRatio = preferred ? 1.1 : 0.9;
  const maxRatio = preferred ? 2 : 1.5;

  if (ratio > maxRatio) {
    return 'insulted';
  } else if (ratio < minRatio) {
    return 'enthusiasm';
  } else {
    const threshold = Math.pow(base, -ratio) * (0.95 * base);
    return Math.random() >= threshold ? 'accept' : 'reject';
  }
}

export {setupNPCs, considerSell, considerBuy, getNPCForCity};
