import Portfolio from './Portfolio';
import {ArtWork} from '../../../util';
import {CityName} from '../../../util/cities';

export type PortfolioStackParamList = {
  List: undefined;
  Detail: {artwork: ArtWork};
  Confirm: {artwork: ArtWork; duty: number; destination: CityName};
};

export default Portfolio;
