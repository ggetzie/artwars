import React, {useState} from 'react';

import {View, Text, StyleSheet, FlatList, Button} from 'react-native';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {GameTabParamList} from '.';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {ArtWork, bidIncrement, otherBidders, Transaction} from '../../util';
import {ArtItem, CloseButton} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  currentHot,
  filterArtWorks,
  selectBalance,
  selectCity,
  selectPlayer,
  transact,
  updateArtwork,
} from '../../reducers/game';
import {ArtWorkFilter} from '../../util/awFilter';
import {initialAsking} from '../../util';

type Props = BottomTabNavigationProp<GameTabParamList, 'Auction'>;

const AuctionStack = createNativeStackNavigator();
type AuctionStackParamList = {
  List: undefined;
  Detail: {artwork: ArtWork};
};

type DetailProps = NativeStackScreenProps<AuctionStackParamList, 'Detail'>;
type ListProps = NativeStackScreenProps<AuctionStackParamList, 'List'>;

const AuctionBuy = ({navigation, route}: DetailProps) => {
  // Auction Logic: Once a player has placed a bid they cannot leave the detail
  // screen unless they win the auction or quit (lose). If they quit with
  // another bid being the current highest bid, the artwork will be sold for the
  // last bid to the anon buyer and removed from auction.
  // If the player keeps placing bids until all other buyers refuse, they win the auction
  // and the artwork is sold to them for the last bid.
  const game = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const balance = selectBalance(game);
  const hot = currentHot(game);
  const player = selectPlayer(game);
  const artwork = route.params.artwork;

  const [bidStarted, setBidStarted] = useState(false);
  const [asking, setAsking] = useState(
    initialAsking(artwork.value, artwork.category === hot),
  );
  const [lastBid, setLastBid] = useState(0);
  const [message, setMessage] = useState('');
  const [canBid, setCanBid] = useState(asking > balance);
  function loseAuction() {
    const updated = {
      ...artwork,
      auction: false,
      value: lastBid,
      owner: 'anon',
    };
    dispatch(updateArtwork(updated));
    setBidStarted(false);
  }
  return (
    <View style={styles.container}>
      {!bidStarted && <CloseButton onPress={() => navigation.goBack()} />}
      <ArtItem artwork={artwork} />
      <Text>Last Bid: ${lastBid.toLocaleString()}</Text>
      <Text>Asking: ${asking.toLocaleString()}</Text>
      <Button
        title="Place Bid"
        disabled={canBid}
        onPress={() => {
          setBidStarted(true);
          setLastBid(asking);
          const newAsking = asking + bidIncrement(asking);
          const otherBid = otherBidders(
            artwork.value,
            newAsking,
            hot === artwork.category,
          );
          if (otherBid) {
            setLastBid(newAsking);
            setAsking(newAsking + bidIncrement(newAsking));
            setMessage(
              `Another buyer bid $${newAsking.toLocaleString()}! Bid again?`,
            );

            if (asking > balance) {
              setMessage(`Another buyer bid more money than you have!`);
              loseAuction();
              setCanBid(false);
              setTimeout(() => navigation.goBack(), 2000);
            }
          } else {
            setMessage(`You won the auction! Now you own ${artwork.title}`);
            const t: Transaction = {
              id: artwork.id,
              price: -1 * asking,
              newOwner: player,
            };
            dispatch(transact(t));
            setBidStarted(false);
          }
        }}
      />
      {bidStarted && (
        <Button
          title="Give Up"
          onPress={() => {
            setMessage('Too rich for your blood, eh?');
            loseAuction();
            setCanBid(false);
            setTimeout(() => navigation.goBack(), 2000);
          }}
        />
      )}
      {message.length > 0 && <Text>{message}</Text>}
      {asking > balance && (
        <Text>You don't have enough money to place this bid. 😢</Text>
      )}
    </View>
  );
};

const AuctionList = ({navigation}: ListProps) => {
  const game = useAppSelector(state => state.game);
  const city = selectCity(game);
  const artworks = filterArtWorks(
    game,
    new ArtWorkFilter({auction: a => a === true, city: c => c === city}),
  );
  return (
    <View style={styles.container}>
      <FlatList
        renderItem={({item}) => (
          <ArtItem
            artwork={item}
            onPress={() => navigation.navigate('Detail', {artwork: item})}
          />
        )}
        data={artworks}
      />
    </View>
  );
};

const Auction = (_: Props) => {
  return (
    <AuctionStack.Navigator>
      <AuctionStack.Screen
        name={'List'}
        component={AuctionList}
        options={{headerShown: false}}
      />
      <AuctionStack.Screen
        name={'Detail'}
        component={AuctionBuy}
        options={{presentation: 'modal', headerShown: false}}
      />
    </AuctionStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});

export default Auction;
