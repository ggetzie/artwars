import {ArtworkData, CityName} from './types';
export type FilterFunc<Type> = (a?: Type) => boolean;

const alwaysTrue: FilterFunc<any> = (_: any): boolean => true;
const alwaysFalse: FilterFunc<any> = (_: any): boolean => false;

export type awFilterArgs = {
  city?: FilterFunc<CityName>;
  owner?: FilterFunc<string>;
  auction?: FilterFunc<boolean>;
  destroyed?: FilterFunc<boolean>;
};

export class ArtWorkFilter {
  city: FilterFunc<CityName>;
  owner: FilterFunc<string>;
  auction: FilterFunc<boolean>;
  destroyed: FilterFunc<boolean>;
  method: 'and' | 'or';

  constructor(args: awFilterArgs, method: 'and' | 'or' = 'and') {
    this.method = method;

    if (typeof args.city === 'undefined') {
      this.method === 'and'
        ? (this.city = alwaysTrue)
        : (this.city = alwaysFalse);
    } else {
      this.city = args.city;
    }

    if (typeof args.owner === 'undefined') {
      this.method === 'and'
        ? (this.owner = alwaysTrue)
        : (this.owner = alwaysFalse);
    } else {
      this.owner = args.owner;
    }

    if (typeof args.auction === 'undefined') {
      this.method === 'and'
        ? (this.auction = alwaysTrue)
        : (this.auction = alwaysFalse);
    } else {
      this.auction = args.auction;
    }
    if (typeof args.destroyed === 'undefined') {
      this.method === 'and'
        ? (this.destroyed = alwaysTrue)
        : (this.destroyed = alwaysFalse);
    } else {
      this.destroyed = args.destroyed;
    }
  }

  match(aw: ArtworkData): boolean {
    let res = [];

    res.push(this.city(aw.city));
    res.push(this.owner(aw.owner));
    res.push(this.auction(aw.auction));
    res.push(this.destroyed(aw.destroyed));
    if (this.method === 'and') {
      return res.every(p => p);
    } else {
      return res.some(p => p);
    }
  }
}
