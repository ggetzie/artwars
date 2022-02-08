import {randInt} from '.';
import {DutyMap} from './types';
const Cities = {
  NewYork: 'New York',
  London: 'London',
  Moscow: 'Moscow',
  SanFrancisco: 'San Francisco',
  LosAngeles: 'Los Angeles',
  HongKong: 'Hong Kong',
  Dubai: 'Dubai',
} as const;

function setupDuties(): DutyMap {
  const res = Object.fromEntries(
    Object.values(Cities).map(v => [v, randInt(5, 21) * 0.01]),
  );
  return res as DutyMap;
}

export {Cities, setupDuties};
