import Auction from './Auction';
import {ArtWork} from '../../../util';

export type AuctionStackParamList = {
  List: undefined;
  Buy: {artwork: ArtWork};
  SellSelect: undefined;
  Sell: {artwork: ArtWork};
};

export default Auction;
