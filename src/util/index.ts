const Cities = {
  NewYork: 'New York',
  London: 'London',
  Moscow: 'Moscow',
  SanFrancisco: 'San Francisco',
  Riyadh: 'Riyadh',
  LosAngeles: 'Los Angeles',
  HongKong: 'Hong Kong',
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
  let npcs: NPC[] = [];
  const categoryNames = Object.values(Categories);
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

export type ArtWork = {
  title: string;
  artist: string;
  value: number;
  urls: string[];
  category: CategoryName;
  year: number;
  city: CityName | undefined;
  owner: string | undefined;
  auction: boolean | undefined;
};

function getNPCForCity(city: CityName, npcs: NPC[]) {
  for (const npc of npcs) {
    if (npc.city === city) {
      return npc;
    }
  }
  throw `No NPC found for city ${city}`;
}

function setupArtworks(
  data: ArtWork[],
  cities: CityName[],
  npcs: NPC[],
): ArtWork[] {
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

export {Cities, setupNPCs, Categories, setupArtworks};
