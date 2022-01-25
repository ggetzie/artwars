import {randInt} from '.';
const Cities = {
  NewYork: 'New York',
  London: 'London',
  Moscow: 'Moscow',
  SanFrancisco: 'San Francisco',
  LosAngeles: 'Los Angeles',
  HongKong: 'Hong Kong',
  Dubai: 'Dubai',
} as const;

export type CityName = typeof Cities[keyof typeof Cities];

function randDuty(): number {
  return 1 + randInt(5, 21) * 0.1;
}

// type DutyMap = {
//   [key in CityName]: number;
// };

function setupDuties() {
  const res = Object.fromEntries(
    Object.values(Cities).map(v => [v, randDuty()]),
  );
  return res;
}

export {Cities, setupDuties};
