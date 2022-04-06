import {ArtworkData, ArtworkStatic, CityName} from './types';
import {randomChoiceR, getNPCForCity, Cities} from '.';

const MAX_OWNED_BY_NPC = 10;
const MAX_ON_AUCTION = 20;
const ARTWORKS: ArtworkStatic[] = require('../res/data/artworks.json');

function setupArtworks(): ArtworkData[] {
  let res = [];
  const cities: CityName[] = Object.values(Cities);
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
