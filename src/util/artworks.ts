import {Artwork, ArtworkData, CityName, NPC} from './types';
import {randomChoiceR, getNPCForCity} from '.';

const MAX_OWNED_BY_NPC = 10;
const MAX_ON_AUCTION = 20;
const ARTWORKS: Artwork[] = require('../../res/data/artworks.json');

function setupArtworks(cities: CityName[], npcs: NPC[]): ArtworkData[] {
  let res = [];
  const chanceOwnedByNPC = MAX_OWNED_BY_NPC / (ARTWORKS.length / cities.length);
  const chanceOnAuction = MAX_ON_AUCTION / (ARTWORKS.length / cities.length);
  for (const aw of ARTWORKS) {
    const city = randomChoiceR(cities);
    let owner = '';
    let auction = false;
    if (Math.random() <= chanceOwnedByNPC) {
      const npc = getNPCForCity(city);
      owner = npc.name;
    } else {
      if (Math.random() <= chanceOnAuction) {
        auction = true;
      }
    }
    res.push({
      id: aw.id,
      city: city,
      auction: auction,
      owner: owner,
      destroyed: false,
      currentValue: aw.startingValue,
    });
  }
  return res;
}

export {setupArtworks, ARTWORKS};
