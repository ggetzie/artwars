import {PowerUp} from './types';
import {Cities} from './cities';

function setupPowerUps(): PowerUp[] {
  let res = [];
  for (const city of Object.values(Cities)) {
    const freeport: PowerUp = {
      name: `Freeport: ${city}`,
      description: `Duty-Free imports into ${city}`,
      price: 500_000,
      purchased: false,
    };
    res.push(freeport);
  }
  const yacht: PowerUp = {
    name: 'Yacht',
    description:
      'Store your artworks offshore! Avoid all import duties and greatly reduce the chance of IRS investigations.',
    price: 50_000_000,
    purchased: false,
  };
  res.push(yacht);
  return res;
}

export {setupPowerUps};
