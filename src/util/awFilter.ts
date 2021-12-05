import {CategoryName, CityName, ArtWork} from '.';
export type StringFilter = (s?: string) => boolean;
export type NumberFilter = (n?: number) => boolean;
export type BoolFilter = (b?: boolean) => boolean;
export type CategoryFilter = (c: CategoryName) => boolean;
export type CityFilter = (c?: CityName) => boolean;

const alwaysTrue = (_: any): boolean => true;
const alwaysFalse = (_: any): boolean => false;

export class ArtWorkFilter {
  title: StringFilter;
  artist: StringFilter;
  value: NumberFilter;
  category: CategoryFilter;
  year: NumberFilter;
  city: CityFilter;
  owner: StringFilter;
  auction: BoolFilter;
  method: 'and' | 'or';

  constructor(
    method: 'and' | 'or' = 'and',
    title?: StringFilter,
    artist?: StringFilter,
    value?: NumberFilter,
    category?: CategoryFilter,
    year?: NumberFilter,
    city?: CityFilter,
    owner?: StringFilter,
    auction?: BoolFilter,
  ) {
    this.method = method;
    if (typeof title === 'undefined') {
      this.method === 'and'
        ? (this.title = alwaysTrue)
        : (this.title = alwaysFalse);
    } else {
      this.title = title;
    }

    if (typeof artist === 'undefined') {
      this.method === 'and'
        ? (this.artist = alwaysTrue)
        : (this.artist = alwaysFalse);
    } else {
      this.artist = artist;
    }

    if (typeof value === 'undefined') {
      this.method === 'and'
        ? (this.value = alwaysTrue)
        : (this.value = alwaysFalse);
    } else {
      this.value = value;
    }

    if (typeof category === 'undefined') {
      this.method === 'and'
        ? (this.category = alwaysTrue)
        : (this.category = alwaysFalse);
    } else {
      this.category = category;
    }

    if (typeof year === 'undefined') {
      this.method === 'and'
        ? (this.year = alwaysTrue)
        : (this.year = alwaysFalse);
    } else {
      this.year = year;
    }

    if (typeof city === 'undefined') {
      this.method === 'and'
        ? (this.city = alwaysTrue)
        : (this.city = alwaysFalse);
    } else {
      this.city = city;
    }

    if (typeof owner === 'undefined') {
      this.method === 'and'
        ? (this.owner = alwaysTrue)
        : (this.owner = alwaysFalse);
    } else {
      this.owner = owner;
    }

    if (typeof auction === 'undefined') {
      this.method === 'and'
        ? (this.auction = alwaysTrue)
        : (this.auction = alwaysFalse);
    } else {
      this.auction = auction;
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
