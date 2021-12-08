import {CategoryName, CityName, ArtWork} from '.';
export type FilterFunc<Type> = (a?: Type) => boolean;

const alwaysTrue: FilterFunc<any> = (_: any): boolean => true;
const alwaysFalse: FilterFunc<any> = (_: any): boolean => false;

export type awFilterArgs = {
  title?: FilterFunc<string>;
  artist?: FilterFunc<string>;
  value?: FilterFunc<number>;
  category?: FilterFunc<CategoryName>;
  year?: FilterFunc<number>;
  city?: FilterFunc<CityName>;
  owner?: FilterFunc<string>;
  auction?: FilterFunc<boolean>;
};

export class ArtWorkFilter {
  title: FilterFunc<string>;
  artist: FilterFunc<string>;
  value: FilterFunc<number>;
  category: FilterFunc<CategoryName>;
  year: FilterFunc<number>;
  city: FilterFunc<CityName>;
  owner: FilterFunc<string>;
  auction: FilterFunc<boolean>;
  method: 'and' | 'or';

  constructor(args: awFilterArgs, method: 'and' | 'or' = 'and') {
    this.method = method;
    if (typeof args.title === 'undefined') {
      this.method === 'and'
        ? (this.title = alwaysTrue)
        : (this.title = alwaysFalse);
    } else {
      this.title = args.title;
    }

    if (typeof args.artist === 'undefined') {
      this.method === 'and'
        ? (this.artist = alwaysTrue)
        : (this.artist = alwaysFalse);
    } else {
      this.artist = args.artist;
    }

    if (typeof args.value === 'undefined') {
      this.method === 'and'
        ? (this.value = alwaysTrue)
        : (this.value = alwaysFalse);
    } else {
      this.value = args.value;
    }

    if (typeof args.category === 'undefined') {
      this.method === 'and'
        ? (this.category = alwaysTrue)
        : (this.category = alwaysFalse);
    } else {
      this.category = args.category;
    }

    if (typeof args.year === 'undefined') {
      this.method === 'and'
        ? (this.year = alwaysTrue)
        : (this.year = alwaysFalse);
    } else {
      this.year = args.year;
    }

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
  }

  match(aw: ArtWork): boolean {
    let res = [];

    res.push(this.title(aw.title));
    res.push(this.artist(aw.artist));
    res.push(this.value(aw.value));
    res.push(this.category(aw.category));
    res.push(this.year(aw.year));
    res.push(this.city(aw.city));
    res.push(this.owner(aw.owner));
    res.push(this.auction(aw.auction));
    if (this.method === 'and') {
      return res.every(p => p);
    } else {
      return res.some(p => p);
    }
  }
}
