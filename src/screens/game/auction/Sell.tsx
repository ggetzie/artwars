import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {bidIncrement, otherBidders} from '../../../util';
import {Transaction} from '../../../util/types';
import {AuctionStackParamList} from '.';
import {ArtItem, IntegerInput} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  currentHot,
  getArtwork,
  selectPlayer,
  transact,
} from '../../../reducers/game';
import {initialAsking} from '../../../util';

import BaseStyle from '../../../styles/base';

type Props = NativeStackScreenProps<AuctionStackParamList, 'Sell'>;
type AuctionStatus =
  | 'notStarted'
  | 'firstBid'
  | 'calledForBid'
  | 'bidMade'
  | 'finished';

const Sell = ({navigation, route}: Props) => {
  // Auction Sell Logic:
  // Player sets asking price
  // roll to decide if a bid
  // if no bids at initial asking - update message to lower asking price and restart
  // if a bid, keep rolling until no new bids
  // sold to highest bidder
  const game = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const hot = currentHot(game);
  const player = selectPlayer(game);
  const artworkId = route.params.artworkId;
  const artwork = getArtwork(game, artworkId);
  // const artwork = ARTWORKS[awId];
  // const artworkData = getArtworkData(game, awId);
  const isHot = hot === artwork.static.category;

  const [status, setStatus] = useState<AuctionStatus>('notStarted');
  const starting = initialAsking(artwork.data.currentValue, isHot);
  const [asking, setAsking] = useState(starting);
  const [lastBid, setLastBid] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);

  function callForBids() {
    const newAsking = asking + bidIncrement(asking);
    setAsking(newAsking);
    setMessages(
      [
        `Do I hear $${newAsking.toLocaleString()}?`,
        `Fabulous! We have a bid for $${lastBid.toLocaleString()}.`,
      ].concat(messages),
    );
    setStatus('calledForBid');
  }

  function checkBids() {
    const nextBid = otherBidders(artwork.data.currentValue, asking, isHot);
    if (nextBid) {
      setLastBid(asking);
      setStatus('bidMade');
    } else {
      if (status === 'firstBid') {
        setMessages(['No bidders! Try lowering the asking price.']);
        setStatus('notStarted');
      } else {
        setMessages(
          [`Sold! for $${lastBid.toLocaleString()}`].concat(messages),
        );
        const t: Transaction = {
          id: artwork.data.id,
          newOwner: 'anon',
          price: lastBid,
        };
        dispatch(transact(t));
        setStatus('finished');
      }
    }
  }

  useEffect(() => {
    switch (status) {
      case 'firstBid':
      case 'calledForBid':
        checkBids();
        break;
      case 'bidMade':
        callForBids();
        break;
      default:
        break;
    }
  });

  return (
    <View style={BaseStyle.container}>
      <ArtItem artwork={artwork} />
      {Number.isNaN(asking) ? (
        <Text style={BaseStyle.error}>Enter a valid number.</Text>
      ) : (
        <Text>Asking price: ${asking.toLocaleString()}</Text>
      )}
      <IntegerInput
        placeholder="Enter an asking price."
        setNum={setAsking}
        editable={status === 'notStarted'}
      />
      <Button
        title="Start Auction"
        disabled={status !== 'notStarted'}
        onPress={() => {
          const askingText = asking.toLocaleString();
          setMessages([
            `Bidding starts at $${askingText}. Do I have any bids?`,
            `Ladies and Gentlemen we have ${artwork.static.title} for sale.`,
          ]);
          setStatus('firstBid');
        }}
      />
      <FlatList
        data={messages}
        renderItem={({item}) => <Text>{item}</Text>}
        ListEmptyComponent={() => (
          <Text>Enter an initial asking price and press "Start Auction"</Text>
        )}
      />
    </View>
  );
};

export default Sell;
