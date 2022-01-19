import {ArtWork} from '../../../util';
import Collector from './Collector';

export type CollectorStackParamList = {
  List: undefined;
  Buy: {artwork: ArtWork};
  SellSelect: undefined;
  Sell: {artwork: ArtWork};
};

export default Collector;
