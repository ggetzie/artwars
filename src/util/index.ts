const enum Cities {
  NewYork = 'New York',
  London = 'London',
  Moscow = 'Moscow',
  SanFrancisco = 'San Francisco',
  Riyadh = 'Riyadh',
  LosAngeles = 'Los Angeles',
  HongKong = 'Hong Kong',
}

const enum Categories {
  Prehistoric = 'Prehistoric',
  Ancient = 'Ancient',
  Classical = 'Classical',
  Medieval = 'Medieval',
  Renaissance = 'Renaissance',
  Baroque = 'Baroque',
  Rococo = 'Rococo',
  NeoClassical = 'Neo-Classical',
  Romantic = 'Romantic',
  Realist = 'Realist',
  Impressionist = 'Impressionist',
  PostImpressionist = 'Post-Impressionist',
  Expressionist = 'Expressionist',
  CubistFuturist = 'Cubist/Futurist',
  Surrealist = 'Surrealist',
  AbstractExpressionist = 'Abstract Expressionist',
  PopArt = 'Pop Art',
  Contemporary = 'Contemporary',
}

export type Category = {
  name: Categories;
  start: number;
  end: number;
};

const categories: Category[] = require('../../res/data/categories.json');

export type NPC = {
  name: string;
  city: Cities;
  preference: Categories;
};

export type ArtWork = {
  title: string;
  artist: string;
  value: number;
  urls: string[];
  category: Categories;
  city: Cities;
  year: number;
  owner: string | undefined;
};

function randInt(min: number, max: number): number {
  // return a random number between min and max (min included, max excluded)
  const res = Math.floor(Math.random() * (max - min)) + min;
  return res;
}

function randomChoiceNR(arr: string[]): {selected: any; remaining: any[]} {
  if (arr.length === 0) {
    throw 'Empty array';
  }
  const index = randInt(0, arr.length);
  return {
    selected: arr[index],
    remaining: arr.slice(0, index).concat(arr.slice(index + 1)),
  };
}

function setupNPCs(): NPC[] {
  let npcs: NPC[] = [];
  const categoryNames = categories.map(c => c.name);
  let prefs = randomChoiceNR(categoryNames);
  npcs.push({
    name: 'Buffy Chadwick',
    city: Cities.NewYork,
    preference: prefs.selected,
  });

  prefs = randomChoiceNR(prefs.remaining);
  npcs.push({
    name: 'Lord Worthinghamshire',
    city: Cities.London,
    preference: prefs.selected,
  });

  prefs = randomChoiceNR(prefs.remaining);
  npcs.push({
    name: 'Yuri Smirnoff',
    city: Cities.Moscow,
    preference: prefs.selected,
  });

  prefs = randomChoiceNR(prefs.remaining);
  npcs.push({
    name: 'Gavin Belson',
    city: Cities.SanFrancisco,
    preference: prefs.selected,
  });

  prefs = randomChoiceNR(prefs.remaining);
  npcs.push({
    name: 'The Prince',
    city: Cities.Riyadh,
    preference: prefs.selected,
  });

  prefs = randomChoiceNR(prefs.remaining);
  npcs.push({
    name: 'Bleve Blartin',
    city: Cities.LosAngeles,
    preference: prefs.selected,
  });

  prefs = randomChoiceNR(prefs.remaining);
  npcs.push({
    name: 'Carrie Lam',
    city: Cities.HongKong,
    preference: prefs.selected,
  });

  return npcs;
}

export {Cities, setupNPCs, Categories};
