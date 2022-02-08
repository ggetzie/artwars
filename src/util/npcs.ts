import {Categories, randomChoiceNR} from '.';
import {CategoryName, Artwork, CityName, NPC, NPCData} from './types';

export type OfferResponse = 'insulted' | 'reject' | 'accept' | 'enthusiasm';

const NPCs = require('../../res/data/npcs.json');

function setupNPCs(): NPCData[] {
  let prefs = randomChoiceNR(Object.values(Categories));
  let res: NPCData[] = [];
  for (const npc of NPCs) {
    res.push({index: NPCs.id, preference: prefs.selected});
    prefs = randomChoiceNR(prefs.remaining);
  }
  return res;
}

function getNPCForCity(city: CityName) {
  for (const npc of NPCs) {
    if (npc.city === city) {
      return npc;
    }
  }
  throw `No NPC found for city ${city}`;
}

function considerSell(
  value: number,
  offer: number,
  preferred: boolean,
): OfferResponse {
  const ratio = offer / value;
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
  value: number,
  asking: number,
  preferred: boolean,
): OfferResponse {
  const ratio = asking / value;
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
