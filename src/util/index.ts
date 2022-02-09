import {CategoryName} from './types';

// NPC imports
import {setupNPCs, considerSell, considerBuy, getNPCForCity} from './npcs';
export {setupNPCs, considerBuy, considerSell, getNPCForCity};

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

// Save/Load functions
import RNFS from 'react-native-fs';
import {gameState} from '../reducers/game';
const SAVE_PATH = RNFS.DocumentDirectoryPath + '/saved/';
RNFS.mkdir(SAVE_PATH);

async function saveGame(game: gameState) {
  const path = SAVE_PATH + `${game.id}.json`;
  const start = new Date();
  console.log(`starting save ${start.valueOf()}`);
  const exists = await RNFS.exists(path);
  if (exists) {
    await RNFS.unlink(path);
  }
  await RNFS.writeFile(path, JSON.stringify(game), 'utf8')
    .then(() =>
      console.log(
        `saved game: ${path} in ${new Date().valueOf() - start.valueOf()}ms`,
      ),
    )
    .catch(error => console.log(error.message));
}

async function loadGames(): Promise<gameState[]> {
  const files = await RNFS.readDir(SAVE_PATH).then(items => {
    return items.filter(f => f.isFile());
  });
  console.log(files.map(f => f.name));
  const games = files.map(async f => {
    const contents = await RNFS.readFile(f.path);
    const l = contents.length;
    console.log(contents.slice(l - 195, l));
    return JSON.parse(contents);
  });
  return Promise.all(games);
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
  saveGame,
  loadGames,
};
