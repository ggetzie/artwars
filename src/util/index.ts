import {CategoryName, HighScore} from './types';

// NPC imports
import {
  setupNPCs,
  considerSell,
  considerBuy,
  getNPCForCity,
  NPCImages,
} from './npcs';
export {setupNPCs, considerBuy, considerSell, getNPCForCity, NPCImages};

// Cities imports
import {Cities, setupDuties} from './cities';
export {Cities, setupDuties};

// Artworks imports
import {setupArtworks, ARTWORKS} from './artworks';
export {setupArtworks, ARTWORKS};

const Categories = {
  AncientAsia: 'Ancient Arts of Asia',
  ModernAsia: 'Modern Arts of Asia',
  ContemporaryChinese: 'Contemporary Chinese Art',
  GreekAndRoman: 'Greek and Roman Art',
  Islamic: 'Islamic Art',
  Egypt: 'Arts of Egypt',
  AncientNearEast: 'Ancient Near East',
  Medieval: 'Medieval Art',
  Decorative: 'Decorative Arts',
  Africa: 'Arts of Africa',
  AncientAmerican: 'Ancient American',
  Oceanic: 'Oceanic Art',
  Baroque: 'Baroque Art',
  Neoclassical: 'Neoclassical Art',
  Romanticism: 'Romanticism',
  Realism: 'Realism',
  Impressionism: 'Impressionism and Post-Impressionism',
  EuropeanAvantGarde: '20th century European Avant-Garde',
  AbstractExpressionism: 'Abstract Expressionism',
  PopArt: 'Pop Art',
  Photography: 'Photography',
  Contemporary: 'Contemporary',
} as const;

// shop imports
import {setupPowerUps} from './shop';
export {setupPowerUps};

// Random functions

function randInt(min: number, max: number): number {
  // return a random integer between min and max (min included, max excluded)
  const res = Math.floor(Math.random() * (max - min)) + min;
  return res;
}

function randRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
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

function diceRoll(threshold: number): boolean {
  return Math.random() <= threshold;
}

function randomChoiceR(arr: any[]): any {
  // select a random element from an array
  if (arr.length === 0) {
    throw 'Empty array';
  }
  const index = randInt(0, arr.length);
  return arr[index];
}

// Auction functions
function initialAsking(value: number, isHot: boolean): number {
  const bidFloor = isHot ? 0.95 : 0.75;
  const bidCeiling = isHot ? 1.25 : 1.05;
  const roll = randRange(bidFloor, bidCeiling);
  return Math.round(roll * value);
}

function bidIncrement(value: number): number {
  if (value <= 1000) {
    return 100;
  }

  if (value <= 10_000) {
    return 500;
  }

  if (value <= 100_000) {
    return 1_000;
  }

  if (value <= 1_000_00) {
    return 5_000;
  }

  if (value <= 10_000_00) {
    return 10_000;
  }

  return 50_000;
}

function otherBidders(value: number, asking: number, isHot: boolean): boolean {
  const ratio = asking / value;
  const base = 100;
  const upperLimit = isHot ? 0.95 : 0.75;
  const roll = Math.random();
  if (ratio < 1) {
    return roll < upperLimit;
  } else {
    return roll < Math.pow(base, -ratio) * (upperLimit * base);
  }
}

function randomCategory(): CategoryName {
  return randomChoiceR(Object.values(Categories));
}

function sortScoresDescending(a: HighScore, b: HighScore): number {
  return b.score - a.score;
}

function insertNewHS(
  scores: HighScore[],
  newScore: HighScore,
): [HighScore[], number] {
  if (scores.length === 0) {
    return [[newScore], 0];
  }
  for (let i = 0; i < scores.length; i++) {
    if (newScore.score > scores[i].score) {
      const res = scores
        .slice(0, i - 1)
        .concat([newScore])
        .concat(scores.slice(i, 10));
      return [res, i];
    }
  }
  if (scores.length < 10) {
    return [scores.concat([newScore]), scores.length];
  }
  return [scores, -1];
}

// local exports
export {
  Categories,
  initialAsking,
  bidIncrement,
  randomCategory,
  otherBidders,
  diceRoll,
  randRange,
  randInt,
  randomChoiceR,
  randomChoiceNR,
  sortScoresDescending,
  insertNewHS,
};
