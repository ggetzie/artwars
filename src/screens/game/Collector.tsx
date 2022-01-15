import React, {useState} from 'react';
import {View, Text, Button, FlatList, Modal, TextInput} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {GameTabParamList} from '.';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  currentNPC,
  filterArtWorks,
  selectBalance,
  selectPlayer,
  transact,
} from '../../reducers/game';

import {ArtWorkFilter} from '../../util/awFilter';
import {ArtWork, considerOffer, Transaction} from '../../util';
import {ArtItem} from '../../components';
import BaseStyle from '../../styles/base';

type Props = BottomTabNavigationProp<GameTabParamList, 'Collector'>;

const CollectorStack = createNativeStackNavigator();
type CollectorStackParamList = {
  List: undefined;
  Buy: {artwork: ArtWork};
};

type OfferProps = NativeStackScreenProps<CollectorStackParamList, 'Buy'>;
type ListProps = NativeStackScreenProps<CollectorStackParamList, 'List'>;

const Buy = ({navigation, route}: OfferProps) => {
  const artwork = route.params.artwork;
  const value = artwork.value.toLocaleString('en-US');
  const game = useAppSelector(state => state.game);
  const player = selectPlayer(game);
  const npc = currentNPC(game);
  const [offer, setOffer] = useState(0);
  const [message, setMessage] = useState('Go ahead, make an offer.');
  const dispatch = useAppDispatch();
  const balance = selectBalance(game);
  return (
    <View>
      <Text>{artwork.title}</Text>
      <Text>Value: ${value}</Text>
      <TextInput
        placeholder="Enter offer amount"
        keyboardType="numeric"
        onChangeText={value => setOffer(parseInt(value))}
      />
      <Button
        title="Make Offer"
        onPress={() => {
          if (offer > balance) {
            setMessage("You don't have that much money!");
            return;
          }
          const response = considerOffer(artwork, offer, npc.preference);
          if (response === 'accept' || response === 'enthusiasm') {
            const t: Transaction = {
              id: artwork.id,
              price: -1 * offer,
              newOwner: player,
            };
            dispatch(transact(t));
            setTimeout(() => navigation.goBack(), 2000);
          } else {
            setTimeout(() => setMessage('Try again'), 2000);
          }
          setMessage(npc.dialogue.offer[response]);
        }}
      />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
      <Text>{message}</Text>
    </View>
  );
};

const CollectorList = ({navigation}: ListProps) => {
  const game = useAppSelector(state => state.game);
  const npc = currentNPC(game);
  const artworks = filterArtWorks(
    game,
    new ArtWorkFilter({owner: o => o === npc.name}),
  );
  return (
    <View style={BaseStyle.container}>
      <View>
        <Text>{npc.bio}</Text>
        <Text>Likes: {npc.preference}</Text>
      </View>
      <View>
        <Text style={BaseStyle.heading1}>Collection</Text>
        <FlatList
          data={artworks}
          renderItem={({item}) => (
            <ArtItem
              artwork={item}
              onPress={() => navigation.navigate('Buy', {artwork: item})}
            />
          )}
        />
      </View>
    </View>
  );
};

const Collector = (_: Props) => {
  return (
    <CollectorStack.Navigator>
      <CollectorStack.Screen
        name="List"
        component={CollectorList}
        options={{headerShown: false}}
      />
      <CollectorStack.Screen
        name="Buy"
        component={Buy}
        options={{presentation: 'modal', headerShown: false}}
      />
    </CollectorStack.Navigator>
  );
};

export default Collector;
