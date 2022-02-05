import RNFS from 'react-native-fs';
import {NPC, setupNPCs, considerSell, considerBuy, getNPCForCity} from './npcs';
import {Cities, CityName, setupDuties} from './cities';
import {gameState} from '../reducers/game';

const MAX_OWNED_BY_NPC = 10;
const MAX_ON_AUCTION = 20;

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

export type CategoryName = typeof Categories[keyof typeof Categories];

export type Category = {
  name: CategoryName;
  start: number;
  end: number;
};

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
  destroyed: boolean;
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
      destroyed: false,
    });
  }
  return res;
}

export type ArtByCityItem = {
  title: CityName;
  data: ArtWork[];
};

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

function saveGame(game: gameState) {
  RNFS.mkdir(RNFS.DocumentDirectoryPath + '/saved/');
  const path = RNFS.DocumentDirectoryPath + `/saved/${game.id}.json`;
  RNFS.writeFile(path, game.toString(), 'utf8')
    .then(success => console.log(`saved game: ${path}`))
    .catch(error => console.log(error.message));
}

export {
  Cities,
  setupNPCs,
  getNPCForCity,
  Categories,
  setupArtworks,
  considerSell,
  considerBuy,
  initialAsking,
  bidIncrement,
  randomCategory,
  otherBidders,
  diceRoll,
  randRange,
  randInt,
  randomChoiceR,
  randomChoiceNR,
  setupDuties,
  saveGame,
};
