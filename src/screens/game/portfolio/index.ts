import Portfolio from './Portfolio';
import {ArtWork, CityName} from '../../../util';

export type PortfolioStackParamList = {
  List: undefined;
  Detail: {artwork: ArtWork};
  Confirm: {artwork: ArtWork; duty: number; destination: CityName};
};

export default Portfolio;
