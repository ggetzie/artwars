import Auction from './Auction';

export type AuctionStackParamList = {
  List: undefined;
  Buy: {artworkId: number};
  SellSelect: undefined;
  Sell: {artworkId: number};
};

export default Auction;
