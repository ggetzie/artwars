import Portfolio from './Portfolio';
import {CityName} from '../../../util/types';

export type PortfolioStackParamList = {
  List: undefined;
  Detail: {artworkId: number};
  Confirm: {artworkId: number; destination: CityName};
};

export default Portfolio;
